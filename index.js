import CustomComponents from "./CreateComponent/CustomComponents.js";
import * as Components from "./components.js";
import RecursiveDOM from "./RecursiveDOM/RecursiveDOM.js";
import { getRef } from "./RecursiveState/SetReference.js";
import { setState, getState, updateAfter } from "./RecursiveState/SetState.js";
import { setCache, getCache } from "./RecursiveState/SetCache.js";
import {
    createRouter,
    getParams,
    getRoute,
    goTo,
    renderRoute,
    route,
} from "./RecursiveRouter/RecursiveRouter.js";
import { onFreshLoad } from "./RecursiveRouter/RecursiveRouter.js";
import RecursiveCSSOM from "./RecursiveCCSOM/RecursiveCSSOM.js";

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

/**
 * Change the tab title.
 * @param {String} title new title
 */
const setTitle = (title) => {
    if (document.title != title) {
        document.title = title;
    }
};

const setStaticStyle = (cssobject) => {
    RecursiveCSSOM.singleton.injectStaticStyle(cssobject);
};

const setStyle = (cssobject) => {
    RecursiveCSSOM.singleton.addDynamicDeclaration(cssobject);
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
