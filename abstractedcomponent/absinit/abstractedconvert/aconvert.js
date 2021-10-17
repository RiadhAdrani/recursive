import aconvertanimation from "./aconvertanimation.js";
import aconvertbackground from "./aconvertbackground.js";
import aconvertbox from "./aconvertbox.js";
import aconvertcontent from "./aconvertcontent.js";
import aconvertposition from "./aconvertposition.js";
import aconverttext from "./aconverttext.js";
import aconverttransition from "./aconverttransition.js";

export default (Selector, style) => {
     return {
          ...aconverttext(Selector.Text),
          ...aconvertbackground(Selector.Background),
          ...aconvertbox(Selector.Box),
          ...aconvertposition(Selector.Position),
          ...aconvertanimation(Selector.Animation, style),
          ...aconvertcontent(Selector.Content),
          ...aconverttransition(Selector.Transition),
     };
};
