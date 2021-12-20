import PropList from "../../RecursiveDOM/PropList.js";

export default {
     /**
      * apply inline style to a component.
      * @param style style as JSON.
      * @param renderStyle style of the htmlElement, basically htmlElement.style.
      */
     applyInline: (style, renderStyle) => {
          for (let prop in style) {
               if (renderStyle.hasOwnProperty(prop)) {
                    renderStyle[prop] = style[prop];
               }
          }
     },
     /**
      * Push styles, animations and media queries into the Virtual DOM to be processed and then applied.
      * @param component this (can't be called outside CreateComponent)
      */
     applySheet: (component) => {
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
                         if (PropList.StyleSheet[selector]) {
                              if (PropList.StyleSheet[selector].type === "animation") {
                                   component.style.animations.forEach((animation) => {
                                        vDOM.animations.push(animation);
                                   });
                              } else if (PropList.StyleSheet[selector].type === "media") {
                                   vDOM.mediaQueries.push({
                                        queries: component.style.mediaQueries,
                                        className: component.style.className,
                                   });
                              } else {
                                   vDOM.style.push(
                                        styleObject(
                                             PropList.StyleSheet[selector].name,
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
     },
     /**
      * @param {JSON} newStyle new style object
      * @param {JSON} oldStyle old style object
      * @param {HTMLElement} render rendered html Element
      */
     updateInline: (newStyle, oldStyle, render) => {
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
     },
     /**
      * Update component's inline style
      * @param renderStyle rendered htmlElement
      * @param oldStyle current component style : component.style
      * @param newStyle new component style : newComponent.style
      */
     updateInlineExcept: (renderStyle, oldStyle, newStyle) => {
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
     },
};
