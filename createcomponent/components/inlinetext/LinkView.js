import CreateComponent from "../../CreateComponent.js";

/**
 * ## AnchorView `<a>`
 * *from MDN Docs*
 * ### The Anchor element
 * The ``<a>`` HTML element (or anchor element), with its href attribute,
 * creates a hyperlink to web pages, files, email addresses, locations in the same page,
 * or anything else a URL can address.
 * Content within each ``<a>`` should indicate the link's destination.
 * If the href attribute is present, pressing the enter key while focused on the ``<a>`` element will activate it.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
export default ({ children, style, styleSheet, to, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "a",
          children: children,
          inlineStyle: style,
          props: {
               id,
               href: to,
          },
          className: className,
          events: {
               ...events,
               onClick: (e) => {
                    e.preventDefault();
                    if (router.goTo) {
                         router.goTo(to);
                    }
               },
          },
          hooks,
          style: styleSheet,
          flags,
     });
