import CreateComponent from "../../CreateComponent.js";

export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          children,
          tag: "tbody",
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
