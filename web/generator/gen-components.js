const Elements = require("../recursive-web-components/HTMLelements.js");
const Custom = require("../recursive-web-components/Utilities.js");
const SVG = require("../recursive-web-components/SVGelements.js");

const component = (tag) => `
/**
 * Create \`<${tag.toLocaleLowerCase()}>\` element.
 * @param {typeof ${tag}Props} props 
 * @returns Recursive Web Element
 */
function ${tag}(props){
    return {...props,elementType:"${tag.toLocaleLowerCase()}"};
}`;

const svgComponent = (tag) => `
/**
 * Create \`<${tag.toLocaleLowerCase()}>\` element.
 * @param {typeof ${tag}Props} props 
 * @returns Recursive Web Element
 */
function ${tag}(props){
    return {...props,rendererOptions:{ns:"http://www.w3.org/2000/svg"},elementType:"${tag.toLocaleLowerCase()}"};
}`;

const customComponent = (name, tag, handler) => `
/**
 * Create \`<${tag.toLocaleLowerCase()}>\` element.
 * @param {typeof ${name}Props} props 
 * @returns Recursive Web Element
 */
function ${name}(props){
    const el = {...props,elementType:"${tag.toLocaleLowerCase()}"}

    ${handler ? `CustomElements.${name}.handler(el);` : ""}

    return el;
 
}`;

const Props = (tag, item) => {
    let props = `const ${tag}Props = {...GlobalAttributes,`;

    for (let prop in item.props) {
        switch (item.props[prop]) {
            case "string":
                props += `${prop}:"",`;
                break;
            case "number":
                props += `${prop}:1,`;
                break;
            case "boolean":
                props += `${prop}:false,`;
                break;
            case "function":
                props += `${prop}:() => {},`;
                break;
            default:
                props += `${prop}:"",`;
                break;
        }
    }

    props += "};";

    return props;
};

(() => {
    let imp = `import GlobalAttributes from "../types/GlobalAttributes.js";
import CustomElements from "../recursive-web-components/Utilities.js"`;

    let elements = "";
    let types = "";
    let exp = "export {";

    for (let element in Elements) {
        types += Props(element, Elements[element]);
        elements += component(element);
        exp += element + ",";
    }

    for (let element in Custom) {
        types += Props(element, Custom[element]);
        elements += customComponent(element, Custom[element].tag, Custom[element].handler);
        exp += element + ",";
    }

    exp += "}";

    const output = imp + "\n" + types + "\n" + elements + "\n" + exp;

    const fs = require("fs");
    const path = require("path");

    fs.writeFile(path.resolve(__dirname, "../html/index.js"), output, (err) => {
        console.log(err ? "Failed" : "Success");
    });
})();

(() => {
    let imp = `import GlobalAttributes from "../types/GlobalSVGAttributes.js";`;

    let elements = "";
    let types = "";
    let exp = "export {";

    for (let element in SVG) {
        types += Props(element, SVG[element]);
        elements += svgComponent(element);
        exp += element + ",";
    }

    exp += "}";

    const output = imp + "\n" + types + "\n" + elements + "\n" + exp;

    const fs = require("fs");
    const path = require("path");

    fs.writeFile(path.resolve(__dirname, "../svg/index.js"), output, (err) => {
        console.log(err ? "Failed" : "Success");
    });
})();
