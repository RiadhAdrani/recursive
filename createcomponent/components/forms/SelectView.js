import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     autoComplete,
     autofocus,
     disabled,
     form,
     multiple,
     required,
     size,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "select",
          inlineStyle: style,
          renderIf,
          props: { id, autoComplete, autofocus, disabled, form, multiple, required, size },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
