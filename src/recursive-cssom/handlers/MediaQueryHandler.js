import SelectorHandler from "./SelectorHandler.js";

export default /**
 * Convert media Queries to css format
 * @param {JSON} mediaQueries processed media queries
 */
function (mediaQueries, isClass = true) {
    let mediaQueryText = "";
    for (var cond in mediaQueries) {
        mediaQueryText += `@media ${cond}{`;
        for (var s in mediaQueries[cond]) {
            mediaQueryText += `${isClass ? "." : ""}${s}{${SelectorHandler(
                mediaQueries[cond][s]
            )}}`;
        }
        mediaQueryText += "}";
    }

    return mediaQueryText;
}
