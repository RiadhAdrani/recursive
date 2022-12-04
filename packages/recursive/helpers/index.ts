import { v4 } from "uuid";

export function useId(): string {
  return v4();
}

export function throwError(message: string, label = "Error") {
  throw `[${label}] ${message}`;
}

export function run(callback: () => void) {
  (() => {
    callback();
  })();
}
