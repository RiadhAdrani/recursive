import RecursiveConsole from "../console/index.js";

const FREE = "free";
const HANDLING_REQUESTS = "handling-requests";
const COMPUTE_TREE = "calculating-tree";
const COMPUTE_STYLE = "calculating-style";
const RENDERING = "rendering";
const UPDATING = "updating";
const COMPUTE_DIFF = "calculating-diff";
const EXEC_BEFORE_DESTROYED = "execute-before-destroyed";
const COMMIT_INTO_DOM = "commit-into-dom";
const EXEC_ON_DESTROYED = "execute-on-destroyed";
const EXEC_ON_CREATED = "execute-on-created";
const EXEC_ON_UPDATED = "execute-on-updated";
const EXEC_ON_INJECTED = "execute-on-injected";
const CLEAN_STATES = "clean-states";

const updateObj = (sender, uuid) => {
    const object = {
        sender,
        time: Date.now(),
        uuid,
    };

    return object;
};

/**
 * #### `Recursive Orchestrator`
 * Manages and schedule updates.
 */
class RecursiveOrchestrator {
    static states = {
        FREE,
        COMPUTE_DIFF,
        COMPUTE_TREE,
        COMPUTE_STYLE,
        RENDERING,
        UPDATING,
        EXEC_BEFORE_DESTROYED,
        COMMIT_INTO_DOM,
        EXEC_ON_CREATED,
        EXEC_ON_DESTROYED,
        EXEC_ON_UPDATED,
        EXEC_ON_INJECTED,
        CLEAN_STATES,
    };

    constructor() {
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
            this.unhandledRequests.push(updateObj(sender, sender));
            return;
        }

        if (this.step === FREE) {
            this.update();

            this.updatesCount++;
            this.countUpdateSinceFree();

            if (this.unhandledRequests.length > 0) {
                this.changeState(HANDLING_REQUESTS);
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
                this.changeState(HANDLING_REQUESTS);
                this.unhandledRequests = [];
                this.requestUpdate("unhandled-requests");
            } else {
                this.free();
            }
        }
    }

    /**
     * Generate a unique Task identifer.
     * @param {bigint} time
     * @returns {string} uid
     */
    static generateTaskUUID(time) {
        let uuid = "";

        for (let i = 0; i < 5; i++) {
            uuid += Math.random() * i * 10 * Math.random();
        }

        return `task-${uuid}-${time}`;
    }

    /**
     * Change the current state of the orchestrator.
     * @param {string} state
     */
    changeState(state) {
        this.step = state;
    }

    /**
     * Change the state of the orchestrator to free.
     */
    free() {
        this.updatesCount = 0;
        this.stateChanged = false;
        this.changeState(FREE);
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
            const uuid = RecursiveOrchestrator.generateTaskUUID(20);
            this.batchingRequests.push(updateObj(sender, uuid));
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
