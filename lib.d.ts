import { RecursiveOrchestrator } from "./packages/orchestrator";
import { RecursiveRenderer } from "./packages/renderer";
import { RecursiveRouter } from "./packages/router";
import { RecursiveState } from "./packages/state";

export interface Flags {
    renderIf: boolean;
    forceRerender: boolean;
}

export interface Hooks {
    onCreated: (el: any) => void;
    onUpdated: (el: any) => void;
    onRef: (el: any) => void;
    beforeDestroyed: (el: any) => void;
    onDestroyed: (el: any) => void;
}

export interface RawElement {
    elementType: string;
    instance: any;
    key: string;
    flags: Flags;
    hooks: Hooks;
    rendererOptions: { [item: string]: any };
    children: Array<any>;
    $$_RecursiveSymbol: Symbol;
    [item: string]: any;
}

export interface RecursiveElement extends RawElement {
    style: { [item: string]: any };
    attributes: { [item: string]: any };
    events: { [item: string]: any };
    map: { [item: string]: any };
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

export type StateArray = [any, (newValue: any) => void, () => any, () => void, any];

export class RecursiveApp {
    public orchestrator: RecursiveOrchestrator;
    public stateManager: RecursiveState;
    public router: RecursiveRouter;
    public renderer: RecursiveRenderer;

    createElement(elementType: string, props: object): RecursiveElement;

    render(): void;

    getRoute(): string;

    getParams(): object;

    getBase(): string;

    goTo(path: string): void;

    renderRoute(): RecursiveElement;

    getState(key: string): StateArray;

    setState<T>(key: string, value: T, onInit: () => Function, onRemoved: () => void): StateArray;

    getCache(key: string): StateArray;

    setCache<T>(key: string, value: T, onInit: () => Function, onRemoved: () => void): StateArray;

    getRef(key: string): any;

    setEffect(key: string, dependencies: Array<any>, callback: () => Function): void;

    updateOn(callback: () => void): void;
}
