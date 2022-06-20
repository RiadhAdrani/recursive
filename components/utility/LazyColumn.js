import { CreateComponent } from "../../index.js";
import View from "../View";

class LazyColumnView extends View {
    constructor() {
        super("lazy-column");
    }
}

class LazyColumn extends CreateComponent {
    constructor({ children, onObserved, props, key, events, style, flags, hooks }) {
        super({
            tag: "lazy-column",
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

View.makeDefaultStyle("lazy-column{display:flex;flex-direction:column;}");

export default ({ children, onObserved, props, key, events, style, flags, hooks }) => {
    return new LazyColumn({
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
