import { hasProperty, isBlank } from "@riadh-adrani/utility-js";
import { RecursiveApp } from "../app";
import { RError } from "../console";
import {
  ROUTER_ANCHOR_STATE,
  ROUTER_NOT_FOUND_ROUTE,
  ROUTER_PATH_STATE,
  ROUTER_ROUTE_STATE,
} from "../constants";
import { ContextStore } from "../context";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveRawElement } from "../renderer/Element";
import { RecursiveStateManager } from "../state";
import {
  extractParams,
  findRouteOfForm,
  flattenRoute,
  fragmentize,
  resolvePath,
  stripPathAndAnchor,
} from "./Utils";

export interface Route {
  path: string;
  redirectTo?: string;
  title?: string;
  component: () => RecursiveRawElement | unknown;
  onLoad?: () => void;
  onExit?: () => void;
}

export interface RouteModel extends Route {
  routes?: Array<Route>;
}

export type Routes = Record<string, Route>;

export interface RouteTemplate {
  isDynamic: boolean;
  template: Route;
}

export interface ResolvedRoute {
  path: string;
  template: Route;
  redirected: boolean;
}

export type RouterContextValue = Record<string, unknown>;

export interface RouterContext {
  route: Route;
  depth: number;
  fragments: Array<string>;
  anchor: string;
}

export abstract class RecursiveRouter {
  public base = "";
  public scroll = false;
  public routes: Routes = {};
  public context = new ContextStore<RouterContext>();

  public app: RecursiveApp;

  constructor(route: RouteModel, base: string, scroll: boolean, app: RecursiveApp) {
    this.app = app;
    this.base = base;
    this.scroll = scroll;

    this.routes = flattenRoute(route);

    if (!hasProperty(this.routes, ROUTER_NOT_FOUND_ROUTE)) {
      this.routes[ROUTER_NOT_FOUND_ROUTE] = {
        component: () => "404 Not Found",
        path: ROUTER_NOT_FOUND_ROUTE,
        title: ROUTER_NOT_FOUND_ROUTE,
      };
    }

    if (this.routes[ROUTER_NOT_FOUND_ROUTE].redirectTo) {
      throw new RError("The reserved '/404' route cannot have a redirection path.");
    }

    // TODO get current route
    const template = this.routes["/"];

    if (!template) {
      throw new RError("Route template not found.");
    }

    this.stateManager.stores.reserved.set(ROUTER_ANCHOR_STATE, "");
    this.stateManager.stores.reserved.set(ROUTER_PATH_STATE, template.path);
    this.stateManager.stores.reserved.set(ROUTER_ROUTE_STATE, template);
  }

  get stateManager(): RecursiveStateManager {
    return this.app.stateManager;
  }

  get orchestrator(): RecursiveOrchestrator {
    return this.app.orchestrator;
  }

  get path() {
    return this.stateManager.stores.reserved.get<string>(ROUTER_PATH_STATE);
  }

  get route() {
    return this.stateManager.stores.reserved.get<Route>(ROUTER_PATH_STATE);
  }

  get anchor() {
    return this.stateManager.stores.reserved.get<string>(ROUTER_ANCHOR_STATE);
  }

  mount(path: string, form: string, anchor?: string) {
    const [, setPath] = this.path;
    const [route, setRoute] = this.route;
    const [, setAnchor] = this.anchor;

    const template = this.routes[form];

    this.orchestrator.batchCallback(() => {
      route.onExit?.();

      setRoute(template);
      setAnchor(anchor || "");
      setPath(path);

      template.onLoad?.();
    });

    if (!isBlank(anchor as string)) {
      this.useScrollToAnchor(anchor as string);
    } else {
      if (this.scroll) {
        this.useScrollToTop();
      }
    }

    if (!isBlank(template.title as string)) {
      this.useNewTitle(template.title as string);
    }
  }

  navigate(destination: string) {
    if (isBlank(destination)) return;

    const [newPath, newForm, newAnchor] = resolvePath(destination, this.routes);

    const [path] = this.path;

    if (path !== newPath) {
      this.usePush(newPath, newForm, newAnchor);
      this.mount(newPath, newForm, newAnchor);
    }
  }

  replace(path: string) {
    if (isBlank(path)) return;

    const [newPath, newForm, newAnchor] = resolvePath(path, this.routes);

    if (!isBlank(newPath)) {
      this.useReplace(newPath, newForm, newAnchor);
      this.mount(newPath, newForm, newAnchor);
    }
  }

  getParams(): Record<string, unknown> {
    let params: Record<string, unknown> = {};

    const fragments = fragmentize(this.useGetRoute());

    for (let i = 0; i < fragments.length; i++) {
      const path = "/" + fragments.slice(0, i + 1).join("/");

      const template = findRouteOfForm(path, this.routes);

      if (template) {
        params = { ...extractParams(template, path) };
      }
    }

    return params;
  }

  getFragment(): RecursiveRawElement | unknown {
    const context = this.context.get() as RouterContext;

    if (context.depth > context.fragments.length) return "";

    const expected: string = context.fragments
      .slice(0, context.depth)
      .reduce((pre, val) => `${pre}${val}`, "");

    const [form] = stripPathAndAnchor(expected);

    const found = findRouteOfForm(form, this.routes);

    return this.routes[found || "/404"].component();
  }

  renderRoute() {
    const [path] = this.path;

    const fragments = path
      .split("/")
      .slice(1)
      .map((val) => `/${val}`);

    const [route] = this.route;
    const [anchor] = this.anchor;

    let depth = 0;

    const context = this.context.get();

    if (context) {
      depth = context.depth + 1;
    }

    return this.context.contextualize<RecursiveRawElement | unknown>(() => this.getFragment(), {
      route,
      fragments,
      depth,
      anchor,
    });
  }

  isWithinRoute(parentPath: string): boolean {
    if (isBlank(parentPath)) return false;

    const [current] = this.path;

    if (current === parentPath) return true;

    const route_f = fragmentize(parentPath);
    const current_f = fragmentize(current);

    if (route_f.length > current_f.length) return false;

    for (let i = 0; i < route_f.length; i++) {
      const c_route = "/" + route_f.slice(0, i + 1).join("/");
      const c_current = "/" + current_f.slice(0, i + 1).join("/");

      if (findRouteOfForm(c_current, this.routes) !== c_route) {
        return false;
      }
    }

    return true;
  }

  abstract useURL(path: string): string;

  abstract useLocation(): string;

  abstract useReplace(path: string, form: string, hash: string): void;

  abstract usePush(path: string, form: string, hash: string): void;

  abstract useScrollToTop(): void;

  abstract useScrollToAnchor(anchor: string): void;

  abstract useListener(): void;

  abstract useGetRoute(): string;

  abstract useOnLoad(): void;

  abstract useNewTitle(title: string): void;
}
