import { copy, hasProperty, isArray, isBlank, isFunction } from "@riadh-adrani/utility-js";
import { RError } from "../console";
import { ROUTER_ANCHOR_REG_EXP } from "../constants";
import { Route, RouteModel, Routes } from "./RecursiveRouter";

export function flattenRoute(route: RouteModel): Routes {
  let list: Routes = {};

  route = copy(route);

  if (
    !hasProperty(route, "path") ||
    !hasProperty(route, "component") ||
    !isFunction(route.component)
  ) {
    return {};
  }

  const _route: Route = {
    component: route.component,
    path: route.path,
  };

  if (isFunction(route.onExit)) {
    _route.onExit = route.onExit;
  }

  if (isFunction(route.onLoad)) {
    _route.onLoad = route.onLoad;
  }

  if (!isBlank(route.title as string)) {
    _route.title = route.title;
  }

  if (!isBlank(route.redirectTo as string)) {
    _route.redirectTo = route.redirectTo;
  }

  list[_route.path] = _route;

  if (isArray(route.routes)) {
    const slash = route.path === "/" ? "" : "/";

    route.routes?.forEach((child) => {
      if (!hasProperty(child, "path")) {
        throw new RError("Invalid route schema.");
      }

      child.path = `${route.path}${slash}${child.path}`;

      const computed = flattenRoute(child);

      list = { ...list, ...computed };
    });
  }

  return list;
}

export function preparePath(path: string): string {
  if (isBlank(path)) {
    throw new RError("Invalid path");
  }

  let prepared = path.trim();

  if (prepared !== "/") {
    while (prepared[prepared.length - 1] === "/") {
      prepared = prepared.slice(0, prepared.length - 1);
    }
  }

  if (prepared[0] !== "/") {
    throw new RError("Failed to prepare path, resulting path should start with '/'.");
  }

  return decodeURI(prepared);
}

export function fragmentize(path: string): Array<string> {
  return path.substring(1).split("/");
}

export function isDynamicFragment(pathFragment: string): boolean {
  const dynamicRegEx = /^:[^:]{1,}/;

  return dynamicRegEx.test(pathFragment);
}

export function isDynamicPath(path: string) {
  const fragments = fragmentize(path);

  for (const fragment of fragments) {
    if (isDynamicFragment(fragment)) return true;
  }

  return false;
}

export function areMatch(templatePath: string, path: string): boolean {
  if (!isDynamicPath(templatePath)) {
    return templatePath === path;
  }

  const fragments = fragmentize(path);
  const templateFragments = fragmentize(templatePath);

  if (fragments.length !== templateFragments.length) return false;

  for (let i = 0; i < fragments.length; i++) {
    const _fragment = fragments[i];
    const _template = templateFragments[i];

    if (!isDynamicFragment(_template) && _fragment !== _template) {
      return false;
    }
  }

  return true;
}

export function extractParams(templatePath: string, path: string): Record<string, unknown> {
  const _template = fragmentize(templatePath);
  const _path = fragmentize(path);

  const params: Record<string, unknown> = {};

  const length = Math.min(_template.length, _path.length);

  for (let i = 0; i < length; i++) {
    if (isDynamicFragment(_template[i])) {
      params[_template[i].substring(1)] = decodeURI(_path[i]);
    }
  }

  return params;
}

export function findExactRoute(path: string, routes: Routes): string | boolean {
  const res = Object.keys(routes).find((_path) => _path === path);

  return res ? res : false;
}

export function stripPathAndAnchor(destination: string) {
  if (isBlank(destination)) return ["", ""];

  const regEx = ROUTER_ANCHOR_REG_EXP;

  const result = regEx.exec(destination);

  let path = "";
  let anchor = "";

  if (result) {
    path = destination.substring(0, result.index);
    anchor = destination.substring(result.index);
  } else {
    path = destination;
  }

  return [path, anchor];
}

export function findRouteOfForm(path: string, listOfRoutes: Routes) {
  if (typeof path != "string") return false;

  const exact = findExactRoute(path, listOfRoutes);

  if (typeof exact != "boolean") return exact;

  for (const template in listOfRoutes) {
    if (areMatch(template, path)) {
      return template;
    }
  }

  return false;
}

export function resolvePath(destination: string, routes: Routes) {
  const prepared = preparePath(destination);
  const [path, anchor] = stripPathAndAnchor(prepared);
  const maybeWanted = findRouteOfForm(path, routes);

  if (!maybeWanted) {
    return [prepared, "/404", ""];
  }

  if (routes[maybeWanted].redirectTo) {
    const redirection = routes[maybeWanted].redirectTo as string;

    const _prepared = preparePath(redirection);
    const [_path, _anchor] = stripPathAndAnchor(_prepared);
    const _maybeWanted = findRouteOfForm(_path, routes);

    if (!_maybeWanted) {
      return [_prepared, "/404", ""];
    } else {
      return [_prepared, _maybeWanted, _anchor];
    }
  }

  return [prepared, maybeWanted, anchor];
}
