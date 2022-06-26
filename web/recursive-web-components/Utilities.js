const COLUMN_VIEW = "column-view";
const ROW_VIEW = "row-view";
const LAZY_COLUMN = "lazy-column";
const LAZY_ROW = "lazy-row";
const SPACER_VIEW = "spacer-view";
const FRAGMENT = "fragment";

module.exports = {
    Fragment: { tag: FRAGMENT, props: {} },
    Column: { tag: COLUMN_VIEW, props: {} },
    Row: { tag: ROW_VIEW, props: {} },
    Spacer: {
        tag: SPACER_VIEW,
        props: { height: "number", width: "number" },
        handler: (element) => {
            element.style = {
                ...element.style,
                scoped: true,
                normal: {
                    minHeight: element.height,
                    height: element.height,
                    maxHeight: element.height,
                    display: "inline-block",
                    maxWidth: element.width,
                    width: element.width,
                    minWidth: element.width,
                },
            };
        },
    },
    LazyColumn: {
        tag: LAZY_COLUMN,
        props: { onObserved: "function" },
        handler: (element) => {
            const _onRef = element.hooks.onRef || (() => {});

            element.hooks.onRef = (instance) => {
                _onRef(instance);

                if (instance.childNodes.length === 0 || typeof element.onObserved != "function")
                    return;

                var observer = new IntersectionObserver(
                    (entries) => {
                        if (entries[0].isIntersecting === true) {
                            observer.unobserve(entries[0].target);

                            if (entries[0].target === instance.lastChild) {
                                element.onObserved(instance);
                            }
                        }
                    },
                    { threshold: [0] }
                );

                observer.observe(instance.lastChild);
            };
        },
    },
    LazyRow: {
        tag: LAZY_ROW,
        props: { onObserved: "function" },
        handler: (element) => {
            const _onRef = element.hooks.onRef || (() => {});

            element.hooks.onRef = (instance) => {
                _onRef(instance);

                if (instance.childNodes.length === 0 || typeof element.onObserved != "function")
                    return;

                var observer = new IntersectionObserver(
                    (entries) => {
                        if (entries[0].isIntersecting === true) {
                            observer.unobserve(entries[0].target);

                            if (entries[0].target === instance.lastChild) {
                                element.onObserved(instance);
                            }
                        }
                    },
                    { threshold: [0] }
                );

                observer.observe(instance.lastChild);
            };
        },
    },
};
