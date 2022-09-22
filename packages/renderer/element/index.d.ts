import { BaseElement } from "../../../lib";

/**
 * create an element for a recursive application.
 * @param elementType platform-specific `element`,`component` or `view` name. In the web, this could have the value of `div`, in android it could be `View`.
 * @param props element properties, properties, events, hooks, flags and anything else can go here.
 */
export function createElement(elementType: string, props: object): BaseElement;
