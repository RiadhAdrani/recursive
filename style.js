import RecursiveCSSOM from "./RecursiveCCSOM/RecursiveCSSOM.js";

const setStaticStyle = (cssobject) => {
    RecursiveCSSOM.singleton.injectStaticStyle(cssobject);
};

const setStyle = (cssobject) => {
    RecursiveCSSOM.singleton.addDynamicDeclaration(cssobject);
};

export { setStaticStyle, setStyle };
