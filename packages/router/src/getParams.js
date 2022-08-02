const { RecursiveRouter } = require("..");
const { ROUTER_DYNAMIC_REG_EXP } = require("../../constants");
const isDynamicRoute = require("./isDynamicRoute");

/**
 * Return the parameters of the current route.
 * @param {RecursiveRouter} router
 * @returns
 */
function getParams(router) {
    const regExp = ROUTER_DYNAMIC_REG_EXP;

    const [currentName] = router.getPathState();
    const current = isDynamicRoute(currentName, router);

    /**
     * If the current route is not dynamic,
     * we return an empty object.
     */
    if (!current.isDynamic) return {};

    /**
     * We match the given template against router dynamic regular expression
     * and we extract he keys and the data.
     */
    const keys = current.template.path.match(regExp) || [];
    const data = router.useRouterGetLocationPath().match(regExp) || [];

    /**
     * If the lengths or the keys and data arrays are equal and not null,
     * It means that we have valid params.
     */
    if (keys.length === data.length && keys.length > 0) {
        const params = {};

        for (let i = 0; i < keys.length; i++) {
            /**
             * for each index of the arrays,
             * we remove the delimiter ":" and ";" from both the key and its data,
             * because the dynamic route option should be of form "/:id;".
             * and we add it to the output params.
             */
            const key = keys[i].replace(":", "").replace(";", "");
            const keyData = data[i].replace(":", "").replace(";", "");

            params[key] = keyData;
        }

        return params;
    }

    return {};
}

module.exports = getParams;
