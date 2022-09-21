const { RecursiveRouter } = require("..");
const setRouterContextParams = require("./setRouterContextParams");
const useRouterContext = require("./useRouterContext");

/**
 * Combine `useRouterContext` and `renderFragment`.
 * Render the route fragment to the tree.
 * @param {RecursiveRouter} router
 * @returns {import("../../../lib").RecursiveElement} component
 */
function renderRoute(router) {
    const [route] = router.getRouteState();

    setRouterContextParams(router);

    /**
     * We wrap the fragment rendering function within a context.
     */
    return useRouterContext({ route }, () => router.renderFragment(), router);
}

module.exports = renderRoute;
