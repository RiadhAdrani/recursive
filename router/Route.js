export default class Route {
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

     flatten(output) {
          output?.push(this);

          this.subRoutes?.forEach((element) => {
               if (this.name !== "/") {
                    element.name = this.name + element.name;
               }
               element?.flatten(output);
          });
     }
}
