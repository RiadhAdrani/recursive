import RecursiveCSSOM from "./RecursiveCCSOM/RecursiveCSSOM.js";

const set = (cssobject) => {
     RecursiveCSSOM.setStyle(cssobject);
};

export { set as setStyle };
