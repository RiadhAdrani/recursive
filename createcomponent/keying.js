import childtype from "./childtype.js";

/**
 * Apply keys to children so they are accessible by the VDOM
 * @param component CreateComponent
 */
export default (component) => {
     if (typeof component.children !== "string") {
          if (component.children.render) {
               component.children.key = `${component.key}0`;
          } else {
               component.children.forEach((child) => {
                    if (childtype(child)) {
                         child.key = `${component.key}${component.children.indexOf(child)}`;
                         child.keying();
                    }
               });
          }
     }
};
