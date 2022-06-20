import CreateComponent from "../../index.js";
import View from "../View.js";

class AtomicSpinner extends View {
    constructor() {
        super("atomic-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "40px",
    atomSize = "10px",
    atomColor = "black",
    innerAtomSize = "10px",
    innerAtomColor = "black",
    color = "transparent",
    borderThickness = "1px",
    borderColor = "black",
    borderStyle = "solid",
    duration = "0.6s",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "atomic-spinner" +
            size +
            atomSize +
            atomColor +
            innerAtomColor +
            innerAtomSize +
            color +
            borderThickness +
            borderColor +
            borderStyle +
            duration
    );

    const common = {
        content: "''",
        position: "absolute",
        borderRadius: "50%",
    };

    return new CreateComponent({
        tag: "atomic-spinner",
        flags,
        data: {
            size,
            atomSize,
            atomColor,
            innerAtomColor,
            innerAtomSize,
            color,
            borderThickness,
            borderColor,
            borderStyle,
            duration,
            animationName,
        },
        style: {
            scoped: true,
            normal: {
                background: color,
                border: `${borderThickness} ${borderStyle} ${borderColor}`,
                borderRadius: "50%",
                display: "inline-block",
                boxSizing: "content-box",
                position: "relative",
                height: size,
                width: size,
                animationName,
                animationDuration: duration,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
            },
            before: {
                ...common,
                width: innerAtomSize,
                height: innerAtomSize,
                backgroundColor: innerAtomColor,
                top: `calc(50% - ${innerAtomSize} / 2)`,
                left: `calc(50% - ${innerAtomSize} / 2)`,
            },
            after: {
                ...common,
                width: atomSize,
                height: atomSize,
                backgroundColor: atomColor,
                top: `calc((${size} + ${borderThickness}) / 2)`,
                left: `calc(calc(${borderThickness} - ${atomSize}) / 2)`,
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
