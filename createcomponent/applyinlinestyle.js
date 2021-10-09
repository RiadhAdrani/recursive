/**
 * apply inline style to a component.
 * @param style style as JSON.
 * @param renderStyle style of the htmlElement, basically htmlElement.style.
 */
export default (style, renderStyle) => {
     for (let prop in style) {
          if (renderStyle.hasOwnProperty(prop)) {
               renderStyle[prop] = style[prop];
          }
     }
};
