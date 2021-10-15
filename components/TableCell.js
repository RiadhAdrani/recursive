import CreateComponent from "../CreateComponent.js";

export default (
     rows,
     className,
     id,
     events,
     styleSheet,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated
) => {
     return new CreateComponent({
          tag: "td",
          children: rows,
          className,
          id,
          events,
          style: styleSheet,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
};
