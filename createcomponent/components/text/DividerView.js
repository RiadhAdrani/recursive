import CreateComponent from "../../CreateComponent.js";

export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "div",
          children: children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className: className,
          events,
          style: styleSheet,
          hooks,
     });
