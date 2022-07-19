import { RecursiveRouter } from "../";
import loadRoute from "./loadRoute";

/**
 * Replace the current route with the given one.
 * @param {string} path
 * @param {string} hash
 * @param {RecursiveRouter} router
 * @returns
 */
function replace(path, hash, router) {
    if (!path) return;

    const [_route, anchor] = router.checkRoute(path);

    if (_route) {
        router.useRouterPushState(_route, hash);

        loadRoute(_route.route, path, hash, router);
    }
}

export default replace;
