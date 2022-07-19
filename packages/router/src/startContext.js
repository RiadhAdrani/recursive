import { RecursiveRouter } from "../";

/**
 * Start a new router context.
 * @param {any} newContext
 * @param {RecursiveRouter} router
 */
function startContext(newContext, router) {
    const routerContext = router.routerContext;

    routerContext.depth++;

    if (routerContext.context) {
        routerContext.stack.push(routerContext.context);
    }

    routerContext.context = newContext;
}

export default startContext;
