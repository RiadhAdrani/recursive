import CustomComponents from "./CreateComponent/CustomComponents.js";
import * as Components from "./components.js";
import RecursiveDOM from "./RecursiveDOM/RecursiveDOM.js";
import { setStaticStyle, setStyle } from "./style.js";
import { setCache, setState, getCache, getState, getRef, updateAfter } from "./state.js";
import { createRouter, getParams, getRoute, goTo, renderRoute, route, setTitle } from "./router.js";
import { onFreshLoad } from "./RecursiveRouter/RecursiveRouter.js";

CustomComponents();

/**
 * Render your App.
 * @param {Function} App function returning the tree of components
 */
function Render(App) {
    RecursiveDOM.singleton.app = App;
    RecursiveDOM.singleton.render();

    onFreshLoad();
}

/**
 * Activate/deactivate dev mode,
 * which will log addtional information to the console.
 * @param {boolean} value true | false
 */
function DevMode(value) {
    RecursiveDOM.devMode = value;
}

export {
    Render,
    DevMode,
    setStaticStyle,
    setStyle,
    setCache,
    setState,
    getCache,
    getState,
    getRef,
    updateAfter,
    createRouter,
    getParams,
    getRoute,
    goTo,
    renderRoute,
    route,
    setTitle,
    Components,
};
