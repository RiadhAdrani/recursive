import RecursiveCSSProperties from "./RecursiveCSSProperties.js";

export default /**
 * Convert a json into text
 * @param {JSON} json style as json.
 * @param {string} indentation add indentation before css declaration
 */
function (json, indentation = "") {
    let output = "";

    for (let attr in json) {
        if (RecursiveCSSProperties[attr])
            output += `${indentation}${RecursiveCSSProperties[attr]}:${json[attr]};`;
    }

    return output;
}
