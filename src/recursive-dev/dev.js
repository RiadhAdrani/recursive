import { Render } from "../../index.js";
import CreateComponent from "../create-component/CreateComponent.js";
import CreateSvgComponent from "../recursive-svg/CreateSvgComponent.js";

Render(() => {
    return new CreateComponent({
        tag: "div",
        props: { className: "cringe" },
        style: { className: "true", scoped: true },
        children: [
            new CreateSvgComponent({
                tag: "svg",
                props: {
                    viewBox: "0 0 100 100",
                },
                style: { inline: { height: "100px", width: "100px" } },
                children: [
                    new CreateSvgComponent({
                        tag: "rect",
                        props: { x: "0", y: "0", width: "25", height: "25" },
                        children: [
                            new CreateSvgComponent({
                                tag: "animate",
                                props: {
                                    attributeType: "XML",
                                    attributeName: "y",
                                    from: "0",
                                    to: "50",
                                    dur: "1s",
                                    repeatCount: "indefinite",
                                },
                            }),
                            new CreateSvgComponent({
                                tag: "animate",
                                props: {
                                    attributeType: "XML",
                                    attributeName: "x",
                                    from: "0",
                                    to: "50",
                                    dur: "1s",
                                    repeatCount: "indefinite",
                                },
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
});
