import Check from "./Check.js";
import HandleDOM from "./HandleDOM.js";

/**
 * Compute the difference between the children of two components.
 * @param component old component (this)
 * @param newComponent new component
 * @param render component inside the DOM
 */
export default (component, newComponent) => {
     // indicates if therer are changes between children
     let didUpdate = false;

     // iterate through component.children and comparing them with newComponent.children
     for (let i = 0; i < component.children.length; i++) {
          // if both children are not Recursive components
          // they are both of type string
          if (
               !Check.isComponent(component.children[i]) &&
               !Check.isComponent(newComponent.children[i])
          ) {
               // check if both strings are equals
               if (component.children[i].toString() !== newComponent.children[i].toString()) {
                    // different strings => replace child
                    HandleDOM.replaceIndexedChildInDOM(i, component, newComponent);
                    didUpdate = true;
               }
          }
          // if children are not of the same type
          else if (
               (!Check.isComponent(component.children[i]) &&
                    Check.isComponent(newComponent.children[i])) ||
               (Check.isComponent(component.children[i]) &&
                    Check.isComponent(!newComponent.children[i]))
          ) {
               // replace child
               HandleDOM.replaceIndexedChildInDOM(i, component, newComponent);
               didUpdate = true;
          }
          // children are both Recursive components
          else {
               // recursively update the dom instance
               didUpdate = component.children[i].update(newComponent.children[i]);
          }
     }

     // return the result
     return didUpdate;
};
