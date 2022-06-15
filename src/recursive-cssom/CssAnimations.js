import { render as renderSelector } from "./CssSelectors.js";

/**
 * Return if the given name is valid as an animation name.
 * @param {String} name
 * @returns {Boolean}
 */
function isValidName(name) {
    if (typeof name !== "string") return false;
    if (["unset", "none", "initial", "inherit"].includes(name)) return false;
    if (name.includes(" ")) return false;
    if (name.substring(0, 2) == "--") return false;

    return true;
}

function render(name, steps) {
    if (!name || !steps) return "";
    if (name.includes(";")) return "";

    let output = `@keyframes ${name}{`;

    for (let step in steps) {
        output += renderSelector(step, steps[step]);
    }

    output += "}";

    return output;
}

export { isValidName, render };
