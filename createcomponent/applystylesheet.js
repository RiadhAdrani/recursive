import styleselectors from "./styleselectors.js";

export default (component) => {
     if (!vDOM) throw "Unable to find the VDOM";

     if (component.style) {
          if (component.style.className) {
               const arrayOfStyles = [];

               const styleObject = (selector, content) => {
                    return {
                         selector: `.${component.style.className.trim()}${selector.trim()}`,
                         content: content,
                    };
               };

               styleselectors.forEach((style) => {
                    if (component.style[`${style.prop}`]) {
                         if (style.type === "selector") {
                              arrayOfStyles.push(
                                   styleObject(style.name, component.style[`${style.prop}`])
                              );
                         }
                         if (style.type === "animation") {
                         }
                         if (style.type === "media") {
                         }
                    }
               });

               arrayOfStyles.forEach((style) => {
                    vDOM.style.push(style);
               });
          } else {
               console.warn(
                    "MISSING STYLE CLASS: cannot apply the style without the styleClass. Add className into your component.styleSheet object"
               );
          }
     }

     if (component.children) {
          component.children.forEach((child) => {
               if (child.render) {
                    child.addExternalStyle();
               }
          });
     }
};
