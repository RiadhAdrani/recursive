import Selectors from "./Selectors";
import Selector from "./Selector";

export default {
    ...Selectors,
    scoped: undefined,
    className: undefined,
    inline: Selector,
    animations: [],
    mediaQueries: [],
};
