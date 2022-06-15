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
        output += `url("${item}");`;
    });

    return output;
}

export { render };
