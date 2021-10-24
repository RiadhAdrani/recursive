import arraydiff from "./arraydiff.js";
import childrentype from "../childrentype.js";

/**
 * Update component's children
 * @param component old component
 * @param newComponent new component
 * @param render rendered htmlElement
 */
export default (component, newComponent, render) => {
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
          newComponent.children.forEach((child) => {
               render.append(child.render ? child.render() : child);
               if (child.$$createcomponent) {
                    child.onCreated();
               }
          });
          return true;
     }
     // case children is string, new is string and not equal
     else if (!childrentype(component.children) && !childrentype(newComponent.children)) {
          if (newComponent.children.toString() !== component.children.toString()) {
               render.replaceChildren(newComponent.children);
               return true;
          }
     }
     // case children is string, new is child
     else if (!childrentype(component.children) && newComponent.children.$$createcomponent) {
          render.replaceChildren(newComponent.children.render());
          children.created();
          return true;
     }
     // case children is child, new is string
     else if (component.children.$$createcomponent && typeof !childrentype(newComponent.children)) {
          component.children.onBeforeDestroyed();
          render.replaceChildren(newComponent.children);
          component.children.destroyed();
          return true;
     }
     // case children is string, new is children
     else if (!childrentype(component.children) && Array.isArray(newComponent.children)) {
          component.onBeforeDestroyed();
          render.replaceChildren(
               newComponent.children.map((child) => (child.render ? child.render() : child))
          );
          newComponent.created();
          component.destroyed();
          return true;
     }
     // case children is children, new is string
     else if (Array.isArray(component.children) && !childrentype(newComponent.children)) {
          component.children.onBeforeDestroyed();
          render.replaceChildren(newComponent.children);
          component.children.destroyed();
          return true;
     }
     // case children is child, new is child
     else if (component.children.$$createcomponent && newComponent.children.$$createcomponent) {
          return component.children.update(newComponent.children);
     }
     // case children is child, new is children
     else if (component.children.$$createcomponent && Array.isArray(newComponent.children)) {
          component.children.onBeforeDestroyed();

          render.replaceChildren(newComponent.render().innerHTML);
          newComponent.children.forEach((child) => {
               if (child.$$createcomponent) {
                    child.created();
               }
          });

          component.children.destroyed();
          return true;
     }
     // case children is children, new is child
     else if (Array.isArray(component.children) && newComponent.children.$$createcomponent) {
          component.children.forEach((child) => {
               if (child.$$createcomponent) {
                    child.onBeforeDestroyed();
               }
          });

          render.replaceChildren(newComponent.children.render());

          newComponent.chilren.created();

          component.children.forEach((child) => {
               if (child.destroyed) {
                    child.destroyed();
               }
          });

          return true;
     }
     // case children is children, new is children
     else if (Array.isArray(component.children) && Array.isArray(newComponent.children)) {
          // if children have the same length
          if (component.children.length === newComponent.children.length) {
               return arraydiff(component, newComponent, render);
          }
          // if component.children are greater than newComponent.children
          else if (component.children.length > newComponent.children.length) {
               let i = newComponent.children.length;
               while (render.childNodes.length > newComponent.children.length) {
                    if (component.children[i].onBeforeDestroyed)
                         component.children[i].onBeforeDestroyed();

                    render.childNodes.item(i).remove();

                    if (component.children[i].destroyed) component.children[i].destroyed();
               }

               component.children = [...component.children.slice(0, newComponent.children.length)];

               arraydiff(component, newComponent, render);

               return true;
          }
          // if component.children are less than newComponent.children
          else {
               const x = component.children.length;
               component.children = [
                    ...component.children,
                    ...newComponent.children.slice(component.children.length),
               ];

               const n = newComponent.children.slice(x, newComponent.children.length);

               n.forEach((child) => {
                    render.append(child.render ? child.render() : child);
                    if (child.created) child.created();
               });

               arraydiff(component, newComponent, render);
               return true;
          }
     }
     return false;
};
