import CreateComponent from "../../CreateComponent.js";

export default ({ text, style, styleSheet, id, name, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "map",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
