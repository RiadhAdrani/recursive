import csstotext from "../createcomponent/csstotext.js";
import handlesameselector from "./handlesameselector.js";
import proptoselector from "./proptoselector.js";
import solveduplicateselectors from "./solveduplicateselectors.js";
import stylejsontotext from "./stylejsontotext.js";

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

     animationDup.forEach((dup) => {
          console.warn(
               `DUPLICATE ANIMATION: animation name (${dup}) is found more than once. The last iteration will be used instead.`
          );
     });

     styleDup.forEach((dup) => {
          console.warn(
               `DUPLICATE style: selector (${dup}) is found more than once. Styles will be merged together with the newest value overriding the oldest.`
          );
     });

     return ss;
};
