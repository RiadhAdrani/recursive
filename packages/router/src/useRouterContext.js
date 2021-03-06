const { RecursiveRouter } = require("..");
const endContext = require("./endContext");
const startContext = require("./startContext");

/**
 * Encapsulate the given component with the appropriate context.
 * @param {any} context
 * @param {any} component
 * @param {RecursiveRouter} router
 * @returns
 */
function useRouterContext(context, componentCallback, router) {
    if (typeof componentCallback !== "function") {
        RecursiveConsole.error("Route component is not a function.");
    }

    startContext(context, router);

    const fragment = componentCallback();

    endContext(router);

    return fragment;
}

module.exports = useRouterContext;
