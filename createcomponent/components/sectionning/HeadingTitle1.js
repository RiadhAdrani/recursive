import CreateComponent from "../../CreateComponent.js";

export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "h1",
          children: text,
          inlineStyle: style,
          props: { id },
          renderIf,
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
