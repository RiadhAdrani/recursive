import { render as renderSelector } from "./CssSelectors.js";

function render(rule, selectors) {
    if (!rule || !selectors) return "";

    let output = `@media ${rule}{`;
    for (let selector in selectors) {
        output += renderSelector(selector, selectors[selector]);
    }
    output += "}";

    return output;
}

export { render };
