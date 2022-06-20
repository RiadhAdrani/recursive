import { makeURL } from "../../core/recursive-router/RecursiveHistory";
import { goTo } from "../../core/recursive-router/RecursiveRouter";
import { Props, CreateComponent } from "../View";

class LinkView extends CreateComponent {
    constructor(props) {
        super(props);

        if (this.props.href === undefined) return;

        this.to = this.props.href;

        this.props.href = makeURL(this.props.href);

        const _click = this.events.onClick || (() => {});

        this.events.onClick = (e) => {
            e.preventDefault();

            goTo(this.to);

            _click();
        };
    }
}

/**
 * @param {Props} props
 */
export default (props) => new LinkView({ ...props, tag: "a" });
