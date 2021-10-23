import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     autoplay,
     controls,
     crossOrigin,
     loop,
     muted,
     preload,
     src,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "audio",
          children,
          inlineStyle: style,
          renderIf,
          props: { id, autoplay, controls, crossOrigin, loop, muted, preload, src },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
