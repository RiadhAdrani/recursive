import RecursiveDOM from "../RecursiveDOM/RecursiveDOM.js";
import CreateComponent from "../createcomponent/CreateComponent.js";
import Route from "./Route.js";

/**
 * ## Router
 * ### Manage directories in your App.
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
               vDOM.update();
               this.current?.onLoad();
          });
     }

     /**
      * Create a `Route`
      * @see {@link Route}
      */
     static Route = ({
          name,
          component,
          title,
          subRoutes,
          onLoad = () => {},
          onExit = () => {},
     }) => {
          return new Route({ name, title, component, subRoutes, onExit, onLoad });
     };

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
                    vDOM.update();
                    history.pushState({ route: this.current.name }, this.current.title, `${name}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    this.current?.onLoad();
               }
          }
     }
}

export default Router;
