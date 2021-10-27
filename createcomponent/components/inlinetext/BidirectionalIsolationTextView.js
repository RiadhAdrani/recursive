import CreateComponent from "../../CreateComponent.js";

/**
 * ## BidirectionalIsolationTextView `<bdi>`
 * *from MDN Docs*
 * ### The Bidirectional Isolate element
 * The ``<bdi>`` HTML element tells the browser's bidirectional algorithm to treat the text
 * it contains in isolation from its surrounding text.
 * It's particularly useful when a website dynamically inserts some text
 * and doesn't know the directionality of the text being inserted.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     direction,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "bdi",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { dir: direction, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
