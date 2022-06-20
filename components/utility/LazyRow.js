import { View, Lazy, CreateComponent } from "../View";

class LazyRowView extends View {
    constructor() {
        super("lazy-row");
    }
}

class LazyRow extends CreateComponent {
    constructor({ onObserved, ...props }) {
        super({
            onObserved,
            ...props,
            tag: "lazy-row",
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

View.makeDefaultStyle("lazy-row{display:flex;flex-direction:row;}");

/**
 * @param {Lazy} props
 */
export default (props) => {
    return new LazyRow({
        ...props,
    });
};
