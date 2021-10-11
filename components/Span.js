import CreateComponent from "../CreateComponent.js";

export default ({
     children,
     className,
     id,
     styleSheet,
     events,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
}) => {
     return new CreateComponent({
          tag: "span",
          children,
          className,
          id,
          style: styleSheet,
          events,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
     });
};
