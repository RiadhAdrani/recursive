import { RecursiveApp } from "../app";
import { RecursiveRenderer } from "../renderer";

/**
 * Orchestrate and schedule updates for a recursive application.
 */
export class RecursiveOrchestrator {
    public bootstrapper: RecursiveApp;

    public currentTask: object;
    public step: string;
    public updatesCount: number;
    public batching: boolean;
    public stateChanged: boolean;
    public batchingStartTime: number;
    public batchingLastDuration: number;
    public batchingRequests: Array<object>;
    public unhandledRequests: Array<object>;

    get setStep(): { [key: string]: () => void };
    get renderer(): RecursiveRenderer;

    /**
     * create a new instance of the recursive orchestrator.
     *
     * @param boostrapper bootstrapping application instance
     */
    constructor(boostrapper: RecursiveApp);

    update(): void;

    /**
     * Request an update. If the orchestrator is busy,
     * the update will be added to the `unhandled requests` to be executed later.
     * @param sender sender or the reason of the update request.
     */
    requestUpdate(sender: string): void;

    /**
     * Change the state of the orchestrator to free.
     */
    free(): void;

    /**
     * Count the number of updates since the execution of the method.
     */
    countUpdateSinceFree(): void;

    /**
     * Notify the orchestrator of a change in the state.
     */
    notifyStateChanged(): void;

    /**
     * Notify the orchestrator to start batching incoming state changes into one update.
     */
    startBatching(): void;

    /**
     * End the batching operation and request an update if a state change is detected.
     * @param sender source
     */
    endBatching(sender: string): void;

    /**
     * End the batching task requested by the `sender`.
     * @param sender source
     */
    requestEndBatching(sender: string): void;

    /**
     * Start a batching task.
     * @param sender source
     */
    requestStartBatching(sender: string): void;

    /**
     * Batch update resulting from the callback.
     * @param callback batched callback.
     * @param batchName source of the batching. used for debugging.
     */
    batchCallback(callback: () => void, batchName: string): void;
}
