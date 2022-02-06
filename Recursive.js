import CreateComponent from "./CreateComponent/CreateComponent.js";
import CustomComponents from "./CreateComponent/CustomComponents.js";
import RecursiveDOM from "./RecursiveDOM/RecursiveDOM.js";
import { onError } from "./RecursiveDOM/RecursiveError";
import { onFreshLoad } from "./RecursiveRouter/RecursiveRouter";

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

export { CreateComponent, Render, DevMode };
