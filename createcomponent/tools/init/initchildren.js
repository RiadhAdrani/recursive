import childrentype from "../childrentype.js";
import childtype from "../childtype.js";

/**
 * Initialize children
 * @param component CreateComponent
 * @param children input children to be initialized
 */
export default (component, children) => {
     // if children is not null
     if (children !== null) {
          // if children is an array
          if (Array.isArray(children)) {
               // iterate through children
               for (let i = 0; i < children.length; i++) {
                    // skip child if null
                    if (children[i] === null) continue;

                    // throw an error if a child is an array
                    if (childrentype(children[i])) {
                         console.log("Child cannot be an array");
                         throw `[RENDER]: Child cannot be an array`;
                    }

                    // if child is a component.
                    if (childtype(children[i])) {
                         // check renderIf value
                         if (children[i].flags.renderIf !== false) {
                              component.children.push(children[i]);
                         }
                    }
                    // else child could be rendered as a text node
                    else {
                         let textNode = children[i];

                         // merge all consecutive non-component child into one text node
                         for (let j = i + 1, l = children.length; j < l; j++) {
                              if (childtype(children[j])) {
                                   break;
                              } else {
                                   textNode += children[j];
                                   i++;
                              }
                         }

                         // push text node
                         component.children.push(textNode);
                    }
               }
          }
          // children is a single node
          else if (children !== undefined) {
               if (children.$$createcomponent) {
                    if (children.flags.renderIf !== false) {
                         component.children = [children];
                    }
               }
               // child is a text node
               else {
                    component.children = [children];
               }
          }
          // child is a component
     }
     // no children
     else {
          component.children = [];
     }
};
