/**
 * Render import statements.
 * Wrap every statement in `url()`.
 * @param {Array} list
 * @returns
 */
function render(list) {
    if (!Array.isArray(list)) return "";

    let output = "";

    list.forEach((item) => {
        output += `@import url("${item}");`;
    });

    return output;
}

export { render };
