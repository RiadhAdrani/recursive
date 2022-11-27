import { describe, it, expect, jest } from "@jest/globals";
import { Priority } from "..";
import { Action, ActionCall } from "../Action";
import { Task } from "../Task";

describe("Task", () => {
  it("should run all actions", async () => {
    expect.assertions(4);

    const mockCallback = jest.fn();

    const action1 = Action.create(mockCallback as ActionCall, () => true);
    const action2 = Action.create(mockCallback as ActionCall, () => true);
    const action3 = Action.create(mockCallback as ActionCall, () => true);

    const task = Task.create("run test actions", Priority.normal, () => true, [
      action1,
      action2,
      action3,
    ]);

    expect(task.isDone).toBe(false);

    await task.start();

    expect(mockCallback.mock.calls.length).toBe(3);
    expect(task.isDone).toBe(true);

    task.start().catch((e) => expect(e).toBe("[Error] Unable to start a completed task."));
  });

  it("should interrupt actions execution", async () => {
    let count = 0;

    const mockCallback = jest.fn(() => {
      count++;
    });

    const action1 = Action.create(mockCallback as ActionCall, () => true);
    const action2 = Action.create(mockCallback as ActionCall, () => true);
    const action3 = Action.create(mockCallback as ActionCall, () => true);
    const action4 = Action.create(mockCallback as ActionCall, () => true);

    const task = Task.create("run test actions", Priority.normal, () => count < 2, [
      action1,
      action2,
      action3,
      action4,
    ]);

    await task.start();

    expect(count).toBe(2);
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(task.isDone).toBe(true);
  });
});
