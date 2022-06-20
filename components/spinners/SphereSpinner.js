import CreateComponent from "../../index.js";
import View from "../View.js";

class SphereSpinner extends View {
    constructor() {
        super("sphere-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "30px",
    color = "black",
    backgroundColor = "transparent",
    duration = "1s",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "sphere-spinner" + size + color + backgroundColor + duration
    );

    return new CreateComponent({
        tag: "sphere-spinner",
        flags,
        style: {
            scoped: true,
            normal: {
                display: "inline-block",
                boxSizing: "border-box",
                borderRadius: "50%",
                background: backgroundColor,
                height: size,
                width: size,
                borderLeft: `0px solid ${color}`,
                borderRight: `0px solid ${color}`,
                animationName,
                animationDuration: duration,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        "0%": {
                            borderLeftWidth: `0px`,
                            borderRightWidth: `0px`,
                        },
                        "33%": {
                            borderLeftWidth: size,
                            borderRightWidth: `0px`,
                        },
                        "34%": {
                            borderLeftWidth: `0px`,
                            borderRightWidth: size,
                        },
                        "66%": {
                            borderLeftWidth: `0px`,
                            borderRightWidth: `0px`,
                        },
                    },
                },
            ],
        },
    });
}
