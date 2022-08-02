const { RecursiveRouter } = require("..");
const { ROUTER_DYNAMIC_REG_EXP } = require("../../constants");

/**
 * Check if the provided route is dynamic : contains parameters.
 * @param {string} inputPath
 * @param {RecursiveRouter} router
 * @returns {import("../../../lib").RouteTemplate | {isDynamic: boolean}}
 */
function isDynamicRoute(inputPath, router) {
    const regExp = ROUTER_DYNAMIC_REG_EXP;

    for (let pathKey in router.routes) {
        /**
         * Basically,
         * this is the path that we are testing,
         * we are using a new variable
         * to avoid confusion.
         * the name `pathKey` could be interpreted as something else,
         * despite being just the key of the path within the object of routes.
         */
        const templatePath = pathKey;

        /**
         * This is a testing string,
         * could be set to any value
         * but we decided "recusive".
         */
        const tester = "recursive";

        /**
         * We match the given input path against the dynamic route regular expression.
         */
        const inputRouteMatch = inputPath.match(regExp);
        /**
         * We match the currently iterated on path against the dynamic route regular expression.
         */
        const currentRouteMatch = pathKey.match(regExp);

        /**
         * If one of the matches is falsy,
         * we just skip this route.
         */
        if (!currentRouteMatch || !inputRouteMatch) continue;

        /**
         * This may cause errors
         * and we should wrap it in an "try catch" block.
         */
        try {
            if (
                inputRouteMatch.length === currentRouteMatch.length &&
                currentRouteMatch.length > 0
            ) {
                /**
                 * If the number of matches is the same and not null,
                 * we should check if both routes give us the same route
                 * with a custom parameter.
                 * We return the route template if it is a match.
                 */
                if (inputPath.replace(regExp, tester) === templatePath.replace(regExp, tester)) {
                    return { isDynamic: true, template: router.routes[pathKey] };
                }
            }
        } catch (e) {
            /**
             * Something went wrong...
             */
        }
    }

    /**
     * Our route is not dynamic
     */
    return { isDynamic: false };
}

module.exports = isDynamicRoute;
