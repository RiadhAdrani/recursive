import { Priority } from ".";
import { throwError } from "../helpers";
import { Task } from "./Task";

export type RunnerPriorityQueue = Record<Priority, Task[]>;

export class Runner {
  public state: Priority | "free" = "free";

  public buffer: RunnerPriorityQueue = { critical: [], normal: [] };
  public running: RunnerPriorityQueue = { critical: [], normal: [] };

  useQueue(r = false): RunnerPriorityQueue {
    return r ? this.running : this.buffer;
  }

  exists(task: Task, r = false): boolean {
    return this.useQueue(r)[task.priority].findIndex((t) => t.name === task.name) !== -1;
  }

  replace(task: Task, r = false) {
    if (this.exists(task, r)) {
      const i = this.useQueue(r)[task.priority].findIndex((t) => t.name === task.name);

      this.useQueue(r)[task.priority][i] = task;
    } else {
      throwError(`Task [${task.name}] does not exist !`);
    }
  }

  addTask(task: Task) {
    // if we are trying to add a normal task when critical tasks are running
    // we can add it to the
    if (task.priority === Priority.normal && this.state === Priority.critical) {
      if (this.exists(task, true)) {
        this.replace(task, true);
      } else {
        this.running[task.priority].push(task);
      }
    }
    // we check if the task has an old version and we replace it
    else if (this.exists(task)) {
      this.replace(task);
    }
    // add to the buffer
    else {
      this.buffer[task.priority].push(task);
    }
  }

  add(tasks: Task[]) {
    tasks.forEach((task) => this.addTask(task));
  }

  emptyType(type: Priority, r = false) {
    if (r) {
      this.running[type] = [];
    } else {
      this.buffer[type] = [];
    }
  }

  emptyQueue(r = false) {
    if (r) {
      this.running.normal = [];
      this.running.critical = [];
    } else {
      this.buffer.normal = [];
      this.buffer.critical = [];
    }
  }

  setup() {
    this.running = {
      critical: [...this.running.critical, ...this.buffer.critical],
      normal: [...this.running.normal, ...this.buffer.normal],
    };
    this.emptyQueue();
  }

  async runQueue(queue: Priority) {
    await Promise.all(
      this.running[queue].map(async (task) => {
        await task.start();
      })
    );

    this.emptyType(queue, true);
  }

  async run() {
    this.setup();

    await this.runQueue(Priority.critical);

    if (this.buffer.critical.length > 0) {
      await this.run();
    }

    await this.runQueue(Priority.normal);

    if (this.buffer.critical.length > 0 || this.buffer.normal.length > 0) {
      await this.run();
    }
  }
}
