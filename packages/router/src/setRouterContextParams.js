import RecursiveRouter from "../RecursiveRouter";

/**
 * Set parameter for the `routerContext`.
 * @param {RecursiveRouter} router
 */
function setRouterContextParams(router) {
    const [route] = router.stateManager.getReserved("path");

    router.routerContext.fragments = route
        .split("/")
        .slice(1)
        .map((val) => `/${val}`);
}

export default setRouterContextParams;
