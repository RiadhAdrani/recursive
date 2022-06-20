import CreateComponent from "../../index.js";
import View from "../View.js";

class VortexSpinner extends View {
    constructor() {
        super("vortex-spinner");
    }
}

/**
 * @credit https://codepen.io/bernethe/pen/dorozd
 * @version 0.0.1
 */
export default function ({
    size = "30px",
    backgroundColor = "transparent",
    borderThickness = "1px",
    borderStyle = "solid",
    borderColor = "black",
    borderRadius = "4px",
    vortexSpacing = "3px",
    vortexColorBefore = "black",
    vortexSizeBefore = "6px",
    vortexColorAfter = "black",
    vortexSizeAfter = "6px",
    duration = "2s",
    flags,
}) {
    const animationName = View.makeAnimationNameWithString(
        "vortex-spinner" +
            size +
            backgroundColor +
            borderThickness +
            borderStyle +
            borderColor +
            borderThickness +
            vortexSpacing +
            vortexColorBefore +
            vortexSizeBefore +
            vortexColorAfter +
            vortexSizeAfter
    );

    const common = {
        content: "''",
        borderRadius: "50%",
        position: "absolute",
        width: "inherit",
        height: "inherit",
        animationName,
        animationDuration: duration,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
    };

    return new CreateComponent({
        tag: "vortex-spinner",
        flags,
        style: {
            scoped: true,
            normal: {
                height: size,
                width: size,
                display: "inline-block",
                boxSizing: "content-box",
                borderWidth: borderThickness,
                borderStyle,
                borderColor,
                borderRadius,
                background: backgroundColor,
                animationName,
                position: "relative",
                overflow: "hidden",
            },
            before: {
                ...common,
                borderTopColor: vortexColorBefore,
                borderTopWidth: vortexSizeBefore,
                borderTopStyle: "solid",
                top: "-" + vortexSpacing,
                left: `calc( -50% - ${vortexSpacing})`,
                transformOrigin: "right center",
            },
            after: {
                ...common,
                borderBottomColor: vortexColorAfter,
                borderBottomWidth: vortexSizeAfter,
                borderBottomStyle: "solid",
                top: vortexSpacing,
                right: `calc(-50% - ${vortexSpacing})`,
                transformOrigin: "left center",
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
