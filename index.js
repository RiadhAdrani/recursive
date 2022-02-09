import { onError } from "./RecursiveDOM/RecursiveError.js";
import CustomComponents from "./CreateComponent/CustomComponents.js";
import * as Router from "./router.js";
import * as Components from "./components.js";
import * as State from "./state.js";
import * as Style from "./style.js";
import RecursiveDOM from "./RecursiveDOM/RecursiveDOM.js";
import { onFreshLoad } from "./RecursiveRouter/RecursiveRouter.js";

onError();
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

export { Render, DevMode, Router, Components, State, Style };
