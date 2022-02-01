import { throwError } from "../RecursiveDOM/RecursiveError";
import PropList from "../RecursiveDOM/PropList.js";

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
                         throwError(
                              `"${selector}" is not a valid CSS selector or is not yet implemented.`,
                              [
                                   'Wrap your style inside a "normal" selector when using the "styleSheet".',
                                   "You may have typos.",
                              ]
                         );
                    }
               }
          } else {
               throwError(`"className" is missing in the "styleSheet"`, [
                    'The styleSheet does not include a "className" definition.',
                    'The "styleSheet" should include a valid "className" to be applied.',
               ]);
          }
     }
};
