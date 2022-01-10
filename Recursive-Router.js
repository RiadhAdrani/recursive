import Router from "./RecursiveRouter/Router.js";
import Route from "./RecursiveRouter/Route.js";
import { CreateComponent } from "./Recursive.js";

/**
 * Load a new name-specified route.
 * @param {string} name the name of the target route.
 */
const goTo = (name) => {
     Router.goTo(name);
};

/**
 * Create a global router.
 * @param {Route} route root entry route. usually named `\`.
 */
const createRouter = (route) => {
     Router.createRouter(route);
};

/**
 * Return the current route representation as a `component`.
 * @returns {CreateComponent} component
 */
const renderRouter = () => {
     return Router.render();
};

/**
 * Create a `Route`
 * @param {JSON} param props
 * @param {string} param.name the name of the directory that will be appended to the url:
 * * Should start with an `\`, and not end with it => example: `\my-route`.
 * * Parameters could be templated by putting the parameter name between `:` and `;` => example : `\user@id=:id;`
 * @param {CreateComponent | string} param.component the component representing the directory.
 * @param {string} param.title the title of the tab.
 * @param {Array} param.subRoutes an array of routes serving as sub-directories.
 * @param {Function} param.onLoad method to be executed when the route load.
 * @param {Function} param.onExit method to be executed when the route unload.
 */
const createRoute = ({ name, component, title, subRoutes, onLoad, onExit }) => {
     return new Route({ name, component, title, subRoutes, onLoad, onExit });
};

/**
 * Get the params of the current route if they exist.
 * @returns {JSON} object containing `key:value`.
 */
const getParams = () => {
     return Router.getParams();
};

/**
 * Change the tab title.
 * @param {String} title new title
 */
const setTitle = (title) => {
     document.title = title;
};

export { goTo, createRouter, renderRouter, createRoute, getParams, setTitle };
