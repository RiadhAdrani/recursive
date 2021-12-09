import RecursiveDOM from "../RecursiveDOM.js";
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
          this.routes = [];

          routes.flatten(this.routes);

          this.current = this.routes[0];
          this.stack = [routes[0]];

          window.addEventListener("popstate", (e) => {
               if (this.stack.length === 1) {
                    // scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });

                    this.current = routes[0];
                    vDOM.update();
                    return;
               }
               const x = this.stack.pop();

               this.routes.forEach((r) => {
                    if (x.name === r.name) {
                         // scroll to top
                         window.scrollTo({ top: 0, behavior: "smooth" });

                         x?.onExit();
                         this.current = r;
                         vDOM.update();
                         this.current?.onLoad();
                         return;
                    }
               });
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
      * @not_implemented_yet
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
          this.routes.forEach((r) => {
               if (name === r.name && name !== this.current.name) {
                    history.pushState({}, this.current.title, `${name}`);
                    this.stack.push(this.current);
                    this.current?.onExit();
                    this.current = r;
                    if (this.current.title) {
                         document.title = this.current.title;
                    }
                    vDOM.update();

                    // scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    this.current?.onLoad();
                    return;
               }
          });
     }
}

export default Router;
