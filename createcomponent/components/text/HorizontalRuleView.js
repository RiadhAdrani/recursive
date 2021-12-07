import CreateComponent from "../../CreateComponent.js";

/**
 * ## HorizontalRuleView `<hr>`
 * *from MDN Docs*
 * ### The Thematic Break (Horizontal Rule) element
 * The ``<hr> ``HTML element represents a thematic break between paragraph-level elements:
 * for example, a change of scene in a story, or a shift of topic within a section.
 * @param param.align - **depreacted** : Sets the alignment of the rule on the page. If no value is specified, the default value is ``left``.
 * @param param.color - **non-standart**: Sets the color of the rule through color name or hexadecimal value.
 * @param param.noshade - **depreacted** : Sets the rule to have no shading.
 * @param param.size - **depreacted** : Sets the height, in pixels, of the rule.
 * @param param.width - **depreacted** : Sets the length of the rule on the page through a pixel or percentage value.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
 */
export default ({
     style,
     styleSheet,
     id,
     className,
     events,
     align,
     color,
     noShade,
     size,
     width,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "hr",
          inlineStyle: style,
          id: id,
          className: className,
          props: { align, color, noShade, size, width, id },
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
