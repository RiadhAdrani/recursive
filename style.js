import RecursiveCSSOM from "./RecursiveCCSOM/RecursiveCSSOM.js";

const set = (cssobject) => {
     RecursiveCSSOM.singleton.injectStaticStyle(cssobject);
};

export { set as SetStyle };
