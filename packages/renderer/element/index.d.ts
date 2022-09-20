import { BaseElement } from "../../../lib";

/**
 * create an element for a recursive application.
 * @param elementType platform-specific `element`,`component` or `view` name. In the web, this could have the value of `div`, in android it could be `View`.
 * @param props element properties.
 */
export function createElement(elementType: string, props: object): BaseElement;
