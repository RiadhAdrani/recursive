import CreateComponent from "../../CreateComponent.js";

/**
 * ## FooterView `<footer>`
 * *from MDN Docs*
 *
 * The ``<footer>`` HTML element represents a footer for its nearest sectioning content or sectioning root element. A <footer> typically contains information about the author of the section, copyright data or links to related documents.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
 */
export default ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "footer",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
