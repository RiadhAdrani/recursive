const { RecursiveRouter } = require("..");

/**
 * Mount the new route of the app with the given parameters.
 * @param {String} path
 * @param {String} routeForm
 * @param {String} anchor
 * @param {RecursiveRouter} router
 */
function mountNewRoute(path, routeForm, anchor, router) {
    const [currentPath, setCurrentPath] = router.getPathState();
    const [currentRoute, setCurrentRoute] = router.getRouteState();

    const routeTemplate = router.routes[routeForm];

    router.orchestrator.batchCallback(() => {
        if (typeof currentRoute.onExit == "function") {
            currentRoute.onExit();
        }

        if (routeTemplate.title) router.useRouterSetTitle(routeTemplate);

        setCurrentRoute(routeTemplate);
        setCurrentPath(path);

        if (typeof routeTemplate.onLoad == "function") {
            routeTemplate.onLoad();
        }
    });

    if (anchor) {
        router.useRouterGoToAnchor(anchor);
    } else {
        if (router.scroll) {
            router.useRouterScrollToTop();
        }
    }
}

module.exports = mountNewRoute;
