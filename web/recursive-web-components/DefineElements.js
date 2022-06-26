import { View, addDefaultStyle } from "./View";

const COLUMN_VIEW = "column-view";
const ROW_VIEW = "row-view";
const LAZY_COLUMN = "lazy-column";
const LAZY_ROW = "lazy-row";

class Column extends View {
    constructor() {
        super(COLUMN_VIEW);
    }
}

addDefaultStyle("column-view", { display: "flex", flexDirection: "column" });

class Row extends View {
    constructor() {
        super(ROW_VIEW);
    }
}

addDefaultStyle("row-view", { display: "flex", flexDirection: "row" });

class LazyColumn extends View {
    constructor() {
        super(LAZY_COLUMN);
    }
}

addDefaultStyle("lazy-column", { display: "flex", flexDirection: "column" });

class LazyRow extends View {
    constructor() {
        super(LAZY_ROW);
    }
}

addDefaultStyle("lazy-row", { display: "flex", flexDirection: "row" });
