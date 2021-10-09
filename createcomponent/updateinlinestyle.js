/**
 * @param {JSON} newStyle new style object
 * @param {JSON} oldStyle old style object
 * @param {HTMLElement} render rendered html Element
 */
export default (newStyle, oldStyle, render) => {
     if (newStyle) {
          for (let prop in newStyle) {
               if (render.style[prop] && newStyle[prop] !== "") {
                    render.style[prop] = newStyle[prop];
               }
          }
     }

     if (oldStyle) {
          for (let prop in oldStyle) {
               if (newStyle) {
                    if (!newStyle.hasOwnProperty(prop)) {
                         render.style[prop] = "";
                    }
               } else {
                    render.style[prop] = "";
               }
          }
     }
};
