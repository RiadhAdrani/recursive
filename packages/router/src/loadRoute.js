const { RecursiveRouter } = require("..");

/**
 * Load the appropriate route with the given parameters.
 * @param {import("../../../lib").Route} routeTemplate route object.
 * @param {string} routePath  because the path could be dynamic, we cannot use the path of the template.
 * @param {string} routeAnchor identifier of the element that we should scroll to.
 * @param {RecursiveRouter} router
 */
function loadRoute(routeTemplate, routePath, routeAnchor, router) {
    const [currentPath, setCurrentPath] = router.getPathState();
    const [currentRoute, setCurrentRoute] = router.getRouteState();

    if (currentPath === routePath) return;

    router.orchestrator.batchCallback(() => {
        if (typeof currentRoute.onExit === "function") currentRoute.onExit();

        if (typeof routeTemplate.title === "string") router.useRouterSetTitle(routeTemplate.title);

        /**
         * Update the current stateful route object
         */
        setCurrentRoute(routeTemplate);

        /**
         * Update the current stateful route path
         */
        setCurrentPath(routePath);

        if (typeof routeTemplate.onLoad === "function") routeTemplate.onLoad();
    });

    if (routeAnchor) {
        /**
         * Scroll into anchor element.
         */
        router.useRouterGoToAnchor(routeAnchor);
    } else {
        if (router.scroll) {
            /**
             * Correct scrolling position
             */
            router.useRouterScrollToTop();
        }
    }
}

module.exports = loadRoute;
