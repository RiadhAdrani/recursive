import Selectors from "./Selectors";
import Selector from "./Selector";
import Animation from "./Animation";
import MediaQuery from "./MediaQuery";

export default {
    ...Selectors,
    scoped: false,
    className: "",
    inline: Selector,
    animations: [Animation],
    mediaQueries: [MediaQuery],
};
