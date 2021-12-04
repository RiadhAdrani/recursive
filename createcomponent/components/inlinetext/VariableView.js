import CreateComponent from "../../CreateComponent.js";

/**
 * ## VariableView `<var>`
 * *from MDN Docs*
 * ### The Variable element
 * The ``<var>`` HTML element represents the name of a variable
 * in a mathematical expression or a programming context.
 * It's typically presented using an italicized version of the current typeface,
 * although that behavior is browser-dependent.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
 */
export default ({
     text,
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
          tag: "var",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
