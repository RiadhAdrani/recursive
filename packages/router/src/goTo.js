import { RecursiveRouter } from "../";
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
    const [oldPath] = router.getPathState();

    if (_route && oldPath !== path) {
        router.useRouterPushState(_route);

        loadRoute(_route.route, path, anchor, router);
    }
}

export default goTo;
