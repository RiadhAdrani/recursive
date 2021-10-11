import CreateComponent from "../CreateComponent.js";

export default ({
     children,
     styleSheet,
     className,
     events,
     id,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
}) => {
     return new CreateComponent({
          tag: "ul",
          children,
          style: styleSheet,
          className,
          events,
          id,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
     });
};
