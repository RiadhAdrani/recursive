import CreateComponent from "../../CreateComponent.js";

/**
 * ## FigureView `<figure>`
 * *from MDN Docs*
 * ### The Figure with Optional Caption element
 * The ``<figure>`` HTML element represents self-contained content,
 * potentially with an optional caption, which is specified using the ``<figcaption>`` element.
 * The figure, its caption, and its contents are referenced as a single unit.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
 */
export default ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "figure",
          children,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });
