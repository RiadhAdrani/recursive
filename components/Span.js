import CreateComponent from "../CreateComponent.js";

export default ({
     children,
     className,
     id,
     styleSheet,
     events,
     renderIf = true,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated,
}) => {
     return new CreateComponent({
          tag: "span",
          children,
          className,
          id,
          style: styleSheet,
          renderIf,
          events,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
};
