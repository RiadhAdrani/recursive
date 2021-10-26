import CreateComponent from "../../CreateComponent.js";

/**
 * ## DescriptionDetailsView `<dd>`
 * *from MDN Docs*
 * ### The Description Details element
 * The ``<dd>`` HTML element provides the description, definition, or value for the preceding term (``<dt>``) in a description list (``<dl>``).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
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
     noWrap,
}) =>
     new CreateComponent({
          tag: "dd",
          children: text,
          inlineStyle: style,
          props: { noWrap, id },
          renderIf,
          className,
          events,
          hooks,
          style: styleSheet,
     });
