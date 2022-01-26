import PropList from "../../RecursiveDOM/PropList.js";
import { throwError } from "../../RecursiveDOM/RecursiveError.js";

function ThrowStyleError(msg) {
     const e = new Error(`Failed to compute style => ${msg}`);
     throw e;
}

export default {
     /**
      * Push styles, animations and media queries into the Virtual DOM to be processed and then applied.
      * @param component this (can't be called outside CreateComponent)
      */
     applySheet: (component) => {
          if (!RecursiveDOM) ThrowStyleError("RecursiveDOM is not initialized.");

          if (component.style) {
               if (component.style.className) {
                    const styleObject = (selector, content) => {
                         return {
                              selector: `.${component.style.className.trim()}${selector.trim()}`,
                              content: content,
                         };
                    };

                    if (component.style.mediaQueries) {
                         RecursiveDOM.style.mediaQueries.push({
                              queries: component.style.mediaQueries,
                              className: component.style.className,
                         });
                    }

                    if (component.style.animations) {
                         component.style.animations.forEach((animation) => {
                              RecursiveDOM.style.animations.push(animation);
                         });
                    }

                    for (var selector in component.style) {
                         if (
                              selector === "mediaQueries" ||
                              selector === "animations" ||
                              selector === "className"
                         )
                              continue;

                         if (PropList.CssSelectors[selector] || selector === "normal") {
                              RecursiveDOM.style.selectors.push(
                                   styleObject(
                                        PropList.CssSelectors[selector],
                                        component.style[selector]
                                   )
                              );
                         } else {
                              throwError(
                                   `${selector} is not a valid CSS selector, or is still not implemented in the library.`,
                                   [
                                        "List of accepted selectors could be found here : https://github.com/RiadhAdrani/recursive/blob/6ca1c1bd2762d26a97f32b36507ef95bd7b85a84/RecursiveDOM/PropList.js#L652 .",
                                   ]
                              );
                         }
                    }
               } else {
                    throwError("className is missing from the styleSheet.", [
                         "styleSheet property need a className to generate component style.",
                         "Add className with a meaningful (and unique if needed) value.",
                    ]);
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
      * @param {JSON} newComponent new component
      * @param {JSON} component current component
      */
     updateInline: (component, newComponent) => {
          let didUpdate = false;

          if (!newComponent.inlineStyle && !component.inlineStyle) return didUpdate;

          if (newComponent.inlineStyle) {
               for (let newProp in newComponent.inlineStyle) {
                    if (component.domInstance.style.hasOwnProperty(newProp)) {
                         component.domInstance.style[newProp] = newComponent.inlineStyle[newProp];
                         if (component.inlineStyle) {
                              if (
                                   component.inlineStyle[newProp] !==
                                   newComponent.inlineStyle[newProp]
                              )
                                   didUpdate = true;
                         } else didUpdate = true;
                    }
               }
               if (component.inlineStyle) {
                    for (let prop in component.inlineStyle) {
                         if (
                              component.domInstance.style.hasOwnProperty(prop) &&
                              !newComponent.inlineStyle.hasOwnProperty(prop)
                         ) {
                              component.domInstance.style[prop] = "";
                         }
                    }
               }
          } else {
               for (let prop in component.inlineStyle) {
                    if (component.domInstance.style.hasOwnProperty(prop)) {
                         component.domInstance.style[prop] = "";
                    }
               }
          }
     },
     /**
      * Update component's inline style
      * @param renderStyle rendered htmlElement
      * @param oldStyle current component style : component.style
      * @param newStyle new component style : newComponent.style
      * @deprecated
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
