import SetState from "./RecursiveState/SetState.js";
import StateRegistry from "./RecursiveState/StateRegistry.js";

/**
 *
 * @param {any} uid assign a unique identifier to the state. do not use iteration `index`,
 * use something unique to the component you want to attach to.
 * @param {any} value initial value of the state
 * @returns {Array} an array of length 3 : [`value`,`setValue`,`freeState`]
 * * `value` current value
 * * `setValue` a function that update the `value` with a new one.
 * * `free` remove the state from the `StateRegistry`
 */
const setState = (uid, value) => SetState.setState(uid, value);

/**
 * Returns the state with the specified uid
 * @param {any} uid unique identifier of the wanted state
 * @returns {Array | undefined} an array of length 3 : [`value`,`setValue`,`free`]
 * * `value` current value
 * * `setValue` a function that update the `value` with a new one.
 * * `free` remove the state from the `StateRegistry`
 */
const getState = (uid) => {
     return StateRegistry.globalRegistry ? StateRegistry.globalRegistry.getState(uid) : undefined;
};

/**
 * Update the DOM after performing certain actions.
 * @param {Function} actions function to execute
 * @returns {void}
 */
const updateAfter = (actions) => SetState.updateAfter(actions);

/**
 * Free the provided states. If no name is provided, all states will be removed.
 * @param  {...any} list the list of states (by name) to be removed.
 */
const freeStates = (...list) => {
     StateRegistry.freeStates(list);
};

export { setState, updateAfter, getState, freeStates };
