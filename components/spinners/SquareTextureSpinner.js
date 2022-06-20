import CreateComponent from "../../index.js";
import View from "../View.js";

class SquareTextureSpinner extends View {
    constructor() {
        super("square-texture-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    height = "40px",
    width = "40px",
    size = "16px",
    backgroundColor = "transparent",
    duration = "0.6s",
    lineThickness = "1px",
    lineColor = "black",
    borderColor = "black",
    borderRadius = "5px",
    borderThickness = "1px",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "square-texture-spinner" +
            height +
            width +
            size +
            backgroundColor +
            duration +
            lineThickness +
            lineColor +
            borderColor +
            borderRadius +
            borderThickness
    );

    const makeLinearGradient = `linear-gradient(
        45deg, transparent 49%, 
        ${lineColor} 50%, 
        ${lineColor} calc(50%), 
        transparent calc(50% + ${lineThickness}), 
        transparent
        )
    ,linear-gradient(
        -45deg, transparent 49%, 
        ${lineColor} 50%, 
        ${lineColor} calc(50%), 
        transparent calc(50% + ${lineThickness}),  
        transparent)`;

    return new CreateComponent({
        tag: "square-texture-spinner",
        flags,
        style: {
            scoped: true,
            normal: {
                height,
                width,
                display: "inline-block",
                boxSizing: "border-box",
                borderWidth: borderThickness,
                borderStyle: "solid",
                borderRadius,
                borderColor,
                backgroundColor,
                position: "relative",
                backgroundImage: makeLinearGradient,
                backgroundPosition: "0% 0%",
                backgroundSize: `${size} ${size}`,
                backgroundRepeat: "repeat",
                animationName,
                animationDuration: duration,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
            },
            animations: [
                {
                    name: animationName,
                    steps: {
                        from: { backgroundPosition: `0px 0px` },
                        to: { backgroundPosition: `-${size} 0px` },
                    },
                },
            ],
        },
    });
}
