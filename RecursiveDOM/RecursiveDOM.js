import { throwError } from "./RecursiveError.js";
import RecursiveCSSOM from "../RecursiveCCSOM/RecursiveCSSOM.js";
import {
    isBatching,
    states,
    changeState,
    free,
} from "../RecursiveOrchestrator/RecursiveOrchestrator.js";
import { cleanStore as cleanReferenceStore } from "../RecursiveState/SetReference.js";
import { cleanStore as cleanStateStore } from "../RecursiveState/SetState.js";

/**
 * ## RecursiveDOM
 * The Engine of the Recursive library that play the role of the VDOM
 * (Virtual Document Object Model)
 * and the CSSOM (Cascading Style Sheet Object Model).
 * @global The VDOM will be injected automatically in the `window` object.
 * @see{@link CreateComponent}
 */
class RecursiveDOM {
    static devMode = false;

    static singleton = new RecursiveDOM();

    static enqueueDomAction(action) {
        if (typeof action === "function") RecursiveDOM.singleton.domActions.push(action);
    }

    static enqueueBeforeDestroyed(action) {
        if (typeof action === "function") RecursiveDOM.singleton.beforeDestroyedQueue.push(action);
    }

    static enqueueOnDestroyed(action) {
        if (typeof action === "function") RecursiveDOM.singleton.onDestroyedQueue.push(action);
    }

    static enqueuOnCreated(action) {
        if (typeof action === "function") RecursiveDOM.singleton.onCreatedQueue.push(action);
    }

    static enqueuOnUpdated(action) {
        if (typeof action === "function") RecursiveDOM.singleton.onUpdatedQueue.push(action);
    }

    static enqueueOnRef(action) {
        if (typeof action === "function") RecursiveDOM.singleton.onRefQueue.push(action);
    }

    /**
     * @constructor
     * @param {Object} params deconstructed paramaters
     * @param {Function} params.appFunction application UI tree
     */
    constructor() {
        this.root = document.createElement("div");
        this.root.id = "root";

        this.domActions = [];
        this.beforeDestroyedQueue = [];
        this.onDestroyedQueue = [];
        this.onCreatedQueue = [];
        this.onUpdatedQueue = [];
        this.onRefQueue = [];

        document.querySelector("body").append(this.root);
    }

    resetQueues() {
        this.domActions = [];
        this.beforeDestroyedQueue = [];
        this.onDestroyedQueue = [];
        this.onCreatedQueue = [];
        this.onUpdatedQueue = [];
        this.onRefQueue = [];
    }

    exBeforeDestroyed = () => this.beforeDestroyedQueue.forEach((fn) => fn());

    exDomActions = () => this.domActions.forEach((fn) => fn());

    exOnDestroyed = () => this.onDestroyedQueue.forEach((fn) => fn());

    exOnCreated = () => this.onCreatedQueue.forEach((fn) => fn());

    exOnUpdated = () => this.onUpdatedQueue.forEach((fn) => fn());

    exOnRef = () => this.onRefQueue.forEach((fn) => fn());

    /**
     * Render the app for the first time.
     */
    render() {
        changeState(states.RENDERING);

        if (RecursiveDOM.devMode) console.time("Render");

        changeState(states.COMPUTE_TREE);
        this.oldRender = this.app();
        this.oldRender.uidify("0");

        if (this.oldRender.$$createcomponent !== "create-component") {
            throwError('Root component is not of type "CreateComponent"', [
                "Render only accepts a function call.",
                "You should return CreateComponent from your app function.",
            ]);
        }

        changeState(states.COMPUTE_STYLE);
        RecursiveCSSOM.singleton.update(this.oldRender.flattenStyle());

        changeState(states.COMMIT_INTO_DOM);
        this.root.innerHTML = "";
        this.root.append(this.oldRender.render());

        changeState(states.EXEC_ON_CREATED);
        this.oldRender.$onCreated();
        this.oldRender.$onRefRecursively();

        changeState(states.CLEAN_STATES);
        this.resetQueues();

        if (RecursiveDOM.devMode) console.timeEnd("Render");

        changeState(states.FREE);
    }

    /**
     * Update the UI whenever a stateful object has been modified using the `setValue` or `updateAfter` method.
     * @see {@link SetState.setValue}
     * @function
     */
    update() {
        changeState(states.UPDATING);

        if (RecursiveDOM.devMode) console.time("UI Update");

        changeState(states.COMPUTE_TREE);
        const newRender = this.app();
        newRender.uidify("0");

        changeState(states.COMPUTE_STYLE);
        RecursiveCSSOM.singleton.update(newRender.flattenStyle());

        changeState(states.COMPUTE_DIFF);
        cleanReferenceStore();
        this.oldRender.update(newRender);
        this.oldRender = newRender;

        changeState(states.EXEC_BEFORE_DESTROYED);
        this.exBeforeDestroyed();

        changeState(states.COMMIT_INTO_DOM);
        this.exDomActions();

        changeState(states.EXEC_ON_DESTROYED);
        this.exOnDestroyed();

        changeState(states.EXEC_ON_CREATED);
        this.exOnCreated();

        changeState(states.EXEC_ON_UPDATED);
        this.exOnUpdated();
        this.oldRender.$onRefRecursively();

        changeState(states.CLEAN_STATES);
        this.resetQueues();
        cleanStateStore();

        if (RecursiveDOM.devMode) console.timeEnd("UI Update");
    }

    destroy() {
        this.roots.app.remove();
    }
}

export default RecursiveDOM;
