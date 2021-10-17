const list = {
     delay: "transitionDelay",
     duration: "transitionDuration",
     timingFunction: "transitionTimingFunction",
};

export default (Transition) => {
     const textCss = {};

     if (Transition) {
          for (var x in Transition) {
               if (list[x]) {
                    textCss[list[x]] = Transition[x];
               }
          }
     }

     return textCss;
};
