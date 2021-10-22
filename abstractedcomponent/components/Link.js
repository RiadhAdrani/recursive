import AbstractedComponent from "../AbstractedComponent.js";

export default ({
     className,
     style,
     children,
     url,
     target,
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
          tag: "a",
          props: { className: className, renderIf, href: url ? url : "", target },
          events: events,
          hooks: hooks,
          children,
          style: style,
     });
};
