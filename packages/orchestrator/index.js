import { RecursiveConsole } from "../console";
import { createTaskId, createUpdateObject } from "./utility";
import {
  ORCHESTRATOR_FREE,
  ORCHESTRATOR_HANDLING_REQUESTS,
  ORCHESTRATOR_COMPUTE_TREE,
  ORCHESTRATOR_COMPUTE_STYLE,
  ORCHESTRATOR_RENDERING,
  ORCHESTRATOR_UPDATING,
  ORCHESTRATOR_COMPUTE_DIFF,
  ORCHESTRATOR_EXEC_BEFORE_DESTROYED,
  ORCHESTRATOR_COMMIT_INTO_TREE,
  ORCHESTRATOR_EXEC_ON_DESTROYED,
  ORCHESTRATOR_EXEC_ON_CREATED,
  ORCHESTRATOR_EXEC_ON_UPDATED,
  ORCHESTRATOR_CLEAN_STATES,
} from "../constants";

export class RecursiveOrchestrator {
  constructor(boostrapper) {
    this.boostrapper = boostrapper;

    /**
     * @type {object}
     */
    this.currentTask = { done: true };

    /**
     * @type {string}
     */
    this.step = ORCHESTRATOR_FREE;

    /**
     * @type {number}
     */
    this.updatesCount = 0;

    /**
     * @type {boolean}
     */
    this.batching = false;

    /**
     * @type {boolean}
     */
    this.stateChanged = false;

    /**
     * @type {number}
     */
    this.batchingStartTime = Date.now();

    /**
     * @type {number}
     */
    this.batchingLastDuration = 0;

    /**
     * @type {Array<object>}
     */
    this.batchingRequests = [];

    /**
     * @type {Array<object>}
     */
    this.unhandledRequests = [];

    /**
     * @type {Map<string,() => {}>}
     */
    this.setStep = {
      free: () => (this.step = ORCHESTRATOR_FREE),
      handlingRequests: () => (this.step = ORCHESTRATOR_HANDLING_REQUESTS),
      computeTree: () => (this.step = ORCHESTRATOR_COMPUTE_TREE),
      computeStyle: () => (this.step = ORCHESTRATOR_COMPUTE_STYLE),
      rendering: () => (this.step = ORCHESTRATOR_RENDERING),
      updating: () => (this.step = ORCHESTRATOR_UPDATING),
      computeDiff: () => (this.step = ORCHESTRATOR_COMPUTE_DIFF),
      commit: () => (this.step = ORCHESTRATOR_COMMIT_INTO_TREE),
      execBeforeDestroyed: () => (this.step = ORCHESTRATOR_EXEC_BEFORE_DESTROYED),
      execOnDestroyed: () => (this.step = ORCHESTRATOR_EXEC_ON_DESTROYED),
      execOnCreated: () => (this.step = ORCHESTRATOR_EXEC_ON_CREATED),
      execOnUpdated: () => (this.step = ORCHESTRATOR_EXEC_ON_UPDATED),
      cleanStates: () => (this.step = ORCHESTRATOR_CLEAN_STATES),
    };
  }

  get renderer() {
    return this.boostrapper.renderer;
  }

  update() {
    if (!this.renderer)
      RecursiveConsole.error("Recursive Orchestrator : No renderer was specified");

    this.renderer.update();
  }

  /**
   * @param {string} sender sender or the reason of the update request.
   */
  requestUpdate(sender) {
    if (![ORCHESTRATOR_FREE, ORCHESTRATOR_HANDLING_REQUESTS].includes(this.step)) {
      /**
       * The orchestrator is busy right now,
       * add the current request to the unhandled requests.
       */
      this.unhandledRequests.push(createUpdateObject(sender, sender));
      return;
    }

    if (this.step === ORCHESTRATOR_FREE) {
      /**
       * The orchestrator is free, we can trigger an update.
       */
      this.update();

      this.updatesCount++;
      this.countUpdateSinceFree();

      /**
       * we check if there are some remaining update requests.
       */
      if (this.unhandledRequests.length > 0) {
        /**
         * if true,
         * we request a new update.
         */
        this.setStep.handlingRequests();
        this.requestUpdate("unhandled-requests");
      } else {
        /**
         * if false,
         * we are free to go.
         */
        this.free();
      }

      return;
    }

    /**
     * If we are handling requests.
     */
    if (this.step === ORCHESTRATOR_HANDLING_REQUESTS) {
      /**
       * empty unhandled request and update the app.
       */
      this.unhandledRequests = [];
      this.update();
      this.updatesCount++;

      /**
       * we check if there are some remaining update requests.
       */
      if (this.unhandledRequests.length > 0) {
        /**
         * if true,
         * we request a new update.
         */
        this.setStep.handlingRequests();
        this.unhandledRequests = [];
        this.requestUpdate("unhandled-requests");
      } else {
        /**
         * if false,
         * we are free to go.
         */
        this.free();
      }
    }
  }

  free() {
    this.updatesCount = 0;
    this.stateChanged = false;
    this.setStep.free();
  }

  countUpdateSinceFree() {
    setTimeout(() => {
      if (this.updatesCount > 200) {
        RecursiveConsole.error("Infinite re-render detected", [
          "This error occured because the RecursiveDOM detected the need of a large amount of updates in a short period of time.",
          "Avoid updating the state without any condition specially in hooks",
        ]);
      }
    }, 2000);
  }

  notifyStateChanged() {
    this.stateChanged = true;
  }

  startBatching() {
    this.batchingStartTime = Date.now();
    this.batching = true;
  }

  /**
   * @param {string} sender source
   */
  endBatching(sender) {
    this.batchingLastDuration = Date.now() - this.batchingStartTime;
    this.batchingRequests = [];
    this.batching = false;
    if (this.stateChanged) {
      this.requestUpdate(sender);
    }
  }

  /**
   * @param {string} sender source
   */
  requestEndBatching(sender) {
    if (this.batchingRequests.length > 0) {
      this.batchingRequests = this.batchingRequests.filter((req) => req.uuid !== sender);
    }

    if (this.batchingRequests.length === 0) {
      this.endBatching(sender);
    }
  }

  /**
   * @param {string} sender source
   */
  requestStartBatching(sender) {
    if (this.batching) {
      const uuid = createTaskId(20);
      this.batchingRequests.push(createUpdateObject(sender, uuid));
      setTimeout(() => {
        if (this.batchingRequests.find((req) => req.uuid === uuid)) {
          RecursiveConsole.warn(
            "Recursive Orchestrator : " +
              "Batch request took too long (more than 100ms)." +
              " This could be caused by a catched error." +
              " Avoid batching your updates in an asynchronous call and using await inside the updateAfter method."
          );
          this.endBatching(sender);
        }
      }, 100);
    } else {
      this.startBatching();
    }
  }

  /**
   * @param {Function} callback batched callback.
   * @param {string} batchName source of the batching. used for debugging.
   */
  batchCallback(callback, batchName = "batch-callback-" + Date.now) {
    if (callback === undefined || typeof callback !== "function") return;

    if (this.batching === true) callback();
    else {
      this.requestStartBatching(batchName);

      callback();

      this.requestEndBatching(batchName);
    }
  }
}
