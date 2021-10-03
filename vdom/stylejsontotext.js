import csstotext from "../createcomponent/csstotext.js";
import animationtotext from "../createcomponent/animationtotext.js";
import mediatotext from "./mediatotext.js";
import handlemediaqueries from "./handlemediaqueries.js";

export default (css, animations, mediaQueries) => {
     let output = "\n";
     css.forEach((s) => {
          output += `\n${s.selector}{\n${csstotext(s.content)}}\n`;
     });
     animations.forEach((a) => {
          output += animationtotext(a);
     });

     output += `${mediatotext(handlemediaqueries(mediaQueries))}`;

     return output;
};
