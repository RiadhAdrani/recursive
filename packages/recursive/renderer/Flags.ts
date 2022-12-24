import { hasProperty } from "@riadh-adrani/utility-js";
import { FLAGS_FORCE_RERENDER, FLAGS_RENDER_IF } from "../constants";

export enum FlagType {
  forceRerender = "forceRerender",
  renderIf = "renderIf",
}

const list = {
  forceReRender: FLAGS_FORCE_RERENDER,
  renderIf: FLAGS_RENDER_IF,
};

export interface Flags {
  forceRerender?: boolean;
  renderIf?: boolean;
}

function is(key: string): boolean {
  return hasProperty(list, key);
}

export const flags = {
  is,
  list,
};
