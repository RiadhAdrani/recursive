import CreateComponent from "../../CreateComponent.js";

/**
 * ## RubyTextView `<ruby>`
 * *from MDN Docs*
 * ### The Ruby Annotation element
 * The ``<ruby>`` HTML element represents small annotations that are rendered
 * above, below, or next to base text, usually used for showing the pronunciation of East Asian characters.
 * It can also be used for annotating other kinds of text, but this usage is less common.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
 */
export default ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "ruby",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
