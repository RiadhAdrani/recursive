import CreateComponent from "./src/create-component/CreateComponent.js";
import { render } from "./src/recursive-reconciler/RecursiveReconciler.js";
import {
    setState,
    getState,
    setCache,
    getCache,
    getRef,
    updateOn,
} from "./src/recursive-state/RecursiveState.js";
import {
    createRouter,
    getParams,
    getRoute,
    goTo,
    renderRoute,
    route,
    onFreshLoad,
} from "./src/recursive-router/RecursiveRouter.js";
import { setStaticStyle, setStyle } from "./src/recursive-cssom/RecursiveCSSOM.js";
import "./src/recursive-window/RecursiveWindow.js";
import CreateSvgComponent from "./src/recursive-svg/CreateSvgComponent.js";

/**
 * Render your App.
 * @param {Function} App function returning the tree of components
 */
function Render(App) {
    render(App);

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

/**
 * Change the tab title.
 * @param {String} title new title
 */
const setTitle = (title) => {
    if (document.title != title) {
        document.title = title;
    }
};

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
    updateOn,
    createRouter,
    getParams,
    getRoute,
    goTo,
    renderRoute,
    route,
    setTitle,
    CreateComponent,
    CreateSvgComponent,
};
