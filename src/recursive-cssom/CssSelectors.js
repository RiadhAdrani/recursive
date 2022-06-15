import { render as renderProp } from "./CssProperties";

const list = {
    normal: "",
    active: ":active",
    anyLink: ":any-link",
    checked: ":checked",
    default: ":default",
    defined: ":defined",
    disabled: ":disabled",
    empty: ":empty",
    enabled: ":enabled",
    first: ":first",
    firstChild: ":first-child",
    firstOfType: ":first-of-type",
    fullscreen: "fullscreen",
    focus: ":focus",
    focusVisible: ":focus-visible",
    focusWithin: ":focus-within",
    hover: ":hover",
    indeterminate: ":indeterminate",
    inRange: ":in-range",
    invalid: ":invalid",
    lastChild: ":last-child",
    lastOfType: ":last-of-type",
    link: ":link",
    onlyChild: ":only-child",
    onlyOfType: ":only-of-type",
    optional: ":optional",
    outOfRange: ":out-of-range",
    pictureInPicutre: ":picture-in-picture",
    placeholderShown: ":placeholder-shown",
    readOnly: ":read-only",
    readWrite: ":read-write",
    required: ":required",
    scope: ":scope",
    target: ":target",
    valid: ":valid",
    visited: ":visited",
    after: "::after",
    before: "::before",
    cue: "::cue",
    cueRegion: "::cue-region",
    firstLetter: "::first-letter",
    firstLine: "::first-line",
    fileSelectorButton: "::file-selector-button",
    placeholder: "::placeholder",
    selection: "::selection",
    marker: "::marker",

    // webkit

    webkitScrollbar: "::-webkit-scrollbar",
    webkitScrollbarTrack: "::-webkit-scrollbar-track",
    webkitScrollbarThumb: "::-webkit-scrollbar-thumb",
    webkitScrollbarThumbHover: "::-webkit-scrollbar-thumb:hover",
    webkitScrollbarThumbActive: "::-webkit-scrollbar-thumb:active",
};

function is(key) {
    return list[key] !== undefined;
}

function get(key) {
    return list[key];
}

/**
 * render a selector declaration
 * @param {String} selector
 * @param {JSON} content
 */
function render(selector, content) {
    if (!selector || !content) return "";

    let output = `${selector}{`;

    for (let prop in content) {
        output += renderProp(prop, content[prop]);
    }

    output += "}";

    return output;
}

export { list, is, get, render };
