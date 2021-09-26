export default (style, renderStyle) => {
     for (let prop in style) {
          if (!["length", "size", "parentRule"].includes(prop)) {
               if (renderStyle.hasOwnProperty(prop) && style[`${prop}`] !== "") {
                    renderStyle[`${prop}`] = style[`${prop}`];
               }
          }
     }
};
