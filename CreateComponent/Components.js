import CreateComponent from "./CreateComponent.js";
import Check from "./tools/Check.js";

/**
 * ## EmbedExternalView `<embed>`
 * *from MDN Docs*
 * ### The Embed External Content element
 * The ``<embed>`` HTML element embeds external content at the specified point in the document.
 * This content is provided by an external application or other source of interactive
 * content such as a browser plug-in.
 * @param param.height The displayed height of the resource in pixel
 * @param param.src The URL of the resource being embedded.
 * @param param.type The MIME type to use to select the plug-in to instantiate.
 * @param param.width The displayed width of the resource
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
 */
const Embed =
     () =>
     ({ style, styleSheet, id, height, src, type, width, className, events, hooks, flags }) =>
          new CreateComponent({
               tag: "embed",
               inlineStyle: style,
               props: { id, height, src, type, width },
               className: className,
               events: events,
               hooks,
               style: styleSheet,
               flags,
          });

/**
 * ## SourceView `<source>`
 * *from MDN Docs*
 * ### The Media or Image Source element
 * he ``<source>`` HTML element specifies multiple media resources for the ``<picture>``,
 * the ``<audio>`` element, or the ``<video>`` element. It is an empty element,
 * meaning that it has no content and does not have a closing tag.
 * It is commonly used to offer the same media content in multiple file formats
 * in order to provide compatibility with a broad range of browsers given their differing
 * support for image file formats and media file formats.
 * @param param.media Media query of the resource's intended media.
 * @param param.sizes Is a list of source sizes that describes the final rendered width of the image represented by the source
 * @param param.src Required for ``<audio>`` and ``<video>``, address of the media resource.
 * @param param.srcSet A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use.
 * @param param.type The MIME media type of the resource, optionally with a codecs parameter.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
 */
const Source = ({
     style,
     styleSheet,
     id,
     media,
     sizes,
     src,
     srcSet,
     type,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "source",
          inlineStyle: style,
          props: { id, media, sizes, src, srcSet, type },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## PortalView `<portal>`
 * *from MDN Docs*
 * ### The Portal element
 * The ``<portal>`` HTML element enables the embedding of another HTML page into the current one for the purposes
 * of allowing smoother navigation into new pages.
 * @param param.referrerPolicy Sets the referrer policy to use when requesting the page at the URL given as the value of the src attribute.
 * @param param.src The URL of the page to embed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/portal
 */
const Portal = ({ style, styleSheet, id, referrerPolicy, src, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "portal",
          inlineStyle: style,
          props: { id, referrerPolicy, src },
          className: className,
          events: events,
          hooks,
          flags,
          style: styleSheet,
     });

/**
 * ## PictureView `<picture>`
 * *from MDN Docs*
 * ### The Picture element
 * The ``<picture>`` HTML element contains zero or more <source> elements and one ``<img>``
 * element to offer alternative versions of an image for different display/device scenarios.
 * The browser will consider each child <source> element and choose the best match among them.
 * If no matches are found—or the browser doesn't support the ``<picture>``
 * element—the URL of the ``<img>`` element's src attribute is selected.
 * The selected image is then presented in the space occupied by the ``<img>`` element.
 * a nested browsing context, or a resource to be handled by a plugin.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
 */
const Picture = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "picture",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ObjectView `<object>`
 * *from MDN Docs*
 * ### The External Object element
 * The ``<object>`` HTML element represents an external resource, which can be treated as an image,
 * a nested browsing context, or a resource to be handled by a plugin.
 * @param param.data The address of the resource as a valid URL. At least one of data and type must be defined.
 * @param param.form The form element, if any, that the object element is associated with (its form owner).
 * @param param.height The height of the displayed resource in pixel
 * @param param.name The name of valid browsing context
 * @param param.type The content type of the resource specified by data. At least one of data and type must be defined.
 * @param param.useMap A hash-name reference to a ``<map>`` element;
 * that is a '#' followed by the value of a name of a map element.
 * @param param.width The width of the display resource in pixel
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
 */
const Object = ({
     style,
     styleSheet,
     id,
     className,
     data,
     form,
     height,
     name,
     type,
     useMap,
     width,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "object",
          inlineStyle: style,
          props: { id, data, form, height, name, type, useMap, width },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ObjectParameterView `<param>`
 * *from MDN Docs*
 * ### The Object Parameter element
 * The ``<param>`` HTML element defines parameters for an <object> element.
 * @param param.name Name of the parameter.
 * @param param.value Specifies the value of the parameter.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param
 */
const Param = ({ style, styleSheet, id, name, value, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "param",
          inlineStyle: style,
          renderIf,
          props: { id, name, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## IFrameView `<iframe>`
 * *from MDN Docs*
 * ### The Inline Frame element
 * The ``<embed>`` HTML element embeds external content at the specified point in the document.
 * This content is provided by an external application or other source of interactive
 * content such as a browser plug-in.
 * @param param.height The displayed height of the resource in pixel
 * @param param.name A targetable name for the embedded browsing context.
 * @param param.referrerPolicy Indicates which referrer to send when fetching the frame's resource
 * @param param.sandbox Applies extra restrictions to the content in the frame.
 * @param param.src The URL of the page to embed.
 * @param srcDoc Inline HTML to embed, overriding the src attribute
 * @param param.width The displayed width of the resource in pixel
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
 */
const IFrame = ({
     children,
     style,
     styleSheet,
     id,
     allow,
     allowFullScreen,
     allowPaymentRequest,
     height,
     loading,
     name,
     referrerPolicy,
     sandbox,
     src,
     srcDoc,
     width,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "iframe",
          inlineStyle: style,
          props: {
               id,
               allow,
               allowFullScreen,
               allowPaymentRequest,
               height,
               loading,
               name,
               referrerPolicy,
               sandbox,
               src,
               srcDoc,
               width,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ButtonView `<button>`
 * *from MDN Docs*
 * ### The Button element
 * The ``<button>`` HTML element represents a clickable button,
 * used to submit forms or anywhere in a document for accessible,
 * standard button functionality.
 * @param param.autofocus This Boolean attribute specifies that the button
 * should have input focus when the page loads.
 * @param param.disabled This Boolean attribute prevents the user from interacting with the button:
 * it cannot be pressed or focused.
 * @param param.form The ``<form>`` element to associate the button with (its form owner).
 * @param param.formAction The URL that processes the information submitted by the button.
 * @param param.formEncType If the button is a submit button (it's inside/associated with a ``<form>``
 * and doesn't have type="button"), specifies how to encode the form data that is submitted.
 * @param param.formMethod If the button is a submit button (it's inside/associated with a ``<form>``
 * and doesn't have type="button"), this attribute specifies the HTTP method used to submit the form.
 * @param param.formNoValidate If the button is a submit button, this Boolean attribute specifies
 * that the form is not to be validated when it is submitted.
 * @param param.formTarget If the button is a submit button,
 * this attribute is an author-defined name or standardized,
 * underscore-prefixed keyword indicating where to display the response from submitting the form.
 * @param param.name The name of the button
 * @param param.type The default behavior of the button.
 * @param param.value Defines the value associated with the button’s name when it’s submitted with the form data.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 */
const Button = ({
     text,
     style,
     styleSheet,
     id,
     autofocus,
     disabled,
     form,
     formAction,
     formEncType,
     formMethod,
     formNoValidate,
     formTarget,
     name,
     type,
     value,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children: text,
          tag: "button",
          inlineStyle: style,
          props: {
               id,
               autofocus,
               disabled,
               form,
               formAction,
               formEncType,
               formMethod,
               formNoValidate,
               formTarget,
               name,
               type,
               value,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TextAreaView `<textarea>`
 * *from MDN Docs*
 * ### The Textarea element
 * The ``<textarea>`` HTML element represents a multi-line plain-text editing control,
 * useful when you want to allow users to enter a sizeable amount of free-form text,
 * for example a comment on a review or feedback form.
 * @param param.autoComplete This attribute indicates whether the value of the control can be automatically completed by the browser.
 * @param param.autofocus This Boolean attribute lets you specify that a form control should have input focus when the page loads.
 * @param param.cols The visible width of the text control, in average character widths.
 * @param param.disabled This Boolean attribute indicates that the user cannot interact with the control.
 * @param param.form The form element that the ``<textarea>`` element is associated with (its "form owner").
 * @param param.maxLength The maximum number of characters (UTF-16 code units) that the user can enter.
 * @param param.minLength The minimum number of characters (UTF-16 code units) required that the user should enter.
 * @param param.name The name of the control.
 * @param param.placeholder A hint to the user of what can be entered in the control.
 * @param param.readOnly This Boolean attribute indicates that the user cannot modify the value of the control.
 * @param param.required This attribute specifies that the user must fill in a value before submitting a form.
 * @param param.rows The number of visible text lines for the control.
 * @param param.spellCheck Specifies whether the ``<textarea>`` is subject to spell checking by the underlying browser/OS.
 * @param param.wrap Indicates how the control wraps text.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
const TextArea = ({
     text,
     style,
     styleSheet,
     id,
     autoComplete,
     autofocus,
     cols,
     disabled,
     form,
     maxLength,
     minLength,
     name,
     placeholder,
     readOnly,
     required,
     rows,
     spellCheck,
     wrap,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children: text,
          tag: "textarea",
          inlineStyle: style,
          props: {
               id,
               autoComplete,
               autofocus,
               cols,
               disabled,
               form,
               maxLength,
               minLength,
               name,
               placeholder,
               readOnly,
               required,
               rows,
               spellCheck,
               wrap,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## SelectView `<select>`
 * *from MDN Docs*
 * ### The HTML Select element
 * The ``<select>`` HTML element represents a control that provides a menu of options:
 * @param param.autoComplete A DOMString providing a hint for a user agent's autocomplete feature.
 * @param param.autofocus This Boolean attribute lets you specify that a form control should have input focus when the page loads.
 * @param param.disabled This Boolean attribute indicates that the user cannot interact with the control.
 * @param param.form The ``<form>`` element to associate the ``<select>`` with (its form owner).
 * @param param.multiple This Boolean attribute indicates that multiple options can be selected in the list.
 * @param param.name This attribute is used to specify the name of the control.
 * @param param.required A Boolean attribute indicating that an option with a non-empty string value must be selected.
 * @param param.size If the control is presented as a scrolling list box (e.g. when multiple is specified),
 * this attribute represents the number of rows in the list that should be visible at one time.
 * Browsers are not required to present a select element as a scrolled list box. The default value is 0.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
const Select = ({
     children,
     style,
     styleSheet,
     id,
     autoComplete,
     autofocus,
     disabled,
     form,
     multiple,
     required,
     size,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "select",
          inlineStyle: style,
          props: { id, autoComplete, autofocus, disabled, form, multiple, required, size },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ProgressView `<progress>`
 * *from MDN Docs*
 * ### The Progress Indicator element
 * The ``<progress>`` HTML element displays an indicator showing the completion progress of a task,
 * typically displayed as a progress bar.
 * @param param.max This attribute describes how much work the task indicated by the progress element requires.
 * @param param.value This attribute specifies how much of the task that has been completed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
 */
const Progress = ({ text, style, styleSheet, id, className, max, value, events, hooks, flags }) =>
     new CreateComponent({
          children: text,
          tag: "progress",
          inlineStyle: style,
          props: { id, max, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## OutputView `<output>`
 * *from MDN Docs*
 * ### The Output element
 * The ``<output>`` HTML element is a container element into which a site or app
 * can inject the results of a calculation or the outcome of a user action.
 * @param param.for A space-separated list of other elements’ ids,
 * indicating that those elements contributed input values to (or otherwise affected) the calculation.
 * @param param.form The ``<form>`` element to associate the output with (its form owner).
 * @param param.name The element's name
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
 */
const Output = ({
     text,
     style,
     styleSheet,
     id,
     isFor,
     form,
     name,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children: text,
          tag: "output",
          inlineStyle: style,
          props: { id, isFor, form, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## OptionView `<option>`
 * *from MDN Docs*
 * ### The HTML Option element
 * The ``<option>`` HTML element is used to define an item contained in a ``<select>``, an <optgroup>,
 * or a ``<datalist>`` element.
 * As such, ``<option>`` can represent menu items in popups and other lists of items in an HTML document.
 * @param param.disabled If this Boolean attribute is set, this option is not checkable.
 * @param param.label This attribute is text for the label indicating the meaning of the option.
 * @param param.selected If present, this Boolean attribute indicates that the option is initially selected.
 * @param param.value The content of this attribute represents the value to be submitted with the form, should this option be selected.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
 */
const Option = ({
     text,
     style,
     styleSheet,
     id,
     className,
     disabled,
     label,
     selected,
     value,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children: text,
          tag: "option",
          inlineStyle: style,
          props: { id, disabled, label, selected, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## OptionGroupView `<optgroup>`
 * *from MDN Docs*
 * ### The Option Group element
 * The ``<optgroup>`` HTML element creates a grouping of options within a <select> element.
 * @param param.disabled If this Boolean attribute is set,
 * none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events,
 * like mouse clicks or focus-related ones.
 * @param param.label If this Boolean attribute is set, none of the items in this option group is selectable.
 * Often browsers grey out such control
 * and it won't receive any browsing events, like mouse clicks or focus-related ones.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
 */
const OptionGroup = ({
     children,
     style,
     styleSheet,
     id,
     disabled,
     label,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "optgroup",
          inlineStyle: style,
          props: { id, disabled, label },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

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
const Meter = ({
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

/**
 * ## LabelView `<label>`
 * *from MDN Docs*
 * ### The Input Label element
 * The ``<label>`` HTML element represents a caption for an item in a user interface.
 * @param param.for The value of the for attribute must be a single id
 * for a labelable form-related element in the same document as the ``<label>`` element.
 * So, any given label element can be associated with only one form control.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
 */
const Label = ({ text, style, styleSheet, id, isFor, className, events, hooks, flags }) =>
     new CreateComponent({
          children: text,
          tag: "label",
          inlineStyle: style,
          props: { id, isFor },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## InputView `<form>`
 * *from MDN Docs*
 * ### The Input (Form Input) element
 * The ``<input>`` HTML element is used to create interactive controls for web-based forms
 * in order to accept data from the user;
 * a wide variety of types of input data and control widgets are available,
 * depending on the device and user agent. The ``<input>`` element is one of the most powerful and complex
 * in all of HTML due to the sheer number of combinations of input types and attributes.
 * @param param.type How an <input> works varies considerably depending on the value of its type attribute,
 * hence the different types are covered in their own separate reference pages.
 * If this attribute is not specified, the default type adopted is text.
 * #### Check the link below for detailed information about each type of input.
 * * `button`
 * * `checkbox`
 * * `color`
 * * `date`
 * * `datetime-local`
 * * `email`
 * * `file`
 * * `hidden`
 * * `image`
 * * `month`
 * * `number`
 * * `password`
 * * `radio`
 * * `range`
 * * `reset`
 * * `search`
 * * `submit`
 * * `tel`
 * * `text`
 * * `time`
 * * `urm`
 * * `week`
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 */
const Input = ({
     style,
     styleSheet,
     id,
     className,
     events,
     hooks,
     accept,
     alt,
     autoComplete,
     autofocus,
     capture,
     checked,
     dirname,
     disabled,
     form,
     formAction,
     formEncType,
     formMethod,
     formNoValidate,
     formTarget,
     height,
     list,
     max,
     maxLength,
     min,
     minLength,
     multiple,
     name,
     pattern,
     placeholder,
     readOnly,
     required,
     size,
     src,
     step,
     type,
     value,
     width,
     flags,
}) =>
     new CreateComponent({
          tag: "input",
          inlineStyle: style,
          props: {
               id,
               type,
               accept,
               alt,
               autoComplete,
               autofocus,
               capture,
               checked,
               dirname,
               disabled,
               form,
               formAction,
               formEncType,
               formMethod,
               formNoValidate,
               formTarget,
               height,
               list,
               max,
               maxLength,
               min,
               minLength,
               multiple,
               name,
               pattern,
               placeholder,
               readOnly,
               required,
               size,
               src,
               step,
               value,
               width,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## FormView `<form>`
 * *from MDN Docs*
 * ### The Form element
 * The ``<form>`` HTML element represents a document section containing interactive
 * controls for submitting information
 * @param param.acceptCharset Space-separated character encodings the server accepts
 * @param param.autoComplete Indicates whether input elements can by default have their values automatically completed by the browser
 * @param param.name The name of the form.
 * @param param.rel Creates a hyperlink or annotation depending on the value
 * @param param.action The URL that processes the form submission.
 * @param param.encType If the value of the method attribute is post, enctype is the MIME type of the form submission.
 * @param param.method The HTTP method to submit the form with.
 * @param param.noValidate This Boolean attribute indicates that the form shouldn't be validated when submitted.
 * @param param.target Indicates where to display the response after submitting the form.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
 */
const Form = ({
     children,
     style,
     styleSheet,
     id,
     acceptCharSet,
     autoComplete,
     name,
     rel,
     action,
     encType,
     method,
     noValidate,
     target,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "form",
          inlineStyle: style,
          props: {
               id,
               acceptCharSet,
               autoComplete,
               name,
               rel,
               action,
               encType,
               method,
               noValidate,
               target,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

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
const FieldSet = ({
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

/**
 * ## DataListView `<datalist>`
 * *from MDN Docs*
 * ### The HTML Data List element
 * The ``<datalist>`` HTML element contains a set of <option> elements that represent
 * the permissible or recommended options available to choose from within other controls.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
 */
const DataList = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "datalist",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## AbbreviationView `<abbr>`
 * *from MDN Docs*
 * ### The Abbreviation element
 * The ``<abbr>`` HTML element represents an abbreviation or acronym;
 * the optional title attribute can provide an expansion or description for the abbreviation.
 * If present, title must contain this full description and nothing else.
 * @param param.title contain a full human-readable description or expansion of the abbreviation
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
 */
const Abbr = ({ text, style, title, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "abbr",
          children: text,
          inlineStyle: style,
          props: { title, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## WordBreakOpportunityView `<wbr>`
 * *from MDN Docs*
 * ### The Word Break Opportunity element
 * The ``<wbr>`` HTML element represents a word break opportunity—a
 * position within text where the browser may optionally break a line,
 * though its line-breaking rules would not otherwise create a break at that location.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
 */
const Wbr = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "wbr",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## VariableView `<var>`
 * *from MDN Docs*
 * ### The Variable element
 * The ``<var>`` HTML element represents the name of a variable
 * in a mathematical expression or a programming context.
 * It's typically presented using an italicized version of the current typeface,
 * although that behavior is browser-dependent.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
 */
const Var = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "var",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## UnarticulatedAnnotationView `<u>`
 * *from MDN Docs*
 * ### The Unarticulated Annotation (Underline) element
 * The ``<u>`` HTML element represents a span of inline text
 * which should be rendered in a way that indicates that it has a non-textual annotation.
 * This is rendered by default as a simple solid underline, but may be altered using CSS.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
 */
const U = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "u",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## SuperscriptTextView `<sup>`
 * *from MDN Docs*
 * ### The Superscript element
 * The ``<sup>`` HTML element specifies inline text
 * which is to be displayed as superscript for solely typographical reasons.
 * Superscripts are usually rendered with a raised baseline using smaller text
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
 */
const Sup = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "sup",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## SubscriptTextView `<sub>`
 * *from MDN Docs*
 * ### The Subscript element
 * The ``<sub>`` HTML element specifies inline text
 * which should be displayed as subscript for solely typographical reasons.
 * Subscripts are typically rendered with a lowered baseline using smaller text.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
 */
const Sub = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "sub",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## StrongTextView `<strong>`
 * *from MDN Docs*
 * ### The Strong Importance element
 * The ``<strong>`` HTML element indicates that its contents have strong importance, seriousness, or urgency.
 * Browsers typically render the contents in bold type.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
 */
const Strong = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "strong",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## StrikethroughTextView `<s>`
 * *from MDN Docs*
 * ### The Strikethrough element
 * The ``<s>`` HTML element renders text with a strikethrough,
 * or a line through it. Use the ``<s>`` element to represent things
 * that are no longer relevant or no longer accurate.
 * However, ``<s>`` is not appropriate when indicating document edits;
 * for that, use the ``<del>`` and ``<ins>`` elements, as appropriate.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
 */
const S = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "s",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## SpanView `<span>`
 * *from MDN Docs*
 * ### The Content Span element
 * The ``<span>`` HTML element is a generic inline container for phrasing content,
 * which does not inherently represent anything.
 * It can be used to group elements for styling purposes (using the class or id attributes),
 * or because they share attribute values, such as lang.
 * It should be used only when no other semantic element is appropriate.
 * ``<span>`` is very much like a ``<div>`` element,
 * but ``<div>`` is a block-level element whereas a ``<span>`` is an inline element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
 */
const Span = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "span",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## SmallTextView `<small>`
 * *from MDN Docs*
 * ### The side comment element
 * The ``<small>`` HTML element represents side-comments and small print, like copyright and legal text,
 * independent of its styled presentation.
 * By default, it renders text within it one font-size smaller, such as from small to x-small.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
 */
const Small = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "small",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## SampleTextView `<samp>`
 * *from MDN Docs*
 * ### The Sample Output element
 * The ``<samp>`` HTML element is used to enclose inline text
 * which represents sample (or quoted) output from a computer program.
 * Its contents are typically rendered using
 * the browser's default monospaced font (such as Courier or Lucida Console).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
 */
const Samp = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "samp",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## RubyTextView `<ruby>`
 * *from MDN Docs*
 * ### The Ruby Annotation element
 * The ``<ruby>`` HTML element represents small annotations that are rendered
 * above, below, or next to base text, usually used for showing the pronunciation of East Asian characters.
 * It can also be used for annotating other kinds of text, but this usage is less common.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
 */
const Ruby = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "ruby",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## RubyTextView `<rt>`
 * *from MDN Docs*
 * ### The Ruby Text element
 * The ``<rt>`` HTML element specifies the ruby text component of a ruby annotation,
 * which is used to provide pronunciation, translation,
 * or transliteration information for East Asian typography.
 * The ``<rt>`` element must always be contained within a <ruby> element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
 */
const Rt = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "rt",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## RubyFallBackView `<rp>`
 * *from MDN Docs*
 * ### The Ruby Fallback Parenthesis element
 * The ``<rp>`` HTML element is used to provide fall-back parentheses for browsers
 * that do not support display of ruby annotations using the <ruby> element.
 * One ``<rp>`` element should enclose each of the opening and closing parentheses
 * that wrap the <rt> element that contains the annotation's text.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
 */
const Rp = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "rp",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## QuotationView `<q>`
 * *from MDN Docs*
 * ### The Inline Quotation element
 * The ``<q>`` HTML element indicates that the enclosed text is a short inline quotation.
 * Most modern browsers implement this by surrounding the text in quotation marks.
 * This element is intended for short quotations that don't require paragraph breaks;
 * for long quotations use the <``blockquote``> element.
 * @param param.cite The value of this attribute is a URL that designates a source document
 * or message for the information quoted. This attribute is intended to point to information
 * explaining the context or the reference for the quote.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
 */
const Q = ({ text, style, styleSheet, id, cite, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "q",
          children: text,
          inlineStyle: style,
          props: { id, cite },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## MarkTextView `<mark>`
 * *from MDN Docs*
 * ### The Mark Text element
 * The ``<mark>`` HTML element represents text which is marked or highlighted for reference or notation purposes,
 * due to the marked passage's relevance or importance in the enclosing context.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
 */
const Mark = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "mark",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## AnchorView `<a>`
 * *from MDN Docs*
 * ### The Anchor element
 * The ``<a>`` HTML element (or anchor element), with its href attribute,
 * creates a hyperlink to web pages, files, email addresses, locations in the same page,
 * or anything else a URL can address.
 * Content within each ``<a>`` should indicate the link's destination.
 * If the href attribute is present, pressing the enter key while focused on the ``<a>`` element will activate it.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
const Link = ({ children, style, styleSheet, to, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "a",
          children: children,
          inlineStyle: style,
          props: {
               id,
               href: to,
          },
          className: className,
          events: {
               ...events,
               onClick: (e) => {
                    e.preventDefault();
                    if (router.goTo) {
                         router.goTo(to);
                    }
               },
          },
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## LineBreakView `<br>`
 * *from MDN Docs*
 * ### The Line Break element
 * The ``<br>`` HTML element produces a line break in text (carriage-return).
 * It is useful for writing a poem or an address, where the division of lines is significant.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
 */
const Br = ({ style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "br",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## KeyboardInputView `<kbd>`
 * *from MDN Docs*
 * ### The Keyboard Input element
 * The ``<kbd>`` HTML element represents a span of inline text denoting textual user input from a keyboard,
 * voice input, or any other text entry device.
 * By convention, the user agent defaults to rendering the contents of a ``<kbd>`` element
 * using its default monospace font, although this is not mandated by the HTML standard.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
 */
const Kdb = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "kdb",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ItalicTextView `<i>`
 * *from MDN Docs*
 * ### The Idiomatic Text element
 * The ``<i>`` HTML element represents a range of text that is set off from the normal text for some reason,
 * such as idiomatic text, technical terms, taxonomical designations,
 * among others. Historically, these have been presented using italicized type,
 * which is the original source of the ``<i>`` naming of this element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
 */
const I = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "i",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## EmphasisTextView `<em>`
 * *from MDN Docs*
 * ### The Definition element
 * The ``<em>`` HTML element marks text that has stress emphasis.
 * The ``<em>`` element can be nested, with each level of nesting indicating a greater degree of emphasis.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
 */
const Em = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "em",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## DefinitionView `<dfn>`
 * *from MDN Docs*
 * ### The Definition element
 * The ``<dfn>`` HTML element is used to indicate the term being
 * defined within the context of a definition phrase or sentence.
 * The ``<p>`` element, the ``<dt>``/``<dd>`` pairing, or the ``<section>`` element
 * which is the nearest ancestor of the ``<dfn>`` is considered to be the definition of the term.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
 */
const Dfn = ({ text, style, styleSheet, id, title, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "dfn",
          children: text,
          inlineStyle: style,
          props: { id, title },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## DataView `<data>`
 * *from MDN Docs*
 * The ``<data>`` HTML element links a given piece of content with a machine-readable translation.
 * If the content is time- or date-related, the <time> element must be used.
 * @param param.value This attribute specifies the machine-readable translation of the content of the element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
 */
const Data = ({ text, style, styleSheet, value, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "data",
          children: text,
          inlineStyle: style,
          props: { id, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## CodeView `<code>`
 * *from MDN Docs*
 * ### The Inline Code element
 * The ``<code>`` HTML element displays its contents styled in a fashion intended
 * to indicate that the text is a short fragment of computer code.
 * By default, the content text is displayed using the user agent's default monospace font.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
 */
const Code = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "code",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## CiteView `<cite>`
 * *from MDN Docs*
 * ### The Citation element
 * The ``<cite>`` HTML element is used to describe a reference to a cited creative work,
 * and must include the title of that work.
 * The reference may be in an abbreviated form according to context-appropriate conventions
 * related to citation metadata.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
 */
const Cite = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "cite",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## BoldTextView `<b>`
 * *from MDN Docs*
 * ### The Bring Attention To element
 * The ``<b>`` HTML element is used to draw the reader's attention to the element's contents,
 * which are not otherwise granted special importance.
 * This was formerly known as the Boldface element,
 * and most browsers still draw the text in boldface.
 * However, you should not use ``<b>`` for styling text; instead,
 * you should use the CSS font-weight property to create boldface text,
 * or the ``<strong>`` element to indicate that text is of special importance.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
 */
const B = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "b",
          children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## BidirectionalTextOverrideView `<bdo>`
 * *from MDN Docs*
 * ### The Bidirectional Text Override element
 * The ``<bdo>`` HTML element overrides the current directionality of text,
 * so that the text within is rendered in a different direction.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
 */
const Bdo = ({ text, style, styleSheet, id, direction, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "bdo",
          children: text,
          inlineStyle: style,
          props: { dir: direction, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## BidirectionalIsolationTextView `<bdi>`
 * *from MDN Docs*
 * ### The Bidirectional Isolate element
 * The ``<bdi>`` HTML element tells the browser's bidirectional algorithm to treat the text
 * it contains in isolation from its surrounding text.
 * It's particularly useful when a website dynamically inserts some text
 * and doesn't know the directionality of the text being inserted.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
 */
const Bdi = ({ text, style, styleSheet, id, direction, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "bdi",
          children: text,
          inlineStyle: style,
          props: { dir: direction, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## AnchorView `<a>`
 * *from MDN Docs*
 * ### The Anchor element
 * The ``<a>`` HTML element (or anchor element), with its href attribute,
 * creates a hyperlink to web pages, files, email addresses, locations in the same page,
 * or anything else a URL can address.
 * Content within each ``<a>`` should indicate the link's destination.
 * If the href attribute is present, pressing the enter key while focused on the ``<a>`` element will activate it.
 * @param param.download Prompts the user to save the linked URL instead of navigating to it.
 * Can be used with or without a value
 * @param param.href The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs —
 * they can use any URL scheme supported by browsers
 * @param param.hrefLang Hints at the human language of the linked URL. No built-in functionality.
 * Allowed values are the same as the global lang attribute.
 * @param param.ping A space-separated list of URLs. When the link is followed,
 * the browser will send POST requests with the body PING to the URLs.
 * Typically for tracking.
 * @param param.referrerPolicy How much of the referrer to send when following the link.
 * @param param.rel The relationship of the linked URL as space-separated link types.
 * @param param.target Where to display the linked URL, as the name for a browsing context (a tab, window, or ``<iframe>``).
 * The following keywords have special meanings for where to load the URL
 * @param param.type Hints at the linked URL’s format with a MIME type. No built-in functionality.
 * @param param.charSet **deprecated** Hinted at the character encoding of the linked URL.
 * @param param.name **deprecated** Was required to define a possible target location in a page. In HTML 4.01,
 * id and name could both be used on ``<a>``, as long as they had identical values.
 * @param param.rev **deprecated** Specified a reverse link; the opposite of the rel attribute.
 * Deprecated for being very confusing.
 * @param param.shape **deprecated** The shape of the hyperlink’s region in an image map.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
const A = ({
     children,
     style,
     styleSheet,
     id,
     download,
     href,
     hrefLang,
     ping,
     referrerPolicy,
     rel,
     target,
     type,
     charSet,
     coords,
     name,
     rev,
     shape,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "a",
          children: children,
          inlineStyle: style,
          props: {
               id,
               download,
               href,
               hrefLang,
               ping,
               referrerPolicy,
               rev,
               target,
               rel,
               type,
               charSet,
               coords,
               name,
               shape,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## DetailsView `<details>`
 * *from MDN Docs*
 * ### The Details disclosure element
 * The ``<details>`` HTML element creates a disclosure widget in which information `
 * is visible only when the widget is toggled into an "open" state.
 * A summary or label must be provided using the ``<summary>`` element.
 * A disclosure widget is typically presented onscreen using a small triangle
 * which rotates (or twists) to indicate open/closed status,
 * with a label next to the triangle. The contents of the
 * ``<summary>`` element are used as the label for the disclosure widget.
 * @param param.open This Boolean attribute indicates whether or not the details — that is,
 * the contents of the ``<details>`` element — are currently visible.
 * The details are shown when this attribute exists, or hidden when this attribute is absent.
 * By default this attribute is absent which means the details are not visible
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
 */
const Details = ({ children, style, styleSheet, id, open, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "details",
          inlineStyle: style,
          props: { id, open },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## SummaryView `<summary>`
 * *from MDN Docs*
 * ### The Disclosure Summary element
 * The ``<summary>`` HTML element specifies a summary, caption, or legend for a ``<details>`` element's disclosure box.
 * Clicking the ``<summary>`` element toggles the state of the parent`` <details>`` element open and closed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
 */
const Summary = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          children: text,
          tag: "summary",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## AreaView `<area>`
 * *from MDN Docs*
 * ### The Image Map Area element
 * The ``<area>`` HTML element defines an area inside an image map that has predefined clickable areas.
 * An image map allows geometric areas on an image to be associated with hypertext link.
 * This element is used only within a ``<map>`` element.
 * @param param.alt A text string alternative to display on browsers that do not display images.
 * The text should be phrased so that it presents the user with
 * the same kind of choice as the image would offer when displayed without the alternative text.
 * This attribute is required only if the href attribute is used.
 * @param param.coords The coords attribute details the coordinates of the shape attribute in size,
 * shape, and placement of an ``<area>``.
 * @param param.download This attribute, if present, indicates that the author intends the hyperlink to be used for downloading a resource.
 * See ``<a>`` for a full description of the download attribute.
 * @param param.href The hyperlink target for the area. Its value is a valid URL.
 * This attribute may be omitted; if so, the ``<area>`` element does not represent a hyperlink.
 * @param param.hrefLang Indicates the language of the linked resource
 * @param param.ping Contains a space-separated list of URLs to which, when the hyperlink is followed,
 * POST requests with the body PING will be sent by the browser (in the background).
 * Typically used for tracking.
 * @param param.referrerPolicy A string indicating which referrer to use when fetching the resource
 * @param param.rel For anchors containing the href attribute,
 * this attribute specifies the relationship of the target object to the link object.
 * The value is a space-separated list of link types values.
 * The values and their semantics will be registered by some authority
 * that might have meaning to the document author. The default relationship,
 * if no other is given, is void. Use this attribute only if the href attribute is present.
 * @param param.shape The shape of the associated hot spot.
 * The specifications for HTML defines the values rect,
 * which defines a rectangular region; circle, which defines a circular region;
 * poly, which defines a polygon; and default,
 * which indicates the entire region beyond any defined shapes.
 * @param param.target A keyword or author-defined name of the browsing context to display the linked resource.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
 */
const Area = ({
     children,
     style,
     styleSheet,
     id,
     alt,
     coords,
     download,
     href,
     hrefLang,
     ping,
     referrerPolicy,
     rel,
     shape,
     target,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "area",
          children,
          inlineStyle: style,
          props: {
               id,
               alt,
               coords,
               download,
               href,
               href,
               hrefLang,
               ping,
               referrerPolicy,
               rel,
               shape,
               target,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## VideoView `<video>`
 * *from MDN Docs*
 * ### The Image Map Area element
 * The ``<area>`` HTML element defines an area inside an image map that has predefined clickable areas.
 * An image map allows geometric areas on an image to be associated with hypertext link.
 * This element is used only within a ``<map>`` element.
 * @param param.alt A Boolean attribute: if specified,
 * the audio will automatically begin playback as soon as it can do so,
 * without waiting for the entire audio file to finish downloading.
 * @param param.controls If this attribute is present, the browser will offer controls
 * to allow the user to control audio playback,
 * including volume, seeking, and pause/resume playback.
 * @param param.crossOrigin This enumerated attribute indicates whether to use CORS to fetch the related audio file.
 * @param param.loop A Boolean attribute; if specified,
 * the browser will automatically seek back to the start upon reaching the end of the video.
 * @param param.muted A Boolean attribute that indicates whether the audio will be initially silenced.
 * Its default value is false.
 * @param param.playsInline A Boolean attribute indicating that the video is to be played "inline",
 * that is within the element's playback area.
 * Note that the absence of this attribute does not imply that the video will always be played in fullscreen.
 * @param param.poster A URL for an image to be shown while the video is downloading.
 * If this attribute isn't specified, nothing is displayed until the first frame is available,
 * then the first frame is shown as the poster frame.
 * @param param.preload This enumerated attribute is intended to provide a hint to the browser
 * about what the author thinks will lead to the best user experience with regards to what content
 * is loaded before the video is played.
 * @param param.src The URL of the video to embed
 * @param width The width of the video's display area in pixel
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */
const Video = ({
     children,
     style,
     styleSheet,
     id,
     autoplay,
     controls,
     crossOrigin,
     height,
     loop,
     muted,
     playsinline,
     poster,
     preload,
     src,
     width,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "video",
          inlineStyle: style,
          props: {
               id,
               autoplay,
               controls,
               crossOrigin,
               height,
               loop,
               muted,
               playsinline,
               poster,
               preload,
               src,
               width,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TrackView `<track>`
 * *from MDN Docs*
 * ### The Video Embed element
 * The ``<video>`` HTML element embeds a media player which supports video playback into the document.
 * You can use ``<video>`` for audio content as well,
 * but the ``<audio>`` element may provide a more appropriate user experience.
 * @param param.autoplay A Boolean attribute; if specified,
 * the video automatically begins to play back as soon as it can do so
 * without stopping to finish loading the data.
 * @param param.controls If this attribute is present,
 * the browser will offer controls to allow the user to control video playback,
 * including volume, seeking, and pause/resume playback.
 * @param param.crossOrigin This enumerated attribute indicates whether to use CORS to fetch the related audio file.
 * @param param.src Address of the track (.vtt file). Must be a valid URL.
 * This attribute must be specified and its URL value must have the same origin as the document —
 * unless the ``<audio>`` or ``<video>`` parent element of the track element has a crossorigin attribute.
 * @param param.srcLang Language of the track text data
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
 */
const Track = ({
     style,
     styleSheet,
     id,
     defaultTrack,
     kind,
     label,
     src,
     srcLang,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "track",
          inlineStyle: style,
          props: { id, kind, label, src, srcLang, default: defaultTrack },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## MapView `<map>`
 * *from MDN Docs*
 * ### The Image Map element
 * The ``<map>`` HTML element is used with <area> elements to define an image map (a clickable link area).
 * @param param.name The name attribute gives the map a name so that it can be referenced.
 * The attribute must be present and must have a non-empty value with no space characters.
 * The value of the name attribute must not be equal to the value of the name attribute of another
 * ``<map>`` element in the same document.
 * If the id attribute is also specified, both attributes must have the same value.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
 */
const Map = ({ text, style, styleSheet, id, name, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "map",
          children: text,
          inlineStyle: style,
          props: { id, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ImageView `<img>`
 * *from MDN Docs*
 * ### The Image Embed element
 * The ``<img>`` HTML element embeds an image into the document.
 * @param param.alt Defines an alternative text description of the image.
 * @param param.crossOrigin Indicates if the fetching of the image must be done using a CORS request
 * @param param.decoding Provides an image decoding hint to the browser
 * @param param.height The intrinsic height of the image, in pixels. Must be an integer without a unit.
 * @param param.isMap This Boolean attribute indicates that the image is part of a server-side map.
 * If so, the coordinates where the user clicked on the image are sent to the server.
 * @param param.referrerPolicy A string indicating which referrer to use when fetching the resource
 * @param param.sizes One or more strings separated by commas, indicating a set of source sizes.
 * @param param.src The image URL. Mandatory for the ``<img>`` element. On browsers supporting srcset,
 * src is treated like a candidate image with a pixel density descriptor 1x,
 * unless an image with this pixel density descriptor is already defined in srcset,
 * or unless srcset contains w descriptors.
 * @param param.srcSet One or more strings separated by commas,
 * indicating possible image sources for the user agent to use.
 * @param param.width The intrinsic width of the image in pixels. Must be an integer without a unit.
 * @param param.useMap The partial URL (starting with #) of an image map associated with the element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
 */
const Img = ({
     style,
     styleSheet,
     id,
     alt,
     crossOrigin,
     decoding,
     height,
     isMap,
     referrerPolicy,
     sizes,
     src,
     srcSet,
     width,
     useMap,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "img",
          inlineStyle: style,
          props: {
               id,
               alt,
               crossOrigin,
               decoding,
               height,
               isMap,
               referrerPolicy,
               sizes,
               src,
               srcSet,
               width,
               useMap,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## AudioView `<audio>`
 * *from MDN Docs*
 * ### The Image Map Area element
 * The ``<area>`` HTML element defines an area inside an image map that has predefined clickable areas.
 * An image map allows geometric areas on an image to be associated with hypertext link.
 * This element is used only within a ``<map>`` element.
 * @param param.alt A Boolean attribute: if specified,
 * the audio will automatically begin playback as soon as it can do so,
 * without waiting for the entire audio file to finish downloading.
 * @param param.controls If this attribute is present, the browser will offer controls
 * to allow the user to control audio playback,
 * including volume, seeking, and pause/resume playback.
 * @param param.crossOrigin This enumerated attribute indicates whether to use CORS to fetch the related audio file.
 * @param param.loop A Boolean attribute: if specified,
 * the audio player will automatically seek back to the start upon reaching the end of the audio.
 * @param param.muted A Boolean attribute that indicates whether the audio will be initially silenced.
 * Its default value is false.
 * @param param.preload This enumerated attribute is intended to provide
 * a hint to the browser about what the author thinks will lead to the best user experience
 * @param param.src The URL of the audio to embed. This is subject to HTTP access controls. This is optional;
 * you may instead use the ``<source>`` element within the audio block to specify the audio to embed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
const Audio = ({
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
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "audio",
          children,
          inlineStyle: style,
          props: { id, autoplay, controls, crossOrigin, loop, muted, preload, src },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## AddressView `<address>`
 * *from MDN Docs*
 * ### The Contact Address element
 * The `address` HTML element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
 */
const Address = ({ children, style, styleSheet, id, className, events, hooks, flags }) => {
     return new CreateComponent({
          tag: "address",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
};

/**
 * ## SectionView `<section>`
 * *from MDN Docs*
 * ### The Generic Section element
 * The ``<section>`` HTML element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
 */
const Section = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "section",
          children,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## NavView `<nav>`
 * *from MDN Docs*
 * ### The Navigation Section element
 * The ``<nav>`` HTML element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
 */
const Nav = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "nav",
          children,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## MainView `<main>`
 * *from MDN Docs*
 * The ``<main>`` HTML element represents the dominant content of the <body> of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
 */
const Main = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "main",
          children,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## HeaderTitleView `<header>`
 * *from MDN Docs*
 *
 * The `<h1>` to `<h6>` HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
const H6 = ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "h6",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## HeaderTitleView `<header>`
 * *from MDN Docs*
 *
 * The `<h1>` to `<h6>` HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
const H5 = ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "h5",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## HeaderTitleView `<header>`
 * *from MDN Docs*
 *
 * The `<h1>` to `<h6>` HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
const H4 = ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "h4",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## HeaderTitleView `<header>`
 * *from MDN Docs*
 *
 * The `<h1>` to `<h6>` HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
const H3 = ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "h3",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## HeaderTitleView `<header>`
 * *from MDN Docs*
 *
 * The `<h1>` to `<h6>` HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
const H2 = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "h2",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## HeaderTitleView `<header>`
 * *from MDN Docs*
 *
 * The `<h1>` to `<h6>` HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
const H1 = ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "h1",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## HeaderView `<header>`
 * *from MDN Docs*
 *
 * The ``<header>`` HTML element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */

const Header = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "header",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## FooterView `<footer>`
 * *from MDN Docs*
 *
 * The ``<footer>`` HTML element represents a footer for its nearest sectioning content or sectioning root element. A <footer> typically contains information about the author of the section, copyright data or links to related documents.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
 */
const Footer = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "footer",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## AsideView `<aside>`
 * *from MDN Docs*
 * ### The Aside element
 * The ``<aside>`` HTML element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
 */
const Aside = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "aside",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ArticleView `<article>`
 * *from MDN Docs*
 * ### The Article Contents element
 * The `article` HTML element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
 */
const Article = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "article",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableBodyView `<tbody>`
 * *from MDN Docs*
 * ###  The Table Body element
 * The ``<tbody>`` HTML element encapsulates a set of table rows (``<tr>`` elements),
 * indicating that they comprise the body of the table (``<table>``).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
 */
const Tbody = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          children,
          tag: "tbody",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableView `<table>`
 * *from MDN Docs*
 * ### The Table element
 * The ``<table>`` HTML element represents tabular data — that is,
 * information presented in a two-dimensional table comprised of rows and columns of cells containing data.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
 */
const Table = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          children,
          tag: "table",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableRowView `<tr>`
 * *from MDN Docs*
 * ###  The Table Row element
 * The ``<tr>`` HTML element defines a row of cells in a table.
 * The row's cells can then be established using a mix of ``<td>`` (data cell) and ``<th>`` (header cell) elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
 */
const Tr = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "tr",
          children,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableHeadView `<thead>`
 * *from MDN Docs*
 * ###  The Table Head element
 * The ``<thead>`` HTML element defines a set of rows defining the head of the columns of the table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
 */
const Thead = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          children,
          tag: "thead",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableHeadCellView `<th>`
 * *from MDN Docs*
 * ###  The Table Header element
 * The ``<td>`` HTML element defines a cell of a table that contains data.
 * It participates in the table model.
 * @param param.abbreviation This attribute contains a short abbreviated description of the cell's content.
 * @param param.colSpan This attribute contains a non-negative integer value that indicates for how many columns the cell extends.
 * @param param.headers This attribute contains a list of space-separated strings,
 * each corresponding to the id attribute of the ``<th>`` elements that apply to this element.
 * @param param.rowSpan This attribute contains a non-negative integer value that indicates for how many rows the cell extends.
 * @param param.scope This enumerated attribute defines the cells that the header (defined in the ``<th>``) element relates to.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
 */
const Th = ({
     children,
     style,
     styleSheet,
     abbreviation,
     colSpan,
     headers,
     rowSpan,
     scope,
     id,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "th",
          inlineStyle: style,
          props: { id, abbreviation, colSpan, headers, rowSpan, scope },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableFootView `<tfoot>`
 * *from MDN Docs*
 * ### The Table Foot element
 * The ``<tfoot>`` HTML element defines a set of rows summarizing the columns of the table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
 */
const Tfoot = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          children,
          tag: "tfoot",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableColumnView `<col>`
 * *from MDN Docs*
 * ### The Table Column element
 * The ``<col>`` HTML element defines a column within a table
 * and is used for defining common semantics on all common cells.
 * It is generally found within a ``<colgroup>`` element.
 * @param param.span This attribute contains a positive integer indicating
 * the number of consecutive columns the ``<col>`` element spans.
 * If not present, its default value is 1.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
 */
const Col = ({ children, style, styleSheet, id, span, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "col",
          inlineStyle: style,
          props: { id, span },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableBodyView `<colgroup>`
 * *from MDN Docs*
 * ###  The Table Column Group element
 * The ``<colgroup>`` HTML element defines a group of columns within a table.
 * @param span This attribute contains a positive integer indicating the number of
 * consecutive columns the ``<colgroup>`` element spans.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
 */
const ColGroup = ({ children, style, styleSheet, id, span, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "colgroup",
          inlineStyle: style,
          props: { id, span },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableBodyView `<td>`
 * *from MDN Docs*
 * ###  The Table Data Cell element
 * The ``<td>`` HTML element defines a cell of a table that contains data.
 * It participates in the table model.
 * @param param.colSpan This attribute contains a non-negative integer value that indicates for how many columns the cell extends.
 * @param param.headers This attribute contains a list of space-separated strings,
 * each corresponding to the id attribute of the ``<th>`` elements that apply to this element.
 * @param param.rowSpan This attribute contains a non-negative integer value that indicates for how many rows the cell extends.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
 */
const Td = ({
     children,
     style,
     styleSheet,
     id,
     colSpan,
     headers,
     rowSpan,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "td",
          inlineStyle: style,
          props: { id, colSpan, headers, rowSpan },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## TableCaptionView `<caption>`
 * *from MDN Docs*
 * ### The Table Caption element
 * The ``<caption>`` HTML element specifies the caption (or title) of a table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
 */
const Caption = ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          children: text,
          tag: "caption",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## BlockQuoteView `<blockquote>`
 * *from MDN Docs*
 * ### The Block Quotation element
 * The ``<blockquote>`` HTML element indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the ``<cite>`` element.
 * @param param.cite A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
 */
const BlockQuote = ({ text, style, cite, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "blockquote",
          children: text,
          inlineStyle: style,
          props: { cite, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## UnorderedListView `<ol>`
 * *from MDN Docs*
 * ### The Unordered List element
 * The ``<ul>`` HTML element represents an unordered list of items, typically rendered as a bulleted list.
 * @param param.type -  **deprecated** This attribute sets the bullet style for the list.
 * The values defined under HTML3.2 and the transitional version of HTML 4.0/4.01 are:
 * `circle`, `disc` and `square`
 * A fourth bullet type has been defined in the WebTV interface,
 * but not all browsers support it: ``triangle``.
 * If not present and if no CSS list-style-type property applies to the element,
 * the user agent selects a bullet type depending on the nesting level of the list.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
 */
const Ul = ({ children, styleSheet, className, events, id, hooks, type, compact, flags }) => {
     return new CreateComponent({
          tag: "ul",
          children,
          style: styleSheet,
          className,
          events,
          props: { id, type, compact },
          hooks,
          flags,
     });
};

/**
 * ## PreformattedTextView `<pre>`
 * *from MDN Docs*
 * ### The Preformatted Text element
 * The ``<pre>`` HTML element represents preformatted text
 * which is to be presented exactly as written in the HTML file.
 * The text is typically rendered using a non-proportional, or "monospaced, font.
 * Whitespace inside this element is displayed as written.
 * @param param.cols - **non-standard**  Contains the preferred count of characters
 * that a line should have. It was a non-standard synonym of width.
 * To achieve such an effect, use CSS width instead.
 * @param param.width -  **deprecated** Contains the preferred
 * count of characters that a line should have.
 * Though technically still implemented, this attribute has no visual effect;
 * to achieve such an effect, use CSS width instead.
 * @param param.wrap - **non-standard** Is a hint indicating how the overflow must happen.
 * In modern browser this hint is ignored and no visual effect results in its present;
 * to achieve such an effect, use CSS white-space instead.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
 */
const Pre = ({
     children,
     style,
     styleSheet,
     id,
     className,
     events,
     hooks,
     cols,
     width,
     wrap,
     flags,
}) =>
     new CreateComponent({
          tag: "pre",
          children: children,
          inlineStyle: style,
          props: { id, cols, width, wrap },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## ParagraphView `<p>`
 * *from MDN Docs*
 * ### The Paragraph element
 * The ``<p>`` HTML element represents a paragraph.
 * Paragraphs are usually represented in visual media as blocks
 * of text separated from adjacent blocks by blank lines and/or first-line indentation,
 * but HTML paragraphs can be any structural grouping of related content,
 * such as images or form fields.
 * Paragraphs are block-level elements, and notably will automatically close
 * if another block-level element is parsed before the closing ``</p>`` tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
 */
const P = ({ text, className, id, style, events, styleSheet, flags, hooks }) =>
     new CreateComponent({
          tag: "p",
          children: text,
          inlineStyle: style,
          style: styleSheet,
          events: events,
          className: className,
          props: { id },
          hooks,
          flags,
     });

/**
 * ## OrderedListView `<ol>`
 * *from MDN Docs*
 * ### The Ordered List element
 * The ``<ol>`` HTML element represents an ordered list of items — typically rendered as a numbered list.
 * @param param.reversed -  This Boolean attribute specifies that the list’s items are in reverse order.
 * Items will be numbered from high to low.
 * @param param.start -  An integer to start counting from for the list items.
 * Always an Arabic numeral (1, 2, 3, etc.), even when the numbering type is letters or Roman numerals.
 * For example, to start numbering elements from the letter "d" or the Roman numeral "iv," use start="4".
 * @param param.type - Sets the numbering type :
 * ``a`` lowercase letters, ``A``: uppercase letters, ``i``: lowercase Roman numerals,
 * ``I``: uppercase Roman numerals, ``1``: *(default)* numbers.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
 */
const Ol = ({
     children,
     styleSheet,
     className,
     events,
     id,
     hooks,
     reversed,
     start,
     type,
     flags,
}) => {
     return new CreateComponent({
          tag: "ol",
          children,
          style: styleSheet,
          className,
          events,
          id,
          props: { id, reversed, start, type },
          hooks,
          flags,
     });
};

/**
 * ## ListItemView `<hr>`
 * *from MDN Docs*
 * ### The List Item element
 * The ``<li>`` HTML element is used to represent an item in a list.
 * It must be contained in a parent element: an ordered list (``<ol>``),
 * an unordered list (``<ul>``), or a menu (``<menu>``).
 * In menus and unordered lists, list items are usually displayed using bullet points.
 * In ordered lists, they are usually displayed with an ascending counter on the left,
 * such as a number or letter.
 * @param param.value -  This integer attribute indicates the current ordinal value of the list item as defined by the ``<ol>`` element.
 * The only allowed value for this attribute is a number,
 * even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set.
 * The value attribute has no meaning for unordered lists (``<ul>``) or for menus (``<menu>``)..
 * @param param.type - **depreacted** : This character attribute indicates the numbering type :
 * ``a`` lowercase letters, ``A``: uppercase letters, ``i``: lowercase Roman numerals,
 * ``I``: uppercase Roman numerals, ``1``: numbers
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
 */
const Li = ({ children, styleSheet, className, events, id, hooks, value, type, flags }) => {
     return new CreateComponent({
          tag: "li",
          children,
          style: styleSheet,
          className,
          events,
          props: { id, value, type },
          hooks,
          flags,
     });
};

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
const Hr = ({
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

/**
 * ## FigureView `<figure>`
 * *from MDN Docs*
 * ### The Figure with Optional Caption element
 * The ``<figure>`` HTML element represents self-contained content,
 * potentially with an optional caption, which is specified using the ``<figcaption>`` element.
 * The figure, its caption, and its contents are referenced as a single unit.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
 */
const Figure = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "figure",
          children,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## FigureCaptionView `<figcaption>`
 * *from MDN Docs*
 * ### The Figure Caption element
 * The ``<figcaption>`` HTML element represents a caption or legend describing the rest of the contents
 * of its parent ``<figure>`` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
 */
const FigCaption = ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "figcaption",
          children: text,
          inlineStyle: style,
          props: { id },
          className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## DividerView `<div>`
 * *from MDN Docs*
 * ### The Content Division element
 * The ``<div>`` HTML element is the generic container for flow content.
 * It has no effect on the content or layout until styled in some way using CSS
 * (e.g. styling is directly applied to it,
 * or some kind of layout model like Flexbox is applied to its parent element).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
 */
const Div = ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "div",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events,
          style: styleSheet,
          hooks,
          flags,
     });

/**
 * ## DescriptionTermView `<dt>`
 * *from MDN Docs*
 * ### The Description Term element
 * The ``<dt>`` HTML element specifies a term in a description or definition list,
 * and as such must be used inside a ``<dl>`` element.
 * It is usually followed by a ``<dd>`` element; however,
 * multiple ``<dt>`` elements in a row indicate several terms
 * that are all defined by the immediate next ``<dd>`` element.
 * The subsequent ``<dd>`` (Description Details) element provides the definition
 * or other related text associated with the term specified using ``<dt>``.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
 */
const Dt = ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "dt",
          children: text,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## DescriptionListView `<dl>`
 * *from MDN Docs*
 * ### The Description List element
 * The ``<dl>`` HTML element represents a description list.
 * The element encloses a list of groups of terms (specified using the ``<dt> ``element)
 * and descriptions (provided by ``<dd>`` elements).
 * Common uses for this element are to implement a glossary or to display metadata
 * (a list of key-value pairs).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
 */
const Dl = ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "dl",
          children: children,
          inlineStyle: style,
          props: { id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });

/**
 * ## DescriptionDetailsView `<dd>`
 * *from MDN Docs*
 * ### The Description Details element
 * The ``<dd>`` HTML element provides the description, definition, or value for the preceding term (``<dt>``) in a description list (``<dl>``).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
 */
const Dd = ({ text, style, styleSheet, id, className, events, hooks, noWrap, flags }) =>
     new CreateComponent({
          tag: "dd",
          children: text,
          inlineStyle: style,
          props: { noWrap, id },
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });

class RawHTML extends CreateComponent {
     constructor({ children }) {
          super({
               tag: "html-container",
               children: `${children}`,
          });
          this.flags.forceRerender = true;
     }

     render() {
          let render = document.createElement(this.tag);

          render.innerHTML = this.children[0];

          this.domInstance = render;

          return render;
     }

     update(newComponent) {
          this.domInstance.replaceWith(
               Check.isComponent(newComponent) ? newComponent.render() : newComponent
          );
          return true;
     }
}

/**
 * ## HTML Container `<html-container>`
 * Custom element used to render raw html.
 */
const Raw = ({ html }) => {
     return new RawHTML({
          children: html,
     });
};

export {
     Raw,
     Main,
     Dd,
     Dl,
     Dt,
     Div,
     FigCaption,
     Figure,
     Hr,
     Li,
     Ol,
     P,
     Pre,
     Ul,
     BlockQuote,
     Caption,
     Td,
     ColGroup,
     Col,
     Tfoot,
     Th,
     Thead,
     Tr,
     Table,
     Tbody,
     Article,
     Aside,
     Footer,
     Header,
     H1,
     H2,
     H3,
     H4,
     H5,
     H6,
     Nav,
     Section,
     Address,
     Audio,
     Img,
     Map,
     Track,
     Video,
     Area,
     Summary,
     Details,
     A,
     Bdi,
     Bdo,
     B,
     Cite,
     Code,
     Data,
     Dfn,
     Em,
     I,
     Kdb,
     Br,
     Link,
     Mark,
     Q,
     Rp,
     Rt,
     Ruby,
     Samp,
     Small,
     Span,
     S,
     Strong,
     Sub,
     Sup,
     U,
     Var,
     Wbr,
     Abbr,
     DataList,
     FieldSet,
     Form,
     Input,
     Label,
     Meter,
     OptionGroup,
     Option,
     Output,
     Progress,
     Select,
     TextArea,
     Button,
     IFrame,
     Param,
     Object,
     Picture,
     Portal,
     Source,
     Embed,
};
