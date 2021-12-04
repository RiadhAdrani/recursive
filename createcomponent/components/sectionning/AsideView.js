import CreateComponent from "../../CreateComponent.js";

/**
 * ## AsideView `<aside>`
 * *from MDN Docs*
 * ### The Aside element
 * The ``<aside>`` HTML element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
 */
export default ({
     children,
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
          tag: "aside",
          children: children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
