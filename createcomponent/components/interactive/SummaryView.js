import CreateComponent from "../../CreateComponent.js";

/**
 * ## SummaryView `<summary>`
 * *from MDN Docs*
 * ### The Disclosure Summary element
 * The ``<summary>`` HTML element specifies a summary, caption, or legend for a ``<details>`` element's disclosure box.
 * Clicking the ``<summary>`` element toggles the state of the parent`` <details>`` element open and closed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
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
          children: text,
          tag: "summary",
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
