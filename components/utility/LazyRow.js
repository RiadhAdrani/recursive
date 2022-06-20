import { CreateComponent } from "../../index.js";
import View from "../View";

class LazyRowView extends View {
    constructor() {
        super("lazy-row");
    }
}

class LazyRow extends CreateComponent {
    constructor({ children, onObserved, props, key, events, style, flags, hooks }) {
        super({
            tag: "lazy-row",
            children,
            onObserved,
            props,
            key,
            events,
            style,
            flags,
            hooks,
        });

        this.data = { itemCount: this.children.length };

        this.hooks.onRef = () => {
            if (hooks && hooks.onRef && typeof hooks.onRef === "function") hooks.onRef();

            if (this.children.length === 0 || typeof onObserved != "function") return;

            var observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting === true) {
                        observer.unobserve(entries[0].target);

                        if (entries[0].target === this.domInstance.lastChild)
                            onObserved(this.domInstance);
                    }
                },
                { threshold: [0] }
            );

            observer.observe(this.domInstance.lastChild);
        };
    }
}

View.makeDefaultStyle("lazy-row{display:flex;flex-direction:row;}");

export default ({ children, onObserved, props, key, events, style, flags, hooks }) => {
    return new LazyRow({
        onObserved,
        children,
        props,
        key,
        events,
        hooks,
        style,
        flags,
    });
};
