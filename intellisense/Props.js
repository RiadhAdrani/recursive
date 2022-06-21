import Attributes from "./Attributes";
import Events from "./Events";
import Style from "./Style";

const Base = {
    ...Events,
    ...Attributes,
    flags: {
        renderIf: "",
        foreceRerender: "",
    },
    hooks: {
        onRef: (element) => {},
        onCreated: (element) => {},
        onUpdated: (element) => {},
        beforeDestroyed: (element) => {},
        onDestroyed: (element) => {},
    },
    style: Style,
};

const Props = {
    ...Base,
    children: [],
};

const Lazy = {
    ...Props,
    onObserved: () => {},
};

export { Props, Lazy };
