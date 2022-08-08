const findRouteOfForm = require("./findRouteOfForm");
const preparePath = require("./preparePath");
const stripPathAndAnchor = require("./stripPathAndAnchor");

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
        const _maybeWanted = findRouteOfForm(_path);

        if (!_maybeWanted) {
            return [_prepared, "/404", ""];
        } else {
            return [_prepared, _maybeWanted, _anchor];
        }
    }

    return [prepared, maybeWanted, anchor];
}

module.exports = resolvePath;
