import { render as renderSelector } from "./CssSelectors.js";
import { render as renderAnimation } from "./CssAnimations.js";
import { render as renderQuery } from "./CssMediaQueries.js";
import { render as renderFont } from "./CssFontFace.js";
import { render as renderImport } from "./CssImport.js";
import { render as renderVar } from "./CssVar.js";

export default /**
 * Convert static style to string
 * @param {JSON} styleSheet static style object
 */
function (styleSheet) {
    if (!styleSheet) return;

    let output = "";
    output += renderVar(styleSheet.var);
    output += renderImport(styleSheet.import);
    output += renderFont(styleSheet.fontFace);

    if (styleSheet["charset"]) {
        for (let item in styleSheet.charset) {
            output += `@charset "${styleSheet.font[item]}";`;
        }
    }

    if (styleSheet["selectors"]) {
        for (let rule in styleSheet.selectors) {
            const res = renderSelector(rule, styleSheet.selectors[rule]);
            output += res;
        }
    }

    if (styleSheet["mediaQueries"]) {
        for (let query in styleSheet.mediaQueries) {
            output += renderQuery(query, styleSheet.mediaQueries[query]);
        }
    }

    if (styleSheet["animations"]) {
        for (let anim in styleSheet.animations) {
            output += renderAnimation(anim, styleSheet.animations[anim]);
        }
    }

    return output;
}
