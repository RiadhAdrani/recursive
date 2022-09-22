import { StateArray } from "../../lib";
import { RecursiveApp } from "../app";
import { RecursiveOrchestrator } from "../orchestrator";

export interface Store {
    items: { [key: string]: StateEntry };
    used: Array<String>;
    set: (newValue: any) => void;
    get: () => any;
    clear: () => void;
    flush: () => void;
}

export interface StoreParams {
    name: String;
    set: (newValue: any) => void;
    get: () => any;
    clear: () => void;
    flush: () => void;
    obj: any;
}

/**
 * Store and manage app state.
 *
 * * `state` reactive object that will last as long as it is needed.
 * * `cache` reactive state that will last as long as the App is running.
 * * `ref` reference an element in the App tree.
 * * `reserved`  used internally by some modules.
 * * `effect` launch side effects.
 */
export class RecursiveState {
    public stores: { [key: string]: Store };
    public history: [{ [key: string]: Store }];
    public cacheSize: 1000;

    get orchestrator(): RecursiveOrchestrator;

    /**
     * create an instance of the Recursive State Manager.
     * @param bootstrapper bootstrapping recursive app instance.
     */
    constructor(bootstrapper: RecursiveApp);

    /**
     * create a new stateful object within a given store.
     * @param key unique key.
     * @param value initial value.
     * @param onAdded initialization callback.
     * @param onRemoved removal callback.
     */
    addItem(key: string, value: T, onAdded: () => Function, onRemoved: () => void): void;

    /**
     * check if an item exists in the given store.
     * @param key item identifier.
     * @param store store name.
     */
    itemExists(key: string, store: string): boolean;

    /**
     * retrieve the item with the provided key in the given store.
     * @param key item identifier.
     * @param store store name.
     * @param defaultValue backup default value.
     */
    getItem(key: string, store: string, defaultValue: any): StateArray<any>;

    /**
     * remove the given item in the provided store.
     * @param key item identifier.
     * @param store store name.
     */
    removeItem(key: string, store: string): void;

    /**
     * update the given item with the new value.
     * @param key item identifier.
     * @param newValue the new value.
     * @param store store name.
     * @param onChanged callback to be executed if the value is really updated.
     * @param forceUpdate boolean value, used to force the update and execute the `onChange` callback.
     */
    updateItem<T>(
        key: string,
        newValue: T,
        store: string,
        onChanged: () => void,
        forceUpdate: boolean
    ): void;

    /**
     * clear out of scope and unused stateful objects.
     */
    clear(): void;

    /**
     * @unused
     */
    flush(): void;

    /**
     * create and register a new store.
     * @param params store parameters.
     */
    createStore(params: StoreParams): void;

    /**
     * batch updates requested within the given callback.
     * @param callback callback
     * @param batchName request identifier, used for debugging.
     */
    useBatchCallback(callback: () => void, batchName: string): void;

    /**
     * toggle the item as used in the current rendering context.
     * @param storeName store name.
     * @param key stateful object identifier.
     */
    setItemUsed(storeName: string, key: string): void;

    /**
     * check if the given item was used in the current rendering context.
     * @param storeName store name.
     * @param key stateful object identifier.
     */
    itemIsUsed(storeName: string, key: string): void;

    /**
     * execute unsubscription callback for a given stateful object.
     * @param key identifier.
     * @param storeName store name.
     */
    runUnsubscriptionCallback(key: string, storeName: string): void;

    /**
     * Retrieve an existing stateful object from the `state` store if it exists.
     * @param key identifier
     * @throw an error if the state does not exist.
     */
    getState(key: string): StateArray<any>;

    /**
     * Create and save a stateful object in the `state` store within the global `StateStore`.
     *
     * Objects created by this method are deleted when they are not used or called in a rendering iteration.
     * @param key unique identifier of the state whithin its store.
     * @param value initial value
     * @param onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param onRemoved a function that will execute when the state has been destroyed.
     */
    setState<T>(
        key: string,
        value: T,
        onInit: () => Function,
        onRemoved: () => void
    ): StateArray<T>;

    /**
     * Retrieve an existing stateful object from the `cache` store if it exists.
     * @param key identifier
     * @throw an error if the state does not exist.
     */
    getCache(key: string): StateArray<any>;

    /**
     * Create and save a stateful object in the `cache` store within the global `StateStore`.
     *
     * Objects created by this method are not deleted when they are not used,
     * unless the number of cached object exceed the maximum allocated size which is by default `1000`.
     *
     * Older states will be deleted first.
     *
     * @param key unique identifier of the state whithin its store.
     * @param value initial value
     * @param onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param onRemoved a function that will execute when the state has been destroyed.
     */
    setCache<T>(
        key: string,
        value: T,
        onInit: () => Function,
        onRemoved: () => void
    ): StateArray<T>;

    /**
     * Create a reserved item for the app.
     * @param key identifier.
     * @param value initial value.
     */
    setReserved(key: string, value: T): StateArray<T>;

    /**
     * Retrieve the reserved item if it exists.
     * @param {String} key identifier.
     */
    getReserved(key: string): StateArray<any>;

    /**
     * set UI element reference.
     * @param key item identifier.
     * @param value item reference.
     */
    setRef<T>(key: string, value: T): void;

    /**
     * retrieve an existing element from the `reference` store.
     * @param key item identifier.
     * @param defaultValue backup value.
     */
    getRef<T>(key: string, defaultValue: T): T;

    /**
     * create and execute a new effect.
     * @param key identifier.
     * @param callback callback to be executed.
     * @param dependencies effect dependencies that will decide if the effect should be called again.
     */
    setEffect(key: string, callback: () => Function, dependencies: Array[]): void;
}
