import isvalidclassname from "../isvalidclassname.js";

/**
 * Add style className to the classList
 * @param component CreateComponent
 * @param style style object
 */
export default (component, style) => {
     // if style is valid
     if (style) {
          // check if className is valid
          if (style.className) {
               isvalidclassname(style.className);
               if (!component.className) {
                    component.className = style.className;
               } else {
                    component.className = `${className} ${style.className}`;
               }
          }
     }

     if (component.className) {
          const classList = component.className.split(" ");
          for (var i = 0, j = classList.length; i < j; i++) {
               isvalidclassname(classList[i]);
          }
     }
};
