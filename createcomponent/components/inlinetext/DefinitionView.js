import CreateComponent from "../../CreateComponent.js";

/**
 * ## DefinitionView `<dfn>`
 * *from MDN Docs*
 * ### The Definition element
 * The ``<dfn>`` HTML element is used to indicate the term being
 * defined within the context of a definition phrase or sentence.
 * The ``<p>`` element, the ``<dt>``/``<dd>`` pairing, or the ``<section>`` element
 * which is the nearest ancestor of the ``<dfn>`` is considered to be the definition of the term.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     title,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "dfn",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id, title },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
