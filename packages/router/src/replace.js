const { RecursiveRouter } = require("..");
const mountNewRoute = require("./mountNewRoute");
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

        mountNewRoute(newPath, routeForm, routeAnchor, router);
    }
}

module.exports = replace;
