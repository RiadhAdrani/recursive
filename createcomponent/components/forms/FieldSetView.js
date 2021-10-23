import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     disabled,
     form,
     name,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "fieldset",
          inlineStyle: style,
          renderIf,
          props: { id, disabled, form, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
