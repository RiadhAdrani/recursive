import CreateComponent from "../../CreateComponent.js";

/**
 * ## BidirectionalTextOverrideView `<bdo>`
 * *from MDN Docs*
 * ### The Bidirectional Text Override element
 * The ``<bdo>`` HTML element overrides the current directionality of text,
 * so that the text within is rendered in a different direction.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
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
          tag: "bdo",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { dir: direction, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
