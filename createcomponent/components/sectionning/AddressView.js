import CreateComponent from "../../CreateComponent.js";

/**
 * ## AddressView `<address>`
 * *from MDN Docs*
 * ### The Contact Address element
 * The `address` HTML element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
 */
export default (
     param = {
          children: "",
          style: {},
          styleSheet: {},
          id: "",
          className: "",
          events: {},
          renderIf: true,
          hooks: {},
     }
) => {
     return new CreateComponent({
          tag: "address",
          ...param,
          props: { id: param.id },
     });
};
