const { RecursiveRouter } = require("..");
const { ROUTER_ANCHOR_REG_EXP } = require("../../constants");
const resolveRoute = require("./resolveRoute");

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

    const anchorRegEx = ROUTER_ANCHOR_REG_EXP;

    let anchor = "";

    const res = anchorRegEx.exec(path);

    if (res) anchor = res[0];

    if (anchor) path = path.replace(anchor, "");

    const [current] = router.getRouteState();

    if (current === path) {
        if (anchor) {
            router.useRouterGoToAnchor(anchor);
        }

        return [false, ""];
    }

    return [resolveRoute(path, router), anchor];
}

module.exports = checkRoute;
