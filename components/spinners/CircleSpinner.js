import CreateComponent from "../../index.js";
import View from "../View.js";

class CircleSpinner extends View {
    constructor() {
        super("circle-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "20px",
    thickness = "5px",
    color = "#c8c8c8",
    style = "solid",
    spinColor = "black",
    spinDuration = "0.6s",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "circle-spinner" + size + thickness + color + style + spinColor + spinDuration
    );

    return new CreateComponent({
        flags,
        tag: "circle-spinner",
        style: {
            scoped: true,
            normal: {
                display: "inline-block",
                boxSizing: "content-box",
                height: size,
                width: size,
                borderWidth: thickness,
                borderColor: color,
                borderStyle: style,
                borderTopColor: spinColor,
                borderRadius: "50%",
                animationName: animationName,
                animationDuration: spinDuration,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    },
                },
            ],
        },
    });
}
