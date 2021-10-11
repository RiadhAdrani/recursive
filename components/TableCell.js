import CreateComponent from "../CreateComponent.js";

export default (
     rows,
     className,
     id,
     events,
     styleSheet,
     onCreated,
     onDestroyed,
     onUpdated,
     beforeDestroyed
) => {
     return new CreateComponent({
          tag: "td",
          children: rows,
          className,
          id,
          events,
          style: styleSheet,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeDestroyed,
     });
};
