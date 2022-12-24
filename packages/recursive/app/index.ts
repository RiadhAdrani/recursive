import { isFunction, isNumber } from "@riadh-adrani/utility-js";
import { RError } from "../console";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveRenderer } from "../renderer/RecursiveRenderer";
import { RecursiveRouter } from "../router/RecursiveRouter";
import { RecursiveStateManager } from "../state";

export type RecursiveAppParams = {
  cacheSize: number;
  rendererBuilder: (app: RecursiveApp) => RecursiveRenderer<unknown, unknown, unknown>;
  routerBuilder: (app: RecursiveApp) => RecursiveRouter;
  onAppInit: (app: RecursiveApp) => void;
};

export class RecursiveApp {
  public orchestrator: RecursiveOrchestrator = new RecursiveOrchestrator(this);
  public stateManager: RecursiveStateManager = new RecursiveStateManager(this);
  public router?: RecursiveRouter;
  public renderer: RecursiveRenderer<unknown, unknown, unknown>;

  constructor({ cacheSize, onAppInit, rendererBuilder, routerBuilder }: RecursiveAppParams) {
    if (!isFunction(rendererBuilder)) {
      throw new RError("rendererBuilder is not a function");
    }

    const builtRenderer = rendererBuilder(this);

    if (builtRenderer instanceof RecursiveRenderer === false) {
      throw new RError("builtRenderer is not a RecursiveRenderer");
    }

    this.renderer = builtRenderer;

    if (isFunction(routerBuilder)) {
      const builtRouter = routerBuilder(this);

      if (builtRouter instanceof RecursiveRouter === false) {
        throw new RError("builtRouter is not a RecursiveRouter");
      } else {
        this.router = builtRouter;
      }
    }

    if (isNumber(cacheSize)) {
      this.stateManager.cacheSize = cacheSize;
    }

    if (isFunction(onAppInit)) {
      onAppInit(this);
    }
  }
}
