const { RecursiveRouter } = require("..");
const loadRoute = require("./loadRoute");

/**
 * Replace the current route with the given one.
 * @param {string} routePath
 * @param {string} routeAnchor
 * @param {RecursiveRouter} router
 * @returns
 */
function replace(routePath, routeAnchor, router) {
    if (!routePath) return;

    const [_route] = router.resolveRouteAnchor(routePath);

    if (_route) {
        router.useRouterReplaceState(_route, routeAnchor);

        loadRoute(_route.route, routePath, routeAnchor, router);
    }
}

module.exports = replace;
