import RecursiveRouter from "../RecursiveRouter";

/**
 * Load the appropriate route with the given parameters.
 * @param {Object} template
 * @param {string} route
 * @param {string} anchor
 * @param {RecursiveRouter} router
 * @returns
 */
function loadRoute(template, route, anchor, router) {
    const [path, setPath] = router.stateManager.getReserved("path");
    const [current, setCurrent] = router.stateManager.getReserved("route");

    if (path === route) return;

    let _template = template;

    router.orchestrator.batchCallback(() => {
        if (typeof current.onExit === "function") current.onExit();

        if (typeof template.title === "string") router.useRouterSetTitle(template.title);

        setCurrent(_template);
        setPath(route);

        if (typeof _template.onLoad === "function") _template.onLoad();
    });

    if (anchor) {
        router.useRouterGoToAnchor(anchor);
    } else {
        router.useRouterScrollToTop();
    }
}

export default loadRoute;
