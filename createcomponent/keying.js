import childrentype from "./childrentype.js";
import childtype from "./childtype.js";

/**
 * Apply keys to children so they are accessible by the VDOM
 * @param component CreateComponent
 */
export default (component) => {
     let index = 0;
     component.children.forEach((child) => {
          if (child.$$createcomponent) {
               child.key = `${component.key}${index}`;
               child.keying();
          }
          index++;
     });
};
