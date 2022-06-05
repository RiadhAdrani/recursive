import { PrepareMediaQueries } from "./RecursiveCSSOMConflictHandler";
import MediaQueryHandler from "./RecursiveCSSOMMediaQueryHandler.js";
import SelectorHandler from "./RecursiveCSSOMSelectorHandler.js";
import AnimationHandler from "./RecursiveCSSOMAnimationHandler.js";

export default function (css, animations, mediaQueries) {
    let output = "";
    css.forEach((s) => {
        output += `${s.selector}{${SelectorHandler(s.content)}}`;
    });
    animations.forEach((a) => {
        output += AnimationHandler(a);
    });

    output += `${MediaQueryHandler(PrepareMediaQueries(mediaQueries))}`;

    return output;
}
