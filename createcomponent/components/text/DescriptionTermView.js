import CreateComponent from "../../CreateComponent.js";

/**
 * ## DescriptionTermView `<dt>`
 * *from MDN Docs*
 * ### The Description Term element
 * The ``<dt>`` HTML element specifies a term in a description or definition list,
 * and as such must be used inside a ``<dl>`` element.
 * It is usually followed by a ``<dd>`` element; however,
 * multiple ``<dt>`` elements in a row indicate several terms
 * that are all defined by the immediate next ``<dd>`` element.
 * The subsequent ``<dd>`` (Description Details) element provides the definition
 * or other related text associated with the term specified using ``<dt>``.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
 */
export default ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "dt",
          children: text,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });
