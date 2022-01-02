import PropList from "../RecursiveDOM/PropList.js";

function ThrowStyleError(msg) {
     const e = new Error(`Failed to compute style => ${msg}`);
     throw e;
}

export default (styleSheet, selectors, mediaQueries, animations) => {
     if (styleSheet) {
          if (styleSheet.className) {
               const styleObject = (selector, content) => {
                    return {
                         selector: `.${styleSheet.className.trim()}${selector.trim()}`,
                         content: content,
                    };
               };

               if (styleSheet.mediaQueries) {
                    mediaQueries.push({
                         queries: styleSheet.mediaQueries,
                         className: styleSheet.className,
                    });
               }

               if (styleSheet.animations) {
                    styleSheet.animations.forEach((animation) => {
                         animations.push(animation);
                    });
               }

               for (var selector in styleSheet) {
                    if (
                         selector === "mediaQueries" ||
                         selector === "animations" ||
                         selector === "className"
                    )
                         continue;

                    if (PropList.CssSelectors[selector] || selector === "normal") {
                         selectors.push(
                              styleObject(PropList.CssSelectors[selector], styleSheet[selector])
                         );
                    } else {
                         ThrowStyleError(
                              `${selector} is not a valid CSS selector, or is still not implemented in the library.`
                         );
                    }
               }
          } else {
               ThrowStyleError("Unable to apply style, className is missing from the styleSheet.");
          }
     }
};
