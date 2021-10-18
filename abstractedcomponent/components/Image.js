import AbstractedComponent from "../../AbstractedComponent.js";

export default ({
     className,
     style,
     src,
     altText,
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
          tag: "img",
          props: { className: className, src, alt: altText },
          events: events,
          hooks: hooks,
          style: style,
     });
};
