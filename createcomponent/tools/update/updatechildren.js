import arraydiff from "./arraydiff.js";
import _addchildrenindom from "./_addchildrenindom.js";
import _removenodefromdom from "./_removenodefromdom.js";
import _appendnodeindom from "./_appendnodeindom.js";

/**
 * Update component's children
 * @param component old component
 * @param newComponent new component
 * @param render rendered htmlElement
 */
export default (component, newComponent, render) => {
     // LEGACY CODE
     // code that will be deleted
     /*
     if (!Array.isArray(component.children) || !Array.isArray(newComponent.children)) {
          throw "Children is not an arry !";
     }
     if (!component.children && !newComponent.children) {
          return false;
     }
     // if new children is empty, just remove inner html
     else if (component.children && !newComponent.children) {
          render.innerHTML = "";
          return true;
     }
     // if render children is empty, just add the children of the new element
     else if (!component.children && newComponent.children) {
          _addchildrenindom(component, newComponent);
          return true;
     }
     // case children is string, new is string and not equal
     else if (!childrentype(component.children) && !childrentype(newComponent.children)) {
          if (newComponent.children.toString() !== component.children.toString()) {
               render.replaceChildren(newComponent.children);
               return true;
          }
     }
     // case children is string, new is component
     else if (!childrentype(component.children) && childtype(newComponent.children)) {
          render.replaceChildren(newComponent.children.render());
          children.$onCreated();
          return true;
     }
     // case children is child, new is string
     else if (childtype(component.children) && typeof !childrentype(newComponent.children)) {
          component.children.$beforeDestroyed();
          render.replaceChildren(newComponent.children);
          component.children.$onDestroyed();
          return true;
     }
     // case children is string, new is children
     else if (!childrentype(component.children) && Array.isArray(newComponent.children)) {
          component.$beforeDestroyed();
          render.replaceChildren(
               newComponent.children.map((child) => (child.render ? child.render() : child))
          );
          newComponent.$onCreated();
          component.$onDestroyed();
          return true;
     }
     // case children is children, new is string
     else if (Array.isArray(component.children) && !childrentype(newComponent.children)) {
          component.children.$beforeDestroyed();
          render.replaceChildren(newComponent.children);
          component.children.$onDestroyed();
          return true;
     }
     // case children is child, new is child
     else if (childtype(component.children) && childtype(newComponent.children)) {
          return component.children.update(newComponent.children);
     }
     // case children is child, new is children
     else if (childtype(component.children) && Array.isArray(newComponent.children)) {
          component.children.$beforeDestroyed();

          render.replaceChildren(newComponent.render().innerHTML);
          newComponent.children.forEach((child) => {
               if (childtype(child)) {
                    child.$onCreated();
               }
          });

          component.children.$onDestroyed();
          return true;
     }
     // case children is children, new is child
     else if (Array.isArray(component.children) && newComponent.children.$$createcomponent) {
          component.children.forEach((child) => {
               if (childtype(child)) {
                    child.$beforeDestroyed();
               }
          });

          render.replaceChildren(newComponent.children.render());

          newComponent.chilren.$onCreated();

          component.children.forEach((child) => {
               if (childtype(child)) {
                    child.$onDestroyed();
               }
          });

          return true;
     }
     */
     // if children have the same length
     if (component.children.length === newComponent.children.length) {
          return arraydiff(component, newComponent, render);
     }
     // if component.children are greater than newComponent.children
     else if (component.children.length > newComponent.children.length) {
          while (component.domInstance.childNodes.length > newComponent.children.length) {
               _removenodefromdom(newComponent.children.length, component);
               component.children.pop();
          }

          // component.children = [...component.children.slice(0, newComponent.children.length)];

          /*
          let i = newComponent.children.length;
          while (render.childNodes.length > newComponent.children.length) {
               if (childtype(component.children[i])) component.children[i].$beforeDestroyed();

               render.childNodes.item(i).remove();

               if (childtype(component.children[i])) component.children[i].$onDestroyed();
          }

          component.children = [...component.children.slice(0, newComponent.children.length)];
          */

          arraydiff(component, newComponent, render);

          return true;
     }
     // if component.children are less than newComponent.children
     else {
          /*
          const x = component.children.length;
          component.children = [
               ...component.children,
               ...newComponent.children.slice(component.children.length),
          ];

          

          const n = newComponent.children.slice(x, newComponent.children.length);

          n.forEach((child) => {
               render.append(childtype(child) ? child.render() : child);
               if (childtype(child)) child.$onCreated();
          });
          */

          for (let i = component.children.length; i < newComponent.children.length; i++) {
               _appendnodeindom(i, component, newComponent);
          }

          return arraydiff(component, newComponent, render);
     }
};
