import arraydiff from "./arraydiff.js";

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
     else if (typeof component.children === "string" && typeof newComponent.children === "string") {
          if (newComponent.children.toString() !== component.children.toString()) {
               render.replaceChildren(newComponent.children);

               return;
          }
     }
     // case children is string, new is child
     else if (typeof component.children === "string" && newComponent.children.render) {
          render.replaceChildren(newComponent.children.render());

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is child, new is string
     else if (component.children.render && typeof newComponent.children === "string") {
          component.children.onBeforeDestroyed();
          // console.log("current is child new is string");
          render.replaceChildren(newComponent.children);

          component.children.destroyed();

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is string, new is children
     else if (typeof component.children === "string" && Array.isArray(newComponent.children)) {
          // .log("current is string new is children");
          render.replaceChildren(
               newComponent.children.map((child) => (child.render ? child.render() : child))
          );
          newComponent.created();

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is children, new is string
     else if (Array.isArray(component.children) && typeof newComponent.children === "string") {
          // console.log("current is children new is string");
          render.replaceChildren(newComponent.children);

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is child, new is child
     else if (component.children.render && newComponent.children.render) {
          // console.log("current is child new is child");
          // console.log(component.key, component.children);
          // console.log(newComponent.key, newComponent.children);
          component.children.update(newComponent.children);

          if (!didUpdate) {
               component.updated();
          }
     }
     // case children is child, new is children
     else if (component.children.render && Array.isArray(newComponent.children)) {
          component.children.onBeforeDestroyed();

          // console.log("current is child new is children");
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

          // console.log("current is children new is child");
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
          //// console.log("current is children new is child");
          // if children have the same length
          if (component.children.length === newComponent.children.length) {
               arraydiff(component, newComponent, render);
          }
          // if component.children are greater than newComponent.children
          else if (component.children.length > newComponent.children.length) {
               // console.log("render children are more");
               // console.log(newComponent.children.length);
               // console.log(render.childNodes.length);

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
               // console.log("render children are less");
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
