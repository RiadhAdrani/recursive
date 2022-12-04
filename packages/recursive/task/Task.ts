import { throwError, useId } from "../helpers";
import { Action } from "./Action";
import { Priority } from ".";

export class Task {
  private actions: Action[];

  public id = useId();
  public name: string;
  public check: () => boolean;
  public priority: Priority;

  public isDone = false;

  constructor(name: string, priority: Priority, check: () => boolean, actions: Action[]) {
    this.name = name;
    this.priority = priority;
    this.check = check;
    this.actions = actions;
  }

  static create(name: string, priority: Priority, check: () => boolean, actions: Action[]) {
    return new Task(name, priority, check, actions);
  }

  async start() {
    if (this.isDone) {
      throwError("Unable to start a completed task.");
    }

    for (const action of this.actions) {
      if (!this.check()) {
        this.isDone = true;
        return;
      }

      await action.run();
    }

    this.isDone = true;
  }
}
