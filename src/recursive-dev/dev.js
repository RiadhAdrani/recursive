import { Render, setCache, setStyle } from "../../index.js";
import { Button, Column } from "../../components.js";
import { setState } from "../recursive-state/SetState.js";

Render(() => {
    const [show, setShow] = setCache("show", false);
    const [cringe, setCringe] = setState("fuck", true);

    setStyle({ selectors: { "*": { fontSize: "50px" } } });

    return Column({
        children: [
            Button({
                className: "what",
                text: show && cringe ? "Hide" : "Show",
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
