import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     disabled,
     label,
     selected,
     value,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children: text,
          tag: "option",
          inlineStyle: style,
          renderIf,
          props: { id, disabled, label, selected, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
