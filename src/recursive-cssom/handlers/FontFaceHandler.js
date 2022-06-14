import { get, is } from "../CssFontFace.js";

export default /**
 * @param {JSON} ffobject font face object to convert
 */
function (ffobject) {
    let output = "";

    for (let prop in ffobject) {
        if (is(prop)) {
            output += `${get(prop)}:${ffobject[prop]};`;
        }
    }

    return output;
}
