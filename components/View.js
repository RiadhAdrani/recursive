import DefineElement from "../core/create-component/DefineElement.js";

const ref = document.getElementById("default-components-style");

export default class View extends DefineElement {
    constructor(tag) {
        super(tag);
    }

    static makeDefaultStyle(style) {
        ref.innerHTML += style;
    }

    static makeAnimationNameWithString(input) {
        const work = input.trim();

        if (!work) return "";

        function convert(n) {
            return String.fromCharCode((n % 25) + 97);
        }

        return [...work]
            .map((c, index) =>
                index % 2 != 0
                    ? convert(c.charCodeAt()).toUpperCase()
                    : convert(c.charCodeAt()).toLowerCase()
            )
            .join("");
    }
}
