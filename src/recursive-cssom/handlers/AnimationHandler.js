import SelectorHandler from "./SelectorHandler.js";

export default /**
 * Convert an animation json into css format.
 * @param animation animation as a JSON, with each key being a step of the animation ("0%", "100%"), and the value being a json of the style at the current state.
 */
function (animation) {
    let steps = "";
    for (const item in animation.steps) {
        steps += `${item}{${SelectorHandler(animation.steps[`${item}`])}}`;
    }
    return `@keyframes ${animation.name}{${steps}}`;
}
