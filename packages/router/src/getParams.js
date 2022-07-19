const { RecursiveRouter } = require("..");
const isDynamicRoute = require("./isDynamicRoute");

/**
 * Return the parameters of the current route.
 * @param {RecursiveRouter} router
 * @returns
 */
function getParams(router) {
    const regExp = RecursiveRouter.dynamicRegExp;

    const [currentName] = router.getPathState();
    const current = isDynamicRoute(currentName, router);

    if (!current.isDynamic) return {};

    const keys = current.template.path.match(regExp) || [];
    const data = router.useRouterGetLocationPath().match(regExp) || [];

    if (keys.length === data.length && keys.length > 0) {
        const comb = {};

        for (let i = 0; i < keys.length; i++) {
            comb[keys[i].replace(":", "").replace(";", "")] = data[i]
                .replace(":", "")
                .replace(";", "");
        }

        return comb;
    }
}

module.exports = getParams;
