import styleselectors from "./styleselectors.js";

export default (component) => {
     if (!vDOM) throw "Unable to find the VDOM";

     if (component.style) {
          if (component.style.className) {
               const styleObject = (selector, content) => {
                    return {
                         selector: `.${component.style.className.trim()}${selector.trim()}`,
                         content: content,
                    };
               };

               styleselectors.forEach((style) => {
                    if (component.style[`${style.prop}`]) {
                         if (style.type === "selector") {
                              vDOM.style.push(
                                   styleObject(style.name, component.style[`${style.prop}`])
                              );
                         }
                         if (style.type === "animation") {
                              component.style[`${style.prop}`].forEach((animation) => {
                                   vDOM.animations.push(animation);
                              });
                         }
                         if (style.type === "media") {
                              component.style[`${style.prop}`].forEach((media) => {
                                   vDOM.mediaQueries.push(media);
                              });
                         }
                    }
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
