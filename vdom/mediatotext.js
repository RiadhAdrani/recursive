import csstotext from "../createcomponent/csstotext.js";

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
