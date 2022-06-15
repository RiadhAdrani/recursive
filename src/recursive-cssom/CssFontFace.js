const list = {
    ascentOverride: "ascent-override",
    descentOverride: "descent-override",
    fontDisplay: "font-display",
    fontFamily: "font-family",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontWeight: "font-weight",
    fontVariant: "font-variant",
    fontFeatureSettings: "font-feature-settings",
    fontVariationSettings: "font-variation-settings",
    lineGapOverride: "line-gap-override",
    src: "src",
    unicodeRange: "unicode-range",
    sizeAdjust: "size-adjust",
};

function is(key) {
    return list[key] !== undefined;
}

function get(key) {
    return list[key];
}

function render(content) {
    if (!content) return "";

    let output = "@font-face {";

    for (let key in content) {
        if (!is(key) || content[key].toString().includes(";")) continue;

        output += `${get(key)}:${content[key]};`;
    }

    output += "}";

    return output;
}

export { list, is, get, render };
