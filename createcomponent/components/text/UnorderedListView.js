import CreateComponent from "../../CreateComponent.js";

/**
 * ## UnorderedListView `<ol>`
 * *from MDN Docs*
 * ### The Unordered List element
 * The ``<ul>`` HTML element represents an unordered list of items, typically rendered as a bulleted list.
 * @param param.type -  **deprecated** This attribute sets the bullet style for the list.
 * The values defined under HTML3.2 and the transitional version of HTML 4.0/4.01 are:
 * `circle`, `disc` and `square`
 * A fourth bullet type has been defined in the WebTV interface,
 * but not all browsers support it: ``triangle``.
 * If not present and if no CSS list-style-type property applies to the element,
 * the user agent selects a bullet type depending on the nesting level of the list.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
 */
export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     renderIf = true,
     hooks,
     type,
     compact,
     flags,
}) => {
     return new CreateComponent({
          tag: "ul",
          children,
          style: styleSheet,
          renderIf,
          className,
          events,
          props: { id, type, compact },
          hooks,
          flags,
     });
};
