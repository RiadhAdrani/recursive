export interface Flags {
    /**
     * ## `renderIf`
     *
     * A boolean indicating if the element should be rendered
     * in the view.
     */
    renderIf?: boolean;
    /**
     * ## `forceRerender`
     *
     * A boolean indicating if the element should override
     * the old one without performing deep diffing.
     */
    forceRerender?: boolean;
}

export interface Hooks<T = any> {
    /**
     * ## `onCreated`
     *
     * Hook executed when the element
     * is rendered for the first time.
     * When an element
     * gets updated with another one having the same type,
     * the `onCreated` hook of the new one won't be executed,
     * the operation is not considered as a creation of a new element.
     */
    onCreated?: (el: T) => void;
    /**
     * ## `onUpdated`
     *
     * Hook executed when the element attributes are removed, added or updated,
     * or when events are added or removed.
     */
    onUpdated?: (el: T) => void;
    /**
     * ## `onRef`
     *
     * Executed every time the app is updated.
     * Return a string that will serve as the reference key.
     */
    onRef?: (el: T) => void;
    /**
     * ## `beforeDestroyed`
     *
     * Executed before the element get removed from the DOM.
     */
    beforeDestroyed?: (el: T) => void;
    /**
     * ## `onDestroyed`
     *
     * Executed after the element get removed from the DOM.
     */
    onDestroyed?: () => void;
    /**
     * ## `onPrepared`
     *
     * Executed after the element is computed and checked.
     */
    onPrepared?: (el: RecursiveElement) => void;
    /**
     * ## `onPrepared`
     *
     * Executed before element checking.
     */
    beforePrepared?: (el: BaseElement) => void;
}

export interface CommonProps<T = any> {
    elementType: string;
    $$_RecursiveSymbol: Symbol;
    rendererOptions?: { [item: string]: any };
    hooks?: Hooks<T>;
    flags?: Flags;
    key?: string;
}

export interface BaseElement {
    elementType: string;
    $$_RecursiveSymbol: Symbol;
    rendererOptions?: { [item: string]: any };
    [key: string]: any;
}

export interface RecursiveElement<T = any> extends BaseElement {
    style: { [item: string]: any };
    attributes: { [item: string]: any };
    events: { [item: string]: (ev: any) => void };
    map: { [key: string]: number };
    flags: Flags;
    hooks: Hooks<T>;
    parent: RecursiveElement<T>;
    children: Array<RecursiveElement<T>>;
}

export type App = () => BaseElement;

export interface Route {
    /**
     * path fragment.
     *
     * except for the root path, you should not add a backslash `/` at the beginning of the path.
     */
    path: string;
    /**
     * absolute route path that the app will try to redirect to.
     *
     * if it does not exist, a `/404` route will load instead.
     */
    redirectTo?: string;
    /**
     * App title when the current route is mounted.
     */
    title?: string;
    /**
     * nested routes.
     */
    routes?: Array<Route>;
    /**
     * component callback representing the route.
     */
    component: () => BaseElement | string;
    /**
     * callback executing when the route is mounted.
     */
    onLoad?: () => void;
    /**
     * callback executing when the route is unmounted.
     */
    onExit?: () => void;
}

export interface RouteTemplate {
    isDynamic: boolean;
    template: Route;
}

export interface ResolvedRoute {
    path: String;
    route: Route;
    redirected: any;
}

export interface FlatRoutes {
    [key: string]: Route;
}

export interface StateEntry {
    value: any;
    preValue: any;
    history: Array<any>;
    onRemoved: Function;
    unsubscribe: Function;
    addOrder: number;
}

export interface StateStores {
    [key: string]: {
        items: { [key: string]: StateEntry };
        used: Array<String>;
        set: (newValue: any) => void;
        get: () => any;
        clear: () => void;
        flush: () => void;
    };
}

export interface StoreParams {
    name: String;
    set: (newValue: any) => void;
    get: () => any;
    clear: () => void;
    flush: () => void;
    obj: any;
}

export type StateArray<T = any> = [T, (value: T) => void, () => T, () => void, T];

export type NativeElement = any;
