import Route from "./Route.js";

class Router {
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
               routes.forEach((r) => {
                    if (x.name === r.name) {
                         x?.onExit();
                         this.current = r;
                         vDOM.update();
                         this.current?.onLoad();
                         return;
                    }
               });
          });
     }

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

     // TODO
     addRoute() {
          throw "Feature is not yet implemented";
     }

     render() {
          return this.current.component();
     }

     goTo(name) {
          this.routes.forEach((r) => {
               if (name === r.name && name !== this.current.name) {
                    history.pushState({}, this.current.title, `${name}`);
                    this.stack.push(this.current);
                    this.current?.onExit();
                    this.current = r;
                    if (r.title) {
                         const titleTag = document.getElementsByTagName("title");
                         if (titleTag[0]) {
                              titleTag[0].innerHTML = r.title;
                         }
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
