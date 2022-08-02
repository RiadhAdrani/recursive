const { RecursiveRouter } = require("..");

/**
 * try to end the current router context.
 * @param {any} newContext
 * @param {RecursiveRouter} router
 */
function endContext(router) {
    const routerContext = router.routerContext;

    /**
     * We check if a context already exists
     */
    if (routerContext.context) {
        /**
         * if the stack is not empty,
         * we set the current context to the previous one
         * which we popped from the stack.
         */
        if (routerContext.stack.length > 0) routerContext.context = routerContext.stack.pop();
        /**
         *  if the stack is empty
         *  we set the context to an undefined state.
         */ else routerContext.context = undefined;
    }

    routerContext.depth--;
}

module.exports = endContext;
