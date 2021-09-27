import attributes from "./attributes.js";

export default (component, newComponent, render) => {
     let didUpdate = false;

     function updateAttr(attr) {
          if (component[`${attr}`] !== newComponent[`${attr}`]) {
               if (newComponent[`${attr}`]) {
                    render[`${attr}`] = newComponent[`${attr}`];
               } else {
                    render.removeAttribute(`${attr}`);
               }
               didUpdate = true;
          }
     }

     attributes.forEach((attr) => {
          updateAttr(attr);
     });

     return didUpdate;
};
