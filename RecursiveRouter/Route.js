import CreateComponent from "../CreateComponent/CreateComponent.js";
import Router from "./Router.js";

/**
 * ## Route
 * ### Define a directory in your App.
 * @see {@link Router}
 */
export default class Route {
     /**
      * Create a `Route`
      * @param {JSON} param props
      * @param {string} param.name the name of the directory that will be appended to the url:
      * should start with an `\`, and not end with it.
      * Valid example: `\a-sample-route`.
      * @param {CreateComponent | string} param.component the component representing the directory.
      * @param {string} param.title the title of the tab.
      * @param {Array} param.subRoutes an array of routes serving as sub-directories.
      * @param {Function} param.onLoad method to be executed when the route load.
      * @param {Function} param.onExit method to be executed when the route unload.
      */
     constructor({ name, component, title, subRoutes, onLoad, onExit }) {
          if (!/^\/([a-zA-Z0-9]|-|.|_|~){0,}(\/){0}$/gm.test(name.trim())) {
               throw Error(`Invalid route name: ${name}`);
          }
          if (!/^(\S+){0,}$/gm.test(name.trim())) {
               throw Error(`No white spaces are allowed in route name: ${name}`);
          }
          this.name = name.trim();
          this.component = component;
          this.title = title;
          this.subRoutes = subRoutes;
          this.onLoad = onLoad;
          this.onExit = onExit;
     }

     /**
      * Flatten this route and its sub-Routes.
      * @param {Array} output an Array that will host the routes.
      */
     flatten(output) {
          // output?.push(this);

          output[this.name] = this;

          this.subRoutes?.forEach((element) => {
               if (this.name !== "/") {
                    element.name = this.name + element.name;
               }
               element?.flatten(output);
          });
     }
}
