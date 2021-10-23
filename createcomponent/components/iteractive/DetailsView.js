import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     open,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "details",
          inlineStyle: style,
          renderIf,
          props: { id, open },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
