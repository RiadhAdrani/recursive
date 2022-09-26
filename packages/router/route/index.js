/**
 * @param {import("../../../lib").Route} params
 */
function createRoute(params) {
    return { ...params };
}

module.exports = { route: createRoute };
