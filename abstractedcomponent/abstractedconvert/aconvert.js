import aconvertanimation from "./aconvertanimation.js";
import aconvertbackground from "./aconvertbackground.js";
import aconvertbox from "./aconvertbox.js";
import aconvertposition from "./aconvertposition.js";
import aconverttext from "./aconverttext.js";

export default (Selector, style) => {
     return {
          ...aconverttext(Selector.Text),
          ...aconvertbackground(Selector.Background),
          ...aconvertbox(Selector.Box),
          ...aconvertposition(Selector.Position),
          ...aconvertanimation(Selector.Animation, style),
     };
};
