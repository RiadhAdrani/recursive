import childtype from "./childtype.js";

/**
 * Compute the difference between the children of two components.
 * @param component old component (this)
 * @param newComponent new component
 * @param render component inside the DOM
 */
export default (component, newComponent, render) => {
     for (let i = 0; i < component.children.length; i++) {
          if (!childtype(component.children[i]) && !childtype(newComponent.children[i])) {
               // case not equal strings
               if (component.children[i].toString() !== newComponent.children[i].toString()) {
                    if (render.childNodes) {
                         render.childNodes[i].nodeValue = newComponent.children[i];
                    }
               }
          }
          // case children is string, new is child
          else if (typeof component.children[i] === "string" && newComponent.children[i].render) {
               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i].render());
                    }
               });
          }
          // case children is child, new is string
          else if (component.children[i].render && typeof newComponent.children[i] === "string") {
               component.children[i].onBeforeDestroyed();

               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i]);
                    }
               });

               component.children[i].destroyed();
          }
          // case children is child, new is child
          else {
               component.children[i].update(newComponent.children[i]);
          }
     }
};
