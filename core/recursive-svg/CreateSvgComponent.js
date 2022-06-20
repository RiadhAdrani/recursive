import CreateComponent from "../create-component/CreateComponent.js";

class CreateSvgComponent extends CreateComponent {
    constructor(props) {
        super(props);
        this.nameSpace = props.nameSpace || "http://www.w3.org/2000/svg";
    }

    createElement() {
        return document.createElementNS(this.nameSpace, this.tag);
    }
}

export default CreateSvgComponent;
