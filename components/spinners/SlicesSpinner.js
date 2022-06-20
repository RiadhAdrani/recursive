import CreateComponent from "../../index.js";
import View from "../View.js";

class SlicesSpinner extends View {
    constructor() {
        super("slices-spinner");
    }
}

/**
 * @color color must be of the rgb pattern. example : for black, input `"0,0,0"`
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    thickness = "16px",
    color = "0,0,0",
    maxOpacity = 0.75,
    minOpacity = 0.25,
    duration = "1s",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "slices-spinner" + thickness + color + minOpacity,
        duration
    );

    return new CreateComponent({
        tag: "slices-spinner",
        flags,
        style: {
            scoped: true,
            normal: {
                display: "inline-block",
                boxSizing: "border-box",
                borderWidth: thickness,
                borderStyle: "solid",
                borderRadius: "50%",
                borderTopColor: `rgba(${color},${maxOpacity})`,
                borderRightColor: `rgba(${color},${minOpacity})`,
                borderBottomColor: `rgba(${color},${minOpacity})`,
                borderLeftColor: `rgba(${color},${minOpacity})`,
                animationName,
                animationDuration: duration,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        "0%,100%": {
                            borderTopColor: `rgba(${color},${maxOpacity})`,
                            borderRightColor: `rgba(${color},${minOpacity})`,
                            borderBottomColor: `rgba(${color},${minOpacity})`,
                            borderLeftColor: `rgba(${color},${minOpacity})`,
                        },
                        "25%": {
                            borderTopColor: `rgba(${color},${minOpacity})`,
                            borderRightColor: `rgba(${color},${maxOpacity})`,
                            borderBottomColor: `rgba(${color},${minOpacity})`,
                            borderLeftColor: `rgba(${color},${minOpacity})`,
                        },
                        "50%": {
                            borderTopColor: `rgba(${color},${minOpacity})`,
                            borderRightColor: `rgba(${color},${minOpacity})`,
                            borderBottomColor: `rgba(${color},${maxOpacity})`,
                            borderLeftColor: `rgba(${color},${minOpacity})`,
                        },
                        "75%": {
                            borderTopColor: `rgba(${color},${minOpacity})`,
                            borderRightColor: `rgba(${color},${minOpacity})`,
                            borderBottomColor: `rgba(${color},${minOpacity})`,
                            borderLeftColor: `rgba(${color},${maxOpacity})`,
                        },
                    },
                },
            ],
        },
    });
}
