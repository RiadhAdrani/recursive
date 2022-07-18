import RecursiveRouter from "../RecursiveRouter";

/**
 * Check if the provided route is dynamic : contains parameters.
 * @param {string} route
 * @param {RecursiveRouter} router
 * @returns
 */
function isDynamicRoute(route, router) {
    const regExp = RecursiveRouter.dynamicRegExp;

    for (let path in router.routes) {
        const template = path.toString();
        const tester = "recursive";

        const rm = route.match(regExp);
        const tm = path.match(regExp);

        if (!tm || !rm) continue;

        try {
            if (rm.length === tm.length && tm.length > 0) {
                if (route.replace(regExp, tester) === template.replace(regExp, tester)) {
                    return { isDynamic: true, template: router.routes[path] };
                }
            }
        } catch (e) {
            console.log(`current route => ${template} vs ${route}`, router.routes, e);
        }
    }

    return { isDynamic: false };
}

export default isDynamicRoute;
