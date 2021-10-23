import CreateComponent from "../../CreateComponent.js";

export default ({ text, style, cite, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "blockquote",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { cite, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
