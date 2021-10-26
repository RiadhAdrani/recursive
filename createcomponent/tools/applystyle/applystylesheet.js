import styleselectors from "../../../vdom/props/styleselectors.js";

/**
 * Push styles, animations and media queries into the Virtual DOM to be processed and then applied.
 * @param component this (can't be called outside CreateComponent)
 */
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

               for (var selector in component.style) {
                    if (styleselectors[selector]) {
                         if (styleselectors[selector].type === "animation") {
                              component.style.animations.forEach((animation) => {
                                   vDOM.animations.push(animation);
                              });
                         } else if (styleselectors[selector].type === "media") {
                              vDOM.mediaQueries.push({
                                   queries: component.style.mediaQueries,
                                   className: component.style.className,
                              });
                         } else {
                              vDOM.style.push(
                                   styleObject(
                                        styleselectors[selector].name,
                                        component.style[selector]
                                   )
                              );
                         }
                    } else {
                         if (!["className"].includes(selector)) {
                              console.warn(`[STYLE]: "${selector}" is not a valid selector.`);
                         }
                    }
               }
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
