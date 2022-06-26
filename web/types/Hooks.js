/**
 * @param {HTMLElement} elem
 * @returns {string}
 */
const hook = (elem) => {};

export default {
    onCreated: hook,
    onUpdated: hook,
    onRef: hook,
    beforeDestroyed: hook,
    onDestroyed: hook,
};
