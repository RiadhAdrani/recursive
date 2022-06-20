import CreateComponent from "../../index.js";
import View from "../View.js";

class ThreeBarsLoading extends View {
    constructor() {
        super("three-bars-loading");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    height = "28px",
    width = "7px",
    color = "#8c8c8c",
    borderThickness = "2px",
    borderStyle = "solid",
    borderColor = "#4c4c4c",
    spacing = "10px",
    duration = "1s",
    minScale = 0.75,
    maxScale = 1.25,
    flags,
}) {
    const animationName = View.makeAnimationNameWithString("three-bars-spinner" + color + spacing);

    const ball = {
        backgroundColor: color,
        boxSizing: "content-box",
        width,
        height,
        border: `${borderThickness} ${borderStyle} ${borderColor}`,
        transformOrigin: "center center",
        display: "inline-block",
        position: "relative",
        animationDuration: duration,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
    };

    return new CreateComponent({
        tag: "three-bars-loading",
        flags,
        style: {
            scoped: true,
            normal: { ...ball, animationName },
            before: {
                ...ball,
                content: "''",
                position: "absolute",
                left: `calc(${spacing} + ${width} - ${borderThickness})`,
                top: `calc(0px - ${borderThickness})`,
                animationName: animationName + "before",
            },
            after: {
                ...ball,
                position: "absolute",
                content: "''",
                top: `calc(0px - ${borderThickness})`,
                left: `calc(-${spacing} - ${width} - ${borderThickness})`,
                animationName: animationName + "after",
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        "0%": { transform: `scale(1,1)` },
                        "25%": { transform: `scale(1,1)` },
                        "50%": { transform: `scale(1,${maxScale})` },
                        "75%": { transform: `scale(1,1)` },
                        "100%": { transform: `scale(1,1)` },
                    },
                },
                {
                    name: animationName + "before",
                    steps: {
                        "0%": { transform: `scale(1,1)` },
                        "25%": { transform: `scale(1.1,${maxScale})` },
                        "50%": { transform: `scale(1,${minScale})` },
                        "75%": { transform: `scale(1,1)` },
                        "100%": { transform: `scale(1,1)` },
                    },
                },
                {
                    name: animationName + "after",
                    steps: {
                        "0%": { transform: `scale(1,1)` },
                        "25%": { transform: `scale(1,1)` },
                        "50%": { transform: `scale(1,${minScale})` },
                        "75%": { transform: `scale(1,${maxScale})` },
                        "100%": { transform: `scale(1,1)` },
                    },
                },
            ],
        },
    });
}
