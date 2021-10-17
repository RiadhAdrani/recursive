import CreateComponent from "../CreateComponent.js";

export default (
     rows,
     className,
     id,
     events,
     styleSheet,
     onCreated,
     renderIf = true,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated
) => {
     return new CreateComponent({
          tag: "table",
          children: rows,
          renderIf,
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
