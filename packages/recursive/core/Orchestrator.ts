import { isFunction } from "@riadh-adrani/utility-js";

export enum OrchestratorState {
  Free = "FREE",
  Computing = "COMPUTING",
  Committing = "COMMITTING",
  Cancelling = "CANCELLING",
}

export type OrchestratorUpdateRequest = {
  id: string;
  source: string;
};

export type OrchestratorTaskOptions = {
  cancelled: () => boolean;
  notifyCancelled: () => void;
};

export type OrchestratorTask = (options: OrchestratorTaskOptions) => void;

export type OrchestratorOptions = {
  compute: OrchestratorTask;
  commit: OrchestratorTask;
};

export class Orchestrator {
  state: OrchestratorState = OrchestratorState.Free;
  queue: OrchestratorUpdateRequest[] = [];

  compute: OrchestratorTask;
  commit: OrchestratorTask;

  constructor({ commit, compute }: OrchestratorOptions) {
    this.commit = commit;
    this.compute = compute;
  }

  get options(): OrchestratorTaskOptions {
    return {
      cancelled: () => this.cancelled(),
      notifyCancelled: () => this.startComputing(),
    };
  }

  requestUpdate(request: OrchestratorUpdateRequest) {
    if (this.state === OrchestratorState.Free) {
      this.startComputing();
    } else {
      if (this.state === OrchestratorState.Computing) {
        this.cancelComputing();
      }

      this.queue.push(request);
    }
  }

  emptyQueue() {
    this.queue = [];
  }

  cancelled() {
    return this.state === OrchestratorState.Cancelling;
  }

  checkQueueThen(callback?: () => void) {
    if (this.queue.length === 0) {
      if (isFunction(callback)) {
        callback?.();
      }
    } else {
      this.startComputing();
    }
  }

  startComputing() {
    this.state = OrchestratorState.Computing;

    this.emptyQueue();
    this.compute(this.options);

    this.checkQueueThen(() => this.startCommitting());
  }

  cancelComputing() {
    this.state = OrchestratorState.Cancelling;
  }

  startCommitting() {
    this.state = OrchestratorState.Committing;
    this.commit(this.options);

    this.checkQueueThen(() => {
      this.state = OrchestratorState.Free;
    });
  }
}
