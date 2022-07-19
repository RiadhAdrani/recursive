const { RecursiveRouter } = require("..");
const renderFragment = require("./renderFragment");
const setRouterContextParams = require("./setRouterContextParams");
const useRouterContext = require("./useRouterContext");

/**
 * Combine `useRouterContext` and `renderFragment`.
 * Render the route fragment to the tree.
 * @param {RecursiveRouter} router
 * @returns {any} component
 */
function renderRoute(router) {
    const [route] = router.getRouteState();

    setRouterContextParams(router);

    return useRouterContext({ route }, () => renderFragment(router), router);
}

module.exports = renderRoute;
