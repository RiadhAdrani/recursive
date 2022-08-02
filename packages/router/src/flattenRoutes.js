/**
 * Resolve the provided route and return a flat object.
 * @param {import("../../../lib").Route} route
 * @returns {import("../../../lib").FlatRoutes}
 */
function flattenRoutes(route) {
    let list = {};

    /**
     * we should accept a route only if :
     * - it is a non null javascript
     * - contains a path
     * - contains a component
     */
    if (route && route.path && route.component) {
        list[route.path] = {
            path: route.path,
            component: route.component,
            redirectTo: route.redirectTo,
            title: route.title,
            onLoad: route.onLoad,
            onExit: route.onExit,
        };

        if (Array.isArray(route.routes)) {
            const parent = route.path;

            /**
             * we do not add a slash if the parent route is the root ("/") path.
             */
            const slash = route.path == "/" ? "" : "/";

            route.routes.forEach((_route) => {
                if (_route && _route.path) {
                    const current = _route.path;

                    /**
                     * we construct the route path
                     */
                    _route.path = parent + slash + current;

                    /**
                     * we recursively flatten the child routes
                     * and add them to the global list.
                     */
                    const _list = flattenRoutes(_route);
                    list = { ...list, ..._list };
                }
            });
        }
    }

    return list;
}

module.exports = flattenRoutes;
