import Check from "./Check.js";
import HandleDOM from "./HandleDOM.js";

/**
 * Compute the difference between the children of two components.
 * @param component old component (this)
 * @param newComponent new component
 * @param render component inside the DOM
 */
export default (component, newComponent) => {
     let didUpdate = false;

     for (let i = 0; i < component.children.length; i++) {
          if (
               !Check.isComponent(component.children[i]) &&
               !Check.isComponent(newComponent.children[i])
          ) {
               // case not equal strings
               if (component.children[i].toString() !== newComponent.children[i].toString()) {
                    HandleDOM.replaceIndexedChildInDOM(i, component, newComponent);
                    didUpdate = true;
               }
          }
          // case children is string, new is child
          else if (
               !Check.isComponent(component.children[i]) &&
               Check.isComponent(newComponent.children[i])
          ) {
               HandleDOM.replaceIndexedChildInDOM(i, component, newComponent);
               didUpdate = true;
          }
          // case children is child, new is string
          else if (
               Check.isComponent(component.children[i]) &&
               Check.isComponent(!newComponent.children[i])
          ) {
               HandleDOM.replaceIndexedChildInDOM(i, component, newComponent);
               didUpdate = true;
          }
          // case children is child, new is child
          else {
               didUpdate = component.children[i].update(newComponent.children[i]);
          }
     }

     return didUpdate;
};
