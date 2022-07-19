/**
 * Resolve the provided route and return a flat object.
 * @param {import("../../../lib").Route} route
 * @returns {import("../../../lib").FlatRoutes}
 */
function flattenRoutes(route) {
    let list = {};

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
            const slash = route.path == "/" ? "" : "/";

            route.routes.forEach((_route) => {
                if (_route && _route.path) {
                    const current = _route.path;

                    _route.path = parent + slash + current;

                    const _list = flattenRoutes(_route);
                    list = { ...list, ..._list };
                }
            });
        }
    }

    return list;
}

module.exports = flattenRoutes;
