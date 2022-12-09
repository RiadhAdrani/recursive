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

  it("should run a cancelable task", () => {
    const { cancelled, data } = orch.startTask<string>({
      task: () => {
        return "Hello";
      },
    });

    expect(cancelled).toBe(false);
    expect(data).toBe("Hello");
  });

  it("should run next tasks", () => {
    const { cancelled, data } = orch.startTask({
      task: () => {
        return { text: "Hello" };
      },
      next: (obj) => {
        const addWorld = () => {
          if (obj) {
            obj.text += " World";
          }

          return obj;
        };

        return [addWorld];
      },
    });

    expect(cancelled).toBe(false);
    expect(data).toStrictEqual({ text: "Hello World" });
  });

  it("should cancel next tasks", () => {
    const { cancelled, data } = orch.startTask({
      task: () => {
        orch.state = OrchestratorState.Cancelling;

        return { text: "Hello" };
      },
      next: (obj) => {
        const addWorld = () => {
          if (obj) {
            obj.text += " World";
          }

          return obj;
        };

        return [addWorld];
      },
    });

    expect(cancelled).toBe(true);
    expect(data).toStrictEqual(undefined);
  });

  it("should run nested tasks", () => {
    const { cancelled } = orch.startTask({
      task: () => {
        return {
          run: () => {
            stack.push("task1");
          },
        };
      },
      next: (obj) => {
        const nextTask = () => {
          orch.startTask<void>({
            task: () => {
              obj?.run();
            },
          });

          return obj;
        };

        return [nextTask];
      },
    });

    expect(cancelled).toBe(false);
    expect(stack).toStrictEqual(["task1"]);
  });

  it("should run nested tasks", () => {
    orch.startTask({
      task: () => {
        return {
          run: () => {
            stack.push("task1");
          },
        };
      },
      next: (obj) => {
        orch.state = OrchestratorState.Cancelling;

        const nextTask = () => {
          orch.startTask<void>({
            task: () => {
              obj?.run();
            },
          });

          return obj;
        };

        return [nextTask];
      },
    });

    expect(stack).toStrictEqual([]);
  });
});
