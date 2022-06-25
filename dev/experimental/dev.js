const { Render, renderRoute, setState, setStyle, setCache, getRef } = require("../../web");
const { Div } = require("../../web/components");

Render({
    router: {
        route: { path: "/", component: () => "Home" },
        base: "hello",
        scroll: true,
    },
    app: () => {
        const [value, setValue] = setState("value", 0);
        const [cache, useCache] = setCache("cache", "Cached");

        console.log(getRef("Hello", document.createElement("a")));

        setStyle({
            selectors: {
                div: {
                    border: value + "px" + " solid yellow",
                },
            },
        });

        return Div({
            children: ["hello", value, cache, renderRoute()],
            hooks: { onRef: () => "Hello" },
            onClick: () => {
                setValue(value + 10);
                useCache(cache + "hehe");
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
