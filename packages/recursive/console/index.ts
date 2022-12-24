import { DEVELOPMENT_MODE } from "../constants";

export class RError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function isDevMode() {
  return process.env.NODE_ENV === DEVELOPMENT_MODE;
}

export class RecursiveConsole {
  static warn(message: string) {
    if (isDevMode()) {
      console.warn(message);
    }
  }
}
