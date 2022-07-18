import RecursiveRouter from "../RecursiveRouter";
import isDynamicRoute from "./isDynamicRoute";

/**
 * Resolve and prepare the route.
 * @param {string} route
 * @param {RecursiveRouter} router
 * @returns
 */
function resolveRoute(route, router) {
    const dynamicTemplate = isDynamicRoute(route, router);

    if (dynamicTemplate.isDynamic) {
        // route is dynamic
        return { path: route, route: dynamicTemplate.template };
    } else {
        // route is not dynamic
        if (router.routes[route]) {
            if (router.routes[route].redirectTo) {
                // route should re direct
                const _redirectRoute = router.routes[route].redirectTo;

                const _redirect = isDynamicRoute(_redirectRoute, router);

                if (_redirect.isDynamic) {
                    // redirect route is dynamic render it
                    return {
                        path: _redirectRoute,
                        route: _redirect.template,
                    };
                } else {
                    // redirect route is not dynamic
                    if (router.routes[_redirectRoute]) {
                        // route found
                        return {
                            path: _redirectRoute,
                            route: router.routes[_redirectRoute],
                        };
                    } else {
                        // route not found, render 404
                        return {
                            path: _redirectRoute,
                            route: router.routes["/404"],
                        };
                    }
                }
            } else {
                // route should render as is
                return { path: route, route: router.routes[route] };
            }
        } else {
            // route not found, render 404
            return { path: route, route: router.routes["/404"] };
        }
    }
}

export default resolveRoute;
