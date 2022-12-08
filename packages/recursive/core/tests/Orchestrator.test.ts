import { describe, it, expect, beforeEach } from "@jest/globals";
import { Orchestrator, OrchestratorState } from "../Orchestrator";

describe("Orchestrator", () => {
  let orch: Orchestrator;
  let stack: string[] = [];

  beforeEach(() => {
    orch = new Orchestrator({
      commit: () => {
        stack.push("commit");
      },
      compute: () => {
        stack.push("compute");
      },
    });

    stack = [];
  });

  describe("requestUpdate", () => {
    it("should start computation", () => {
      orch.requestUpdate({ id: "test", source: "test" });

      expect(orch.queue).toStrictEqual([]);
      expect(stack).toStrictEqual(["compute", "commit"]);
    });

    it("should add request to queue", () => {
      orch.state = OrchestratorState.Committing;

      orch.requestUpdate({ id: "test", source: "test" });

      expect(orch.queue).toStrictEqual([{ id: "test", source: "test" }]);
    });

    it("should add request to queue", () => {
      orch.state = OrchestratorState.Computing;

      orch.requestUpdate({ id: "test", source: "test" });

      expect(orch.state).toBe(OrchestratorState.Cancelling);
      expect(orch.queue).toStrictEqual([{ id: "test", source: "test" }]);
    });
  });

  it("should empty the queue", () => {
    orch.requestUpdate({ id: "test", source: "test" });
    orch.emptyQueue();
    expect(orch.queue).toStrictEqual([]);
  });

  it("should retrieve if current state is CANCELLING", () => {
    orch.state = OrchestratorState.Cancelling;
    expect(orch.cancelled()).toBe(true);

    orch.state = OrchestratorState.Free;
    expect(orch.cancelled()).toBe(false);
  });

  it("should check queue and execute callback", () => {
    orch.checkQueueThen(() => {
      stack.push("test");
    });

    expect(stack).toStrictEqual(["test"]);
  });
});
