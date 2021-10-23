import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     disabled,
     label,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "optgroup",
          inlineStyle: style,
          renderIf,
          props: { id, disabled, label },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
