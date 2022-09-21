const { RecursiveRouter } = require("..");
const resolvePath = require("./resolveInputRoute");

/**
 * Replace the current route with the given one.
 * @param {string} routePath
 * @param {string} routeAnchor
 * @param {RecursiveRouter} router
 * @returns
 */
function replace(routePath, routeAnchor, router) {
    if (!routePath) return;

    const [newPath, routeForm, anchor] = resolvePath(routePath, router.routes);

    if (newPath) {
        router.useRouterReplaceState(newPath, routeForm, anchor);

        router.mountNewRoute(newPath, routeForm, routeAnchor, router);
    }
}

module.exports = replace;
