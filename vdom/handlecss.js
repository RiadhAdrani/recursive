import handlesameselector from "./handlesameselector.js";
import stylejsontotext from "./stylejsontotext.js";

export default (css, animations, mediaQueries, root, oldStyleText) => {
     let output = [];

     for (let i in css) {
          let found = false;

          for (let j in output) {
               if (output[j].selector === css[i].selector) {
                    found = true;
                    handlesameselector(output[j].content, css[i].content);
                    break;
               }
          }

          if (!found) {
               output.push(css[i]);
          }
     }

     const ss = stylejsontotext(output, animations, mediaQueries);

     if (oldStyleText !== ss) {
          root.innerHTML = ss;
     }

     return ss;
};
