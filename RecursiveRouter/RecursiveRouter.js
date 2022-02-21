import CreateComponent from "../CreateComponent/CreateComponent.js";
import Route from "./Route.js";
import SetState from "../RecursiveState/SetState";
import StateRegistry from "../RecursiveState/StateRegistry";
import { encapsulateRoute, renderFragment, setParams } from "./RecursiveRouterContext";
import { pushState, replaceState } from "./RecursiveHistory";

/**
 * ### Router
 * #### Manage directories in your App.
 * @see {@link Route}
 */
class RecursiveRouter {
     /**
      * The only instance that should exist if the user decide to use the Router.
      */
     static singleton = undefined;

     /**
      * Create a Router to manage App directories.
      * @param {Route} routes Define the main route for the App.
      */
     constructor(routes, prefix = "", scroll) {
          if (RecursiveRouter.singleton instanceof RecursiveRouter) {
               throwError("RecursiveRouter cannot have more than one instance", [
                    "RecursiveRouter is an internal class and should not be used in development.",
                    "User createRouter to make a new router.",
               ]);
          }

          this.root = prefix;
          this.scroll = scroll;
          this.routes = {};
          routes.flatten(this.routes);

          if (this.routes["/404"]) {
          } else {
               this.routes["/404"] = new Route({
                    name: "/404",
                    title: "Not Found",
                    component: () => "404 NOT FOUND",
               });
          }

          const [] = SetState.setReservedState(
               "route",
               (() => {
                    for (let r in this.routes) {
                         return this.routes[r].name;
                    }
               })()
          );

          window.addEventListener("popstate", (e) => {
               let _route;

               if (e.state) {
                    _route = e.state.route;
               } else {
                    _route = (() => {
                         for (let r in this.routes) {
                              return this.routes[r].name;
                         }
                    })();
               }

               this.loadRoute(this.routes[_route]);
          });
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
      * Resolve the given route.
      * @param {String} route - name of the route to resolve
      * @returns {JSON} object containing a `path` and the `route`.
      */
     resolveRoute(route) {
          const dynamicTemplate = this.isDynamicRoute(route);

          if (dynamicTemplate.isDynamic) {
               // route is dynamic
               return { path: route, route: dynamicTemplate.template };
          } else {
               // route is not dynamic
               if (this.routes[route]) {
                    if (this.routes[route].redirectTo) {
                         // route should re direct
                         const _redirectRoute = this.routes[route].redirectTo;

                         const _redirect = this.isDynamicRoute(_redirectRoute);

                         if (_redirect.isDynamic) {
                              // redirect route is dynamic render it
                              return {
                                   path: _redirectRoute,
                                   route: _redirect.template,
                              };
                         } else {
                              // redirect route is not dynamic
                              if (this.routes[_redirectRoute]) {
                                   // route found
                                   return {
                                        path: _redirectRoute,
                                        route: this.routes[_redirectRoute],
                                   };
                              } else {
                                   // route not found, render 404
                                   return {
                                        path: _redirectRoute,
                                        route: this.routes["/404"],
                                   };
                              }
                         }
                    } else {
                         // route should render as is
                         return { path: route, route: this.routes[route] };
                    }
               } else {
                    // route not found, render 404
                    return { path: route, route: this.routes["/404"] };
               }
          }
     }

     /**
      * try to match the given route.
      * @param {string} route to be matched with.
      * @returns {Boolean|Route} return a route if it match, else a boolean.
      */
     findMatch(route) {
          const res = this.isDynamicRoute(route);
          if (res.isDynamic) return res;
          for (let r in this.routes) {
               if (route === r) return this.routes[r];
          }

          return false;
     }

     /**
      * Load the app route specified with `name` and `template`
      * @param {String} anchor the name of target element
      * @param {Route} template the template of the route
      */
     loadRoute(template, anchor) {
          const [current, setCurrent] = StateRegistry.getReservedState("route");

          this.routes[current]?.onExit();

          let _template = template;

          setCurrent(_template.name);

          if (anchor) {
               const target = document.getElementById(anchor.replace("#", ""));
               if (target) {
                    console.log("scrolling into view");
                    target.scrollIntoView();
               }
          } else {
               if (this.scroll) window.scrollTo({ top: 0, behavior: "smooth" });
          }

          _template?.onLoad();
     }

     checkRoute(name) {
          if (name !== "/") {
               name = name.replace(/\/$/, "");
          }

          const anchorRegEx = /#[a-zA-Z0-9-._~:?#\[\]\@!$&'()*+,;=]{1,}$/gm;

          let anchor = "";

          const res = anchorRegEx.exec(name);

          if (res) anchor = res[0];

          if (anchor) name = name.replace(anchor, "");

          const [current] = StateRegistry.getReservedState("route");

          if (current === name) {
               if (anchor) {
                    const target = document.getElementById(anchor.replace("#", ""));
                    if (target) target.scrollIntoView();
               }

               return [false, ""];
          }

          return [this.resolveRoute(name), anchor];
     }

     /**
      * Redirect the App to the route with the given name.
      * @param {string} name Route exact name.
      */
     goTo(name) {
          if (!name) return;

          const [_route, anchor] = this.checkRoute(name);

          if (_route) {
               pushState(_route.route.name, _route.route.title, `${_route.path}${anchor}`);

               this.loadRoute(_route.route, anchor);
          }
     }

     /**
      * replace the current route with this one without adding a history state.
      * @param {String} name route to be redirected to.
      */
     replaceWith(name, hash) {
          if (!name) return;

          const [_route, anchor] = this.checkRoute(name);

          if (_route) {
               replaceState(_route.route.name, _route.route.title, `${_route.path}${hash}`);

               this.loadRoute(_route.route, hash);
          }
     }

     /**
      * Get the params of the current route if they exist.
      * @returns {JSON} object containing `key:value`.
      */
     static getParams() {
          if (!RecursiveRouter.singleton || !history.state) return {};

          const regExp = /:[^:;]*;/gm;

          const [currentName] = StateRegistry.getReservedState("route");

          const current = this.singleton.routes[currentName];

          const keys = current.name.match(regExp) || [];
          const data = location.pathname.match(regExp) || [];

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

/**
 * return the current route name.
 * @returns {String} route name.
 */
const getRoute = () => StateRegistry.getReservedState("route")[0];

/**
 * return the current route parameters if found.
 * @returns {JSON} parameters
 */
const getParams = () => RecursiveRouter.getParams();

/**
 * return the base root of the App.
 * @returns {String} base root provided by the user.
 */
const getRoot = () => RecursiveRouter.singleton.root;

/**
 * Redirect the App to the route with the given name.
 * @param {string} name Route exact name.
 */
const goTo = (route) => RecursiveRouter.singleton.goTo(route);

/**
 * Create the App's Router.
 * @param {Route} route root directory : `/`
 * @param {String} prefix define the prefix that should be added before any route name.
 * @param {Boolean} scroll activate or deactivate the scrolling behavior whenever a new route is loaded.
 */
const createRouter = (route, prefix, scroll) => {
     RecursiveRouter.singleton = new RecursiveRouter(route, prefix, scroll);
};

/**
 * try to match the given route.
 * @param {string} route to be matched with.
 * @returns {Boolean|Route} return a route if it match, else a boolean.
 */
const findMatch = (route) => RecursiveRouter.singleton.findMatch(route);

/**
 * render the appropriate component representing the current route.
 * @returns {CreateComponent} component representing the current route fragment.
 */
const renderRoute = () => {
     const [route] = StateRegistry.getReservedState("route");
     setParams();
     if (RecursiveRouter.singleton.routes[route].title) {
          document.title = RecursiveRouter.singleton.routes[route].title;
     }
     return encapsulateRoute({ route }, () => renderFragment());
};

/**
 * check if the location is different from the root `/` and try to route the app to the given location.
 */
const onFreshLoad = () => {
     if (window.location.pathname !== "/") {
          if (RecursiveRouter.singleton) {
               const route = window.location.pathname.substring(
                    RecursiveRouter.singleton.root.length + 1
               );
               const hash = location.hash;
               RecursiveRouter.singleton.replaceWith(route, hash);
          }
     }
};

export { getRoute, getParams, getRoot, goTo, createRouter, findMatch, renderRoute, onFreshLoad };
