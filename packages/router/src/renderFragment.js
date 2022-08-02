const { RecursiveRouter } = require("..");
const findRouteForFragment = require("./findRouteForFragment");

/**
 * Return the component matching the current context.
 * @param {RecursiveRouter} router
 * @returns {import("../../../lib").RecursiveElement} component
 */
function renderFragment(router) {
    const routerContext = router.routerContext;

    /**
     * If the current router context depth is superior to the length of the fragments list,
     * we know that we are out of context and we should return an empty string
     * which will not be added to the tree of component.
     */
    if (routerContext.depth > routerContext.fragments.length) return "";

    /**
     * Contains the value of the expected route path at the current context depth.
     * We assume that we are at a reasonable depth value.
     * @type {String}
     */
    const expected = routerContext.fragments.slice(0, routerContext.depth).reduce((prev, val) => {
        return `${prev}${val}`;
    });

    /**
     * The appropriate fragment route
     * calculated using the `expected` route.
     */
    const fragmentRoute = findRouteForFragment(expected, router);

    /**
     * Route fragment element.
     * This should be transformed by the renderer
     * into platform-specific component.
     * @type {import("../../../lib").RecursiveElement}
     */
    let fragmentComponent;

    if (fragmentRoute) {
        fragmentComponent = fragmentRoute.isDynamic
            ? fragmentRoute.template.component()
            : fragmentRoute.component();
    } else {
        /**
         * This branch should be unreachable,
         * but we leave it here to avoid bad behavior.
         */
        fragmentComponent = "";
    }

    return fragmentComponent;
}

module.exports = renderFragment;
