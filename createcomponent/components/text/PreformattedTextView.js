import CreateComponent from "../../CreateComponent.js";

/**
 * ## PreformattedTextView `<pre>`
 * *from MDN Docs*
 * ### The Preformatted Text element
 * The ``<pre>`` HTML element represents preformatted text
 * which is to be presented exactly as written in the HTML file.
 * The text is typically rendered using a non-proportional, or "monospaced, font.
 * Whitespace inside this element is displayed as written.
 * @param param.cols - **non-standard**  Contains the preferred count of characters
 * that a line should have. It was a non-standard synonym of width.
 * To achieve such an effect, use CSS width instead.
 * @param param.width -  **deprecated** Contains the preferred
 * count of characters that a line should have.
 * Though technically still implemented, this attribute has no visual effect;
 * to achieve such an effect, use CSS width instead.
 * @param param.wrap - **non-standard** Is a hint indicating how the overflow must happen.
 * In modern browser this hint is ignored and no visual effect results in its present;
 * to achieve such an effect, use CSS white-space instead.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     className,
     events,
     hooks,
     cols,
     width,
     wrap,
     flags,
}) =>
     new CreateComponent({
          tag: "pre",
          children: children,
          inlineStyle: style,
          props: { id, cols, width, wrap },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
