import GlobalAttributes from "../types/GlobalAttributes.js";
import CustomElements from "../recursive-web-components/Utilities.js";
const AddressProps = { ...GlobalAttributes };
const ArticleProps = { ...GlobalAttributes };
const AsideProps = { ...GlobalAttributes };
const FooterProps = { ...GlobalAttributes };
const HeaderProps = { ...GlobalAttributes };
const H1Props = { ...GlobalAttributes };
const H2Props = { ...GlobalAttributes };
const H3Props = { ...GlobalAttributes };
const H4Props = { ...GlobalAttributes };
const H5Props = { ...GlobalAttributes };
const H6Props = { ...GlobalAttributes };
const MainProps = { ...GlobalAttributes };
const NavProps = { ...GlobalAttributes };
const SectionProps = { ...GlobalAttributes };
const BlockquoteProps = { ...GlobalAttributes, cite: "" };
const DdProps = { ...GlobalAttributes };
const DivProps = { ...GlobalAttributes };
const DlProps = { ...GlobalAttributes };
const DtProps = { ...GlobalAttributes };
const FigcaptionProps = { ...GlobalAttributes };
const FigureProps = { ...GlobalAttributes };
const HrProps = { ...GlobalAttributes, align: "", color: "", noShade: "", size: "", width: "" };
const LiProps = { ...GlobalAttributes, value: "", type: "" };
const MenuProps = { ...GlobalAttributes };
const OlProps = { ...GlobalAttributes, reversed: false, start: "", type: "" };
const PProps = { ...GlobalAttributes };
const PreProps = { ...GlobalAttributes, cols: "", width: "", wrap: "" };
const UlProps = { ...GlobalAttributes, compact: false, type: "" };
const AProps = {
    ...GlobalAttributes,
    download: "",
    href: "",
    hrefLang: "",
    ping: "",
    referrerPolicy: "",
    rel: "",
    target: "",
    type: "",
};
const AbbrProps = { ...GlobalAttributes };
const BProps = { ...GlobalAttributes };
const BdiProps = { ...GlobalAttributes, dir: "" };
const BdoProps = { ...GlobalAttributes, dir: "" };
const BrProps = { ...GlobalAttributes };
const CiteProps = { ...GlobalAttributes };
const CodeProps = { ...GlobalAttributes };
const DataProps = { ...GlobalAttributes, valeu: "" };
const DfnProps = { ...GlobalAttributes };
const EmProps = { ...GlobalAttributes };
const IProps = { ...GlobalAttributes };
const KbdProps = { ...GlobalAttributes };
const MarkProps = { ...GlobalAttributes };
const QProps = { ...GlobalAttributes, cite: "" };
const RpProps = { ...GlobalAttributes };
const RtProps = { ...GlobalAttributes };
const RubyProps = { ...GlobalAttributes };
const SProps = { ...GlobalAttributes };
const SampProps = { ...GlobalAttributes };
const SmallProps = { ...GlobalAttributes };
const SpanProps = { ...GlobalAttributes };
const StrongProps = { ...GlobalAttributes };
const SubProps = { ...GlobalAttributes };
const SupProps = { ...GlobalAttributes };
const TimeProps = { ...GlobalAttributes, dateTime: "" };
const UProps = { ...GlobalAttributes };
const VarProps = { ...GlobalAttributes };
const WbrProps = { ...GlobalAttributes };
const AreaProps = {
    ...GlobalAttributes,
    alt: "",
    coords: "",
    download: "",
    href: "",
    hrefLang: "",
    ping: "",
    referrerPolicy: "",
    rel: "",
    shape: "",
    target: "",
};
const AudioProps = {
    ...GlobalAttributes,
    autoPlay: false,
    controls: false,
    crossOrigin: "",
    loop: false,
    muted: false,
    preload: "",
    src: "",
};
const ImgProps = {
    ...GlobalAttributes,
    alt: "",
    crossOrigin: "",
    decoding: "",
    height: 1,
    isMap: false,
    loading: "",
    referrerPolicy: "",
    sizes: "",
    src: "",
    srcSet: "",
    width: 1,
    useMap: "",
};
const MapProps = { ...GlobalAttributes, name: "" };
const TrackProps = { ...GlobalAttributes, def: "", kind: "", label: "", src: "", srcLang: "" };
const VideoProps = {
    ...GlobalAttributes,
    autoPlay: false,
    crossOrigin: "",
    height: 1,
    loop: false,
    muted: false,
    playsInline: false,
    poster: "",
    preload: "",
    src: "",
    width: 1,
};
const EmbedProps = { ...GlobalAttributes, height: 1, src: "", type: "", width: 1 };
const IframeProps = {
    ...GlobalAttributes,
    allow: "",
    allowFullScreen: false,
    allowPaymentRequest: false,
    fetchPriority: "",
    height: 1,
    loading: "",
    name: "",
    referrerPolicy: "",
    sandbox: "",
    src: "",
    srcDoc: "",
    width: 1,
};
const ObjectProps = {
    ...GlobalAttributes,
    data: "",
    form: "",
    height: 1,
    name: "",
    type: "",
    useMap: "",
    width: 1,
};
const PictureProps = { ...GlobalAttributes };
const PortalProps = { ...GlobalAttributes, src: "" };
const SourceProps = { ...GlobalAttributes };
const CanvasProps = { ...GlobalAttributes, height: 1, width: 1 };
const NoscriptProps = { ...GlobalAttributes };
const DelProps = { ...GlobalAttributes, cite: "", dateTime: "" };
const InsProps = { ...GlobalAttributes, cite: "", dateTime: "" };
const CaptionProps = { ...GlobalAttributes };
const ColProps = { ...GlobalAttributes, span: 1 };
const ColgroupProps = { ...GlobalAttributes, span: 1 };
const TableProps = { ...GlobalAttributes };
const TbodyProps = { ...GlobalAttributes };
const TdProps = { ...GlobalAttributes, colSpan: 1, headers: "", rowSpan: 1 };
const TfootProps = { ...GlobalAttributes };
const ThProps = { ...GlobalAttributes, abbr: "", colSpan: 1, headers: "", rowSpan: 1, scope: "" };
const TheadProps = { ...GlobalAttributes };
const TrProps = { ...GlobalAttributes };
const ButtonProps = {
    ...GlobalAttributes,
    autoFocus: false,
    disabled: false,
    form: "",
    formAction: "",
    formEncType: "",
    formMethod: "",
    formNoValidate: "",
    formTarget: "",
    name: "",
    type: "",
    value: "",
};
const DatalistProps = { ...GlobalAttributes };
const FieldsetProps = { ...GlobalAttributes, disabled: false, form: "", name: "" };
const FormProps = {
    ...GlobalAttributes,
    acceptCharSet: "",
    autoComplete: "",
    name: "",
    rel: "",
    action: "",
    encType: "",
    method: "",
    noValidate: "",
    target: "",
};
const InputProps = {
    ...GlobalAttributes,
    accept: "",
    alt: "",
    autoComplete: "",
    capture: "",
    checked: false,
    dirName: "",
    disabled: false,
    form: "",
    formAction: "",
    formEncType: "",
    formMethod: "",
    formNoValidate: "",
    formTarget: "",
    height: 1,
    list: "",
    max: 1,
    maxLength: 1,
    min: 1,
    minLength: 1,
    multiple: false,
    name: "",
    pattern: "",
    placeholder: "",
    readOnly: false,
    required: false,
    size: 1,
    src: "",
    step: 1,
    type: "",
    value: "",
    width: 1,
};
const LabelProps = { ...GlobalAttributes, isFor: "" };
const LegendProps = { ...GlobalAttributes };
const MeterProps = { ...GlobalAttributes, value: 1, min: 1, max: 1, low: 1, high: 1, optimum: 1 };
const OptgroupProps = { ...GlobalAttributes, disabled: false, label: "" };
const OptionProps = { ...GlobalAttributes, disabled: false, label: "", selected: false, value: "" };
const OutputProps = { ...GlobalAttributes, for: "", form: "", name: "" };
const ProgressProps = { ...GlobalAttributes, max: 1, value: 1 };
const SelectProps = {
    ...GlobalAttributes,
    autoComplete: "",
    autoFocus: false,
    disabled: false,
    form: "",
    multiple: false,
    name: "",
    required: false,
    size: 1,
};
const TextareaProps = {
    ...GlobalAttributes,
    autoComplete: "",
    autoFocus: false,
    cols: "",
    disabled: false,
    form: "",
    maxLength: 1,
    name: "",
    placeholder: "",
    readOnly: false,
    required: "",
    spellCheck: "",
    wrap: "",
};
const DetailsProps = { ...GlobalAttributes, open: false };
const DialogProps = { ...GlobalAttributes, open: false };
const SummaryProps = { ...GlobalAttributes };
const SlotProps = { ...GlobalAttributes, name: "" };
const TemplateProps = { ...GlobalAttributes };
const FragmentProps = { ...GlobalAttributes };
const ColumnProps = { ...GlobalAttributes };
const RowProps = { ...GlobalAttributes };
const SpacerProps = { ...GlobalAttributes, height: 1, width: 1 };
const LazyColumnProps = { ...GlobalAttributes, onObserved: () => {} };
const LazyRowProps = { ...GlobalAttributes, onObserved: () => {} };

/**
 * Create `<address>` element.
 * @param {typeof AddressProps} props
 * @returns Recursive Web Element
 */
function Address(props) {
    return { ...props, elementType: "address" };
}
/**
 * Create `<article>` element.
 * @param {typeof ArticleProps} props
 * @returns Recursive Web Element
 */
function Article(props) {
    return { ...props, elementType: "article" };
}
/**
 * Create `<aside>` element.
 * @param {typeof AsideProps} props
 * @returns Recursive Web Element
 */
function Aside(props) {
    return { ...props, elementType: "aside" };
}
/**
 * Create `<footer>` element.
 * @param {typeof FooterProps} props
 * @returns Recursive Web Element
 */
function Footer(props) {
    return { ...props, elementType: "footer" };
}
/**
 * Create `<header>` element.
 * @param {typeof HeaderProps} props
 * @returns Recursive Web Element
 */
function Header(props) {
    return { ...props, elementType: "header" };
}
/**
 * Create `<h1>` element.
 * @param {typeof H1Props} props
 * @returns Recursive Web Element
 */
function H1(props) {
    return { ...props, elementType: "h1" };
}
/**
 * Create `<h2>` element.
 * @param {typeof H2Props} props
 * @returns Recursive Web Element
 */
function H2(props) {
    return { ...props, elementType: "h2" };
}
/**
 * Create `<h3>` element.
 * @param {typeof H3Props} props
 * @returns Recursive Web Element
 */
function H3(props) {
    return { ...props, elementType: "h3" };
}
/**
 * Create `<h4>` element.
 * @param {typeof H4Props} props
 * @returns Recursive Web Element
 */
function H4(props) {
    return { ...props, elementType: "h4" };
}
/**
 * Create `<h5>` element.
 * @param {typeof H5Props} props
 * @returns Recursive Web Element
 */
function H5(props) {
    return { ...props, elementType: "h5" };
}
/**
 * Create `<h6>` element.
 * @param {typeof H6Props} props
 * @returns Recursive Web Element
 */
function H6(props) {
    return { ...props, elementType: "h6" };
}
/**
 * Create `<main>` element.
 * @param {typeof MainProps} props
 * @returns Recursive Web Element
 */
function Main(props) {
    return { ...props, elementType: "main" };
}
/**
 * Create `<nav>` element.
 * @param {typeof NavProps} props
 * @returns Recursive Web Element
 */
function Nav(props) {
    return { ...props, elementType: "nav" };
}
/**
 * Create `<section>` element.
 * @param {typeof SectionProps} props
 * @returns Recursive Web Element
 */
function Section(props) {
    return { ...props, elementType: "section" };
}
/**
 * Create `<blockquote>` element.
 * @param {typeof BlockquoteProps} props
 * @returns Recursive Web Element
 */
function Blockquote(props) {
    return { ...props, elementType: "blockquote" };
}
/**
 * Create `<dd>` element.
 * @param {typeof DdProps} props
 * @returns Recursive Web Element
 */
function Dd(props) {
    return { ...props, elementType: "dd" };
}
/**
 * Create `<div>` element.
 * @param {typeof DivProps} props
 * @returns Recursive Web Element
 */
function Div(props) {
    return { ...props, elementType: "div" };
}
/**
 * Create `<dl>` element.
 * @param {typeof DlProps} props
 * @returns Recursive Web Element
 */
function Dl(props) {
    return { ...props, elementType: "dl" };
}
/**
 * Create `<dt>` element.
 * @param {typeof DtProps} props
 * @returns Recursive Web Element
 */
function Dt(props) {
    return { ...props, elementType: "dt" };
}
/**
 * Create `<figcaption>` element.
 * @param {typeof FigcaptionProps} props
 * @returns Recursive Web Element
 */
function Figcaption(props) {
    return { ...props, elementType: "figcaption" };
}
/**
 * Create `<figure>` element.
 * @param {typeof FigureProps} props
 * @returns Recursive Web Element
 */
function Figure(props) {
    return { ...props, elementType: "figure" };
}
/**
 * Create `<hr>` element.
 * @param {typeof HrProps} props
 * @returns Recursive Web Element
 */
function Hr(props) {
    return { ...props, elementType: "hr" };
}
/**
 * Create `<li>` element.
 * @param {typeof LiProps} props
 * @returns Recursive Web Element
 */
function Li(props) {
    return { ...props, elementType: "li" };
}
/**
 * Create `<menu>` element.
 * @param {typeof MenuProps} props
 * @returns Recursive Web Element
 */
function Menu(props) {
    return { ...props, elementType: "menu" };
}
/**
 * Create `<ol>` element.
 * @param {typeof OlProps} props
 * @returns Recursive Web Element
 */
function Ol(props) {
    return { ...props, elementType: "ol" };
}
/**
 * Create `<p>` element.
 * @param {typeof PProps} props
 * @returns Recursive Web Element
 */
function P(props) {
    return { ...props, elementType: "p" };
}
/**
 * Create `<pre>` element.
 * @param {typeof PreProps} props
 * @returns Recursive Web Element
 */
function Pre(props) {
    return { ...props, elementType: "pre" };
}
/**
 * Create `<ul>` element.
 * @param {typeof UlProps} props
 * @returns Recursive Web Element
 */
function Ul(props) {
    return { ...props, elementType: "ul" };
}
/**
 * Create `<a>` element.
 * @param {typeof AProps} props
 * @returns Recursive Web Element
 */
function A(props) {
    return { ...props, elementType: "a" };
}
/**
 * Create `<abbr>` element.
 * @param {typeof AbbrProps} props
 * @returns Recursive Web Element
 */
function Abbr(props) {
    return { ...props, elementType: "abbr" };
}
/**
 * Create `<b>` element.
 * @param {typeof BProps} props
 * @returns Recursive Web Element
 */
function B(props) {
    return { ...props, elementType: "b" };
}
/**
 * Create `<bdi>` element.
 * @param {typeof BdiProps} props
 * @returns Recursive Web Element
 */
function Bdi(props) {
    return { ...props, elementType: "bdi" };
}
/**
 * Create `<bdo>` element.
 * @param {typeof BdoProps} props
 * @returns Recursive Web Element
 */
function Bdo(props) {
    return { ...props, elementType: "bdo" };
}
/**
 * Create `<br>` element.
 * @param {typeof BrProps} props
 * @returns Recursive Web Element
 */
function Br(props) {
    return { ...props, elementType: "br" };
}
/**
 * Create `<cite>` element.
 * @param {typeof CiteProps} props
 * @returns Recursive Web Element
 */
function Cite(props) {
    return { ...props, elementType: "cite" };
}
/**
 * Create `<code>` element.
 * @param {typeof CodeProps} props
 * @returns Recursive Web Element
 */
function Code(props) {
    return { ...props, elementType: "code" };
}
/**
 * Create `<data>` element.
 * @param {typeof DataProps} props
 * @returns Recursive Web Element
 */
function Data(props) {
    return { ...props, elementType: "data" };
}
/**
 * Create `<dfn>` element.
 * @param {typeof DfnProps} props
 * @returns Recursive Web Element
 */
function Dfn(props) {
    return { ...props, elementType: "dfn" };
}
/**
 * Create `<em>` element.
 * @param {typeof EmProps} props
 * @returns Recursive Web Element
 */
function Em(props) {
    return { ...props, elementType: "em" };
}
/**
 * Create `<i>` element.
 * @param {typeof IProps} props
 * @returns Recursive Web Element
 */
function I(props) {
    return { ...props, elementType: "i" };
}
/**
 * Create `<kbd>` element.
 * @param {typeof KbdProps} props
 * @returns Recursive Web Element
 */
function Kbd(props) {
    return { ...props, elementType: "kbd" };
}
/**
 * Create `<mark>` element.
 * @param {typeof MarkProps} props
 * @returns Recursive Web Element
 */
function Mark(props) {
    return { ...props, elementType: "mark" };
}
/**
 * Create `<q>` element.
 * @param {typeof QProps} props
 * @returns Recursive Web Element
 */
function Q(props) {
    return { ...props, elementType: "q" };
}
/**
 * Create `<rp>` element.
 * @param {typeof RpProps} props
 * @returns Recursive Web Element
 */
function Rp(props) {
    return { ...props, elementType: "rp" };
}
/**
 * Create `<rt>` element.
 * @param {typeof RtProps} props
 * @returns Recursive Web Element
 */
function Rt(props) {
    return { ...props, elementType: "rt" };
}
/**
 * Create `<ruby>` element.
 * @param {typeof RubyProps} props
 * @returns Recursive Web Element
 */
function Ruby(props) {
    return { ...props, elementType: "ruby" };
}
/**
 * Create `<s>` element.
 * @param {typeof SProps} props
 * @returns Recursive Web Element
 */
function S(props) {
    return { ...props, elementType: "s" };
}
/**
 * Create `<samp>` element.
 * @param {typeof SampProps} props
 * @returns Recursive Web Element
 */
function Samp(props) {
    return { ...props, elementType: "samp" };
}
/**
 * Create `<small>` element.
 * @param {typeof SmallProps} props
 * @returns Recursive Web Element
 */
function Small(props) {
    return { ...props, elementType: "small" };
}
/**
 * Create `<span>` element.
 * @param {typeof SpanProps} props
 * @returns Recursive Web Element
 */
function Span(props) {
    return { ...props, elementType: "span" };
}
/**
 * Create `<strong>` element.
 * @param {typeof StrongProps} props
 * @returns Recursive Web Element
 */
function Strong(props) {
    return { ...props, elementType: "strong" };
}
/**
 * Create `<sub>` element.
 * @param {typeof SubProps} props
 * @returns Recursive Web Element
 */
function Sub(props) {
    return { ...props, elementType: "sub" };
}
/**
 * Create `<sup>` element.
 * @param {typeof SupProps} props
 * @returns Recursive Web Element
 */
function Sup(props) {
    return { ...props, elementType: "sup" };
}
/**
 * Create `<time>` element.
 * @param {typeof TimeProps} props
 * @returns Recursive Web Element
 */
function Time(props) {
    return { ...props, elementType: "time" };
}
/**
 * Create `<u>` element.
 * @param {typeof UProps} props
 * @returns Recursive Web Element
 */
function U(props) {
    return { ...props, elementType: "u" };
}
/**
 * Create `<var>` element.
 * @param {typeof VarProps} props
 * @returns Recursive Web Element
 */
function Var(props) {
    return { ...props, elementType: "var" };
}
/**
 * Create `<wbr>` element.
 * @param {typeof WbrProps} props
 * @returns Recursive Web Element
 */
function Wbr(props) {
    return { ...props, elementType: "wbr" };
}
/**
 * Create `<area>` element.
 * @param {typeof AreaProps} props
 * @returns Recursive Web Element
 */
function Area(props) {
    return { ...props, elementType: "area" };
}
/**
 * Create `<audio>` element.
 * @param {typeof AudioProps} props
 * @returns Recursive Web Element
 */
function Audio(props) {
    return { ...props, elementType: "audio" };
}
/**
 * Create `<img>` element.
 * @param {typeof ImgProps} props
 * @returns Recursive Web Element
 */
function Img(props) {
    return { ...props, elementType: "img" };
}
/**
 * Create `<map>` element.
 * @param {typeof MapProps} props
 * @returns Recursive Web Element
 */
function Map(props) {
    return { ...props, elementType: "map" };
}
/**
 * Create `<track>` element.
 * @param {typeof TrackProps} props
 * @returns Recursive Web Element
 */
function Track(props) {
    return { ...props, elementType: "track" };
}
/**
 * Create `<video>` element.
 * @param {typeof VideoProps} props
 * @returns Recursive Web Element
 */
function Video(props) {
    return { ...props, elementType: "video" };
}
/**
 * Create `<embed>` element.
 * @param {typeof EmbedProps} props
 * @returns Recursive Web Element
 */
function Embed(props) {
    return { ...props, elementType: "embed" };
}
/**
 * Create `<iframe>` element.
 * @param {typeof IframeProps} props
 * @returns Recursive Web Element
 */
function Iframe(props) {
    return { ...props, elementType: "iframe" };
}
/**
 * Create `<object>` element.
 * @param {typeof ObjectProps} props
 * @returns Recursive Web Element
 */
function Object(props) {
    return { ...props, elementType: "object" };
}
/**
 * Create `<picture>` element.
 * @param {typeof PictureProps} props
 * @returns Recursive Web Element
 */
function Picture(props) {
    return { ...props, elementType: "picture" };
}
/**
 * Create `<portal>` element.
 * @param {typeof PortalProps} props
 * @returns Recursive Web Element
 */
function Portal(props) {
    return { ...props, elementType: "portal" };
}
/**
 * Create `<source>` element.
 * @param {typeof SourceProps} props
 * @returns Recursive Web Element
 */
function Source(props) {
    return { ...props, elementType: "source" };
}
/**
 * Create `<canvas>` element.
 * @param {typeof CanvasProps} props
 * @returns Recursive Web Element
 */
function Canvas(props) {
    return { ...props, elementType: "canvas" };
}
/**
 * Create `<noscript>` element.
 * @param {typeof NoscriptProps} props
 * @returns Recursive Web Element
 */
function Noscript(props) {
    return { ...props, elementType: "noscript" };
}
/**
 * Create `<del>` element.
 * @param {typeof DelProps} props
 * @returns Recursive Web Element
 */
function Del(props) {
    return { ...props, elementType: "del" };
}
/**
 * Create `<ins>` element.
 * @param {typeof InsProps} props
 * @returns Recursive Web Element
 */
function Ins(props) {
    return { ...props, elementType: "ins" };
}
/**
 * Create `<caption>` element.
 * @param {typeof CaptionProps} props
 * @returns Recursive Web Element
 */
function Caption(props) {
    return { ...props, elementType: "caption" };
}
/**
 * Create `<col>` element.
 * @param {typeof ColProps} props
 * @returns Recursive Web Element
 */
function Col(props) {
    return { ...props, elementType: "col" };
}
/**
 * Create `<colgroup>` element.
 * @param {typeof ColgroupProps} props
 * @returns Recursive Web Element
 */
function Colgroup(props) {
    return { ...props, elementType: "colgroup" };
}
/**
 * Create `<table>` element.
 * @param {typeof TableProps} props
 * @returns Recursive Web Element
 */
function Table(props) {
    return { ...props, elementType: "table" };
}
/**
 * Create `<tbody>` element.
 * @param {typeof TbodyProps} props
 * @returns Recursive Web Element
 */
function Tbody(props) {
    return { ...props, elementType: "tbody" };
}
/**
 * Create `<td>` element.
 * @param {typeof TdProps} props
 * @returns Recursive Web Element
 */
function Td(props) {
    return { ...props, elementType: "td" };
}
/**
 * Create `<tfoot>` element.
 * @param {typeof TfootProps} props
 * @returns Recursive Web Element
 */
function Tfoot(props) {
    return { ...props, elementType: "tfoot" };
}
/**
 * Create `<th>` element.
 * @param {typeof ThProps} props
 * @returns Recursive Web Element
 */
function Th(props) {
    return { ...props, elementType: "th" };
}
/**
 * Create `<thead>` element.
 * @param {typeof TheadProps} props
 * @returns Recursive Web Element
 */
function Thead(props) {
    return { ...props, elementType: "thead" };
}
/**
 * Create `<tr>` element.
 * @param {typeof TrProps} props
 * @returns Recursive Web Element
 */
function Tr(props) {
    return { ...props, elementType: "tr" };
}
/**
 * Create `<button>` element.
 * @param {typeof ButtonProps} props
 * @returns Recursive Web Element
 */
function Button(props) {
    return { ...props, elementType: "button" };
}
/**
 * Create `<datalist>` element.
 * @param {typeof DatalistProps} props
 * @returns Recursive Web Element
 */
function Datalist(props) {
    return { ...props, elementType: "datalist" };
}
/**
 * Create `<fieldset>` element.
 * @param {typeof FieldsetProps} props
 * @returns Recursive Web Element
 */
function Fieldset(props) {
    return { ...props, elementType: "fieldset" };
}
/**
 * Create `<form>` element.
 * @param {typeof FormProps} props
 * @returns Recursive Web Element
 */
function Form(props) {
    return { ...props, elementType: "form" };
}
/**
 * Create `<input>` element.
 * @param {typeof InputProps} props
 * @returns Recursive Web Element
 */
function Input(props) {
    return { ...props, elementType: "input" };
}
/**
 * Create `<label>` element.
 * @param {typeof LabelProps} props
 * @returns Recursive Web Element
 */
function Label(props) {
    return { ...props, elementType: "label" };
}
/**
 * Create `<legend>` element.
 * @param {typeof LegendProps} props
 * @returns Recursive Web Element
 */
function Legend(props) {
    return { ...props, elementType: "legend" };
}
/**
 * Create `<meter>` element.
 * @param {typeof MeterProps} props
 * @returns Recursive Web Element
 */
function Meter(props) {
    return { ...props, elementType: "meter" };
}
/**
 * Create `<optgroup>` element.
 * @param {typeof OptgroupProps} props
 * @returns Recursive Web Element
 */
function Optgroup(props) {
    return { ...props, elementType: "optgroup" };
}
/**
 * Create `<option>` element.
 * @param {typeof OptionProps} props
 * @returns Recursive Web Element
 */
function Option(props) {
    return { ...props, elementType: "option" };
}
/**
 * Create `<output>` element.
 * @param {typeof OutputProps} props
 * @returns Recursive Web Element
 */
function Output(props) {
    return { ...props, elementType: "output" };
}
/**
 * Create `<progress>` element.
 * @param {typeof ProgressProps} props
 * @returns Recursive Web Element
 */
function Progress(props) {
    return { ...props, elementType: "progress" };
}
/**
 * Create `<select>` element.
 * @param {typeof SelectProps} props
 * @returns Recursive Web Element
 */
function Select(props) {
    return { ...props, elementType: "select" };
}
/**
 * Create `<textarea>` element.
 * @param {typeof TextareaProps} props
 * @returns Recursive Web Element
 */
function Textarea(props) {
    return { ...props, elementType: "textarea" };
}
/**
 * Create `<details>` element.
 * @param {typeof DetailsProps} props
 * @returns Recursive Web Element
 */
function Details(props) {
    return { ...props, elementType: "details" };
}
/**
 * Create `<dialog>` element.
 * @param {typeof DialogProps} props
 * @returns Recursive Web Element
 */
function Dialog(props) {
    return { ...props, elementType: "dialog" };
}
/**
 * Create `<summary>` element.
 * @param {typeof SummaryProps} props
 * @returns Recursive Web Element
 */
function Summary(props) {
    return { ...props, elementType: "summary" };
}
/**
 * Create `<slot>` element.
 * @param {typeof SlotProps} props
 * @returns Recursive Web Element
 */
function Slot(props) {
    return { ...props, elementType: "slot" };
}
/**
 * Create `<template>` element.
 * @param {typeof TemplateProps} props
 * @returns Recursive Web Element
 */
function Template(props) {
    return { ...props, elementType: "template" };
}
/**
 * Create `<fragment>` element.
 * @param {typeof FragmentProps} props
 * @returns Recursive Web Element
 */
function Fragment(props) {
    const el = { ...props, elementType: "fragment" };

    return el;
}
/**
 * Create `<column-view>` element.
 * @param {typeof ColumnProps} props
 * @returns Recursive Web Element
 */
function Column(props) {
    const el = { ...props, elementType: "column-view" };

    return el;
}
/**
 * Create `<row-view>` element.
 * @param {typeof RowProps} props
 * @returns Recursive Web Element
 */
function Row(props) {
    const el = { ...props, elementType: "row-view" };

    return el;
}
/**
 * Create `<spacer-view>` element.
 * @param {typeof SpacerProps} props
 * @returns Recursive Web Element
 */
function Spacer(props) {
    const el = { ...props, elementType: "spacer-view" };

    CustomElements.Spacer.handler(el);

    return el;
}
/**
 * Create `<lazy-column>` element.
 * @param {typeof LazyColumnProps} props
 * @returns Recursive Web Element
 */
function LazyColumn(props) {
    const el = { ...props, elementType: "lazy-column" };

    CustomElements.LazyColumn.handler(el);

    return el;
}
/**
 * Create `<lazy-row>` element.
 * @param {typeof LazyRowProps} props
 * @returns Recursive Web Element
 */
function LazyRow(props) {
    const el = { ...props, elementType: "lazy-row" };

    CustomElements.LazyRow.handler(el);

    return el;
}
export {
    Address,
    Article,
    Aside,
    Footer,
    Header,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Main,
    Nav,
    Section,
    Blockquote,
    Dd,
    Div,
    Dl,
    Dt,
    Figcaption,
    Figure,
    Hr,
    Li,
    Menu,
    Ol,
    P,
    Pre,
    Ul,
    A,
    Abbr,
    B,
    Bdi,
    Bdo,
    Br,
    Cite,
    Code,
    Data,
    Dfn,
    Em,
    I,
    Kbd,
    Mark,
    Q,
    Rp,
    Rt,
    Ruby,
    S,
    Samp,
    Small,
    Span,
    Strong,
    Sub,
    Sup,
    Time,
    U,
    Var,
    Wbr,
    Area,
    Audio,
    Img,
    Map,
    Track,
    Video,
    Embed,
    Iframe,
    Object,
    Picture,
    Portal,
    Source,
    Canvas,
    Noscript,
    Del,
    Ins,
    Caption,
    Col,
    Colgroup,
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Button,
    Datalist,
    Fieldset,
    Form,
    Input,
    Label,
    Legend,
    Meter,
    Optgroup,
    Option,
    Output,
    Progress,
    Select,
    Textarea,
    Details,
    Dialog,
    Summary,
    Slot,
    Template,
    Fragment,
    Column,
    Row,
    Spacer,
    LazyColumn,
    LazyRow,
};
