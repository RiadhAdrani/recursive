import Route from "./RecursiveRouter/Route.js";
import { CreateComponent } from "./Recursive.js";
import {
     getParams,
     goTo,
     getRoute,
     renderRoute,
     createRouter,
} from "./RecursiveRouter/RecursiveRouter";

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
const createRoute = ({ name, component, title, subRoutes, onLoad, onExit, redirectTo }) => {
     return new Route({ name, component, title, subRoutes, onLoad, onExit, redirectTo });
};

/**
 * Change the tab title.
 * @param {String} title new title
 */
const setTitle = (title) => {
     document.title = title;
};

export { goTo, createRouter, renderRoute, createRoute, getParams, setTitle, getRoute };
