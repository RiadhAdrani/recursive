import CreateComponent from "../../CreateComponent.js";

/**
 * ## SpanView `<span>`
 * *from MDN Docs*
 * ### The Content Span element
 * The ``<span>`` HTML element is a generic inline container for phrasing content,
 * which does not inherently represent anything.
 * It can be used to group elements for styling purposes (using the class or id attributes),
 * or because they share attribute values, such as lang.
 * It should be used only when no other semantic element is appropriate.
 * ``<span>`` is very much like a ``<div>`` element,
 * but ``<div>`` is a block-level element whereas a ``<span>`` is an inline element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
 */
export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "span",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
