const { RecursiveRouter } = require("..");
const { ROUTER_ANCHOR_REG_EXP } = require("../../constants");
const resolveRouteWithRedirection = require("./resolveRoute");

/**
 * Check the route for an anchor.
 * If an anchor is found
 * and we are at the same route,
 * we scroll into it before return an output.
 * @param {string} path
 * @param {RecursiveRouter} router
 *
 * @returns {[import("../../../lib").ResolvedRoute | boolean, String]}
 * return an array of 2 values. The first value is either a `ResolvedRoute`
 * or a `false` boolean which mean that we are at the exact same route
 * and therefore it is useless to update the route.
 * The second value is a `string` containing the anchor,
 * the id of the element that we have scrolled into.
 */
function resolveRouteAnchor(path, router) {
    /**
     * We check if the path is the root.
     * If not, we remove the last "/"
     * because it mess up the routing calculation.
     */
    if (path !== "/") {
        path = path.replace(/\/$/, "");
    }

    const anchorRegEx = ROUTER_ANCHOR_REG_EXP;

    let anchor = "";

    const res = anchorRegEx.exec(path);

    if (res) anchor = res[0];

    /**
     * We remove the anchor from the path
     * to avoid unwanted behavior
     */
    if (anchor) path = path.replace(anchor, "");

    const [current] = router.getPathState();

    /**
     * We compare the current path with the expected one.
     * If it is the same,
     * we scroll into the element,
     * and return false route
     * and an empty anchor
     * to avoid another scroll.
     */
    if (current === path) {
        if (anchor) {
            router.useRouterGoToAnchor(anchor);
        }

        return [false, ""];
    }

    return [resolveRouteWithRedirection(path, router), anchor];
}

module.exports = resolveRouteAnchor;
