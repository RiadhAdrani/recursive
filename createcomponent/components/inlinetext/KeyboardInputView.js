import CreateComponent from "../../CreateComponent.js";

export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "kdb",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
