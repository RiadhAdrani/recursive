const { RecursiveRouter } = require("..");

/**
 * Set parameter for the `routerContext`.
 * @param {RecursiveRouter} router
 */
function setRouterContextParams(router) {
    const [route] = router.getPathState();

    router.routerContext.fragments = route
        .split("/")
        .slice(1)
        .map((val) => `/${val}`);
}

module.exports = setRouterContextParams;
