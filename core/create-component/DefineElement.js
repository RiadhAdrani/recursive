class DefineElement extends HTMLElement {
    constructor(tag) {
        customElements.define(tag, this);
    }
}

export default DefineElement;
