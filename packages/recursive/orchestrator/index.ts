import { isFunction } from "@riadh-adrani/utility-js";
import { RecursiveApp } from "../app";
import { useId } from "../helpers";

export enum OrchestratorState {
  FREE = "free",
  HANDLING_REQUESTS = "handling_requests",
  COMPUTE = "compute",
  DIFFING = "diffing",
  COMMITTING = "committing",
  CLEANING = "cleaning",
}

export class RecursiveOrchestrator {
  app: RecursiveApp;

  currentTask = { done: true };

  state: OrchestratorState = OrchestratorState.FREE;

  iteration = 0;

  batching = false;
  didChange = false;

  batchingStartTime = Date.now();
  batchingDuration = 0;

  batchingRequests: Array<{ source: string; id: string; time: number }> = [];
  unhandledRequests: Array<{ source: string; id: string; time: number }> = [];

  constructor(app: RecursiveApp) {
    this.app = app;
  }

  get setStatus() {
    return {
      free: () => (this.state = OrchestratorState.FREE),
      cleaning: () => (this.state = OrchestratorState.CLEANING),
      committing: () => (this.state = OrchestratorState.COMMITTING),
      compute: () => (this.state = OrchestratorState.COMPUTE),
      diffing: () => (this.state = OrchestratorState.DIFFING),
      handling: () => (this.state = OrchestratorState.HANDLING_REQUESTS),
    };
  }

  get renderer() {
    return this.app.renderer;
  }

  startUpdate() {
    this.renderer.update();
  }

  free() {
    this.didChange = false;
    this.setStatus.free();
  }

  requestUpdate(source: string) {
    if (![OrchestratorState.FREE, OrchestratorState.HANDLING_REQUESTS].includes(this.state)) {
      this.unhandledRequests.push({ id: useId(), source, time: Date.now() });
      return;
    }

    if (this.state === OrchestratorState.FREE) {
      this.startUpdate();
      this.iteration++;

      if (this.unhandledRequests.length > 0) {
        this.setStatus.handling();
        this.requestUpdate("unhandled-requests");
      } else {
        this.free();
      }

      return;
    }

    if (this.state === OrchestratorState.HANDLING_REQUESTS) {
      this.unhandledRequests = [];
      this.startUpdate();
      this.iteration++;

      if (this.unhandledRequests.length > 0) {
        this.setStatus.handling();
        this.unhandledRequests = [];
        this.requestUpdate("unhandled-requests");
      } else {
        this.free();
      }
    }
  }

  notifyStateChanged() {
    this.didChange = true;
  }

  startBatching() {
    this.batchingStartTime = Date.now();
    this.batching = true;
  }

  requestStartBatching(source: string) {
    if (this.batching) {
      this.batchingRequests.push({
        source,
        id: useId(),
        time: Date.now(),
      });
    } else {
      this.startBatching();
    }
  }

  endBatching(source: string) {
    this.batchingDuration = Date.now() - this.batchingStartTime;
    this.batchingRequests = [];
    this.batching = false;

    if (this.didChange) {
      this.requestUpdate(source);
    }
  }

  requestEndBatching(source: string) {
    if (this.batchingRequests.length > 0) {
      this.batchingRequests = this.batchingRequests.filter((req) => req.id !== source);
    }

    if (this.batchingRequests.length === 0) {
      this.endBatching(source);
    }
  }

  batchCallback(callback: () => void, source = useId()) {
    if (!isFunction(callback)) return;

    if (this.batching) {
      callback();
    } else {
      this.requestStartBatching(source);
      callback();
      this.requestEndBatching(source);
    }
  }
}
