const list = {
     image: "backgroundImage",
     color: "backgroundColor",
     clip: "backgroundClip",
     size: "backgroundSize",
     attachment: "backgroundAttachment",
     blendMode: "backgroundBlendMode",
     origin: "backgroundOrigin",
     position: "backgroundPosition",
     repeat: "backgroundRepeat",
};

export default (Background) => {
     const css = {};
     if (Background) {
          for (var x in Background) {
               if (list[x]) {
                    css[list[x]] = Background[x];
               }
          }
     }

     return css;
};
