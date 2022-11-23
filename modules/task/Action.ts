import { throwError, useId } from "../helpers";

export type ActionCall = () => void | Promise<void>;
export type ActionCheck = () => boolean;

export class Action {
  public id: string = useId();
  public check: ActionCheck;
  public priority: number;
  public isDone = false;

  private callback: ActionCall;

  constructor(callback: ActionCall, check: ActionCheck, priority = 0) {
    this.callback = callback;
    this.priority = priority;
    this.check = check;
  }

  static create(callback: ActionCall, check: ActionCheck, priority = 0): Action {
    return new Action(callback, check, priority);
  }

  async run(): Promise<void> {
    if (this.isDone) {
      throwError("Unable to run a completed action.");
    }

    if (!this.check()) {
      this.isDone = true;
      return;
    }

    await this.callback();
    this.isDone = true;
  }
}
