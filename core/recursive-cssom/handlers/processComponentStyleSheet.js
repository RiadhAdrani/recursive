import { isValidName } from "../CssAnimations";
import { is as isSelector, get as getSelector } from "../CssSelectors";

/**
 * Process the given component stylesheet and convert it into a unified format.
 * @param {JSON} styleSheet
 * @returns {JSON}
 */
export default function (styleSheet) {
    const output = {};

    if (!styleSheet || styleSheet.className === undefined) return output;

    function makeSelectorObject(className, selector, content) {
        if (!isSelector(selector) || !className || !content) return;

        let key = "." + className + getSelector(selector);

        return { key, content };
    }

    for (let key in styleSheet) {
        switch (key) {
            case "animations":
                if (!Array.isArray(styleSheet.animations)) break;

                output.animations = {};

                styleSheet.animations.forEach((animation) => {
                    if (isValidName(animation.name) && animation.steps) {
                        output.animations[animation.name] = animation.steps;
                    }
                });

                break;
            case "mediaQueries":
                if (!Array.isArray(styleSheet.mediaQueries)) break;

                output.mediaQueries = {};

                styleSheet.mediaQueries.forEach((query) => {
                    if (!query.condition) return;

                    for (let selector in query) {
                        const res = makeSelectorObject(
                            styleSheet.className,
                            selector,
                            query[selector]
                        );

                        if (res) {
                            if (!output.mediaQueries[query.condition])
                                output.mediaQueries[query.condition] = {};

                            output.mediaQueries[query.condition][res.key] = res.content;
                        }
                    }
                });
                break;
            default:
                if (!isSelector(key)) break;

                const res = makeSelectorObject(styleSheet.className, key, styleSheet[key]);

                if (res) {
                    if (!output.selectors) output.selectors = {};
                    output.selectors[res.key] = res.content;
                }

                break;
        }
    }

    return output;
}
