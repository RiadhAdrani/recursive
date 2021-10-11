import CreateComponent from "../CreateComponent.js";

export default ({
     content,
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
          tag: "li",
          children: content,
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
