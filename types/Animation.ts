import Selector from "./Selector";

export default interface Animation {
    name?: "string";
    steps?: {
        from: Selector;
        to: Selector;
    };
}
