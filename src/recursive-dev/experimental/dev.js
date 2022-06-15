import { Render, CreateComponent, setState } from "../../../index.js";

Render(() => {
    const [value, setvalue] = setState("value", [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const Item = (key) =>
        new CreateComponent({
            tag: "button",
            children: ["item: ", key],
            key,
            events: {
                onClick: () => {
                    setvalue(value.filter((x) => x != key));
                },
            },
        });

    return new CreateComponent({
        tag: "div",
        children: value.map((number) => Item(number)),
    });
});
