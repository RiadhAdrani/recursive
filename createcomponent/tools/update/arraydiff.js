import childtype from "../childtype.js";
import _replacenodeindom from "./_replacenodeindom.js";

/**
 * Compute the difference between the children of two components.
 * @param component old component (this)
 * @param newComponent new component
 * @param render component inside the DOM
 */
export default (component, newComponent, render) => {
     let didUpdate = false;

     for (let i = 0; i < component.children.length; i++) {
          if (!childtype(component.children[i]) && !childtype(newComponent.children[i])) {
               // case not equal strings
               if (component.children[i].toString() !== newComponent.children[i].toString()) {
                    // render.childNodes[i].replaceWith(newComponent.children[i]);
                    _replacenodeindom(i, component, newComponent);
                    didUpdate = true;
               }
          }
          // case children is string, new is child
          else if (!childtype(component.children[i]) && childtype(newComponent.children[i])) {
               _replacenodeindom(i, component, newComponent);
               /*
               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i].render());
                         newComponent.children[i].$onCreated();
                    }
               });
               */
               didUpdate = true;
          }
          // case children is child, new is string
          else if (childtype(component.children[i]) && childtype(!newComponent.children[i])) {
               _replacenodeindom(i, component, newComponent);
               /*
               component.children[i].$beforeDestroyed();

               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i]);
                    }
               });

               component.children[i].$onDestroyed();
               */
               didUpdate = true;
          }
          // case children is child, new is child
          else {
               didUpdate = component.children[i].update(newComponent.children[i]);
          }
     }

     return didUpdate;
};
