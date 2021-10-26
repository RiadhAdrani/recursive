import csstotext from "./csstotext.js";

/**
 * Convert media Queries to css format
 * @param {JSON} mediaQueries processed media queries
 */
export default (mediaQueries) => {
     let mediaQueryText = "";
     for (var cond in mediaQueries) {
          mediaQueryText += `@media ${cond}{\n`;
          for (var s in mediaQueries[cond]) {
               mediaQueryText += `\n\t.${s}{\n${csstotext(mediaQueries[cond][s])}\t}\n`;
          }
          mediaQueryText += "}\n\n";
     }

     return mediaQueryText;
};
