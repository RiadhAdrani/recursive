import { describe, it, expect, jest } from "@jest/globals";
import { Action, ActionCall } from "../Action";

describe("Action", () => {
  it("should run action", async () => {
    expect.assertions(3);

    const mockCallback = jest.fn();

    const action = Action.create(mockCallback as ActionCall, () => true);

    await action.run();

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(action.isDone).toBe(true);

    action.run().catch((e) => expect(e).toBe("[Error] Unable to run a completed action."));
  });

  it("should NOT run action when check if failing", async () => {
    const mockCallback = jest.fn();

    const action = Action.create(mockCallback as ActionCall, () => false);

    await action.run();

    expect(mockCallback.mock.calls.length).toBe(0);
    expect(action.isDone).toBe(true);
  });
});
