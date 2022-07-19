import { RecursiveRouter } from "../";
import renderFragment from "./renderFragment";
import setRouterContextParams from "./setRouterContextParams";
import useRouterContext from "./useRouterContext";

/**
 * Combine `useRouterContext` and `renderFragment`.
 * Render the route fragment to the tree.
 * @param {RecursiveRouter} router
 * @returns {any} component
 */
function renderRoute(router) {
    const [route] = router.stateManager.getReserved("route");

    setRouterContextParams(router);

    return useRouterContext({ route }, () => renderFragment(router), router);
}

export default renderRoute;
