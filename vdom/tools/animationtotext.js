import csstotext from "./csstotext.js";

/**
 * Convert an animation json into css format.
 * @param animation animation as a JSON, with each key being a step of the animation ("0%", "100%"), and the value being a json of the style at the current state.
 */
export default (animation) => {
     let steps = "";
     for (const item in animation.steps) {
          steps += `\t${item}{\n${csstotext(animation.steps[`${item}`])}\t}\n`;
     }
     return `@keyframes ${animation.name}{\n${steps}}`;
};
