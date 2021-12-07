import CreateComponent from "../../CreateComponent.js";

/**
 * ## ParagraphView `<p>`
 * *from MDN Docs*
 * ### The Paragraph element
 * The ``<p>`` HTML element represents a paragraph.
 * Paragraphs are usually represented in visual media as blocks
 * of text separated from adjacent blocks by blank lines and/or first-line indentation,
 * but HTML paragraphs can be any structural grouping of related content,
 * such as images or form fields.
 * Paragraphs are block-level elements, and notably will automatically close
 * if another block-level element is parsed before the closing ``</p>`` tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
 */
export default ({ text, className, id, style, events, styleSheet, flags, hooks }) =>
     new CreateComponent({
          tag: "p",
          children: text,
          inlineStyle: style,
          style: styleSheet,
          events: events,
          className: className,
          props: { id },
          hooks,
          flags,
     });
