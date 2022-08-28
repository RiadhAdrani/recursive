/**
 * Create a new instance from the given object.
 * @param {any} source Source object.
 * @returns {any} New instance.
 */
function copy(source) {
    let output = undefined;

    if (
        ["bigint", "boolean", "function", "number", "string", "symbol", "undefined"].includes(
            typeof source
        ) ||
        source === null
    ) {
        output = source;
    } else if (Array.isArray(source)) {
        output = [];
        Object.assign(output, source);
    } else if (typeof source == "object") {
        output = {};
        Object.assign(output, source);
    } else {
        output = source;
    }

    return output;
}

module.exports = copy;
