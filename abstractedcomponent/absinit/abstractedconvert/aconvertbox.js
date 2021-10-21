const list = {
     outline: "outline",
     shape: "clipPath",
     shadow: "boxShadow",
     sizing: "boxSizing",
     minHeight: "minHeight",
     maxHeight: "maxHeight",
     height: "height",
     width: "width",
     minWidth: "minWidth",
     maxWidth: "maxWidth",
     cursor: "cursor",
     opacity: "opacity",
     resizable: "resize",
     scrollBehavior: "scrollBehavior",
     filter: "filter",
     transform: "transform",
     overflow: "overflow",
     overflowX: "overflowX",
     overflowY: "overflowY",
     growthFactor: "flexGrow",
     shrinkFactor: "flexShrink",
};

const borderRadius = {
     all: "borderRadius",
     topRight: "borderTopRightRadius",
     topLeft: "borderTopLeftRadius",
     bottomRight: "borderBottomRightRadius",
     bottomLeft: "borderBottomLeftRadius",
};

const border = {
     all: "border",
     color: "borderColor",
     width: "borderWidth",
     style: "borderStyle",
     top: "borderTop",
     topColor: "borderTopColor",
     topStyle: "borderTopStyle",
     topWidth: "borderTopWidth",
     bottom: "borderBottom",
     bottomColor: "borderBottomColor",
     bottomStyle: "borderBottomStyle",
     borderWidth: "borderBottomWidth",
     left: "borderLeft",
     leftColor: "borderLeftColor",
     leftStyle: "borderLeftStyle",
     leftWidth: "borderLeftWidth",
     right: "borderRight",
     rightColor: "borderRightColor",
     rightStyle: "borderRightStyle",
     rightWidth: "borderRightWidth",
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

const padding = {
     all: "padding",
     vertical: "vertical",
     horizontal: "horizontal",
     left: "paddingLeft",
     top: "paddingTop",
     right: "paddingRight",
     bottom: "paddingBottom",
};

export default (Box) => {
     const textCss = {};

     if (Box) {
          for (var x in Box) {
               if (list[x]) {
                    textCss[list[x]] = Box[x];
               }
          }

          if (Box.borderRadius) {
               for (var b in Box.borderRadius) {
                    if (borderRadius[b]) {
                         textCss[borderRadius[b]] = Box.borderRadius[b];
                    }
               }
          }

          if (Box.border) {
               for (var b in Box.border) {
                    if (border[b]) {
                         textCss[border[b]] = Box.border[b];
                    }
               }
          }

          if (Box.padding) {
               for (var b in Box.padding) {
                    if (margin[b]) {
                         if (b === "vertical") {
                              textCss["paddingTop"] = Box.padding[b];
                              textCss["paddingBottom"] = Box.padding[b];
                         } else if (b === "horizontal") {
                              textCss["paddingLeft"] = Box.padding[b];
                              textCss["paddingRight"] = Box.padding[b];
                         } else textCss[padding[b]] = Box.padding[b];
                    }
               }
          }
     }

     return textCss;
};
