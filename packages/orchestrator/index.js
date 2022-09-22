const { RecursiveConsole } = require("../console");
const createTaskId = require("./src/createTaskId");
const createUpdateObject = require("./src/createUpdateObject");
const {
    ORCHESTRATOR_FREE,
    ORCHESTRATOR_HANDLING_REQUESTS,
    ORCHESTRATOR_COMPUTE_TREE,
    ORCHESTRATOR_COMPUTE_STYLE,
    ORCHESTRATOR_RENDERING,
    ORCHESTRATOR_UPDATING,
    ORCHESTRATOR_COMPUTE_DIFF,
    ORCHESTRATOR_EXEC_BEFORE_DESTROYED,
    ORCHESTRATOR_COMMIT_INTO_TREE,
    ORCHESTRATOR_EXEC_ON_DESTROYED,
    ORCHESTRATOR_EXEC_ON_CREATED,
    ORCHESTRATOR_EXEC_ON_UPDATED,
    ORCHESTRATOR_CLEAN_STATES,
} = require("../constants");

/**
 * Recieve, manages and schedule application updates.
 */
class RecursiveOrchestrator {
    /**
     * Create a new orchestrator instance.
     *
     * Use `RecursiveApp` to create an app using the orchestrator.
     */
    constructor(boostrapper) {
        this.boostrapper = boostrapper;

        /**
         * Currently executing task.
         * @type {object}
         */
        this.currentTask = { done: true };

        /**
         * Current orchestration phase.
         * @type {string}
         */
        this.step = ORCHESTRATOR_FREE;

        /**
         * The number of updates since the app has been created.
         * @type {number}
         */
        this.updatesCount = 0;

        /**
         * Boolean indicating if requests should be batched or not.
         * @type {boolean}
         */
        this.batching = false;

        /**
         * Boolean indicating if the state has really changed.
         * @type {boolean}
         */
        this.stateChanged = false;

        /**
         * Time in which the last batching has started.
         * @type {number}
         */
        this.batchingStartTime = Date.now();

        /**
         * The duration of the last batching.
         * @type {number}
         */
        this.batchingLastDuration = 0;

        /**
         * Contains queued batching requests.
         * @type {Array<object>}
         */
        this.batchingRequests = [];

        /**
         * Array containing unhandled update requests.
         * @type {Array<object>}
         */
        this.unhandledRequests = [];

        /**
         * Change the current orchestrator `step`.
         * @type {object}
         */
        this.setStep = {
            free: () => (this.step = ORCHESTRATOR_FREE),
            handlingRequests: () => (this.step = ORCHESTRATOR_HANDLING_REQUESTS),
            computeTree: () => (this.step = ORCHESTRATOR_COMPUTE_TREE),
            computeStyle: () => (this.step = ORCHESTRATOR_COMPUTE_STYLE),
            rendering: () => (this.step = ORCHESTRATOR_RENDERING),
            updating: () => (this.step = ORCHESTRATOR_UPDATING),
            computeDiff: () => (this.step = ORCHESTRATOR_COMPUTE_DIFF),
            commit: () => (this.step = ORCHESTRATOR_COMMIT_INTO_TREE),
            execBeforeDestroyed: () => (this.step = ORCHESTRATOR_EXEC_BEFORE_DESTROYED),
            execOnDestroyed: () => (this.step = ORCHESTRATOR_EXEC_ON_DESTROYED),
            execOnCreated: () => (this.step = ORCHESTRATOR_EXEC_ON_CREATED),
            execOnUpdated: () => (this.step = ORCHESTRATOR_EXEC_ON_UPDATED),
            cleanStates: () => (this.step = ORCHESTRATOR_CLEAN_STATES),
        };
    }

    get renderer() {
        return this.boostrapper.renderer;
    }

    /**
     * Update the application using the current renderer.
     *
     * @throws an error if the renderer is falsy.
     */
    update() {
        if (!this.renderer)
            RecursiveConsole.error("Recursive Orchestrator : No renderer was specified");

        this.renderer.update();
    }

    /**
     * Request an update. If the orchestrator is busy,
     * the update will be added to the `unhandled requests` to be executed later.
     * @param {string} sender sender or the reason of the update request.
     */
    requestUpdate(sender) {
        if (![ORCHESTRATOR_FREE, ORCHESTRATOR_HANDLING_REQUESTS].includes(this.step)) {
            /**
             * The orchestrator is busy right now,
             * add the current request to the unhandled requests.
             */
            this.unhandledRequests.push(createUpdateObject(sender, sender));
            return;
        }

        if (this.step === ORCHESTRATOR_FREE) {
            /**
             * The orchestrator is free, we can trigger an update.
             */
            this.update();

            this.updatesCount++;
            this.countUpdateSinceFree();

            /**
             * we check if there are some remaining update requests.
             */
            if (this.unhandledRequests.length > 0) {
                /**
                 * if true,
                 * we request a new update.
                 */
                this.setStep.handlingRequests();
                this.requestUpdate("unhandled-requests");
            } else {
                /**
                 * if false,
                 * we are free to go.
                 */
                this.free();
            }

            return;
        }

        /**
         * If we are handling requests.
         */
        if (this.step === ORCHESTRATOR_HANDLING_REQUESTS) {
            /**
             * empty unhandled request and update the app.
             */
            this.unhandledRequests = [];
            this.update();
            this.updatesCount++;

            /**
             * we check if there are some remaining update requests.
             */
            if (this.unhandledRequests.length > 0) {
                /**
                 * if true,
                 * we request a new update.
                 */
                this.setStep.handlingRequests();
                this.unhandledRequests = [];
                this.requestUpdate("unhandled-requests");
            } else {
                /**
                 * if false,
                 * we are free to go.
                 */
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
     * Notify the orchestrator of a change in the state.
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
                        "Recursive Orchestrator : " +
                            "Batch request took too long (more than 100ms)." +
                            " This could be caused by a catched error." +
                            " Avoid batching your updates in an asynchronous call and using await inside the updateAfter method."
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
     * @param {Function} callback batched callback.
     * @param {string} batchName source of the batching. used for debugging.
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

module.exports = { RecursiveOrchestrator };
