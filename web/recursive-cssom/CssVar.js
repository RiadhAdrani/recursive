/**
 * Render and return statements of `--var`.
 * @param {Object} list
 * @returns
 */
function render(list) {
    if (!list) return "";

    let output = ":root{";

    for (let v in list) {
        if (list[v].includes(";") || list[v].toString().substring(0, 2) === "--") continue;

        output += `--${v}:${list[v]};`;
    }
    output += "}";

    return output;
}

export { render };
