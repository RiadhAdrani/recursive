import CreateComponent from "../../CreateComponent.js";

export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          children,
          tag: "form",
          inlineStyle: style,
          renderIf,
          props: { id, type },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
