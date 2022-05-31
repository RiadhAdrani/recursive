import { Render, setCache, setStyle } from "./index.js";
import { Button, Column } from "../components.js";

Render(() => {
    const [show, setShow] = setCache("show", false);

    setStyle({ selectors: { "*": { fontSize: "50px" } } });

    return Column({
        children: [
            Button({
                className: "what",
                text: show ? "Hide" : "Show",
                type: "button",
                events: {
                    onClick: () => {
                        setShow(!show);
                    },
                },
                style: {
                    className: "what",
                    scoped: true,
                    normal: { padding: "10px", fontWeight: "bold", fontSize: "2em" },
                },
            }),
        ],
    });
});
