import { describe, it, expect } from "@jest/globals";
import { runAfter } from "@riadh-adrani/utility-js";
import { Priority, Task, Action } from "..";
import { Runner } from "../Runner";

describe("Runner", () => {
  const runner = new Runner();

  const task1 = new Task("test-task-1", Priority.normal, () => true, []);
  const task11 = new Task("test-task-1", Priority.normal, () => true, []);
  const task2 = new Task("test-task-2", Priority.normal, () => true, []);

  runner.buffer.normal = [task1];

  it("should return correct queue", () => {
    expect(runner.useQueue().normal.length).toBe(1);
    expect(runner.useQueue(true).normal.length).toBe(0);
  });

  it("should return if a task already exists", () => {
    expect(runner.exists(task1)).toBe(true);
    expect(runner.exists(task2)).toBe(false);
  });

  it("should replace task", () => {
    runner.replace(task11);

    expect(runner.buffer.normal[0].name).toBe(task1.name);
    expect(runner.buffer.normal[0].id !== task1.id).toBe(true);
  });

  it("should throw when element does not exist", () => {
    const fn = () => runner.replace(new Task("not-existing", Priority.normal, () => true, []));

    expect(fn).toThrow(`Task [not-existing] does not exist !`);
  });

  it("should move tasks to running", () => {
    runner.setup();

    expect(runner.buffer).toStrictEqual({ critical: [], normal: [] });
    expect(runner.running).toStrictEqual({ critical: [], normal: [task11] });
  });

  it("should empty queue", () => {
    runner.emptyQueue();
    runner.emptyQueue(true);

    expect(runner.buffer).toStrictEqual({ critical: [], normal: [] });
  });

  it("should add task", () => {
    runner.addTask(new Task("new-task", Priority.normal, () => true, []));

    expect(runner.buffer.normal[0].name).toBe("new-task");

    runner.setup();
    runner.state = Priority.critical;

    runner.addTask(new Task("new-task", Priority.normal, () => true, []));

    expect(runner.buffer.normal.length).toBe(0);
    expect(runner.running.normal.length).toBe(1);
    expect(runner.running.normal[0].name).toBe("new-task");

    runner.addTask(new Task("another-new-task", Priority.normal, () => true, []));

    expect(runner.buffer.normal.length).toBe(0);
    expect(runner.running.normal.length).toBe(2);
    expect(runner.running.normal[1].name).toBe("another-new-task");

    runner.state = "free";
  });

  it("should empty a type within a queue", () => {
    runner.emptyType(Priority.normal, true);
    expect(runner.running.normal.length).toBe(0);
  });

  it("should run a queue", async () => {
    const stack: string[] = [];

    const createTask = (name: string, priority = Priority.normal) =>
      new Task(name, priority, () => true, [
        new Action(
          () => {
            stack.push(name);
          },
          () => true,
          Priority.normal
        ),
      ]);

    runner.add([createTask("1"), createTask("2"), createTask("3")]);

    runner.setup();
    await runner.runQueue(Priority.normal);

    expect(stack).toStrictEqual(["1", "2", "3"]);
    expect(runner.running.normal.length).toBe(0);

    runner.state = "free";
  });

  it("should run critical tasks first", async () => {
    const stack: string[] = [];

    const createTask = (name: string, priority = Priority.normal) =>
      new Task(name, priority, () => true, [
        new Action(
          () => {
            stack.push(name);
          },
          () => true,
          Priority.normal
        ),
      ]);

    runner.add([
      createTask("1", Priority.critical),
      createTask("3"),
      createTask("4"),
      createTask("2", Priority.critical),
    ]);

    await runner.run();

    expect(stack).toStrictEqual(["1", "2", "3", "4"]);
  });

  it("should run any new critical tasks before moving to normal ones", async () => {
    const stack: string[] = [];

    const createTask = (name: string, priority = Priority.normal) =>
      new Task(name, priority, () => true, [
        new Action(
          async () => {
            await runAfter(5, () => {
              stack.push(name);
            });
          },
          () => true,
          Priority.normal
        ),
      ]);

    runner.add([
      createTask("1", Priority.critical),
      createTask("4", Priority.normal),
      createTask("5", Priority.normal),
      createTask("2", Priority.critical),
      createTask("6", Priority.normal),
    ]);

    expect(runner.buffer.critical.length).toBe(2);
    expect(runner.buffer.normal.length).toBe(3);

    runAfter(5, () => {
      runner.add([createTask("3", Priority.critical)]);
    });

    runner.run();

    await runAfter(100, () => "waiting");

    expect(stack).toStrictEqual(["1", "2", "3", "4", "5", "6"]);
    expect(runner.running.critical.length).toBe(0);
    expect(runner.running.normal.length).toBe(0);
    expect(runner.buffer.critical.length).toBe(0);
    expect(runner.buffer.normal.length).toBe(0);
  });
});
