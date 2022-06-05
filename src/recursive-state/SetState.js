import { throwError } from "../recursive-dom/RecursiveError.js";
import {
    requestBatchingEnd,
    requestBatchingStart,
    isBatching,
    requestUpdate,
    notifyStateChanged,
} from "../recursive-orchestrator/RecursiveOrchestrator.js";
import SetStore from "./SetStore.js";

class StateStore extends SetStore {
    /**
     * Create a new state registry.
     * Do not create your own `StateStore`, this will be handled by the `RecursiveStore`.
     * @returns { StateStore } a new registry object
     */
    constructor() {
        super();

        this.current = [];
        this.new = [];
    }

    static singleton = new StateStore();

    clean() {
        for (let i = 0; i < this.current.length; i++) {
            const uid = this.current[i];

            if (SetState.reservedStates.includes(uid)) {
                continue;
            }
            if (this.new.indexOf(uid) === -1) {
                if (this.items[uid]) {
                    if (typeof this.items[uid].beforeDestroyed === "function")
                        (() => this.items[uid].beforeDestroyed())();
                }

                delete this.items[uid];
            }
        }

        this.current = this.new;
        this.new = [];
    }

    /**
     * Create or returns the state object if it already exists in the `globalRegistry`.
     * @param {SetState} state stateful object
     * @returns {Array | undefined} an array containing data and state manipulation functions.
     */
    setState(state) {
        let firstTime = false;

        if (!this.items[state.uid]) {
            this.items[state.uid] = state;
            firstTime = true;
        }

        this.new.push(state.uid);

        const res = this.retrieveState(state.uid);

        if (typeof state.onInit === "function" && firstTime) {
            (() => state.onInit())();
        }

        return res;
    }

    retrieveState(uid) {
        const get = this.items[uid].value;
        const set = (newVal) => {
            if (this.items[uid]) this.items[uid].setValue(newVal);
        };

        const prev = this.items[uid].preValue;
        const exists = () => {
            return this.items[uid] !== undefined;
        };

        const live = () => {
            return this.items[uid].value;
        };

        return [get, set, prev, exists, live];
    }

    /**
     * returns the state object if it already exists in the `globalRegistry`.
     * @param {string} uid state unique identifier
     * @returns {Array | undefined} an array containing data and state manipulation functions.
     */
    getState(uid) {
        if (!this.items[uid]) {
            throwError(`State with the UID ${uid} does not exist!`, [
                "You tried to access a non-existant state.",
                "States could be cleared upon updates, when they are out of scope.",
            ]);
        }

        return this.retrieveState(uid);
    }

    /**
     * returns the reserved state object if it already exists in the `globalRegistry`.
     * @param {string} uid state unique identifier.
     * @internal do not user in development.
     * @returns {Array | undefined} an array containing data and state manipulation functions.
     */
    getReservedState(uid) {
        if (!SetState.reservedStates.includes(uid)) {
            throwError(`Reserved state with the UID ${uid} does not exist!`, [
                "You tried to access a non-existant reserved state.",
                "States could be cleared upon updates, when they are out of scope.",
            ]);
        }

        return this.retrieveState(uid);
    }
}

/**
 * ### SetState
 * Stateful Object, used to automatically update the UI whenever a change occurs to its value.
 * @see {@link RecursiveDOM}
 */
class SetState {
    /**
     * Create a stateful object.
     * @param {any} value define an initial value.
     * @param {String} uid state unique identifier.
     * @param {Function} beforeDestroyed executes before the state got cleaned up by the `StateRegistry`.
     * @param {Function} onInit executes after the state has been initialized. Allow the user to perform async call and update the state accordingly
     * @returns {SetState} stateful object
     */
    constructor(value, uid, beforeDestroyed, onInit) {
        this.uid = uid;
        this.value = value;
        this.beforeDestroyed = beforeDestroyed;
        this.onInit = onInit;
        this.preValue = undefined;
    }

    static reservedStates = ["route"];

    /**
     * Update the value of the stateful object and make the needed changes in the DOM.
     * @param {any} newVal new value
     */
    setValue(newVal) {
        const stateDidChange = this.value !== newVal;

        this.preValue = this.value;
        this.value = newVal;

        if (stateDidChange) {
            notifyStateChanged(this.uid);

            if (isBatching() === false) {
                requestUpdate(this.uid);
            }
        }
    }

    /**
     * Update the DOM after preforming certain actions bundled inside a function.
     * Recommended when calling setState in an asynchronous function.
     * @param {Function} actions - a function that will be executed before updating the DOM.
     */
    static updateAfter(actions) {
        requestBatchingStart("update-after");
        actions();
        requestBatchingEnd("update-after");
    }

    /**
     * Create a stateful object and return its params as an array
     * @param {any} value define an initial value.
     * @param {String} uid state unique identifier.
     * @param {Function} beforeDestroyed executes before the state got cleaned up by the `StateRegistry`.
     * @param {Function} onInit executes after the state has been initialized. Allow the user to perform async call and update the state accordingly
     * @returns {Array} an array containing data and state manipulation functions.
     */
    static setState(uid, initValue, onInit, beforeDestroyed) {
        if (SetState.reservedStates.includes(uid))
            throwError(`${uid} is a reserved state UID`, [
                `You have used a reserved UID from this list : ${SetState.reservedStates}`,
            ]);

        return StateStore.singleton.setState(new SetState(initValue, uid, beforeDestroyed, onInit));
    }

    /**
     * Create a reserved stateful object and return its params as an array
     * @param {any} uid state unique identifier
     * @param {any} initValue define an initial value
     * @returns {Array} an array containing data and state manipulation functions.
     */
    static setReservedState(uid, initValue) {
        const res = new SetState(initValue, uid);
        res.isReserved = true;
        return StateStore.singleton.setState(res);
    }
}

/**
 * Create a reserved stateful object and return its params as an array
 * @param {any} uid state unique identifier
 * @param {any} initValue define an initial value
 * @returns {Array} an array containing data and state manipulation functions.
 */
function setReservedState(uid, value) {
    return SetState.setReservedState(uid, value);
}

/**
 * returns the reserved state object if it already exists in the `globalRegistry`.
 * @param {string} uid state unique identifier.
 * @internal do not user in development.
 * @returns {Array | undefined} an array containing data and state manipulation functions.
 */
function getReservedState(uid) {
    return StateStore.singleton.getReservedState(uid);
}

/**
 * Create a new state object.
 * @param {String} uid state unique identifier.
 * @param {Any} value define an initial value.
 * @param {Function} onInit executes after the state has been initialized. Allow the user to perform async call and update the state accordingly
 * @param {Function} beforeDestroyed executes before the state got cleaned up by the `StateRegistry`.
 * @return {[Any,Function,Any,Function,Function]} [ `value` , `setValue` , `previousValue` , `doExist` , `getValue` ]
 */
function setState(uid, value, onInit, onBeforeDestroyed) {
    return SetState.setState(uid, value, onInit, onBeforeDestroyed);
}

/**
 * Create a new state object.
 * @param {String} uid state unique identifier.
 * @return {[Any,Function,Any,Function,Function]} [ `value` , `setValue` , `previousValue` , `doExist` , `getValue` ]
 */
function getState(uid) {
    return StateStore.singleton.getState(uid);
}

/**
 * Update the DOM after performing certain actions.
 * @param {Function} actions function to execute
 */
function updateAfter(actions) {
    SetState.updateAfter(actions);
}

function cleanStore() {
    StateStore.singleton.clean();
}

export { setReservedState, getReservedState, setState, getState, updateAfter, cleanStore };
