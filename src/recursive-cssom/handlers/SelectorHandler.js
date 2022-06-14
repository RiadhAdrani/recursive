import { is, get } from "../CssProperties.js";

export default /**
 * Convert a json into text
 * @param {JSON} json style as json.
 * @param {string} indentation add indentation before css declaration
 */
function (json, indentation = "") {
    let output = "";

    for (let attr in json) {
        if (is(attr)) output += `${indentation}${get(attr)}:${json[attr]};`;
    }

    return output;
}
