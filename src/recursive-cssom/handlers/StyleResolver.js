import { PrepareMediaQueries } from "./ConflictHandler";
import MediaQueryHandler from "./MediaQueryHandler.js";
import SelectorHandler from "./SelectorHandler.js";
import AnimationHandler from "./AnimationHandler.js";

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
