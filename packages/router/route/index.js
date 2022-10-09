const { copy } = require("@riadh-adrani/utility-js");

/**
 * @param {import("../../../lib").Route} params
 */
function createRoute(params) {
    return { ...copy(params) };
}

module.exports = { route: createRoute };
