import CreateComponent from "../../index.js";
import View from "../View.js";

class ClockSpinner extends View {
    constructor() {
        super("clock-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "30px",
    color = "transparent",
    borderThickness = "1px",
    borderColor = "black",
    handThickness = "1px",
    handColor = "black",
    handSpacing = "2px",
    spinDuration = "1s",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "clock-spinner" +
            size +
            color +
            borderThickness +
            borderColor +
            handThickness +
            handColor +
            handSpacing +
            spinDuration
    );

    return new CreateComponent({
        tag: "clock-spinner",
        flags,
        style: {
            scoped: true,
            normal: {
                background: color,
                border: `${borderThickness} solid ${borderColor}`,
                borderRadius: "50%",
                display: "inline-block",
                boxSizing: "content-box",
                position: "relative",
                height: size,
                width: size,
            },
            before: {
                content: "''",
                borderLeft: `${handColor} ${handThickness} solid`,
                position: "absolute",
                boxSizing: "border-box",
                top: handSpacing,
                left: "50%",
                height: `calc( 50% - ${handSpacing})`,
                transform: "rotate(0deg)",
                transformOrigin: "0% 100%",
                animationName,
                animationDuration: spinDuration,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        from: { transform: "rotate(0deg)" },
                        to: { transform: "rotate(359deg)" },
                    },
                },
            ],
        },
    });
}
