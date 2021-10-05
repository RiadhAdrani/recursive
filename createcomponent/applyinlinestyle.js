/**
 * apply inline style to a component.
 * @param style style as JSON.
 * @param renderStyle style of the htmlElement, basically htmlElement.style.
 */
export default (style, renderStyle) => {
     for (let prop in style) {
          if (!["length", "size", "parentRule"].includes(prop)) {
               if (renderStyle.hasOwnProperty(prop) && style[`${prop}`] !== "") {
                    renderStyle[`${prop}`] = style[`${prop}`];
               }
          }
     }
};
