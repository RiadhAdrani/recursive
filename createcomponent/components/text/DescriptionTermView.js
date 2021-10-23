import CreateComponent from "../../CreateComponent.js";

export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "dt",
          children: text,
          inlineStyle: style,
          props: { id },
          renderIf,
          className,
          events,
          hooks,
          style: styleSheet,
     });
