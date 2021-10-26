import CreateComponent from "../../CreateComponent.js";

/**
 * ## DescriptionListView `<dl>`
 * *from MDN Docs*
 * ### The Description List element
 * The ``<dl>`` HTML element represents a description list.
 * The element encloses a list of groups of terms (specified using the ``<dt> ``element)
 * and descriptions (provided by ``<dd>`` elements).
 * Common uses for this element are to implement a glossary or to display metadata
 * (a list of key-value pairs).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
 */
export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "dl",
          children: children,
          inlineStyle: style,
          renderIf,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
     });
