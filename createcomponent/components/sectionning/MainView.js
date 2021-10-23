import CreateComponent from "../../CreateComponent.js";

export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "main",
          children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className,
          events,
          hooks,
          style: styleSheet,
     });
