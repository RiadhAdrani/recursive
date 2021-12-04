import CreateComponent from "../../CreateComponent.js";

/**
 * ## RubyTextView `<rt>`
 * *from MDN Docs*
 * ### The Ruby Text element
 * The ``<rt>`` HTML element specifies the ruby text component of a ruby annotation,
 * which is used to provide pronunciation, translation,
 * or transliteration information for East Asian typography.
 * The ``<rt>`` element must always be contained within a <ruby> element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
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
          tag: "rt",
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
