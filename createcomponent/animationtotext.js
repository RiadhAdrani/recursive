import csstotext from "./csstotext.js";

export default (animation) => {
     let steps = "";
     for (const item in animation.steps) {
          steps += `\t${item}{\n${csstotext(animation.steps[`${item}`])}\t}\n`;
     }
     return `@keyframes ${animation.name}{\n${steps}}`;
};
