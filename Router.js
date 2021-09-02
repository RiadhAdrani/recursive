class Router {
     constructor(routes) {
          this.routes = [];
          this.current = null;
          if (Array.isArray(routes)) {
               routes.forEach((r) => {
                    if (!r.name) throw `Invalid name`;
                    if (!r.component) throw `Invalid component`;
               });
               this.routes = routes;
          }
          this.current = routes[0];
          this.stack = [routes[0]];

          window.addEventListener("popstate", (e) => {
               if (this.stack.length === 1) {
                    this.current = routes[0];
                    vDOM.update();
                    return;
               }
               const x = this.stack.pop();
               routes.forEach((r) => {
                    if (x.name === r.name) {
                         this.current = r;
                         vDOM.update();
                         return;
                    }
               });
          });
     }

     static Route = ({ name, component, title }) => {
          return {
               name,
               title,
               component,
          };
     };

     render() {
          return this.current.component();
     }

     goTo(name) {
          this.routes.forEach((r) => {
               if (name === r.name && name !== this.current.name) {
                    history.pushState({}, this.current.title, `${name}`);
                    this.stack.push(this.current);
                    this.current = r;
                    vDOM.update();
                    return;
               }
          });
     }
}

export default Router;
