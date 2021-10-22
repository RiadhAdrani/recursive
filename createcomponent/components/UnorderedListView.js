import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     renderIf = true,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated,
}) => {
     return new CreateComponent({
          tag: "ul",
          children,
          style: styleSheet,
          renderIf,
          className,
          events,
          id,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
};
