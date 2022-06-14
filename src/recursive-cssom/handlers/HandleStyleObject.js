import { throwError } from "../../recursive-dom/RecursiveError.js";
import { is, get } from "../CssSelectors.js";

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
                    ["mediaQueries", "animations", "className", "scoped", "inline"].includes(
                        selector
                    )
                )
                    continue;

                if (is(selector) || selector === "normal") {
                    selectors.push(styleObject(get(selector), styleSheet[selector]));
                } else {
                    throwError(
                        `"${selector}" is not a valid CSS selector or is not yet implemented.`,
                        [
                            'Wrap your style inside a "normal" selector when using the "style".',
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
