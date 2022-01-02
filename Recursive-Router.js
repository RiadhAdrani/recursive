import Router from "./RecursiveRouter/Router.js";
import Route from "./RecursiveRouter/Route.js";

const goTo = (route) => {
     Router.goTo(route);
};
const createRouter = (route) => {
     Router.createRouter(route);
};
const renderRouter = () => {
     return Router.render();
};
const createRoute = ({ name, component, title, subRoutes, onLoad, onExit }) => {
     return new Route({ name, component, title, subRoutes, onLoad, onExit });
};

export { goTo, createRouter, renderRouter, createRoute };
