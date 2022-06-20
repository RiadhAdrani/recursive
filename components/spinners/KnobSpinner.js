import CreateComponent from "../../index.js";
import View from "../View.js";

class VolumeKnobSpinner extends View {
    constructor() {
        super("knob-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "30px",
    color = "black",
    insideSize = `calc(${size} / 3)`,
    insideColor = "white",
    insideSpacing = "5px",
    spinDuration = "0.6s",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "knob-spinner" + size + color + insideColor + insideSize + insideSpacing + spinDuration
    );

    return new CreateComponent({
        tag: "knob-spinner",
        flags,
        style: {
            scoped: true,
            normal: {
                background: color,
                borderRadius: "50%",
                display: "inline-block",
                boxSizing: "content-box",
                position: "relative",
                height: size,
                width: size,
                animationName,
                animationDuration: spinDuration,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
            },
            after: {
                content: "''",
                borderRadius: "50%",
                height: insideSize,
                width: insideSize,
                background: insideColor,
                position: "absolute",
                left: insideSpacing,
                top: insideSpacing,
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(359deg)" },
                    },
                },
            ],
        },
    });
}
