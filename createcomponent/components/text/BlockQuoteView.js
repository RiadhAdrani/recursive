import CreateComponent from "../../CreateComponent.js";

/**
 * ## BlockQuoteView `<blockquote>`
 * *from MDN Docs*
 * ### The Block Quotation element
 * The ``<blockquote>`` HTML element indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the ``<cite>`` element.
 * @param param.cite A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
 */
export default ({ text, style, cite, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "blockquote",
          children: text,
          inlineStyle: style,
          props: { cite, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
