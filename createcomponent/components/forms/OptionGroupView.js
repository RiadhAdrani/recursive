import CreateComponent from "../../CreateComponent.js";

/**
 * ## OptionGroupView `<optgroup>`
 * *from MDN Docs*
 * ### The Option Group element
 * The ``<optgroup>`` HTML element creates a grouping of options within a <select> element.
 * @param param.disabled If this Boolean attribute is set,
 * none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events,
 * like mouse clicks or focus-related ones.
 * @param param.label If this Boolean attribute is set, none of the items in this option group is selectable.
 * Often browsers grey out such control
 * and it won't receive any browsing events, like mouse clicks or focus-related ones.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     disabled,
     label,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "optgroup",
          inlineStyle: style,
          renderIf,
          props: { id, disabled, label },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
