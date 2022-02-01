import CreateComponent from "../CreateComponent/CreateComponent.js";
import Route from "./Route.js";
import { getState } from "../Recursive-State.js";
import SetState from "../RecursiveState/SetState";

/**
 * ### Router
 * #### Manage directories in your App.
 * @see {@link RecursiveDOM}
 * @see {@link Route}
 */
class Router {
     /**
      * Create a Router to manage App directories.
      * @param {Route} routes Define the main route for the App.
      */
     constructor(routes) {
          this.routes = {};

          routes.flatten(this.routes);

          const [] = SetState.setReservedState(
               "route",
               (() => {
                    for (let r in this.routes) {
                         return this.routes[r];
                    }
               })()
          );

          window.addEventListener("popstate", (e) => {
               if (e.state) {
                    const data = this.isDynamicRoute(e.state.route);

                    if (data.isDynamic) {
                         this.loadRoute(data.template);
                    } else {
                         this.loadRoute(this.routes[e.state.route]);
                    }
               } else {
                    const root = (() => {
                         for (let r in this.routes) {
                              return r;
                         }
                    })();

                    this.loadRoute(this.routes[root]);
               }
          });
     }

     static router = null;

     /**
      * Load a new name-specified route.
      * @param {string} route the name of the target route.
      */
     static goTo(route) {
          Router.router.goTo(route);
     }

     /**
      * Create a global router.
      * @param {Route} route root entry route. usually named `\`.
      */
     static createRouter(route) {
          Router.router = new Router(route);
     }

     /**
      * Return the current route representation as a `component`.
      * @returns {CreateComponent} component
      */
     static render() {
          return getState("route")[0].component();
     }

     /**
      * Render the current route.
      * @returns {CreateComponent} the representing component element.
      */
     render() {
          return getState("route")[0].component();
     }

     /**
      * Check if a given route is dynamic or not.
      * @param {String} route route name.
      * @returns {JSON} the type of the route, alongside its template if it is `dynamic`.
      */
     isDynamicRoute(route) {
          const regExp = /:[^:;]*;/;

          for (let name in this.routes) {
               const template = name.toString();
               const tester = "recursive";

               const rm = route.match(regExp);
               const tm = name.match(regExp);

               if (!tm || !rm) continue;

               try {
                    if (rm.length === tm.length && tm.length > 0) {
                         if (route.replace(regExp, tester) === template.replace(regExp, tester)) {
                              return { isDynamic: true, template: this.routes[name] };
                         }
                    }
               } catch (e) {
                    console.log(`current route => ${template} vs ${route}`, this.routes, e);
               }
          }

          return { isDynamic: false };
     }

     /**
      * Load the app route specified with `name` and `template`
      * @param {String} name the name of target route
      * @param {Route} template the template of the route
      */
     loadRoute(template) {
          const [current, setCurrent] = getState("route");

          current?.onExit();
          setCurrent(template);
          if (template.title) document.title = template.title;
          window.scrollTo({ top: 0, behavior: "smooth" });
          template?.onLoad();
     }

     /**
      * Redirect the App to the route with the given name.
      * @param {string} name Route exact name.
      */
     goTo(name) {
          if (!name) return;

          if (history.state) {
               if (history.state.route === name) return;
          }

          const data = this.isDynamicRoute(name);

          const [current] = getState("route");

          if (data.isDynamic) {
               history.pushState({ route: name }, current.title, `${name}`);
               this.loadRoute(data.template);
          } else if (this.routes[name]) {
               if (this.routes[name].name !== current.name) {
                    history.pushState({ route: name }, current.title, `${name}`);
                    this.loadRoute(this.routes[name]);
               }
          }
     }

     /**
      * Get the params of the current route if they exist.
      * @returns {JSON} object containing `key:value`.
      */
     static getParams() {
          if (!Router.router || !history.state) return {};

          const regExp = /:[^:;]*;/gm;

          const [current] = getState("route");

          const keys = current.name.match(regExp) || [];
          const data = history.state.route.match(regExp) || [];

          if (keys.length === data.length && keys.length > 0) {
               const comb = {};

               for (let i = 0; i < keys.length; i++) {
                    comb[keys[i].replace(":", "").replace(";", "")] = data[i]
                         .replace(":", "")
                         .replace(";", "");
               }

               return comb;
          }

          return {};
     }
}

export default Router;
