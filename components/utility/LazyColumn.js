import { View, Lazy, CreateComponent } from "../View";

class LazyColumnView extends View {
    constructor() {
        super("lazy-column");
    }
}

class LazyColumn extends CreateComponent {
    constructor(props) {
        super({
            ...props,
            tag: "lazy-column",
        });

        this.data = { itemCount: this.children.length };

        const _onRef = this.hooks.onRef || (() => {});

        this.hooks.onRef = () => {
            _onRef();

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

/**
 * @param {Lazy} props
 */
export default (props) => {
    return new LazyColumn({
        ...props,
    });
};
