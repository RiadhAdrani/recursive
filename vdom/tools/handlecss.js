import handlesameselector from "./handlesameselector.js";
import stylejsontotext from "./stylejsontotext.js";

/**
 * CSS Handler for the VDOM
 * @param css css style
 * @param animations css animations
 * @param mediaQueries css media queries
 * @param root style element inside the html document <style></style>
 * @param oldStyleText old style
 */
export default (css, animations, mediaQueries, root, oldStyleText) => {
     let output = [];

     let outputAnimations = [];

     const styleDup = [];
     const animationDup = [];

     for (let i in css) {
          let found = false;

          for (let j in output) {
               if (output[j].selector === css[i].selector) {
                    if (!styleDup.includes(output[j].selector)) {
                         styleDup.push(output[j].selector);
                    }

                    found = true;
                    handlesameselector(output[j].content, css[i].content);
                    break;
               }
          }

          if (!found) {
               output.push(css[i]);
          }
     }

     if (animations.length > 0) {
          for (let i in animations) {
               let found = false;

               for (let j in outputAnimations) {
                    if (outputAnimations[j].name === animations[i].name) {
                         found = true;

                         if (!animationDup.includes(outputAnimations[j].name)) {
                              animationDup.push(outputAnimations[j].name);
                         }

                         outputAnimations = outputAnimations.filter(
                              (a) => a.name !== outputAnimations[j].name
                         );
                         outputAnimations.push(animations[i]);
                         break;
                    }
               }

               if (!found) {
                    outputAnimations.push(animations[i]);
               }
          }
     }

     const ss = stylejsontotext(output, outputAnimations, mediaQueries);

     if (oldStyleText !== ss) {
          root.innerHTML = ss;
     }

     if (vDOM.devMode) {
          if (animationDup.length > 0) {
               console.warn(
                    `DUPLICATE ANIMATION${
                         animationDup.length > 1 ? "S" : ""
                    }: (${animationDup}) => found more than once`
               );
          }

          if (styleDup.length > 0) {
               console.warn(
                    `DUPLICATE STYLE${
                         styleDup.length > 1 ? "S" : ""
                    }: (${styleDup}) => found more than once.`
               );
          }
     }

     return ss;
};
