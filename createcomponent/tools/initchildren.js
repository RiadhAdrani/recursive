import childrentype from "./childrentype.js";
import childtype from "./childtype.js";

/**
 * Initialize children
 * @param component CreateComponent
 * @param children input children to be initialized
 */
export default (component, children) => {
     if (children) {
          if (Array.isArray(children)) {
               for (let i = 0; i < children.length; i++) {
                    if (!children[i]) continue;
                    if (childrentype(children[i])) throw `Recursive: Child cannot be an array`;
                    if (children[i].$$createcomponent) {
                         if (children[i].renderIf) {
                              component.children.push(children[i]);
                         }
                    } else {
                         let textNode = children[i];

                         for (let j = i + 1, l = children.length; j < l; j++) {
                              if (children[j].$$createcomponent) {
                                   break;
                              } else {
                                   textNode += children[j];
                                   i++;
                              }
                         }
                         component.children.push(textNode);
                    }
               }
          } else {
               if (children.$$createcomponent) {
                    if (children.renderIf) {
                         component.children = [children];
                    }
               } else {
                    component.children = [children];
               }
          }
     } else component.children = [];
};
