const list = {
    onCreated: { key: "onCreated", type: "function" },
    onDestroyed: { key: "onDestroyed", type: "function" },
    onUpdated: { key: "onUpdated", type: "function" },
    beforeDestroyed: { key: "beforeDestroyed", type: "function" },
    onRef: { key: "onRef", type: "function" },
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

export { isHook };
