/**
 * Create a new instance from the given object.
 * @param {any} from
 * @returns
 */
function copy(from) {
    let output = undefined;

    if (
        ["bigint", "boolean", "function", "number", "string", "symbol", "undefined"].includes(
            typeof from
        ) ||
        from === null
    ) {
        output = from;
    } else if (Array.isArray(from)) {
        output = [];
        Object.assign(output, from);
    } else if (typeof from == "object") {
        output = {};
        Object.assign(output, from);
    } else {
        output = from;
    }

    return output;
}

export default copy;
