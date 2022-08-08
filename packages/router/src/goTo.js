const { RecursiveRouter } = require("..");
const mountNewRoute = require("./mountNewRoute");
const resolvePath = require("./resolveInputRoute");

/**
 * Used to navigate between routes.
 * @param {String} destination
 * @param {RecursiveRouter} router
 * @returns
 */
function goTo(destination, router) {
    if (!destination) return;

    const [newPath, routeForm, anchor] = resolvePath(destination, router.routes);
    const [currentPath] = router.getPathState();

    /**
     * We should check if the wanted route
     * is a different from the current one.
     */
    if (currentPath !== newPath) {
        router.useRouterPushState(routeForm);

        mountNewRoute(newPath, routeForm, anchor);
    }
}

module.exports = goTo;
