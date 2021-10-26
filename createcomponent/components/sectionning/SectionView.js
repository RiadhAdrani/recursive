import CreateComponent from "../../CreateComponent.js";

/**
 * ## SectionView `<section>`
 * *from MDN Docs*
 * ### The Generic Section element
 * The ``<section>`` HTML element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
 */
export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "section",
          children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className,
          events,
          hooks,
          style: styleSheet,
     });
