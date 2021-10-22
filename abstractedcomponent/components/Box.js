import AbstractedComponent from "../AbstractedComponent.js";

export default ({
     className,
     style,
     renderIf,
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
          props: { className: className, renderIf },
          events: events,
          hooks: hooks,
          children: children,
          style: style,
     });
};
