import CreateComponent from "../../CreateComponent.js";

/**
 * ## BoldTextView `<b>`
 * *from MDN Docs*
 * ### The Bring Attention To element
 * The ``<b>`` HTML element is used to draw the reader's attention to the element's contents,
 * which are not otherwise granted special importance.
 * This was formerly known as the Boldface element,
 * and most browsers still draw the text in boldface.
 * However, you should not use ``<b>`` for styling text; instead,
 * you should use the CSS font-weight property to create boldface text,
 * or the ``<strong>`` element to indicate that text is of special importance.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
 */
export default ({
     children,
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
          tag: "b",
          children,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
