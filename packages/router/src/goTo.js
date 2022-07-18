import RecursiveRouter from "../RecursiveRouter";
import loadRoute from "./loadRoute";

/**
 * Used to navigate between routes.
 * @param {path} path
 * @param {RecursiveRouter} router
 * @returns
 */
function goTo(path, router) {
    if (!path) return;

    const [_route, anchor] = router.checkRoute(path);

    if (_route) {
        router.useRouterPushState(_route);

        loadRoute(_route.route, path, anchor, router);
    }
}

export default goTo;
