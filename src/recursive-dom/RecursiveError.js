import CreateComponent from "../create-component/CreateComponent.js";

const onError = () => {
    window.addEventListener("unhandledrejection", (event) => {
        const toDisplay = {
            message: "",
            stackTrace: "",
            fileURL: "Promise",
            help: false,
        };

        if (event.reason) {
            toDisplay.message = event.reason.message;
            toDisplay.stackTrace = event.reason.stack;
        }

        displayErrorScreen(toDisplay);
    });

    window.addEventListener("error", function (event) {
        const toDisplay = {
            message: "",
            stackTrace: "",
            fileURL: "",
            help: false,
        };

        if (typeof event.error === "string") {
            toDisplay.message = event.error;
            toDisplay.stackTrace = event.error;
            toDisplay.fileURL = event.filename;
        } else {
            toDisplay.message = event.error.message;
            toDisplay.stackTrace = event.error.stack;
            toDisplay.fileURL = event.filename;
            toDisplay.help = event.error.help ? event.error.help : false;
        }

        displayErrorScreen(toDisplay);
    });
};

const throwError = (msg, help) => {
    const error = new Error(msg);
    error.help = help;

    throw error;
};

const displayErrorScreen = (toDisplay) => {
    document.body.style.margin = "0px";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.maxHeight = "100vh";
    document.body.style.minHeight = "100vh";

    const errorAlert = new CreateComponent({
        tag: "div",
        inlineStyle: {
            padding: "20px 20px 40px 20px",
            display: "flex",
            flexDirection: "column",
            background: "#992222",
            fontFamily: "monospace",
            color: "white",
            flex: 1,
            fontSize: "16px",
        },
        children: [
            new CreateComponent({
                tag: "p",
                children: `[PHASE: ${RecursiveOrchestrator.singleton.step}] ${toDisplay.message}`,
                style: {
                    className: "title",
                    scoped: true,
                    normal: {
                        fontWeight: "Trebuchet MS",
                        padding: "10px",
                        margin: "5px 0px",
                        backgroundColor: "#551111",
                    },
                },
            }),
            new CreateComponent({
                tag: "p",
                children: `Source : ${toDisplay.fileURL}`,
                style: {
                    className: "source",
                    scoped: true,
                    normal: {
                        fontWeight: "Trebuchet MS",
                        padding: "10px",
                        margin: "5px 0px",
                        backgroundColor: "#551111",
                    },
                },
            }),
            new CreateComponent({
                tag: "div",
                flags: { renderIf: toDisplay.help !== false },
                style: {
                    className: "help-wrapper",
                    scoped: true,
                    normal: {
                        fontWeight: "Trebuchet MS",
                        padding: "10px",
                        margin: "5px 0px",
                        backgroundColor: "#551111",
                    },
                },
                children: [
                    new CreateComponent({
                        tag: "p",
                        children:
                            "This Error was generated by Recursive for one/many of the following reasons: ",
                    }),
                    new CreateComponent({
                        tag: "ul",
                        children: !toDisplay.help
                            ? []
                            : [
                                  ...toDisplay.help.map((item) => {
                                      return new CreateComponent({
                                          tag: "li",
                                          children: item,
                                      });
                                  }),
                                  new CreateComponent({
                                      tag: "li",
                                      children:
                                          "If you were unable to find an answer, feed free to post an issue here : https://github.com/RiadhAdrani/recursive/issues",
                                  }),
                              ],
                    }),
                ],
            }),
            new CreateComponent({
                tag: "p",
                children: `${toDisplay.stackTrace}`,
                style: {
                    className: "trace",
                    scoped: true,
                    normal: {
                        padding: "20px",
                        lineHeight: "1.5em",
                        whiteSpace: "break-spaces",
                        background: "#551111",
                        margin: "5px 0px",
                        flex: 1,
                    },
                },
            }),
        ],
    });

    document.body.replaceChildren(errorAlert.render());
};

export { onError, throwError };