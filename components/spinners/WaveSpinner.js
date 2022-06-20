import CreateComponent from "../../index.js";
import View from "../View.js";

class WaveSpinner extends View {
    constructor() {
        super("wave-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "30px",
    thickness = "1px",
    style = "solid",
    color = "black",
    duration = "1s",
    maxScale = 1.5,
    minScale = 0.5,
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "wave-spinner" + size + thickness + style + color + duration + maxScale + minScale
    );

    const common = {
        content: "''",
        borderRadius: "50%",
        position: "absolute",
        border: `${thickness} ${style} ${color}`,
        width: "100%",
        height: "100%",
        left: `0px`,
        animationDuration: duration,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
    };

    return new CreateComponent({
        tag: "wave-spinner",
        flags,
        style: {
            scoped: true,
            normal: {
                height: size,
                width: size,
                display: "inline-block",
                boxSizing: "content-box",
                opacity: 1,
                borderRadius: "50%",
                position: "relative",
            },
            before: {
                ...common,
                transform: "scale(1,1)",
                opacity: 1,
                animationName: animationName + "before",
            },
            after: {
                ...common,
                transform: "scale(0,0)",
                opacity: 1,
                animationName: animationName + "after",
            },
            animations: [
                {
                    name: animationName,
                    steps: {},
                },
                {
                    name: animationName + "after",
                    steps: {
                        from: { transform: `scale(${(minScale, minScale)})`, opacity: 0 },
                        to: { transform: "scale(1,1)", opacity: 1 },
                    },
                },
                {
                    name: animationName + "before",
                    steps: {
                        from: { transform: "scale(1,1)", opacity: 1 },
                        to: { transform: `scale(${(maxScale, maxScale)})`, opacity: 0 },
                    },
                },
            ],
        },
    });
}
