export default (children, render) => {
     if (["number", "string", "boolean"].includes(typeof children) && !children.render) {
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
               if (["number", "string", "boolean"].includes(typeof child) && !child.render) {
                    render.innerHTML += child;
               } else {
                    const r = child.render();
                    render.append(r);
               }
          });
     }
};
