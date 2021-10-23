import CreateComponent from "../../CreateComponent.js";

export default ({ style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "br",
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
