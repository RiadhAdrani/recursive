import CreateComponent from "../../CreateComponent.js";

export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "dl",
          children: children,
          inlineStyle: style,
          renderIf,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
     });
