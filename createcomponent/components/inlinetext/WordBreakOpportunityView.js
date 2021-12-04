import CreateComponent from "../../CreateComponent.js";

/**
 * ## WordBreakOpportunityView `<wbr>`
 * *from MDN Docs*
 * ### The Word Break Opportunity element
 * The ``<wbr>`` HTML element represents a word break opportunity—a
 * position within text where the browser may optionally break a line,
 * though its line-breaking rules would not otherwise create a break at that location.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
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
          tag: "wbr",
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
