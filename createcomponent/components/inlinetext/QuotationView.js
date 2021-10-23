import CreateComponent from "../../CreateComponent.js";

export default ({ text, style, styleSheet, id, cite, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "q",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id, cite },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
