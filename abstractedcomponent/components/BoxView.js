import AbstractedComponent from "../../AbstractedComponent.js";

export default ({
     className,
     style,
     children,
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
          tag: "div",
          props: { className: className },
          events: events,
          hooks: hooks,
          children: children,
          style: style,
     });
};
