import arraydiff from "./arraydiff.js";
import childrentype from "./childrentype.js";

/**
 * Update component's children
 * @param component old component
 * @param newComponent new component
 * @param render rendered htmlElement
 */
export default (component, newComponent, render) => {
     if (!component.children && !newComponent.children) {
          return;
     }

     // if new children is empty, just remove inner html
     if (!newComponent.children) {
          render.innerHTML = "";
          if (newComponent.tag === "textarea") {
               render.value = "";
          }
          return;
     }

     // if render children is empty, just add the children of the new element
     if (!component.children && newComponent.children) {
          newComponent.children.forEach((child) => {
               render.append(child.render ? child.render() : child);
          });
          return;
     }

     // case children is string, new is string and not equal
     else if (!childrentype(component.children) && !childrentype(newComponent.children)) {
          if (newComponent.children.toString() !== component.children.toString()) {
               render.replaceChildren(newComponent.children);

               return;
          }
     }
     // case children is string, new is child
     else if (!childrentype(component.children) && newComponent.children.render) {
          render.replaceChildren(newComponent.children.render());

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is child, new is string
     else if (component.children.render && typeof !childrentype(newComponent.children)) {
          component.children.onBeforeDestroyed();
          render.replaceChildren(newComponent.children);

          component.children.destroyed();

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is string, new is children
     else if (!childrentype(component.children) && Array.isArray(newComponent.children)) {
          render.replaceChildren(
               newComponent.children.map((child) => (child.render ? child.render() : child))
          );
          newComponent.created();

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is children, new is string
     else if (Array.isArray(component.children) && !childrentype(newComponent.children)) {
          render.replaceChildren(newComponent.children);

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is child, new is child
     else if (component.children.render && newComponent.children.render) {
          component.children.update(newComponent.children);

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is child, new is children
     else if (component.children.render && Array.isArray(newComponent.children)) {
          component.children.onBeforeDestroyed();

          render.replaceChildren(newComponent.render().innerHTML);

          component.children.destroyed();

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is children, new is child
     else if (Array.isArray(component.children) && newComponent.children.render) {
          component.children.forEach((child) => {
               if (child.onBeforeDestroyed) {
                    child.onBeforeDestroyed();
               }
          });

          render.replaceChildren(newComponent.children.render());

          component.children.forEach((child) => {
               if (child.destroyed) {
                    child.destroyed();
               }
          });

          newComponent.chilren.created();

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is children, new is children
     else if (Array.isArray(component.children) && Array.isArray(newComponent.children)) {
          // if children have the same length
          if (component.children.length === newComponent.children.length) {
               arraydiff(component, newComponent, render);
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
          }
     }
};
