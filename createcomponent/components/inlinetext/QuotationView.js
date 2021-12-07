import CreateComponent from "../../CreateComponent.js";

/**
 * ## QuotationView `<q>`
 * *from MDN Docs*
 * ### The Inline Quotation element
 * The ``<q>`` HTML element indicates that the enclosed text is a short inline quotation.
 * Most modern browsers implement this by surrounding the text in quotation marks.
 * This element is intended for short quotations that don't require paragraph breaks;
 * for long quotations use the <``blockquote``> element.
 * @param param.cite The value of this attribute is a URL that designates a source document
 * or message for the information quoted. This attribute is intended to point to information
 * explaining the context or the reference for the quote.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
 */
export default ({ text, style, styleSheet, id, cite, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "q",
          children: text,
          inlineStyle: style,
          props: { id, cite },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
