export interface Flags {
    renderIf: boolean;
    forceRerender: boolean;
}

export interface Hooks<T = any> {
    onCreated: (el: T) => void;
    onUpdated: (el: T) => void;
    onRef: (el: T) => void;
    beforeDestroyed: (el: T) => void;
    onDestroyed: () => void;
}

export interface CommonProps<T = any> {
    elementType: string;
    $$_RecursiveSymbol: Symbol;
    rendererOptions: { [item: string]: any };
    hooks: Hooks<T>;
    flags: Flags;
    key: string;
}

export interface BaseElement {
    elementType: string;
    $$_RecursiveSymbol: Symbol;
    rendererOptions: { [item: string]: any };
    [key: string]: any;
}

export interface RecursiveElement extends BaseElement {
    style: { [item: string]: any };
    attributes: { [item: string]: any };
    events: { [item: string]: (ev: any) => void };
    map: { [key: string]: number };
    flags: Flags;
    hooks: Hooks;
    parent: RecursiveElement;
    children: Array<RecursiveElement>;
}

export type App = () => RecursiveElement;

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
    redirectTo: string;
    /**
     * App title when the current route is mounted.
     */
    title: string;
    /**
     * nested routes.
     */
    routes: Array<Route>;
    /**
     * component callback representing the route.
     */
    component: () => RecursiveElement;
    /**
     * callback executing when the route is mounted.
     */
    onLoad: () => void;
    /**
     * callback executing when the route is unmounted.
     */
    onExit: () => void;
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
