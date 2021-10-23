import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     renderIf = true,
     hooks,
     type,
     compact,
}) => {
     return new CreateComponent({
          tag: "ul",
          children,
          style: styleSheet,
          renderIf,
          className,
          events,
          props: { id, type, compact },
          hooks,
     });
};
