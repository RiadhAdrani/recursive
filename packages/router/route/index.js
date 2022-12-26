import { copy } from "@riadh-adrani/utility-js";

/**
 * @param {import("../../../lib").Route} params
 */
export function createRoute(params) {
  return { ...copy(params) };
}
