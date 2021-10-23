import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     renderIf = true,
     hooks,
     value,
     type,
}) => {
     return new CreateComponent({
          tag: "li",
          children,
          renderIf,
          style: styleSheet,
          className,
          events,
          props: { id, value, type },
          hooks,
     });
};
