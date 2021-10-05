import childrentype from "./childrentype.js";
import childtype from "./childtype.js";

/**
 * Render children into the htmlElement
 * @param children children to be injected
 * @param render htmlElement
 */
export default (children, render) => {
     if (!childrentype(children) && !children.render) {
          render.innerText = children;
     } else if (children.render) {
          render.append(children.render());
     } else {
          if (children.length > 100) {
               console.warn(
                    `TOO MANY CHILDREN (${children.length}): improve performance by reducing the number of children using array.slice()`
               );
          }
          children.forEach((child) => {
               if (!childtype(child) && !child.render) {
                    render.innerHTML += child;
               } else {
                    const r = child.render();
                    render.append(r);
               }
          });
     }
};
