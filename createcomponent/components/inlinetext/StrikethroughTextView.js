import CreateComponent from "../../CreateComponent.js";

/**
 * ## StrikethroughTextView `<s>`
 * *from MDN Docs*
 * ### The Strikethrough element
 * The ``<s>`` HTML element renders text with a strikethrough,
 * or a line through it. Use the ``<s>`` element to represent things
 * that are no longer relevant or no longer accurate.
 * However, ``<s>`` is not appropriate when indicating document edits;
 * for that, use the ``<del>`` and ``<ins>`` elements, as appropriate.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
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
     flags,
}) =>
     new CreateComponent({
          tag: "s",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
