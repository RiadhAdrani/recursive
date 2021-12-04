import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableCaptionView `<caption>`
 * *from MDN Docs*
 * ### The Table Caption element
 * The ``<caption>`` HTML element specifies the caption (or title) of a table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     flags,
     hooks,
}) =>
     new CreateComponent({
          children: text,
          tag: "caption",
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
