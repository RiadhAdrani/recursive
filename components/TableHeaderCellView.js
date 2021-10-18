import CreateComponent from "../CreateComponent.js";

export default (
     rows,
     className,
     id,
     events,
     styleSheet,
     renderIf = true,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated
) => {
     return new CreateComponent({
          tag: "th",
          children: rows,
          className,
          id,
          renderIf,
          events,
          style: styleSheet,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
};
