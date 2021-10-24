/**
 * Update component's inline style
 * @param renderStyle rendered htmlElement
 * @param oldStyle current component style : component.style
 * @param newStyle new component style : newComponent.style
 */
export default (renderStyle, oldStyle, newStyle) => {
     let didChange = false;

     if (!oldStyle) {
          for (let prop in newStyle) {
               if (!["length", "size", "parentRule"].includes(prop)) {
                    if (renderStyle.hasOwnProperty(prop) && newStyle[`${prop}`] !== "") {
                         renderStyle[`${prop}`] = newStyle[`${prop}`];
                    }
               }
          }
          didChange = true;
     } else {
          for (let prop in newStyle) {
               if (!["length", "size", "parentRule"].includes(prop)) {
                    if (oldStyle[`${prop}`] !== newStyle[`${prop}`]) {
                         renderStyle[`${prop}`] = newStyle[`${prop}`];
                         didChange = true;
                    }
               }
          }
     }

     return didChange;
};
