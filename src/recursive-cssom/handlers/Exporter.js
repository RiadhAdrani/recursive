import { SameSelectorHandler } from "./ConflictHandler.js";
import RecursiveCSSOMStyleResolver from "./StyleResolver.js";

export default function (css, animations, mediaQueries, oldStyleText, devMode) {
    let output = [];

    let outputAnimations = [];

    const styleDup = [];
    const animationDup = [];

    for (let i in css) {
        let found = false;

        for (let j in output) {
            if (output[j].selector === css[i].selector) {
                if (!styleDup.includes(output[j].selector)) {
                    styleDup.push(output[j].selector);
                }

                found = true;
                SameSelectorHandler(output[j].content, css[i].content);
                break;
            }
        }

        if (!found) {
            output.push(css[i]);
        }
    }

    if (animations.length > 0) {
        for (let i in animations) {
            let found = false;

            for (let j in outputAnimations) {
                if (outputAnimations[j].name === animations[i].name) {
                    found = true;

                    if (!animationDup.includes(outputAnimations[j].name)) {
                        animationDup.push(outputAnimations[j].name);
                    }

                    outputAnimations = outputAnimations.filter(
                        (a) => a.name !== outputAnimations[j].name
                    );
                    outputAnimations.push(animations[i]);
                    break;
                }
            }

            if (!found) {
                outputAnimations.push(animations[i]);
            }
        }
    }

    const ss = RecursiveCSSOMStyleResolver(output, outputAnimations, mediaQueries);

    const warnings = {
        animation:
            animationDup.length > 0
                ? `DUPLICATE ANIMATION${
                      animationDup.length > 1 ? "S" : ""
                  }: (${animationDup}) => found more than once`
                : false,
        selectors:
            styleDup.length > 0
                ? `DUPLICATE STYLE${
                      styleDup.length > 1 ? "S" : ""
                  }: (${styleDup}) => found more than once.`
                : false,
    };

    return { ss, warnings };
}
