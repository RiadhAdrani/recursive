const list = {
     mainAxisAlignment: "alignSelf",
     verticalAlignment: "verticalAlign",
     position: "position",
     top: "top",
     bottom: "bottom",
     right: "right",
     left: "left",
     float: "float",
};

const margin = {
     all: "margin",
     vertical: "vertical",
     horizontal: "horizontal",
     left: "marginLeft",
     top: "marginTop",
     right: "marginRight",
     bottom: "marginBottom",
};

export default (Position) => {
     const textCss = {};

     if (Position) {
          for (var x in Position) {
               if (list[x]) {
                    textCss[list[x]] = Position[x];
               }
          }

          if (Position.margin) {
               for (var b in Position.margin) {
                    if (margin[b]) {
                         if (b === "vertical") {
                              textCss["marginTop"] = Position.margin[b];
                              textCss["marginBottom"] = Position.margin[b];
                         } else if (b === "horizontal") {
                              textCss["marginLeft"] = Position.margin[b];
                              textCss["marginRight"] = Position.margin[b];
                         } else textCss[margin[b]] = Position.margin[b];
                    }
               }
          }
     }

     return textCss;
};
