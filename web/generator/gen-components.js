const Elements = require("../types/Elements.js");

const component = (tag) => `
/**
 * Create \`<${tag.toLocaleLowerCase()}>\` element.
 * @param {typeof ${tag}Props} props 
 * @returns Recursive Web Element
 */
function ${tag}(props){
    return {...props,elementType:"${tag.toLocaleLowerCase()}"}
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
            default:
                props += `${prop}:"",`;
                break;
        }
    }

    props += "};";

    return props;
};

let imp = `import GlobalAttributes from "./types/GlobalAttributes.js";`;

let elements = "";
let types = "";
let exp = "export {";

for (let element in Elements) {
    types += Props(element, Elements[element]);
    elements += component(element);
    exp += element + ",";
}

exp += "}";

const output = imp + types + elements + exp;

const fs = require("fs");
const path = require("path");

fs.writeFile(path.resolve(__dirname, "../components.js"), output, (err) => {
    console.log(err ? "Failed" : "Success");
});
