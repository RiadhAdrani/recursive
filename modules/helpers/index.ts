import { v4 } from "uuid";

export function useUUID(): string {
  return v4();
}
