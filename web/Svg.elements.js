import GlobalAttributes from "./types/GlobalSVGAttributes.js";
const AProps = { ...GlobalAttributes, href: "", hrefLang: "", target: "", type: "" };
const AnimateProps = {
    ...GlobalAttributes,
    begin: "",
    dur: "",
    end: "",
    min: "",
    max: "",
    restart: "",
    repeatCount: "",
    fill: "",
    calcMode: "",
    values: "",
    keyTimes: "",
    keySplines: "",
    from: "",
    to: "",
    by: "",
    attributeName: "",
    additive: "",
    accumulate: "",
};
const AnimateMotionProps = { ...GlobalAttributes, keyPoints: "", path: "", rotate: "" };
const AnimateTransformProps = { ...GlobalAttributes };
const CircleProps = { ...GlobalAttributes, cx: 1, cy: 1, r: 1, pathLength: "" };
const ClipPathProps = { ...GlobalAttributes, clipPathUnits: "" };
const DefsProps = { ...GlobalAttributes };
const DescProps = { ...GlobalAttributes };
const DiscardProps = { ...GlobalAttributes };
const EllipseProps = { ...GlobalAttributes, cx: 1, cy: 1, rx: 1, ry: 1, pathLength: "" };
const FeBlendProps = { ...GlobalAttributes, in: "", in2: "", mode: "" };
const FeColorMatrixProps = { ...GlobalAttributes, in: "", type: "", values: "" };
const FeComponentTransferProps = { ...GlobalAttributes };
const FeCompositeProps = { ...GlobalAttributes, in: "" };
const FeConvolveMatrixProps = {
    ...GlobalAttributes,
    in: "",
    order: "",
    kernelMatrix: "",
    bias: "",
    targetX: "",
    targetY: "",
    edgeMode: "",
    kernelUnitLength: "",
    preserveAlpha: "",
};
const FeDiffuseLightingProps = { ...GlobalAttributes };
const FeDisplacementMapProps = { ...GlobalAttributes };
const FeDistantLightProps = { ...GlobalAttributes };
const FeDropShadowProps = {
    ...GlobalAttributes,
    id: "",
    surfaceScale: "",
    diffuseConstant: "",
    kernelUnitLength: "",
};
const FeFloodProps = { ...GlobalAttributes, floodColor: "", floodOpacity: "" };
const FeFuncAProps = { ...GlobalAttributes };
const FeFuncBProps = { ...GlobalAttributes };
const FeFuncGProps = { ...GlobalAttributes };
const FeFuncRProps = { ...GlobalAttributes };
const FeGaussianBlurProps = { ...GlobalAttributes, in: "", stdDeviation: "", edgeMode: "" };
const FeImageProps = { ...GlobalAttributes, preserveAspectRatio: "", xLinkHref: "" };
const FeMergeProps = { ...GlobalAttributes };
const FeMergeNodeProps = { ...GlobalAttributes, in: "" };
const FeMorphologyProps = { ...GlobalAttributes, in: "", operator: "", radius: "" };
const FeOffsetProps = { ...GlobalAttributes, in: "", dx: "", dy: "" };
const FePointLightProps = { ...GlobalAttributes, x: "", y: "", z: "" };
const FeSpecularLightingProps = {
    ...GlobalAttributes,
    in: "",
    surfaceScale: "",
    specularConstant: "",
    specularExponent: "",
    kernelUnitLength: "",
};
const FeSpotLightProps = {
    ...GlobalAttributes,
    x: "",
    y: "",
    z: "",
    pointAtX: "",
    pointAtY: "",
    pointAtZ: "",
    specularExponent: "",
    limitingConeAngle: "",
};
const FeTileProps = { ...GlobalAttributes, in: "" };
const FeTurbulenceProps = {
    ...GlobalAttributes,
    baseFrequency: "",
    numOctaves: "",
    seed: "",
    stitchTiles: "",
    type: "",
};
const FilterProps = {
    ...GlobalAttributes,
    x: "",
    y: "",
    width: "",
    height: "",
    filterRes: "",
    filterUnits: "",
    primitiveUnits: "",
    xLinkHref: "",
};
const ForeignObjectProps = { ...GlobalAttributes, height: "", width: "", x: "", y: "" };
const GProps = { ...GlobalAttributes };
const HatchProps = { ...GlobalAttributes };
const HatchpathProps = { ...GlobalAttributes };
const ImageProps = {
    ...GlobalAttributes,
    x: "",
    y: "",
    width: "",
    height: "",
    href: "",
    xLinkHref: "",
    preserveAspectRatio: "",
    crossOrigin: "",
};
const LineProps = { ...GlobalAttributes, x1: "", x2: "", y1: "", y2: "", pathLength: "" };
const LinearGradientProps = {
    ...GlobalAttributes,
    gradientUnits: "",
    gradientTransform: "",
    href: "",
    spreadMethod: "",
    x1: "",
    x2: "",
    y1: "",
    y2: "",
};
const MarkerProps = {
    ...GlobalAttributes,
    markerHeight: "",
    markerUnits: "",
    markerWidth: "",
    orient: "",
    preserveAspectRatio: "",
    refX: "",
    refY: "",
    viewBox: "",
};
const MaskProps = {
    ...GlobalAttributes,
    height: "",
    maskContentUnits: "",
    maskUnits: "",
    x: "",
    y: "",
    width: "",
};
const MetadataProps = { ...GlobalAttributes };
const MpathProps = { ...GlobalAttributes, xLinkHref: "" };
const PathProps = { ...GlobalAttributes, d: "", pathLength: "" };
const PatternProps = {
    ...GlobalAttributes,
    height: "",
    href: "",
    patternContentUnits: "",
    patternTransform: "",
    preserveAspectRatio: "",
    viewBox: "",
    x: "",
};
const PolygonProps = { ...GlobalAttributes, points: "", pathLength: "" };
const PolylineProps = { ...GlobalAttributes, points: "", pathLength: "" };
const RadialGradientProps = {
    ...GlobalAttributes,
    cx: "",
    cy: "",
    fr: "",
    fx: "",
    fy: "",
    gradientUnits: "",
    gradientTransform: "",
    href: "",
    r: "",
    spreadMethod: "",
};
const RectProps = {
    ...GlobalAttributes,
    x: "",
    y: "",
    width: "",
    height: "",
    rx: "",
    ry: "",
    pathLength: "",
};
const SetProps = { ...GlobalAttributes, to: "" };
const StopProps = { ...GlobalAttributes, stopColor: "", stopOpacity: "" };
const SvgProps = {
    ...GlobalAttributes,
    height: "",
    preserveAspectRatio: "",
    viewBox: "",
    width: "",
    x: "",
    y: "",
};
const SwitchProps = { ...GlobalAttributes };
const SymbolProps = {
    ...GlobalAttributes,
    height: "",
    preserveAspectRatio: "",
    refX: "",
    refY: "",
    viewBox: "",
    width: "",
    x: "",
    y: "",
};
const TextProps = {
    ...GlobalAttributes,
    x: "",
    y: "",
    dx: "",
    dy: "",
    rotate: "",
    lengthAdjust: "",
    textLength: "",
};
const TextPathProps = {
    ...GlobalAttributes,
    href: "",
    lengthAdjust: "",
    method: "",
    path: "",
    side: "",
    spacing: "",
    startOffset: "",
    textLength: "",
};
const TitleProps = { ...GlobalAttributes };
const TspanProps = {
    ...GlobalAttributes,
    x: "",
    y: "",
    dx: "",
    dy: "",
    rotate: "",
    lengthAdjust: "",
    textLength: "",
};
const UseProps = {
    ...GlobalAttributes,
    href: "",
    xLinkHref: "",
    x: "",
    y: "",
    width: "",
    height: "",
};
const ViewProps = { ...GlobalAttributes };

/**
 * Create `<a>` element.
 * @param {typeof AProps} props
 * @returns Recursive Web Element
 */
function A(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "a" };
}
/**
 * Create `<animate>` element.
 * @param {typeof AnimateProps} props
 * @returns Recursive Web Element
 */
function Animate(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "animate",
    };
}
/**
 * Create `<animatemotion>` element.
 * @param {typeof AnimateMotionProps} props
 * @returns Recursive Web Element
 */
function AnimateMotion(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "animatemotion",
    };
}
/**
 * Create `<animatetransform>` element.
 * @param {typeof AnimateTransformProps} props
 * @returns Recursive Web Element
 */
function AnimateTransform(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "animatetransform",
    };
}
/**
 * Create `<circle>` element.
 * @param {typeof CircleProps} props
 * @returns Recursive Web Element
 */
function Circle(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "circle",
    };
}
/**
 * Create `<clippath>` element.
 * @param {typeof ClipPathProps} props
 * @returns Recursive Web Element
 */
function ClipPath(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "clippath",
    };
}
/**
 * Create `<defs>` element.
 * @param {typeof DefsProps} props
 * @returns Recursive Web Element
 */
function Defs(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "defs" };
}
/**
 * Create `<desc>` element.
 * @param {typeof DescProps} props
 * @returns Recursive Web Element
 */
function Desc(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "desc" };
}
/**
 * Create `<discard>` element.
 * @param {typeof DiscardProps} props
 * @returns Recursive Web Element
 */
function Discard(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "discard",
    };
}
/**
 * Create `<ellipse>` element.
 * @param {typeof EllipseProps} props
 * @returns Recursive Web Element
 */
function Ellipse(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "ellipse",
    };
}
/**
 * Create `<feblend>` element.
 * @param {typeof FeBlendProps} props
 * @returns Recursive Web Element
 */
function FeBlend(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "feblend",
    };
}
/**
 * Create `<fecolormatrix>` element.
 * @param {typeof FeColorMatrixProps} props
 * @returns Recursive Web Element
 */
function FeColorMatrix(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fecolormatrix",
    };
}
/**
 * Create `<fecomponenttransfer>` element.
 * @param {typeof FeComponentTransferProps} props
 * @returns Recursive Web Element
 */
function FeComponentTransfer(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fecomponenttransfer",
    };
}
/**
 * Create `<fecomposite>` element.
 * @param {typeof FeCompositeProps} props
 * @returns Recursive Web Element
 */
function FeComposite(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fecomposite",
    };
}
/**
 * Create `<feconvolvematrix>` element.
 * @param {typeof FeConvolveMatrixProps} props
 * @returns Recursive Web Element
 */
function FeConvolveMatrix(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "feconvolvematrix",
    };
}
/**
 * Create `<fediffuselighting>` element.
 * @param {typeof FeDiffuseLightingProps} props
 * @returns Recursive Web Element
 */
function FeDiffuseLighting(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fediffuselighting",
    };
}
/**
 * Create `<fedisplacementmap>` element.
 * @param {typeof FeDisplacementMapProps} props
 * @returns Recursive Web Element
 */
function FeDisplacementMap(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fedisplacementmap",
    };
}
/**
 * Create `<fedistantlight>` element.
 * @param {typeof FeDistantLightProps} props
 * @returns Recursive Web Element
 */
function FeDistantLight(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fedistantlight",
    };
}
/**
 * Create `<fedropshadow>` element.
 * @param {typeof FeDropShadowProps} props
 * @returns Recursive Web Element
 */
function FeDropShadow(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fedropshadow",
    };
}
/**
 * Create `<feflood>` element.
 * @param {typeof FeFloodProps} props
 * @returns Recursive Web Element
 */
function FeFlood(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "feflood",
    };
}
/**
 * Create `<fefunca>` element.
 * @param {typeof FeFuncAProps} props
 * @returns Recursive Web Element
 */
function FeFuncA(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fefunca",
    };
}
/**
 * Create `<fefuncb>` element.
 * @param {typeof FeFuncBProps} props
 * @returns Recursive Web Element
 */
function FeFuncB(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fefuncb",
    };
}
/**
 * Create `<fefuncg>` element.
 * @param {typeof FeFuncGProps} props
 * @returns Recursive Web Element
 */
function FeFuncG(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fefuncg",
    };
}
/**
 * Create `<fefuncr>` element.
 * @param {typeof FeFuncRProps} props
 * @returns Recursive Web Element
 */
function FeFuncR(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fefuncr",
    };
}
/**
 * Create `<fegaussianblur>` element.
 * @param {typeof FeGaussianBlurProps} props
 * @returns Recursive Web Element
 */
function FeGaussianBlur(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fegaussianblur",
    };
}
/**
 * Create `<feimage>` element.
 * @param {typeof FeImageProps} props
 * @returns Recursive Web Element
 */
function FeImage(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "feimage",
    };
}
/**
 * Create `<femerge>` element.
 * @param {typeof FeMergeProps} props
 * @returns Recursive Web Element
 */
function FeMerge(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "femerge",
    };
}
/**
 * Create `<femergenode>` element.
 * @param {typeof FeMergeNodeProps} props
 * @returns Recursive Web Element
 */
function FeMergeNode(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "femergenode",
    };
}
/**
 * Create `<femorphology>` element.
 * @param {typeof FeMorphologyProps} props
 * @returns Recursive Web Element
 */
function FeMorphology(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "femorphology",
    };
}
/**
 * Create `<feoffset>` element.
 * @param {typeof FeOffsetProps} props
 * @returns Recursive Web Element
 */
function FeOffset(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "feoffset",
    };
}
/**
 * Create `<fepointlight>` element.
 * @param {typeof FePointLightProps} props
 * @returns Recursive Web Element
 */
function FePointLight(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fepointlight",
    };
}
/**
 * Create `<fespecularlighting>` element.
 * @param {typeof FeSpecularLightingProps} props
 * @returns Recursive Web Element
 */
function FeSpecularLighting(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fespecularlighting",
    };
}
/**
 * Create `<fespotlight>` element.
 * @param {typeof FeSpotLightProps} props
 * @returns Recursive Web Element
 */
function FeSpotLight(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fespotlight",
    };
}
/**
 * Create `<fetile>` element.
 * @param {typeof FeTileProps} props
 * @returns Recursive Web Element
 */
function FeTile(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "fetile",
    };
}
/**
 * Create `<feturbulence>` element.
 * @param {typeof FeTurbulenceProps} props
 * @returns Recursive Web Element
 */
function FeTurbulence(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "feturbulence",
    };
}
/**
 * Create `<filter>` element.
 * @param {typeof FilterProps} props
 * @returns Recursive Web Element
 */
function Filter(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "filter",
    };
}
/**
 * Create `<foreignobject>` element.
 * @param {typeof ForeignObjectProps} props
 * @returns Recursive Web Element
 */
function ForeignObject(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "foreignobject",
    };
}
/**
 * Create `<g>` element.
 * @param {typeof GProps} props
 * @returns Recursive Web Element
 */
function G(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "g" };
}
/**
 * Create `<hatch>` element.
 * @param {typeof HatchProps} props
 * @returns Recursive Web Element
 */
function Hatch(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "hatch",
    };
}
/**
 * Create `<hatchpath>` element.
 * @param {typeof HatchpathProps} props
 * @returns Recursive Web Element
 */
function Hatchpath(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "hatchpath",
    };
}
/**
 * Create `<image>` element.
 * @param {typeof ImageProps} props
 * @returns Recursive Web Element
 */
function Image(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "image",
    };
}
/**
 * Create `<line>` element.
 * @param {typeof LineProps} props
 * @returns Recursive Web Element
 */
function Line(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "line" };
}
/**
 * Create `<lineargradient>` element.
 * @param {typeof LinearGradientProps} props
 * @returns Recursive Web Element
 */
function LinearGradient(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "lineargradient",
    };
}
/**
 * Create `<marker>` element.
 * @param {typeof MarkerProps} props
 * @returns Recursive Web Element
 */
function Marker(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "marker",
    };
}
/**
 * Create `<mask>` element.
 * @param {typeof MaskProps} props
 * @returns Recursive Web Element
 */
function Mask(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "mask" };
}
/**
 * Create `<metadata>` element.
 * @param {typeof MetadataProps} props
 * @returns Recursive Web Element
 */
function Metadata(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "metadata",
    };
}
/**
 * Create `<mpath>` element.
 * @param {typeof MpathProps} props
 * @returns Recursive Web Element
 */
function Mpath(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "mpath",
    };
}
/**
 * Create `<path>` element.
 * @param {typeof PathProps} props
 * @returns Recursive Web Element
 */
function Path(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "path" };
}
/**
 * Create `<pattern>` element.
 * @param {typeof PatternProps} props
 * @returns Recursive Web Element
 */
function Pattern(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "pattern",
    };
}
/**
 * Create `<polygon>` element.
 * @param {typeof PolygonProps} props
 * @returns Recursive Web Element
 */
function Polygon(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "polygon",
    };
}
/**
 * Create `<polyline>` element.
 * @param {typeof PolylineProps} props
 * @returns Recursive Web Element
 */
function Polyline(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "polyline",
    };
}
/**
 * Create `<radialgradient>` element.
 * @param {typeof RadialGradientProps} props
 * @returns Recursive Web Element
 */
function RadialGradient(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "radialgradient",
    };
}
/**
 * Create `<rect>` element.
 * @param {typeof RectProps} props
 * @returns Recursive Web Element
 */
function Rect(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "rect" };
}
/**
 * Create `<set>` element.
 * @param {typeof SetProps} props
 * @returns Recursive Web Element
 */
function Set(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "set" };
}
/**
 * Create `<stop>` element.
 * @param {typeof StopProps} props
 * @returns Recursive Web Element
 */
function Stop(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "stop" };
}
/**
 * Create `<svg>` element.
 * @param {typeof SvgProps} props
 * @returns Recursive Web Element
 */
function Svg(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "svg" };
}
/**
 * Create `<switch>` element.
 * @param {typeof SwitchProps} props
 * @returns Recursive Web Element
 */
function Switch(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "switch",
    };
}
/**
 * Create `<symbol>` element.
 * @param {typeof SymbolProps} props
 * @returns Recursive Web Element
 */
function Symbol(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "symbol",
    };
}
/**
 * Create `<text>` element.
 * @param {typeof TextProps} props
 * @returns Recursive Web Element
 */
function Text(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "text" };
}
/**
 * Create `<textpath>` element.
 * @param {typeof TextPathProps} props
 * @returns Recursive Web Element
 */
function TextPath(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "textpath",
    };
}
/**
 * Create `<title>` element.
 * @param {typeof TitleProps} props
 * @returns Recursive Web Element
 */
function Title(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "title",
    };
}
/**
 * Create `<tspan>` element.
 * @param {typeof TspanProps} props
 * @returns Recursive Web Element
 */
function Tspan(props) {
    return {
        ...props,
        rendererOptions: { ns: "http://www.w3.org/2000/svg" },
        elementType: "tspan",
    };
}
/**
 * Create `<use>` element.
 * @param {typeof UseProps} props
 * @returns Recursive Web Element
 */
function Use(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "use" };
}
/**
 * Create `<view>` element.
 * @param {typeof ViewProps} props
 * @returns Recursive Web Element
 */
function View(props) {
    return { ...props, rendererOptions: { ns: "http://www.w3.org/2000/svg" }, elementType: "view" };
}
export {
    A,
    Animate,
    AnimateMotion,
    AnimateTransform,
    Circle,
    ClipPath,
    Defs,
    Desc,
    Discard,
    Ellipse,
    FeBlend,
    FeColorMatrix,
    FeComponentTransfer,
    FeComposite,
    FeConvolveMatrix,
    FeDiffuseLighting,
    FeDisplacementMap,
    FeDistantLight,
    FeDropShadow,
    FeFlood,
    FeFuncA,
    FeFuncB,
    FeFuncG,
    FeFuncR,
    FeGaussianBlur,
    FeImage,
    FeMerge,
    FeMergeNode,
    FeMorphology,
    FeOffset,
    FePointLight,
    FeSpecularLighting,
    FeSpotLight,
    FeTile,
    FeTurbulence,
    Filter,
    ForeignObject,
    G,
    Hatch,
    Hatchpath,
    Image,
    Line,
    LinearGradient,
    Marker,
    Mask,
    Metadata,
    Mpath,
    Path,
    Pattern,
    Polygon,
    Polyline,
    RadialGradient,
    Rect,
    Set,
    Stop,
    Svg,
    Switch,
    Symbol,
    Text,
    TextPath,
    Title,
    Tspan,
    Use,
    View,
};
