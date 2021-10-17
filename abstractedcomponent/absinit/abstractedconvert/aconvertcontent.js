const list = {
     type: "display",
     direction: "flexDirection",
     mainAxisAlignment: "justifyContent",
     crossAxisAlignment: "alignItems",
     wrapItems: "flexWrap",
     selectable: "userSelect",
};

export default (Content) => {
     const textCss = {};

     if (Content) {
          for (var x in Content) {
               if (list[x]) {
                    textCss[list[x]] = Content[x];
               }
          }
     }

     return textCss;
};
