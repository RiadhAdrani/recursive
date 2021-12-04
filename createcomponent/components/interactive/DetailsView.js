import CreateComponent from "../../CreateComponent.js";

/**
 * ## DetailsView `<details>`
 * *from MDN Docs*
 * ### The Details disclosure element
 * The ``<details>`` HTML element creates a disclosure widget in which information `
 * is visible only when the widget is toggled into an "open" state.
 * A summary or label must be provided using the ``<summary>`` element.
 * A disclosure widget is typically presented onscreen using a small triangle
 * which rotates (or twists) to indicate open/closed status,
 * with a label next to the triangle. The contents of the
 * ``<summary>`` element are used as the label for the disclosure widget.
 * @param param.open This Boolean attribute indicates whether or not the details — that is,
 * the contents of the ``<details>`` element — are currently visible.
 * The details are shown when this attribute exists, or hidden when this attribute is absent.
 * By default this attribute is absent which means the details are not visible
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     open,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "details",
          inlineStyle: style,
          renderIf,
          props: { id, open },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
