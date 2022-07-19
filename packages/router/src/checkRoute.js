import { RecursiveRouter } from "../";
import resolveRoute from "./resolveRoute";

/**
 * Check the route for an anchor.
 * @param {string} path
 * @param {RecursiveRouter} router
 * @returns
 */
function checkRoute(path, router) {
    if (path !== "/") {
        path = path.replace(/\/$/, "");
    }

    const anchorRegEx = RecursiveRouter.anchorRegExp;

    let anchor = "";

    const res = anchorRegEx.exec(path);

    if (res) anchor = res[0];

    if (anchor) path = path.replace(anchor, "");

    const [current] = router.stateManager.getReserved("route");

    if (current === path) {
        if (anchor) {
            router.useRouterGoToAnchor(anchor);
        }

        return [false, ""];
    }

    return [resolveRoute(path, router), anchor];
}

export default checkRoute;
