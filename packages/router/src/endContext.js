import RecursiveRouter from "../RecursiveRouter";

/**
 * end the current router context.
 * @param {any} newContext
 * @param {RecursiveRouter} router
 */
function endContext(router) {
    const routerContext = router.routerContext;

    if (routerContext.context) {
        if (routerContext.stack.length > 0) routerContext.context = routerContext.stack.pop();
        else routerContext.context = undefined;
    }

    routerContext.depth--;
}

export default endContext;
