const { RecursiveRouter } = require("..");
const loadRoute = require("./loadRoute");

/**
 * Used to navigate between routes.
 * @param {path} path
 * @param {RecursiveRouter} router
 * @returns
 */
function goTo(path, router) {
    if (!path) return;

    const [_route, anchor] = router.resolveRouteAnchor(path);
    const [oldPath] = router.getPathState();

    /**
     * We should check if the wanted route
     * is a different from the current one.
     */
    if (_route && oldPath !== path) {
        router.useRouterPushState(_route);

        /**
         * we check if this route has a redirection.
         */
        const _path = _route.redirected ? _route.path : path;

        /**
         * load the route
         */
        loadRoute(_route.route, _path, anchor, router);
    }
}

module.exports = goTo;
