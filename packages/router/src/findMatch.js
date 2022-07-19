const { RecursiveRouter } = require("..");
const { ROUTER_NOT_FOUND_ROUTE } = require("../../constants");
const isDynamicRoute = require("./isDynamicRoute");

/**
 * Find the match of the route
 * @param {string} route
 * @param {RecursiveRouter} router
 * @returns
 */
function findMatch(route, router) {
    const res = isDynamicRoute(route, router);

    if (res.isDynamic) return res;

    for (let _route in router.routes) {
        if (route === _route) return router.routes[_route];
    }

    return router.routes[ROUTER_NOT_FOUND_ROUTE];
}

module.exports = findMatch;
