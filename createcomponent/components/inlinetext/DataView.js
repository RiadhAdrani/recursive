import CreateComponent from "../../CreateComponent.js";

/**
 * ## DataView `<data>`
 * *from MDN Docs*
 * The ``<data>`` HTML element links a given piece of content with a machine-readable translation.
 * If the content is time- or date-related, the <time> element must be used.
 * @param param.value This attribute specifies the machine-readable translation of the content of the element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
 */
export default ({
     text,
     style,
     styleSheet,
     value,
     id,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "data",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
