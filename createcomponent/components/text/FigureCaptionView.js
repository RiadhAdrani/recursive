import CreateComponent from "../../CreateComponent.js";

export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "figcaption",
          children: text,
          inlineStyle: style,
          props: { id },
          renderIf,
          className,
          events: events,
          hooks,
          style: styleSheet,
     });
