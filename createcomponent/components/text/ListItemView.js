import CreateComponent from "../../CreateComponent.js";

/**
 * ## ListItemView `<hr>`
 * *from MDN Docs*
 * ### The List Item element
 * The ``<li>`` HTML element is used to represent an item in a list.
 * It must be contained in a parent element: an ordered list (``<ol>``),
 * an unordered list (``<ul>``), or a menu (``<menu>``).
 * In menus and unordered lists, list items are usually displayed using bullet points.
 * In ordered lists, they are usually displayed with an ascending counter on the left,
 * such as a number or letter.
 * @param param.value -  This integer attribute indicates the current ordinal value of the list item as defined by the ``<ol>`` element.
 * The only allowed value for this attribute is a number,
 * even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set.
 * The value attribute has no meaning for unordered lists (``<ul>``) or for menus (``<menu>``)..
 * @param param.type - **depreacted** : This character attribute indicates the numbering type :
 * ``a`` lowercase letters, ``A``: uppercase letters, ``i``: lowercase Roman numerals,
 * ``I``: uppercase Roman numerals, ``1``: numbers
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
 */
export default ({ children, styleSheet, className, events, id, hooks, value, type, flags }) => {
     return new CreateComponent({
          tag: "li",
          children,
          style: styleSheet,
          className,
          events,
          props: { id, value, type },
          hooks,
          flags,
     });
};
