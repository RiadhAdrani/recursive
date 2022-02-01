import SetState from "./RecursiveState/SetState.js";
import StateRegistry from "./RecursiveState/StateRegistry.js";

/**
 *
 * @param {any} value define an initial value.
 * @param {String} uid state unique identifier.
 * @param {Function} beforeDestroyed executes before the state got cleaned up by the `StateRegistry`.
 * @param {Function} onInit executes after the state has been initialized. Allow the user to perform async call and update the state accordingly
 */
const setState = (uid, value, onInit, beforeDestroyed) =>
     SetState.setState(uid, value, onInit, beforeDestroyed);

/**
 * Returns the state with the specified uid
 * @param {any} uid unique identifier of the wanted state
 * @returns {Array | undefined} an array of length 2 : [`value`,`setValue`]
 * * `value` current value
 * * `setValue` a function that update the `value` with a new one.
 */
const getState = (uid) => {
     return StateRegistry.singleton.getState(uid);
};

/**
 * Update the DOM after performing certain actions.
 * @param {Function} actions function to execute
 * @returns {void}
 */
const updateAfter = (actions) => SetState.updateAfter(actions);

export { setState, updateAfter, getState };
