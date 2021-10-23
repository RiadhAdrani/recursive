import CreateComponent from "../../CreateComponent.js";

export default ({ text, className, id, style, events, styleSheet, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "p",
          children: text,
          renderIf,
          inlineStyle: style,
          style: styleSheet,
          events: events,
          className: className,
          props: { id },
          hooks,
     });
