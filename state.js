import SetState from "./RecursiveState/SetState.js";
import StateRegistry from "./RecursiveState/StateRegistry.js";
import RefRegistry from "./RecursiveState/RefRegistry.js";
import { setCache, getCache } from "./RecursiveState/SetCache.js";

/**
 * Create a new state object.
 * @param {String} uid state unique identifier.
 * @param {Any} value define an initial value.
 * @param {Function} onInit executes after the state has been initialized. Allow the user to perform async call and update the state accordingly
 * @param {Function} beforeDestroyed executes before the state got cleaned up by the `StateRegistry`.
 * @return {[Any,Function,Any,Function,Function]} [ `value` , `setValue` , `previousValue` , `doExist` , `getValue` ]
 */
const setState = (uid, value, onInit, beforeDestroyed) =>
    SetState.setState(uid, value, onInit, beforeDestroyed);

/**
 * Create a new state object.
 * @param {String} uid state unique identifier.
 * @return {[Any,Function,Any,Function,Function]} [ `value` , `setValue` , `previousValue` , `doExist` , `getValue` ]
 */
const getState = (uid) => {
    return StateRegistry.singleton.getState(uid);
};

/**
 * Update the DOM after performing certain actions.
 * @param {Function} actions function to execute
 */
const updateAfter = (actions) => SetState.updateAfter(actions);

/**
 * Retrieve the referred object by its ref name
 * @param {String} ref refernce name
 * @returns {HTMLElement | HTMLDivElement} retrive an element with the given reference or an empty `<div>` if there is no match
 */
const getRef = (ref) => RefRegistry.getRef(ref);

/**
 * Retrieve an already cached object.
 * @throws throws an error if the given `uuid` is not referencing an existing cached object.
 * @param {String} uuid the universal unique identifier of the cached data
 * @returns {[Any, Function, Function, Function]} an array of data and functions
 */
const _getCache = (uuid) => getCache(uuid);

/**
 * Create a cache object. Available any where and every where after initialization.
 * @param {String} uuid the universal unique identifier of the cached data
 * @param {Any} value the initial value of the cached data
 * @param {Function} onInit an function that will execute when the cached has been successfully added to the store.
 * @returns {[Any, Function, Function, Function]} an array of data and functions
 */
const _setCache = (uuid, value, onInit) => setCache(uuid, value, onInit);

export { setState, updateAfter, getState, getRef, _getCache as getCache, _setCache as setCache };
