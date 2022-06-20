import CreateComponent from "../../index.js";
import View from "../View.js";

class ThreeBallsLoading extends View {
    constructor() {
        super("three-balls-loading");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "18px",
    color = "black",
    spacing = "10px",
    duration = "1s",
    minOpacity = 0.25,
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "three-balls-loading" + size + color + spacing
    );

    const ball = {
        borderRadius: "50%",
        backgroundColor: color,
        width: size,
        height: size,
        transformOrigin: "center center",
        display: "inline-block",
        position: "relative",
        animationDuration: duration,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
    };

    return new CreateComponent({
        tag: "three-balls-loading",
        flags,
        style: {
            scoped: true,
            normal: { ...ball, opacity: 1, animationName, boxSizing: "content-box" },
            before: {
                ...ball,
                content: "''",
                position: "absolute",
                left: `calc(${spacing} + ${size})`,
                top: "0px",
                animationName: animationName + "before",
            },
            after: {
                ...ball,
                position: "absolute",
                content: "''",
                opacity: minOpacity,
                left: `calc(-${spacing} - ${size})`,
                animationName: animationName + "after",
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        "0%": { opacity: 1 },
                        "33%": { opacity: minOpacity },
                        "66%": { opacity: minOpacity },
                        "100%": { opacity: 1 },
                    },
                },
                {
                    name: animationName + "before",
                    steps: {
                        "0%": { opacity: minOpacity },
                        "33%": { opacity: 1 },
                        "66%": { opacity: minOpacity },
                    },
                },
                {
                    name: animationName + "after",
                    steps: {
                        "33%": { opacity: minOpacity },
                        "66%": { opacity: 1 },
                        "100%": { opacity: minOpacity },
                    },
                },
            ],
        },
    });
}
