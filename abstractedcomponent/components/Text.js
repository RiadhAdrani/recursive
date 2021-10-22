import AbstractedComponent from "../AbstractedComponent.js";

export default ({
     className,
     style,
     text,
     renderIf,
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
          tag: "p",
          props: { className: className, renderIf },
          events: events,
          hooks: hooks,
          children: text,
          style: style,
     });
};
