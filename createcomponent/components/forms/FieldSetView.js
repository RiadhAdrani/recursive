import CreateComponent from "../../CreateComponent.js";

/**
 * ## FieldSetView `<fieldset>`
 * *from MDN Docs*
 * ### The Field Set element
 * The <``fieldset>`` HTML element is used to group several controls as well as labels (<label>)
 * within a web form.
 * @param param.disabled If this Boolean attribute is set,
 * all form controls that are descendants of the ``<fieldset>``,
 * are disabled, meaning they are not editable and won't be submitted along with the ``<form>.``
 * @param param.form This attribute takes the value of the id attribute of a ``<form>`` element
 * you want the ``<fieldset>`` to be part of, even if it is not inside the form.
 * @param param.name The name associated with the group.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     disabled,
     form,
     name,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "fieldset",
          inlineStyle: style,
          props: { id, disabled, form, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
