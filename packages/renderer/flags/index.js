import { FLAGS_RENDER_IF, FLAGS_FORCE_RERENDER } from "../../constants";

/**
 * Object containing all flags.
 */
export const list = { forceRerender: FLAGS_FORCE_RERENDER, renderIf: FLAGS_RENDER_IF };

/**
 * Check if the given key represents a flag.
 * @param {string} key string representing the flag.
 * @returns {boolean} Check result.
 */
export function isFlag(key) {
  if (!list[key]) return false;

  return true;
}
