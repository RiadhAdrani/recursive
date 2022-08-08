const { RecursiveConsole } = require("../../console");

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

    if (prepared === "") {
        RecursiveConsole.error("Recursive Router : path is empty.", []);
    }

    if (prepared[0] !== "/") {
        RecursiveConsole.error("Recursive Router : path should start with '/'.", []);
    }

    return decodeURI(prepared);
}

module.exports = preparePath;
