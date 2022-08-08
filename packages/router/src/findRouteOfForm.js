const { ROUTER_DYNAMIC_REG_EXP } = require("../../constants");

/**
 * Find and return the route with the suitable path.
 * @param {String} form the path/template form of the route.
 * @param {import("../../../lib").FlatRoutes} listOfRoutes an object containing path to be checked.
 * @return {String | Boolean} the key of the route or false in case not found.
 */
function findRouteOfForm(form, listOfRoutes) {
    if (typeof form != "string") return false;

    const regEx = ROUTER_DYNAMIC_REG_EXP;

    const tester = ":recursive;";

    for (let path in listOfRoutes) {
        if (path.replace(regEx, tester) === form.replace(regEx, tester)) {
            return path;
        }
    }

    return false;
}

module.exports = findRouteOfForm;
