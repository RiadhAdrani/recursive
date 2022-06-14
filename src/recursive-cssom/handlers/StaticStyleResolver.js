import FontFaceHandler from "./FontFaceHandler.js";
import SelectorHandler from "./SelectorHandler.js";
import MediaQueryHandler from "./MediaQueryHandler.js";
import AnimationHandler from "./AnimationHandler.js";

export default /**
 * Convert static style to string
 * @param {JSON} cssobject static style object
 */
function (cssobject) {
    if (!cssobject) return;

    let output = "";

    // add checking for every thing bro !
    if (cssobject["var"]) {
        output += ":root{";
        for (let item in cssobject.var) {
            output += `--${item}:${cssobject.var[item]};`;
        }
        output += "}";
    }

    if (cssobject["import"]) {
        for (let item in cssobject.import) {
            output += `@import ${cssobject.import[item]};`;
        }
    }

    if (cssobject["font"]) {
        output += `@font-face {${FontFaceHandler(cssobject.font)}}`;
    }

    if (cssobject["charset"]) {
        output += "";
        for (let item in cssobject.charset) {
            output += `@charset "${cssobject.font[item]}";`;
        }
    }

    if (cssobject["selectors"]) {
        for (let rule in cssobject.selectors) {
            output += `${rule}{${SelectorHandler(cssobject.selectors[rule], "")}}`;
        }
    }

    if (cssobject["media"]) {
        output += "";
        output += MediaQueryHandler(cssobject.media, false);
    }

    if (cssobject["animations"]) {
        output += "\n";
        for (let anim in cssobject.animations) {
            output += AnimationHandler({
                name: anim,
                steps: cssobject.animations[anim],
            });
        }
    }

    return output;
}
