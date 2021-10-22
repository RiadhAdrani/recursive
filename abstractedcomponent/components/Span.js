import AbstractedComponent from "../AbstractedComponent.js";

export default ({
     className,
     style,
     renderIf,
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
          props: { className: className, renderIf },
          events: events,
          hooks: hooks,
          children: text,
          style: style,
     });
};
