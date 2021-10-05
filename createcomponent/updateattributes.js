import attributes from "./attributes.js";

/**
 * Update component's attributes
 * @param component old component
 * @param newComponent new component
 * @param render rendered htmlElement
 */
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
