import csstotext from "./csstotext.js";
import animationtotext from "./animationtotext.js";
import mediatotext from "./mediatotext.js";
import handlemediaqueries from "./handlemediaqueries.js";

/**
 * Apply CSS into the DOM
 * @param {Array} css array of style selectors
 * @param {Array} animations array of anumations
 * @param {Array} mediaQueries array of quereis
 */
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
