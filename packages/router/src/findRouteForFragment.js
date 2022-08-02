const { RecursiveRouter } = require("..");
const { ROUTER_NOT_FOUND_ROUTE } = require("../../constants");
const isDynamicRoute = require("./isDynamicRoute");

/**
 * Find the matching route for the current fragment.
 * @param {string} route
 * @param {RecursiveRouter} router
 * @returns {import("../../../lib").Route | import("../../../lib").RouteTemplate}
 */
function findRouteForFragment(route, router) {
    const res = isDynamicRoute(route, router);

    /**
     * If the correct route is dynamic
     * we return its template.
     */
    if (res.isDynamic) return res;

    /**
     * We search for the route within the list of flat routes.
     */
    for (let _route in router.routes) {
        if (route === _route) return router.routes[_route];
    }

    /**
     * At this point,
     * no route was found,
     * e return the default "not found" route.
     */
    return router.routes[ROUTER_NOT_FOUND_ROUTE];
}

module.exports = findRouteForFragment;
