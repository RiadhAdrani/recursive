import csstotext from "../createcomponent/csstotext.js";
import animationtotext from "../createcomponent/animationtotext.js";

export default (css, animations, mediaQueries) => {
     let output = "\n";
     css.forEach((s) => {
          output += `\n${s.selector}{\n${csstotext(s.content)}}`;
     });
     animations.forEach((a) => {
          output += animationtotext(a);
     });

     return output;
};
