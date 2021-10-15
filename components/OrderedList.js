import CreateComponent from "../CreateComponent.js";

export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     type,
     start,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated,
}) => {
     return new CreateComponent({
          tag: "ol",
          children,
          style: styleSheet,
          className,
          events,
          id,
          type,
          start,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
};
