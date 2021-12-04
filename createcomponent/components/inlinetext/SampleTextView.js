import CreateComponent from "../../CreateComponent.js";

/**
 * ## SampleTextView `<samp>`
 * *from MDN Docs*
 * ### The Sample Output element
 * The ``<samp>`` HTML element is used to enclose inline text
 * which represents sample (or quoted) output from a computer program.
 * Its contents are typically rendered using
 * the browser's default monospaced font (such as Courier or Lucida Console).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
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
          tag: "samp",
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
