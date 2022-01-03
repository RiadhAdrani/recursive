import CreateComponent from "../CreateComponent/CreateComponent.js";
import Route from "./Route.js";
import { updateAfter } from "../Recursive-State.js";

/**
 * ## Router
 * ### Manage directories in your App.
 * @see {@link RecursiveDOM}
 * @see {@link Route}
 */
class Router {
     static router = null;

     static goTo(route) {
          Router.router.goTo(route);
     }

     static createRouter(route) {
          Router.router = new Router(route);
     }

     static render() {
          return Router.router.current.component();
     }

     /**
      * Create a Router to manage App directories.
      * @param {Route} routes Define the main route for the App.
      */
     constructor(routes) {
          this.routes = {};

          routes.flatten(this.routes);

          this.current = (() => {
               for (let r in this.routes) {
                    return this.routes[r];
               }
          })();

          this.stack = [];

          window.addEventListener("popstate", (e) => {
               let newRoute = {};

               if (e.state) {
                    newRoute = (() => {
                         for (let r in this.routes) {
                              if (this.routes[r].name === e.state.route) {
                                   return this.routes[r];
                              }
                         }
                         throw new Error(`Invalid Route name : ${e.state}`);
                    })();
               } else {
                    newRoute = (() => {
                         for (let r in this.routes) {
                              return this.routes[r];
                         }
                    })();
               }

               this.current?.onExit();
               window.scrollTo({ top: 0, behavior: "smooth" });
               this.current = newRoute;
               updateAfter(() => {});
               if (this.current.title) {
                    document.title = this.current.title;
               }
               this.current?.onLoad();
          });
     }

     /**
      * Add a temporary route.
      * @not_implemented
      */
     addRoute() {
          throw "Feature is not yet implemented";
     }

     /**
      * Render the current route.
      * @returns {CreateComponent} the representing component element.
      */
     render() {
          return this.current.component();
     }

     /**
      * Redirect the App to the route with the given name.
      * @param {string} name Route exact name.
      */
     goTo(name) {
          if (this.routes[name]) {
               if (this.routes[name].name !== this.current.name) {
                    this.current?.onExit();
                    this.current = this.routes[name];
                    if (this.current.title) {
                         document.title = this.current.title;
                    }
                    updateAfter(() => {});
                    history.pushState({ route: this.current.name }, this.current.title, `${name}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    this.current?.onLoad();
               }
          }
     }
}

export default Router;
