import childrentype from "./childrentype.js";

/**
 * Initialize children
 * @param component CreateComponent
 * @param children children to be initialized
 */
export default (component, children) => {
     if (children) {
          if (!childrentype(children) && !children.render) {
               component.children = [`${children}`];
          } else if (children.render) {
               component.children = [children];
          } else {
               for (let i = 0; i < children.length; i++) {
                    if (!children[i]) continue;
                    if (childrentype(children)) {
                         component.children.push(children[i]);
                    } else {
                         let textNode = children[i];
                         for (let j = i + 1, l = children.length; j < l; j++) {
                              if (!childrentype(children)) {
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
