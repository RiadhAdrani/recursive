import cssattributes from "../props/cssattributes.js";

/**
 * Convert a json into text
 * @param {JSON} json style as json.
 * @param {string} indentation add indentation before css declaration
 */
export default (json, indentation = "\t\t") => {
     let output = "";

     for (let attr in json) {
          if (cssattributes[attr])
               output += `${indentation}${cssattributes[attr]}:${json[attr]};\n`;
     }

     return output;
};
