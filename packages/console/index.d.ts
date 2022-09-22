/**
 * Display Error messages, logs and warnings in development mode.
 */
export class RecursiveConsole {
    /**
     * injectable function that will run when
     * an error or a warning happens to display it
     * on the screen
     * @param params parameters
     */
    static showDeveloperHelp(params: Map<string, any>): void;

    /**
     * show and log an error message.
     * @param msg message.
     * @param help helping tips.
     * @env development
     */
    static error(msg: string, help: Array<string>): void;

    /**
     * show and log a warning message.
     * @param msg message.
     * @env development
     */
    static warn(msg: string): void;
}
