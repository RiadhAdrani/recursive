const { RecursiveRouter } = require("..");

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

module.exports = endContext;
