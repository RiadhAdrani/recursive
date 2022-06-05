import DefineElement from "./DefineElement.js";

const defaultStyles = [];

class HTMLContainer extends DefineElement {
    constructor() {
        super("html-container");
    }
}
defaultStyles.push({ tag: "html-container", normal: { display: "block" } });

class EmptyBox extends DefineElement {
    constructor() {
        super("empty-box");
    }
}
defaultStyles.push({ tag: "empty-box", normal: { display: "block" } });

class ListView extends DefineElement {
    constructor() {
        super("list-view");
    }
}
defaultStyles.push({ tag: "list-view", normal: { display: "flex" } });

class ColumnView extends DefineElement {
    constructor() {
        super("column-view");
    }
}
defaultStyles.push({ tag: "column-view", normal: { display: "flex", flexDirection: "column" } });

class RowView extends DefineElement {
    constructor() {
        super("row-view");
    }
}
defaultStyles.push({ tag: "row-view", normal: { display: "flex", flexDirection: "row" } });

class SpinnerView extends DefineElement {
    constructor() {
        super("border-spinner");
    }
}
defaultStyles.push({ tag: "border-spinner", normal: { display: "block" } });

export default defaultStyles;
