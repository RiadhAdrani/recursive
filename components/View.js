import DefineElement from "../core/create-component/DefineElement.js";
import { Props, Lazy } from "../intellisense/Props";
import CreateComponent from "../core/create-component/CreateComponent.js";
import CreateSvgComponent from "../core/recursive-svg/CreateSvgComponent.js";

const ref = document.getElementById("default-components-style");

class View extends DefineElement {
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

export { View, Props, Lazy, CreateComponent, CreateSvgComponent };
