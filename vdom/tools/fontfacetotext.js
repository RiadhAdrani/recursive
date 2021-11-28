import fontface from "../props/fontface.js";

/**
 * @param {JSON} ffobject font face object to convert
 */
export default (ffobject) => {
     let output = "";

     for (let prop in ffobject) {
          if (fontface[prop]) {
               output += `\t${prop}:${ffobject[prop]};\n`;
          }
     }

     return output;
};
