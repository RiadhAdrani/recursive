import CreateComponent from "../create-component/CreateComponent.js";

class CreateSvgComponent extends CreateComponent {
    constructor({
        tag,
        children,
        events,
        style,
        props,
        flags,
        nameSpace = "http://www.w3.org/2000/svg",
    }) {
        super({ tag, children, events, style, props, flags });
        this.nameSpace = nameSpace || "http://www.w3.org/2000/svg";
    }

    createElement() {
        return document.createElementNS(this.nameSpace, this.tag);
    }
}

export default CreateSvgComponent;
