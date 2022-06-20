import MediaQuery from "./MediaQuery";
import Animation from "./Animation";
import Selectors from "./Selectors";
import Selector from "./Selector";

export default interface Style extends Selectors {
    scoped?: boolean;
    className?: string;
    inline?: Selector;
    animations?: Animation[];
    mediaQueries?: MediaQuery[];
}
