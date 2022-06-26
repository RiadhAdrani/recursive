const { Render, setState, setCache, Link, renderRoute, getRoute } = require("../../web");
const { LazyColumn, Fragment, P } = require("../../web/Html.elements.js");
const { Svg, Circle } = require("../../web/Svg.elements");

Render({
    router: {
        route: { path: "/", component: () => "Home" },
        scroll: true,
    },
    app: () => {
        const [value, setValue] = setState(
            "value",
            [1, 2, 3, 4, 5, 6, 10, 12, 13, 15, 19, 17, 20, 100]
        );

        const [count, setCount] = setCache("count", 10);

        return LazyColumn({
            children: [
                Svg({
                    viewBox: "0 0 24 24",
                    height: "50px",
                    width: "50px",
                    style: { scoped: true, normal: { border: "2px solid white" } },
                    children: [Circle({ r: 10, cy: 10, cx: 10, fill: "red" })],
                }),
                Fragment({
                    children: value.slice(0, count).map((item) =>
                        P({
                            key: item,
                            children: item,
                            dataSet: {
                                key: item,
                            },
                            onClick: () => {
                                setValue([...value.filter((i) => i !== item), item]);
                            },
                            style: {
                                scoped: true,
                                normal: {
                                    color: "white",
                                    padding: "10px",
                                    margin: "5px",
                                    border: "1px solid white",
                                },
                            },
                        })
                    ),
                }),
            ],
            hooks: { onRef: () => "Hello" },
            onObserved: () => {
                if (count < value.length) {
                    setCount(count + 10);
                }
            },
            style: {
                scoped: true,
                normal: {
                    color: "white",
                    background: "black",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                },
                focusWithin: {
                    outlineColor: "red",
                    outlineOffset: "3px",
                    outlineWidth: "5px",
                },
                hover: { background: "#3e3e3e" },
            },
        });
    },
    root: document.body,
});
