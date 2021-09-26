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

               if (component.style.normal) {
                    arrayOfStyles.push(styleObject("", component.style.normal));
               }
               if (component.style.hover) {
                    arrayOfStyles.push(styleObject(":hover", component.style.hover));
               }
               if (component.style.focus) {
                    arrayOfStyles.push(styleObject(":focus", component.style.focus));
               }
               if (component.style.active) {
                    arrayOfStyles.push(styleObject(":active", component.style.active));
               }

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
