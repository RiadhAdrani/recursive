import RecursiveConsole from "../console/index.js";
import RecursiveRenderer from "../renderer/RecursiveRenderer.js";
import createTaskId from "./src/createTaskId.js";
import createUpdateObject from "./src/createUpdateObject.js";

const FREE = "free";
const HANDLING_REQUESTS = "handling-requests";
const COMPUTE_TREE = "calculating-tree";
const COMPUTE_STYLE = "calculating-style";
const RENDERING = "rendering";
const UPDATING = "updating";
const COMPUTE_DIFF = "calculating-diff";
const EXEC_BEFORE_DESTROYED = "execute-before-destroyed";
const COMMIT_INTO_TREE = "commit-into-tree";
const EXEC_ON_DESTROYED = "execute-on-destroyed";
const EXEC_ON_CREATED = "execute-on-created";
const EXEC_ON_UPDATED = "execute-on-updated";
const EXEC_ON_INJECTED = "execute-on-injected";
const CLEAN_STATES = "clean-states";

/**
 * #### `Recursive Orchestrator`
 * Manages and schedule updates.
 */
class RecursiveOrchestrator {
    constructor() {
        /**
         * @type {RecursiveRenderer}
         */
        this.renderer = undefined;

        this.currentTask = { done: true };

        this.step = FREE;

        this.updatesCount = 0;

        this.batching = false;

        this.stateChanged = false;

        this.batchingStartTime = Date.now();

        this.batchingLastDuration = 0;

        this.batchingRequests = [];

        this.unhandledRequests = [];

        this.setStep = {
            free: () => (this.step = FREE),
            handlingRequests: () => (this.step = HANDLING_REQUESTS),
            computeTree: () => (this.step = COMPUTE_TREE),
            computeStyle: () => (this.step = COMPUTE_STYLE),
            rendering: () => (this.step = RENDERING),
            updating: () => (this.step = UPDATING),
            computeDiff: () => (this.step = COMPUTE_DIFF),
            commit: () => (this.step = COMMIT_INTO_TREE),
            execBeforeDestroyed: () => (this.step = EXEC_BEFORE_DESTROYED),
            execOnDestroyed: () => (this.step = EXEC_ON_DESTROYED),
            execOnCreated: () => (this.step = EXEC_ON_CREATED),
            execOnUpdated: () => (this.step = EXEC_ON_UPDATED),
            cleanStates: () => (this.step = CLEAN_STATES),
        };
    }

    /**
     * Update the application using the current renderer.
     */
    update() {
        if (!this.renderer) RecursiveConsole.error("No renderer was specified");

        this.renderer.update();
    }

    /**
     * Request an update. If the orchestrator is busy,
     * the update will be added to the `unhandled requests` to be executed later.
     * @param {string} sender
     */
    requestUpdate(sender) {
        if (![FREE, HANDLING_REQUESTS].includes(this.step)) {
            this.unhandledRequests.push(createUpdateObject(sender, sender));
            return;
        }

        if (this.step === FREE) {
            this.update();

            this.updatesCount++;
            this.countUpdateSinceFree();

            if (this.unhandledRequests.length > 0) {
                this.setStep.handlingRequests();
                this.requestUpdate("unhandled-requests");
            } else {
                this.free();
            }
            return;
        }

        if (this.step === HANDLING_REQUESTS) {
            this.unhandledRequests = [];
            this.update();
            this.updatesCount++;

            if (this.unhandledRequests.length > 0) {
                this.setStep.handlingRequests();
                this.unhandledRequests = [];
                this.requestUpdate("unhandled-requests");
            } else {
                this.free();
            }
        }
    }

    /**
     * Change the state of the orchestrator to free.
     */
    free() {
        this.updatesCount = 0;
        this.stateChanged = false;
        this.setStep.free();
    }

    /**
     * Count the number of updates since the execution of the method.
     */
    countUpdateSinceFree() {
        setTimeout(() => {
            if (this.updatesCount > 200) {
                RecursiveConsole.error("Infinite re-render detected", [
                    "This error occured because the RecursiveDOM detected the need of a large amount of updates in a short period of time.",
                    "Avoid updating the state without any condition specially in hooks",
                ]);
            }
        }, 2000);
    }

    /**
     * Notify the orchestrator of a change of state.
     */
    notifyStateChanged() {
        this.stateChanged = true;
    }

    /**
     * Notify the orchestrator to start batching incoming state changes into one update.
     */
    startBatching() {
        this.batchingStartTime = Date.now();
        this.batching = true;
    }

    /**
     * End the batching operation and request an update if a state change is detected.
     * @param {string} sender source
     */
    endBatching(sender) {
        this.batchingLastDuration = Date.now() - this.batchingStartTime;
        this.batchingRequests = [];
        this.batching = false;
        if (this.stateChanged) {
            this.requestUpdate(sender);
        }
    }

    /**
     * End the batching task requested by the `sender`.
     * @param {string} sender source
     */
    requestEndBatching(sender) {
        if (this.batchingRequests.length > 0) {
            this.batchingRequests = this.batchingRequests.filter((req) => req.uuid !== sender);
        }

        if (this.batchingRequests.length === 0) {
            this.endBatching(sender);
        }
    }

    /**
     * Start a batching task.
     * @param {string} sender source
     */
    requestStartBatching(sender) {
        if (this.batching) {
            const uuid = createTaskId(20);
            this.batchingRequests.push(createUpdateObject(sender, uuid));
            setTimeout(() => {
                if (this.batchingRequests.find((req) => req.uuid === uuid)) {
                    RecursiveConsole.warn(
                        "Batch request took too long (more than 20ms). This could be caused by a catched error. Avoid batching your updates in an asynchronous call and using await inside the updateAfter method."
                    );
                    this.endBatching(sender);
                }
            }, 100);
        } else {
            this.startBatching();
        }
    }

    /**
     * Batch update resulting from the callback.
     * @param {Function} callback
     * @param {string} batchName
     * @returns
     */
    batchCallback(callback, batchName = "batch-callback-" + Date.now) {
        if (callback === undefined || typeof callback !== "function") return;

        if (this.batching === true) callback();
        else {
            this.requestStartBatching(batchName);

            callback();

            this.requestEndBatching(batchName);
        }
    }
}

export { RecursiveOrchestrator };
