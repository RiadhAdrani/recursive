import CreateComponent from "./CreateComponent/CreateComponent.js";
import RecursiveDOM from "./RecursiveDOM/RecursiveDOM.js";
import CustomComponents from "./CreateComponent/CustomComponents.js";
import RecursiveCSSOM from "./RecursiveCCSOM/RecursiveCSSOM.js";

CustomComponents();

new RecursiveCSSOM();
const RDOM = new RecursiveDOM();

/**
 * Render your App.
 * @param {Function} App function returning the tree of components
 */
function Render(App) {
     RDOM.app = App;
     RDOM.render();
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
