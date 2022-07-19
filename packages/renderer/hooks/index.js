const {
    HOOKS_ON_CREATED,
    HOOKS_ON_DESTROYED,
    HOOKS_ON_UPDATED,
    HOOKS_BEFORE_DESTROYED,
    HOOKS_ON_REF,
} = require("../../constants");

const list = {
    onCreated: { key: HOOKS_ON_CREATED, type: "function" },
    onDestroyed: { key: HOOKS_ON_DESTROYED, type: "function" },
    onUpdated: { key: HOOKS_ON_UPDATED, type: "function" },
    beforeDestroyed: { key: HOOKS_BEFORE_DESTROYED, type: "function" },
    onRef: { key: HOOKS_ON_REF, type: "function" },
};

/**
 * Returns if a hook is valid or not.
 * @param {string} hook name
 * @param {any} declaration
 */
function isHook(hook, declaration) {
    if (!list[hook]) return false;

    if (typeof declaration !== list[hook].type) return false;

    return true;
}

module.exports = { isHook, list };
