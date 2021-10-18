import AbstractedComponent from "../../AbstractedComponent.js";

export default ({
     className,
     style,
     text,
     hooks = {
          onCreated: null,
          beforeDestroyed: null,
          onDestroyed: null,
          onUpdated: null,
          onStateUpdated: null,
     },
     events = {},
}) => {
     return new AbstractedComponent({
          tag: "span",
          props: { className: className },
          events: events,
          hooks: hooks,
          children: text,
          style: style,
     });
};
