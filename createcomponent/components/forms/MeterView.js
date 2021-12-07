import CreateComponent from "../../CreateComponent.js";

/**
 * ## MeterView `<meter>`
 * *from MDN Docs*
 * ### The HTML Meter element
 * The ``<meter>`` HTML element represents either a scalar value within a known range or a fractional value.
 * @param param.value The current numeric value.
 * @param param.min The lower numeric bound of the measured range
 * @param param.max The upper numeric bound of the measured range
 * @param param.low The upper numeric bound of the low end of the measured range.
 * @param param.high The lower numeric bound of the high end of the measured range.
 * @param param.optimum This attribute indicates the optimal numeric value.
 * @param param.form The ``<form>`` element to associate the ``<meter>`` element with (its form owner).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
 */
export default ({
     style,
     styleSheet,
     id,
     className,
     value,
     min,
     max,
     low,
     high,
     optimum,
     form,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "meter",
          inlineStyle: style,
          props: { id, value, min, max, low, high, optimum, form },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
