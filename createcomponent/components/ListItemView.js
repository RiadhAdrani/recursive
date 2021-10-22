import CreateComponent from "../CreateComponent.js";

export default ({
     content,
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
          tag: "li",
          children: content,
          renderIf,
          style: styleSheet,
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
