export interface Flags {
    renderIf: boolean;
    forceRerender: boolean;
}

export interface Hooks<T> {
    onCreated: (el: T) => void;
    onUpdated: (el: T) => void;
    onRef: (el: T) => void;
    beforeDestroyed: (el: T) => void;
    onDestroyed: () => void;
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
    path: string;
    redirectTo: string;
    title: string;
    routes: Array<Route>;
    component: App;
    onLoad: () => void;
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
