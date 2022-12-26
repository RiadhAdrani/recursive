import { DEVELOPMENT_MODE } from "../../constants";

/**
 * Return if the current environment is "development" mode.
 * @returns {boolean} Check result.
 */
export default function isDevMode() {
  return process.env.NODE_ENV === DEVELOPMENT_MODE;
}
