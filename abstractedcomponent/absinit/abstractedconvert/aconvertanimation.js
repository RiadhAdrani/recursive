import aconvert from "./aconvert.js";

const list = {
     delay: "animationDelay",
     name: "animationName",
     direction: "animationDirection",
     duration: "animationDuration",
     fillMode: "animationFillMode",
     iteration: "animationIterationCount",
     playState: "animationPlayState",
     timingFunction: "animationTimingFunction",
};

export default (Animation, style) => {
     const css = {};
     if (Animation) {
          for (var x in Animation) {
               if (list[x]) {
                    css[list[x]] = Animation[x];
                    if (x === "name") {
                         if (Animation.steps) {
                              const steps = {};
                              for (let s in Animation.steps) {
                                   steps[s] = aconvert(Animation.steps[s]);
                              }
                              if (!style.animations) {
                                   style.animations = [];
                              }

                              style.animations = [
                                   ...style.animations,
                                   { name: Animation[x], steps: steps },
                              ];
                         }
                    }
               }
          }
     }

     return css;
};
