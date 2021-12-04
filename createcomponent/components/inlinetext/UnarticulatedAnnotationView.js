import CreateComponent from "../../CreateComponent.js";

/**
 * ## UnarticulatedAnnotationView `<u>`
 * *from MDN Docs*
 * ### The Unarticulated Annotation (Underline) element
 * The ``<u>`` HTML element represents a span of inline text
 * which should be rendered in a way that indicates that it has a non-textual annotation.
 * This is rendered by default as a simple solid underline, but may be altered using CSS.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "u",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
