import {
    DevMode,
    Render,
    setState,
    route,
    createRouter,
    renderRoute,
    setStyle,
} from "../../index.js";
import CreateComponent from "../create-component/CreateComponent.js";

DevMode(true);

createRouter(
    route({
        name: "/",
        component: () => "Hello World",
        subRoutes: [route({ name: "/hola", component: () => "hola" })],
    })
);

Render(() => {
    const [value, setValue] = setState("value", 3);

    setStyle({
        var: {
            x: "red",
        },
    });

    return new CreateComponent({
        hooks: { onRef: () => "test" },
        tag: "div",
        props: { className: "cringe" },
        data: { value },
        style: { className: "true", scoped: true },
        children: [
            new CreateComponent({
                tag: "span",
                children: "value = " + value,
                style: {
                    className: "Hello",
                    scoped: true,
                    normal: { backgroundColor: "var(--x)" },
                    mediaQueries: [{ condition: "(max-width:500px)", normal: { color: "white" } }],
                    animations: [
                        {
                            name: "anime-is-cringe",
                            steps: { from: { color: "yellow" }, to: { color: "green" } },
                        },
                    ],
                },
                events: { onClickGlobal: () => console.log("Clicked somewhere else !") },
            }),
            new CreateComponent({
                tag: "button",
                children: "value = " + (value + 1),
                events: {
                    onClick: (e) => {
                        setValue(value + 1);
                    },
                },
            }),
            renderRoute(),
        ],
    });
});
