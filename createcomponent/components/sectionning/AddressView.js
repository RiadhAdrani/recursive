import CreateComponent from "../../CreateComponent.js";

/**
 * ## AddressView `<address>`
 * *from MDN Docs*
 * ### The Contact Address element
 * The `address` HTML element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) => {
     return new CreateComponent({
          tag: "address",
          children: children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
};
