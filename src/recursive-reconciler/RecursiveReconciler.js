import { updateStack } from "../recursive-cssom/RecursiveCSSOM.js";
import { throwError } from "../recursive-dom/RecursiveError.js";
import { changeState, states } from "../recursive-orchestrator/RecursiveOrchestrator.js";
import CreateComponent from "../create-component/CreateComponent.js";
import { clear as clearStores } from "../recursive-state/RecursiveState.js";

const DOM = "DOM";
const BEFORE_DESTROYED = "BEFORE_DESTROYED";
const ON_CREATED = "ON_CREATED";
const ON_DESTROYED = "ON_DESTROYED";
const ON_UPDATED = "ON_UPDATED";
const ON_REF = "ON_REF";

class Reconciler {
    static singleton = new Reconciler();

    constructor() {
        this.stack = {};
        this.root = undefined;
        this.old = undefined;
        this.app = undefined;
    }

    clean() {
        this.stack = {};
        clearStores();
    }

    pushCallback(callback, name) {
        if (typeof callback !== "function") return;

        if (!this.stack[name]) this.stack[name] = [];

        this.stack[name].push(callback);
    }

    pushDom(callback) {
        this.pushCallback(callback, DOM);
    }

    pushBeforeDestroyed(callback) {
        this.pushCallback(callback, BEFORE_DESTROYED);
    }

    pushOnDestroyed(callback) {
        this.pushCallback(callback, ON_DESTROYED);
    }

    pushOnCreated(callback) {
        this.pushCallback(callback, ON_CREATED);
    }

    pushOnUpdated(callback) {
        this.pushCallback(callback, ON_UPDATED);
    }

    pushOnRef(callback) {
        this.pushCallback(callback, ON_REF);
    }

    execute(name) {
        if (this.stack[name] && Array.isArray(this.stack[name])) {
            this.stack[name].forEach((fn) => {
                (() => {
                    fn();
                })();
            });
        }
    }

    render(app, root) {
        if (typeof app !== "function") {
            throwError("App is not a function.", []);
        }
        if (!root || !document.contains(root)) {
            const _root = document.createElement("div");
            _root.id = "root";

            this.root = _root;
            document.body.append(_root);
        } else {
            this.root = root;
        }

        this.app = app;

        changeState(states.COMPUTE_TREE);
        this.old = this.app();

        if (this.old instanceof CreateComponent === false)
            throwError("App should return a component of type CreateComponent", []);

        this.old.uidify("0");

        changeState(states.COMPUTE_STYLE);
        updateStack(this.old.flattenStyle());

        changeState(states.COMMIT_INTO_DOM);
        this.root.append(this.old.render());

        changeState(states.EXEC_ON_CREATED);
        this.execute(ON_CREATED);

        this.old.onRefRecursively();

        changeState(states.CLEAN_STATES);
        this.clean();

        changeState(states.FREE);
    }

    update() {
        changeState(states.COMPUTE_TREE);
        const newest = this.app();

        if (newest instanceof CreateComponent === false)
            throwError("New tree root component is not of type CreateComponent", []);

        newest.uidify("0");

        changeState(states.COMPUTE_STYLE);
        updateStack(newest.flattenStyle());

        changeState(states.COMPUTE_DIFF);
        this.old.update(newest);
        this.old = newest;

        changeState(states.EXEC_BEFORE_DESTROYED);
        this.execute(BEFORE_DESTROYED);

        changeState(states.COMMIT_INTO_DOM);
        this.execute(DOM);

        changeState(states.EXEC_ON_DESTROYED);
        this.execute(ON_DESTROYED);

        changeState(states.EXEC_ON_UPDATED);
        this.execute(ON_UPDATED);
        this.old.onRefRecursively();

        changeState(states.CLEAN_STATES);
        this.clean();
    }
}

function render(app, root) {
    Reconciler.singleton.render(app, root);
}

function update() {
    Reconciler.singleton.update();
}

function pushDom(callback) {
    Reconciler.singleton.pushDom(callback);
}

function pushBeforeDestroyed(callback) {
    Reconciler.singleton.pushBeforeDestroyed(callback);
}

function pushOnDestroyed(callback) {
    Reconciler.singleton.pushOnDestroyed(callback);
}

function pushOnCreated(callback) {
    Reconciler.singleton.pushOnCreated(callback);
}

function pushOnUpdated(callback) {
    Reconciler.singleton.pushOnUpdated(callback);
}

function pushOnRef(callback) {
    Reconciler.singleton.pushOnRef(callback);
}

export {
    render,
    update,
    pushDom,
    pushBeforeDestroyed,
    pushOnCreated,
    pushOnDestroyed,
    pushOnUpdated,
    pushOnRef,
};
