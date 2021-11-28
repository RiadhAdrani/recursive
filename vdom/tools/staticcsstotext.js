import animationtotext from "./animationtotext.js";
import csstotext from "./csstotext.js";
import fontfacetotext from "./fontfacetotext.js";
import mediatotext from "./mediatotext.js";

export default (cssobject) => {
     let output = "\n";

     if (cssobject["import"]) {
          for (let item in cssobject.import) {
               output += `\n@import ${cssobject.import[item]};\n`;
          }
     }

     if (cssobject["font"]) {
          output += `@font-face {\n${fontfacetotext(cssobject.font)}}\n`;
     }

     if (cssobject["charset"]) {
          output += "\n";
          for (let item in cssobject.charset) {
               output += `@charset "${cssobject.font[item]}";\n`;
          }
     }

     if (cssobject["selectors"]) {
          for (let rule in cssobject.selectors) {
               output += `\n${rule}{\n${csstotext(cssobject.selectors[rule], "\t")}}`;
          }
     }

     if (cssobject["media"]) {
          output += "\n";
          output += mediatotext(cssobject.media, false);
     }

     if (cssobject["animations"]) {
          output += "\n";
          for (let anim in cssobject.animations) {
               output +=
                    "\n" +
                    animationtotext({ name: anim, steps: cssobject.animations[anim] }) +
                    "\n";
          }
     }

     return output;
};
