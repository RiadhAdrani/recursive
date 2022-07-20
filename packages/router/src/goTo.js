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

    const [_route, anchor] = router.checkRoute(path);
    const [oldPath] = router.getPathState();

    if (_route && oldPath !== path) {
        router.useRouterPushState(_route);

        const _path = _route.redirected ? _route.path : path;

        loadRoute(_route.route, _path, anchor, router);
    }
}

module.exports = goTo;
