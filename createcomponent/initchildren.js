import childrentype from "./childrentype.js";
import childtype from "./childtype.js";

/**
 * Initialize children
 * @param component CreateComponent
 * @param children input children to be initialized
 */
export default (component, children) => {
     if (children) {
          if (!childtype(children)) {
               component.children = [`${children}`];
          } else if (children.render) {
               component.children = [children];
          } else {
               for (let i = 0; i < children.length; i++) {
                    if (childrentype(children[i])) throw `Recursive: Child cannot be an array`;
                    if (!children[i]) continue;
                    if (childtype(children[i])) {
                         component.children.push(children[i]);
                    } else {
                         let textNode = children[i];

                         for (let j = i + 1, l = children.length; j < l; j++) {
                              if (childtype(children[j])) {
                                   break;
                              } else {
                                   textNode += children[j];
                                   i++;
                              }
                         }
                         component.children.push(textNode);
                    }
               }
          }
     } else component.children = [];
};
