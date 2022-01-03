import CreateComponent from "./CreateComponent/CreateComponent.js";
import RecursiveDOM from "./RecursiveDOM/RecursiveDOM.js";
import CustomComponents from "./CreateComponent/CustomComponents.js";
import RecursiveCSSOM from "./RecursiveCCSOM/RecursiveCSSOM.js";

CustomComponents();

new RecursiveCSSOM();
const RDOM = new RecursiveDOM();

function Render(App) {
     RDOM.app = App;
     RDOM.render();
}

function DevMode(value) {
     RecursiveDOM.devMode = value;
}

export { CreateComponent, Render, DevMode };
