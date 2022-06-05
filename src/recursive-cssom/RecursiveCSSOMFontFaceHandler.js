import RecursiveCSSFontFace from "./RecursiveCSSFontFace.js";

export default /**
 * @param {JSON} ffobject font face object to convert
 */
function (ffobject) {
    let output = "";

    for (let prop in ffobject) {
        if (RecursiveCSSFontFace[prop]) {
            output += `${prop}:${ffobject[prop]};`;
        }
    }

    return output;
}
