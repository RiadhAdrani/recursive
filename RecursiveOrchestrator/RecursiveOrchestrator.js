import RecursiveDOM from "../RecursiveDOM/RecursiveDOM.js";
import { throwError } from "../RecursiveDOM/RecursiveError.js";

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
    return {
        sender,
        time: Date.now(),
        uuid,
    };
};

class RecursiveOrchestrator {
    static singleton = new RecursiveOrchestrator();

    constructor() {
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

    requestUpdate(sender) {
        if (this.step !== FREE && this.step !== HANDLING_REQUESTS) {
            this.unhandledRequests.push(updateObj(sender));
            return;
        }

        if (this.step === FREE) {
            RecursiveDOM.singleton.update();
            this.updatesCount++;
            this.countUpdateSinceFree();
            if (this.unhandledRequests.length > 0) {
                RecursiveOrchestrator.changeState(HANDLING_REQUESTS);
                this.requestUpdate("unhandled-requests");
            } else {
                this.free();
            }
            return;
        }
        if (this.step === HANDLING_REQUESTS) {
            this.unhandledRequests = [];
            RecursiveDOM.singleton.update();
            this.updatesCount++;
            if (this.unhandledRequests.length > 0) {
                RecursiveOrchestrator.changeState(HANDLING_REQUESTS);
                this.unhandledRequests = [];
                this.requestUpdate("unhandled-requests");
            } else {
                this.free();
            }
            return;
        }
    }

    static watchTask(time) {
        const name = this.taskUUID(time);
        RecursiveOrchestrator.singleton.watchTask(name, time);
        return () => this.unWatchTask(name);
    }

    static unWatchTask(name) {
        RecursiveOrchestrator.singleton.unwatchTask(name);
    }

    watchTask(name, time, onExceeded = () => {}) {
        if (!this.currentTask.done) {
        }

        this.currentTask = { name, time, done: false, step: this.step };

        setTimeout(() => {
            if (!this.currentTask.done && this.currentTask.name === name) {
                onExceeded();
            } else {
                this.currentTask.done = true;
            }
        }, time * 1.5);
    }

    unwatchTask(name) {
        if (this.currentTask.name !== name) {
        } else {
            this.currentTask.done = true;
        }
    }

    static startTask(callback, time, step) {
        if (step) {
            RecursiveOrchestrator.singleton.step = step;
        }
        const unwatch = RecursiveOrchestrator.watchTask(time);
        callback();
        unwatch();
    }

    static taskUUID(time) {
        let uuid = "";

        for (let i = 0; i < 5; i++) {
            uuid += Math.random() * i * 10 * Math.random();
        }

        return `task-${uuid}-${time}`;
    }

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

    static changeState(state) {
        RecursiveOrchestrator.singleton.step = state;
    }

    free() {
        this.updatesCount = 0;
        this.stateChanged = false;
        RecursiveOrchestrator.changeState(FREE);
    }

    countUpdateSinceFree() {
        setTimeout(() => {
            if (this.updatesCount > 200) {
                throwError("Infinite re-render detected", [
                    "This error occured because the RecursiveDOM detected the need of a large amount of updates in a short period of time.",
                    "Avoid updating the state without any condition specially in hooks",
                ]);
            }
        }, 2000);
    }

    startBatching() {
        this.batchingStartTime = Date.now();
        this.batching = true;
    }

    endBatching(sender) {
        this.batchingLastDuration = Date.now() - this.batchingStartTime;
        this.batchingRequests = [];
        this.batching = false;
        if (this.stateChanged) {
            this.requestUpdate(sender);
        }
    }

    requestEndBatching(sender) {
        if (this.batchingRequests.length > 0) {
            this.batchingRequests = this.batchingRequests.filter((req) => req.uuid !== sender);
        }

        if (this.batchingRequests.length === 0) {
            this.endBatching(sender);
        }
    }

    requestStartBatching(sender) {
        if (this.batching) {
            const uuid = RecursiveOrchestrator.taskUUID(20);
            this.batchingRequests.push(updateObj(sender, uuid));
            setTimeout(() => {
                if (this.batchingRequests.find((req) => req.uuid === uuid)) {
                    console.warn(
                        "Batch request took too long (more than 20ms). This could be caused by a catched error. Avoid batching your updates in an asynchronous call and using await inside the updateAfter method."
                    );
                    this.endBatching(sender);
                }
            }, 100);
        } else {
            this.startBatching();
        }
    }
}

function isBatching() {
    return RecursiveOrchestrator.singleton.batching === true;
}

function requestUpdate(sender) {
    RecursiveOrchestrator.singleton.requestUpdate(sender);
}

function requestBatchingStart(sender) {
    RecursiveOrchestrator.singleton.requestStartBatching(sender);
}

function requestBatchingEnd(sender) {
    RecursiveOrchestrator.singleton.requestEndBatching(sender);
}

function notifyStateChanged() {
    RecursiveOrchestrator.singleton.stateChanged = true;
}

function changeState(state) {
    RecursiveOrchestrator.singleton.step = state;
}

function free() {
    RecursiveOrchestrator.singleton.free();
}

const states = {
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

export {
    isBatching,
    requestUpdate,
    requestBatchingStart,
    requestBatchingEnd,
    notifyStateChanged,
    changeState,
    free,
    states,
};
