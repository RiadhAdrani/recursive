import childtype from "./childtype.js";

/**
 * Compute the difference between the children of two components.
 * @param component old component (this)
 * @param newComponent new component
 * @param render component inside the DOM
 */
export default (component, newComponent, render) => {
     let didUpdate = false;

     const dupdate = () => {
          if (!didUpdate) didUpdate = true;
     };

     for (let i = 0; i < component.children.length; i++) {
          if (!childtype(component.children[i]) && !childtype(newComponent.children[i])) {
               // case not equal strings
               if (component.children[i].toString() !== newComponent.children[i].toString()) {
                    if (render.childNodes) {
                         render.childNodes[i].nodeValue = newComponent.children[i];
                         dupdate();
                    }
               }
          }
          // case children is string, new is child
          else if (
               !component.children[i].$$createcomponent &&
               newComponent.children[i].$$createcomponent
          ) {
               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i].render());
                         newComponent.children[i].created();
                    }
               });
               dupdate();
          }
          // case children is child, new is string
          else if (
               component.children[i].$$createcomponent &&
               !newComponent.children[i].$$createcomponent
          ) {
               component.children[i].onBeforeDestroyed();

               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i]);
                    }
               });

               component.children[i].destroyed();
               dupdate();
          }
          // case children is child, new is child
          else {
               if (component.children[i].update(newComponent.children[i])) dupdate();
          }
     }

     return didUpdate;
};
