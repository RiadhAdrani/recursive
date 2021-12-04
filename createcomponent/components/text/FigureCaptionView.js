import CreateComponent from "../../CreateComponent.js";

/**
 * ## FigureCaptionView `<figcaption>`
 * *from MDN Docs*
 * ### The Figure Caption element
 * The ``<figcaption>`` HTML element represents a caption or legend describing the rest of the contents
 * of its parent ``<figure>`` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     flags,
     hooks,
}) =>
     new CreateComponent({
          tag: "figcaption",
          children: text,
          inlineStyle: style,
          props: { id },
          renderIf,
          className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
