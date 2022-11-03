import { BaseElement, RecursiveElement } from "../../lib";
import { RecursiveApp } from "../app";
import { RecursiveContext } from "../context";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveState } from "../state";
import { createElement } from "./element";

export { createElement };

/**
 * A blue print for a `RecursiveRenderer`, used to render and update the tree of elements.
 *
 * These methods should be implemented, otherwise they will throw `errors` :
 * * `useRendererClean`
 * * `useRendererOnTreePrepared`
 * * `useRendererRemoveAttribute`
 * * `useRendererSetAttribute`
 * * `useRendererItemInTree`
 * * `useRendererRemoveEvent`
 * * `useRendererAddEvent`
 * * `useRendererRenderTree`
 * * `useRendererChangeElementPosition`
 * * `useRendererGetElementPosition`
 * * `useRendererRemoveElement`
 * * `useRendererAddElement`
 * * `useRendererReplaceElement`
 * * `useRendererIsAttribute`
 * * `useRendererIsEvent`
 * * `useRendererCreateInstance`
 * * `useRendererInjectEvent`
 * * `useRendererInjectChild`
 * * `useRendererInjectAttribute`
 * * `useRendererInjectStyle`
 * * `useRendererCreateRawContainer`
 * * `useRendererUpdateRawContainersAgainstEachOthers`
 */
export abstract class RecursiveRenderer<T = any> {
    public bootstrapper: RecursiveApp;
    public contextManager: RecursiveContext;
    public app: () => RecursiveElement;
    public root: T;
    public current: RecursiveElement;
    public phases: { [key: string]: Array<Function> };

    get stateManager(): RecursiveState<T>;

    get orchestrator(): RecursiveOrchestrator;

    /**
     * Create an instance of the recursive renderer.
     * @param app a callback returning the tree of element/components.
     * @param root native element in which the UI will be injected.
     * @param bootstrapper bootstrapping recursive application instance.
     */
    constructor(app: () => BaseElement, root: T, bootstrapper: RecursiveApp);

    /**
     * Create an element with the recursive signature symbol.
     * @param elementType Element type
     * @param  props Element properties.
     * @returns Recursive Element.
     */
    createElement(elementType: string, props: object): BaseElement;

    /**
     * create a recursive element from a base one.
     * @param element
     * @param id
     * @param parent
     */
    prepareElement(
        element: BaseElement,
        id: string,
        parent: RecursiveElement | null
    ): RecursiveElement;

    /**
     * Store the given callback in the provided phase
     * @param phase phase of the callback.
     * @param callback callback.
     */
    delegateToRenderer(phase: string, callback: () => void): void;

    /**
     * Run the provided phase actions if it exists.
     * @param phase identifier name
     */
    runPhase(phase: string): void;

    /**
     * Delegate the call of the `onUpdated` hook to the renderer
     * @param element updated element.
     */
    onElementUpdated(element: RecursiveElement): void;

    /**
     * Delegate the call of the `onCreated` hook to the renderer
     * @param element created element.
     */
    onElementCreated(element: RecursiveElement): void;

    /**
     * Delegate the call of the `beforeDestroyed` hook to the renderer
     * @param element element about to be destroyed.
     */
    onBeforeElementDestroyed(element: RecursiveElement): void;

    /**
     * Delegate the call of the `onDestroyed` hook to the renderer
     * @param element destroyed element.
     */
    onElementDestroyed(element: RecursiveElement): void;

    /**
     * Inject the different attributes, events and children into the created instance;
     * @param element target element.
     */
    renderInstance(element: RecursiveElement): T;

    /**
     * Replace the given element by the new one.
     * @param element current element.
     * @param newElement new element.
     */
    replaceElement(element: RecursiveElement, newElement: RecursiveElement): void;

    /**
     * Append the given element into the provided parent element.
     * @param element element to be injected.
     * @param parentElement container element.
     * @param index the index of the injected element as a child.
     */
    addElement(element: RecursiveElement, parentElement: RecursiveElement, index: number): void;

    /**
     * Change the position of the given element.
     * @param element target element.
     * @param newPosition element new position.
     */
    changeElementPosition(element: RecursiveElement, newPosition: number): void;

    /**
     * Remove the given element from the tree of elements.
     * @param element element to be removed.
     */
    removeElement(element: RecursiveElement): void;

    /**
     * Compare and update the events of two elements.
     * @param element current element.
     * @param newElement new element.
     */
    updateEvents(element: RecursiveElement, newElement: RecursiveElement): boolean;

    /**
     * Compare and update the attributes of two elements.
     * @param element current element.
     * @param newElement new element.
     */
    updateAttributes(element: RecursiveElement, newElement: RecursiveElement): boolean;

    /**
     * Compare and update the children of two elements.
     * @param element current element.
     * @param newElement new element.
     */
    updateChildren(element: RecursiveElement, newElement: RecursiveElement): void;

    /**
     * Compare and update two elements.
     * @param element current element.
     * @param newElement new element.
     */
    updateElement(element: RecursiveElement, newElement: RecursiveElement): void;

    /**
     * Register element into the reference store.
     * @param element target element.
     */
    setInstanceReference(element: RecursiveElement): void;

    /**
     * Render the tree of elements.
     */
    render(): void;

    /**
     * Update the tree of elements
     */
    update(): void;

    /**
     * Perform store cleaning and renderer specific operations.
     */
    clean(): void;

    /**
     * Compute elements and return a prepared tree.
     */
    prepareElementsTree(): RecursiveElement;

    /**
     * Use the renderer to update style
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * Used to update inline style.
     *
     * ----
     *
     * @param element current element.
     * @param newElement new element.
     */
    abstract useRendererUpdateStyle(element: RecursiveElement, newElement: RecursiveElement): void;

    /**
     * Use the renderer to update plain text
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * update content of elements created using `RECURSIVE_ELEMENT_TEXT_NODE` tag
     * by comparing both element children (which is in this case a string),
     * then change `element.instance.data` if there is a difference.
     *
     * ----
     *
     * @param textElement current element.
     * @param newTextElement new element.
     */
    abstract useRendererUpdateText(
        textElement: RecursiveElement,
        newTextElement: RecursiveElement
    ): void;

    /**
     * Perform renderer specific cleaning.
     *
     * Used to reset some platform specific flags, or renderer specific variables.
     *
     */
    abstract useRendererClean(): void;

    /**
     * Executed when the tree has been prepared.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * Used to collect style
     * and convert it into string and then it is
     * injected into the DOM within a `<style>` tag.
     *
     * ----
     *
     * @param tree computed tree
     */
    abstract useRendererOnTreePrepared(tree: RecursiveElement): void;

    /**
     * Remove an attribute
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We use `instance.remvoeAttribute()` to remove the attribute.
     *
     * ----
     *
     * @param attribute attribute name.
     * @param instance element instance.
     */
    abstract useRendererRemoveAttribute(attribute: string, instance: T): void;

    /**
     * Set an attribute
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * Depending on the type of the attribute,
     * we use `element.instance.setAttribute()` or `element.instance.toggleAttribute()`
     * to update its value.
     *
     * ----
     *
     * @param attribute attribute name.
     * @param value attribute value.
     * @param element target element.
     */
    abstract useRenderSetAttribute(attribute: string, value: any, element: RecursiveElement): void;

    /**
     * Check if the children are in the tree of elements.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We just return the value of `document.contains(element.instance)`
     *
     * ----
     *
     * @param element target element.
     */
    abstract useRendererItemInTree(element: RecursiveElement): boolean;

    /**
     * Use the renderer to remove an event
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We set `instance.events[eventName]` to an empty arrow function.
     *
     *
     * @param event event name.
     * @param instance target native element.
     */
    abstract useRendererRemoveEvent(event: string, instance: T): void;

    /**
     * Use the renderer to remove an event
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * Check if the event listener exists.
     * We set `element.instance.events[eventName]` with the `callback`.
     *
     * If the listener is not initialized,
     * we use `addEventListener` to add `eventName`.
     *
     * ----
     *
     * @param event event name.
     * @param callback event callback.
     * @param element target element.
     */
    abstract useRendererAddEvent(
        event: string,
        callback: () => void,
        element: RecursiveElement
    ): void;

    /**
     * Render the application tree.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We use the `root.append()` method to inject tree resulted from `renderInstance()`.
     */
    abstract useRendererRenderTree(): void;

    /**
     * Use renderer to Change the position of the given element.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We use `parentElement.instance.insertBefore` to change the position of the element.
     *
     * ----
     *
     * @param element target element.
     * @param parentElement parent element.
     * @param newPosition element target new position.
     */
    abstract useRendererChangeElementPosition(
        element: RecursiveElement,
        parentElement: RecursiveElement,
        newPosition: number
    ): void;

    /**
     * Return the element position within its siblings.
     * @param element target element.
     */
    abstract useRendererGetElementPosition(element: RecursiveElement): number;

    /**
     * Remove the given element from the tree of elements.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We use `element.remove()` to delete it from the DOM.
     *
     * ----
     *
     * @param element element to be removed.
     */
    abstract useRendererRemoveElement(element: RecursiveElement): void;

    /**
     * Use the renderer to append the given element into the provided parent element.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We use `parentElement.append()` to add the element into the children node.
     *
     * ----
     *
     * @param element prepared element.
     * @param parentElement target container element.
     * @param index target index.
     */
    abstract useRendererAddElement(
        element: RecursiveElement,
        parentElement: RecursiveElement,
        index: number
    ): void;

    /**
     * Use the renderer to replace the given element by the new one.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We use `element.replaceWith` and `renderInstance(newElement)` as its argument.
     *
     * ----
     *
     * @param element element to be replace.
     * @param newElement new element.
     */
    abstract useRendererReplaceElement(
        element: RecursiveElement,
        newElement: RecursiveElement
    ): void;

    /**
     * Return if the given attribute is valid for this renderer
     *
     * ----
     *
     * **``Recursive-Web``**
     *
     * Check if the given attribute exists in the repository of `DomAttributes`.
     *
     * ----
     *
     * @param attribute attribute name to be checked
     */
    abstract useRendererIsAttribute(attribute: string): boolean;

    /**
     * Return if the given event is valid for this renderer
     *
     * ----
     *
     * **``Recursive-Web``**
     *
     * Check if the given event exists in the repository of `DomEvents`.
     *
     * ----
     *
     * @param event event name to be checked
     */
    abstract useRendererIsEvent(event: string): boolean;

    /**
     * Create a bare-bone native instance of the provided element.
     *
     * **``Recursive-Web``**
     *
     * return a DOM element using
     * _`document.createElementNS`_ (for HTML and SVG elements)
     * or
     * _`document.createTextNode`_ (for plain text elements).
     * @param element element to be created
     */
    abstract useRendererCreateInstance(element: RecursiveElement): T;

    /**
     * Inject attributes into the created instance.
     *
     * Executes within `renderInstance()`.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We loop over the `element.attributes`'s keys
     * and use either `instance.toggleAttribute()` or `instance.setAttribute()`
     * depending on the type.
     * `dataSet` attribute is treated on its own.
     *
     * ----
     *
     * @param attribute attribute name.
     * @param value attribute value.
     * @param instance target instance.
     */
    abstract useRendererInjectAttribute(attribute: string, value: any, instance: T): void;

    /**
     * Inject element style.
     *
     * @param style element style declaration.
     * @param instance target instance.
     */
    abstract useRendererInjectStyle(style: object, instance: T): void;

    /**
     * Inject events into the created instance;
     *
     * Executes within `renderInstance()`
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We loop over the `element.events`'s keys
     * and inject events in their respective property.
     * Some custom events has a `handler` which will be executed instead.
     *
     * ----
     *
     * @param event event name.
     * @param callback event callback.
     * @param instance target instance.
     */
    abstract useRendererInjectEvent(event: string, callback: () => void, instance: T): void;

    /**
     * Update the target element event with the given new one.
     * @param event event name.
     * @param callback new event callback.
     * @param element target element.
     */
    abstract useRendererUpdateEvent(
        event: string,
        callback: () => void,
        element: RecursiveElement
    ): void;

    /**
     * Inject children into the created instance;
     *
     * Executes within `renderInstance()`
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We loop over the `element.children`'s items
     * and use `instance.append()` with `renderInstance(child)` as an argument
     * to recursively build the element.
     *
     * ----
     *
     * @param childElement child to be injected.
     * @param instance target instance.
     */
    abstract useRendererInjectChild(childElement: RecursiveElement, instance: T): void;

    /**
     * Used to create a raw element.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * Used to create an element,
     * in which we will not inject children normally,
     * instead, we will use `element.innerHTML`.
     *
     * ----
     *
     * @param element raw element.
     */
    abstract useRendererCreateRawContainer(element: RecursiveElement): void;

    /**
     *
     * Used in the update phase, when both the current element and the new one have the `#raw` tag.
     *
     * ----
     *
     * _**``Recursive-Web implementation example``**_
     *
     * We update the `element.innerHTML` with the new value.
     *
     * ----
     *
     * @param element current raw element.
     * @param newElement new raw element.
     */
    abstract useRendererUpdateRawContainerAgainstEachOthers(
        element: RecursiveElement,
        newElement: RecursiveElement
    ): void;
}
