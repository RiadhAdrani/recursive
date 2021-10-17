const list = {
     color: "color",
     family: "fontFamily",
     kerning: "fontKerning",
     size: "fontSize",
     stretch: "fontStretch",
     style: "fontStyle",
     weight: "fontWeight",
     lineHeight: "lineHeight",
     letterSpacing: "letterSpacing",
     transform: "textTransform",
     alignment: "textAlign",
     decoration: "textDecoration",
     justification: "textJustify",
     shadow: "textShadow",
     overflow: "textOverflow",
     indentation: "textIndent",
     wordSpacig: "wordSpacing",
     wordWrap: "wordWrap",
     writingMode: "writingMode",
     wordBreak: "wordBreak",
};

export default (Text) => {
     const textCss = {};

     if (Text) {
          for (var x in Text) {
               if (list[x]) {
                    textCss[list[x]] = Text[x];
               }
          }
     }

     return textCss;
};
