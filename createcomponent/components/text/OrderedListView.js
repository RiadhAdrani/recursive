import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     renderIf = true,
     hooks,
     reversed,
     start,
     type,
}) => {
     return new CreateComponent({
          tag: "ol",
          children,
          style: styleSheet,
          className,
          events,
          id,
          renderIf,
          props: { id, reversed, start, type },
          hooks,
     });
};
