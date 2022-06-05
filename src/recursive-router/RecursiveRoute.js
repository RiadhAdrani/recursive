import { throwError } from "../recursive-dom/RecursiveError.js";
import CreateComponent from "../create-component/CreateComponent.js";

/**
 * ## Route
 * ### Define a directory in your App.
 */
export default class Route {
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
    constructor({ name, component, title, subRoutes, onLoad, onExit, redirectTo }) {
        if (!/^\/([a-zA-Z0-9]|-|.|_|~){0,}(\/){0}$/gm.test(name.trim())) {
            throwError(`Invalid route name "${name}"`, [
                'Route name should start with "/".',
                'Route name should not end with "/".',
                'Route can only accepts these special characters: "-" "." "_" "~".',
                'Dynamic routes parameters start with ":" and end with ";". Example : /example@user=:user;',
            ]);
        }
        if (!/^(\S+){0,}$/gm.test(name.trim())) {
            throwError(`No white spaces are allowed in route names : "${name}"`, [
                "Remove white spaces from the route name.",
                "If the route is dynamic, make sure to remove white spaces before injecting your parameters.",
            ]);
        }

        this.redirectTo = redirectTo;
        this.name = name.trim();
        this.component = component;
        this.title = title;
        this.subRoutes = subRoutes;
        this.onLoad = () => {
            if (typeof onLoad === "function") onLoad();
        };
        this.onExit = () => {
            if (typeof onExit === "function") onExit();
        };
    }

    /**
     * Flatten this route and its sub-Routes.
     * @param {Array} output an Array that will host the routes.
     */
    flatten(output) {
        output[this.name] = this;

        this.subRoutes?.forEach((element) => {
            if (this.name !== "/") {
                element.name = this.name + element.name;
            }
            element?.flatten(output);
        });
    }
}
