import CreateComponent from "../../CreateComponent.js";

/**
 * ## OrderedListView `<ol>`
 * *from MDN Docs*
 * ### The Ordered List element
 * The ``<ol>`` HTML element represents an ordered list of items — typically rendered as a numbered list.
 * @param param.reversed -  This Boolean attribute specifies that the list’s items are in reverse order.
 * Items will be numbered from high to low.
 * @param param.start -  An integer to start counting from for the list items.
 * Always an Arabic numeral (1, 2, 3, etc.), even when the numbering type is letters or Roman numerals.
 * For example, to start numbering elements from the letter "d" or the Roman numeral "iv," use start="4".
 * @param param.type - Sets the numbering type :
 * ``a`` lowercase letters, ``A``: uppercase letters, ``i``: lowercase Roman numerals,
 * ``I``: uppercase Roman numerals, ``1``: *(default)* numbers.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
 */
export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     renderIf = true,
     hooks,
     reversed,
     start,
     type,
     flags,
}) => {
     return new CreateComponent({
          tag: "ol",
          children,
          style: styleSheet,
          className,
          events,
          id,
          renderIf,
          props: { id, reversed, start, type },
          hooks,
          flags,
     });
};
