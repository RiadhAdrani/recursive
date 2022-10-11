const { copy } = require("@riadh-adrani/utility-js");
const { RecursiveConsole } = require("../../console");
const { ROUTER_DYNAMIC_REG_EXP, ROUTER_ANCHOR_REG_EXP } = require("../../constants");

/**
 * Resolve the provided route and return a flat object.
 * @param {import("../../../lib").Route} route
 * @returns {import("../../../lib").FlatRoutes}
 */
function flattenRoute(route) {
    let list = {};

    if (
        typeof route !== "object" ||
        typeof route.path !== "string" ||
        typeof route.component !== "function"
    )
        return {};

    route = copy(route);

    /**
     * we should accept a route only if :
     * - it is a non null javascript
     * - contains a path
     * - contains a component
     */

    const onLoad = typeof route.onLoad == "function" ? route.onLoad : () => {};
    const onExit = typeof route.onExit == "function" ? route.onExit : () => {};
    const title = typeof route.title == "string" ? route.title : null;
    const redirectTo = typeof route.redirectTo == "string" ? route.redirectTo : null;

    if (typeof route.component != "function") {
        RecursiveConsole.error("Recursive Router : router's component should be of type function.");
    }

    if (typeof route.path != "string") {
        RecursiveConsole.error("Recursive Router : router's path should be of type string.");
    }

    list[route.path] = {
        path: route.path,
        component: route.component,
        redirectTo,
        title,
        onLoad,
        onExit,
    };

    if (Array.isArray(route.routes)) {
        const parent = route.path;

        /**
         * we do not add a slash if the parent route is the root ("/") path.
         */
        const slash = route.path == "/" ? "" : "/";

        route.routes.forEach((_route) => {
            if (_route && _route.path) {
                const current = _route.path;

                /**
                 * we construct the route path
                 */
                _route.path = parent + slash + current;

                /**
                 * we recursively flatten the child routes
                 * and add them to the global list.
                 */
                const _list = flattenRoute(_route);

                list = { ...list, ..._list };
            }
        });
    }

    return list;
}

/**
 * Resolve and return the input path.
 * @param {String} destination
 * @param {import("../../../lib").FlatRoutes} routes
 */
function resolvePath(destination, routes) {
    const prepared = preparePath(destination);
    const [path, anchor] = stripPathAndAnchor(prepared);
    const maybeWanted = findRouteOfForm(path, routes);

    if (!maybeWanted) {
        return [prepared, "/404", ""];
    }

    if (routes[maybeWanted].redirectTo) {
        const redirection = routes[maybeWanted].redirectTo;

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

/**
 * Divide a destination into path and anchor.
 * @param {String} destination
 * @return {[String,String]} result
 */
function stripPathAndAnchor(destination) {
    /**
     * We only accept `string` as the only type of input.
     */
    if (typeof destination !== "string") return ["", ""];

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

/**
 * Find and return the route with the suitable path.
 * @param {String} path the path/template form of the route.
 * @param {import("../../../lib").FlatRoutes} listOfRoutes an object containing path to be checked.
 * @return {String | Boolean} the key of the route or false in case not found.
 */
function findRouteOfForm(path, listOfRoutes) {
    if (typeof path != "string") return false;

    for (let template in listOfRoutes) {
        if (areMatch(template, path)) {
            return template;
        }
    }

    return false;
}

/**
 * Check if the provided route is dynamic : contains parameters.
 * @param {string} inputPath
 * @param {import("../../../lib").FlatRoutes} routes
 * @deprecated
 * @returns {import("../../../lib").RouteTemplate | {isDynamic: boolean}}
 */
function isDynamicRoute(inputPath, routes) {
    for (let route in routes) {
        if (areMatch(route, inputPath)) return { isDynamic: true, template: routes[route] };
    }

    /**
     * Our route is not dynamic
     */
    return { isDynamic: false };
}

/**
 * Prepare the path for use.
 * @param {String} destination target path
 * @throw an error when the type of input is not a string, or the input is empty or does not start with `/`.
 * @return {String} prepared path.
 */
function preparePath(destination) {
    if (typeof destination != "string")
        RecursiveConsole.error("Recursive Router : path can be only of type string.", []);

    let prepared = destination.trim();

    if (prepared !== "/") {
        while (prepared[prepared.length - 1] === "/") {
            prepared = prepared.slice(0, prepared.length - 1);
        }
    }

    if (prepared === "") {
        RecursiveConsole.error("Recursive Router : path is empty.", []);
    }

    if (prepared[0] !== "/") {
        RecursiveConsole.error("Recursive Router : path should start with '/'.", []);
    }

    return decodeURI(prepared);
}

function isDynamicFragment(pathFragment) {
    const dynamicRegEx = /^:[^:]{1,}/;

    return dynamicRegEx.test(pathFragment);
}

/**
 *
 * @param {string} path
 */
function fragmentize(path) {
    return path.substring(1).split("/");
}

function isDynamicPath(path) {
    const fragments = fragmentize(path);

    for (let fragment of fragments) {
        if (isDynamicFragment(fragment)) return true;
    }

    return false;
}

function areMatch(templatePath, path) {
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

function extractParams(templatePath, path) {
    const _template = fragmentize(templatePath);
    const _path = fragmentize(path);

    const params = {};

    const length = Math.min(_template.length, _path.length);

    for (let i = 0; i < length; i++) {
        if (isDynamicFragment(_template[i])) {
            params[_template[i].substring(1)] = decodeURI(_path[i]);
        }
    }

    return params;
}

module.exports = {
    flattenRoute,
    resolvePath,
    stripPathAndAnchor,
    findRouteOfForm,
    isDynamicRoute,
    preparePath,
    isDynamicFragment,
    isDynamicPath,
    fragmentize,
    areMatch,
    extractParams,
};
