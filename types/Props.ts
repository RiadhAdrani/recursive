import { CreateComponent } from "../components/View";
import Attributes from "./Attributes";
import Events from "./Events";
import Style from "./Style";

interface Base extends Attributes, Events {
    flags?: {
        renderIf: boolean;
        foreceRerender: boolean;
    };
    hooks?: {
        onRef?: (element: HTMLElement) => string;
        onCreated?: (Element: HTMLElement) => void;
        onUpdated?: (Element: HTMLElement) => void;
        beforeDestroyed?: (Element: HTMLElement) => void;
        onDestroyed?: (Element: HTMLElement) => void;
    };
    style: Style;
}

interface Props extends Base {
    children?: CreateComponent[];
}

interface Lazy extends Props {
    onObserved?: () => void;
}

export { Props, Lazy };
