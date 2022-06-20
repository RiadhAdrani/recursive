import CreateComponent from "./core/create-component/CreateComponent.js";
import CreateSvgComponent from "./core/recursive-svg/CreateSvgComponent.js";
import { render } from "./core/recursive-reconciler/RecursiveReconciler.js";
import {
    setState,
    getState,
    setCache,
    getCache,
    getRef,
    updateOn,
} from "./core/recursive-state/RecursiveState.js";
import {
    createRouter,
    getParams,
    getRoute,
    goTo,
    renderRoute,
    route,
    onFreshLoad,
} from "./core/recursive-router/RecursiveRouter.js";
import { setStaticStyle, setStyle } from "./core/recursive-cssom/RecursiveCSSOM.js";
import "./core/recursive-window/RecursiveWindow.js";
import { devLogs } from "./core/recursive-logger/ConsoleLogger.js";

/**
 * Render your App.
 * @param {() => CreateComponent} App function returning the tree of components
 */
function Render(App) {
    render(App);
    onFreshLoad();
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
    devLogs,
    Render,
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
