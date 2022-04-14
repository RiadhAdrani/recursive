import { throwError } from "./RecursiveError";
import CreateComponent from "../CreateComponent/CreateComponent.js";
import RecursiveCSSOM from "../RecursiveCCSOM/RecursiveCSSOM";
import RecursiveOrchestrator from "../RecursiveOrchestrator/RecursiveOrchestrator";
import StateRegistry from "../RecursiveState/StateRegistry";
import RefRegistry from "../RecursiveState/RefRegistry";

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
        if (RecursiveDOM.singleton instanceof RecursiveDOM) {
            throwError("RecrusiveDOM cannot have more than one instance", [
                "RecrusiveDOM is an internal class and should not be used in development.",
                "User Recrusive.Render to render your app.",
            ]);
        }

        this.root = document.createElement("app-view");

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
        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.RENDERING);

        // const startTime = new Date().getTime();
        console.time("Render");

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_TREE);
        this.oldRender = this.app();
        this.oldRender.uidify("0");

        if (this.oldRender.$$createcomponent !== "create-component") {
            throwError('Root component is not of type "CreateComponent"', [
                "Render only accepts a function call.",
                "You should return CreateComponent from your app function.",
            ]);
        }

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_STYLE);
        RecursiveCSSOM.singleton.update(this.oldRender.flattenStyle());

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.COMMIT_INTO_DOM);
        this.root.innerHTML = "";
        // HandleWindow.events(this.events);
        this.root.append(this.oldRender.render());

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.EXEC_ON_CREATED);
        this.oldRender.$onCreated();
        this.oldRender.$onRefRecursively();

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.CLEAN_STATES);
        this.resetQueues();

        // if (RecursiveDOM.devMode)
        //      console.log(`First paint done in ${new Date().getTime() - startTime}ms`);
        console.timeEnd("Render");

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.FREE);
    }

    /**
     * Update the UI whenever a stateful object has been modified using the `setValue` or `updateAfter` method.
     * @see {@link SetState.setValue}
     * @function
     */
    update() {
        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.UPDATING);

        // const startTime = new Date().getTime();
        console.time("UI Update");

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_TREE);
        const newRender = this.app();
        newRender.uidify("0");

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_STYLE);
        RecursiveCSSOM.singleton.update(newRender.flattenStyle());

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_DIFF);
        RefRegistry.clean();
        this.oldRender.update(newRender);
        this.oldRender = newRender;

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.EXEC_BEFORE_DESTROYED);
        this.exBeforeDestroyed();

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.COMMIT_INTO_DOM);
        this.exDomActions();

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.EXEC_ON_DESTROYED);
        this.exOnDestroyed();

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.EXEC_ON_CREATED);
        this.exOnCreated();

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.EXEC_ON_UPDATED);
        this.exOnUpdated();
        this.oldRender.$onRefRecursively();

        RecursiveOrchestrator.changeState(RecursiveOrchestrator.states.CLEAN_STATES);
        this.resetQueues();
        StateRegistry.clean();

        // if (RecursiveDOM.devMode)
        //      console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
        console.timeEnd("UI Update");
    }

    destroy() {
        this.roots.app.remove();
    }
}

export default RecursiveDOM;
