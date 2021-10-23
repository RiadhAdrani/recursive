import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     referrerPolicy,
     src,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "portal",
          inlineStyle: style,
          renderIf,
          props: { id, referrerPolicy, src },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
