const throwError = (msg, help) => {
    const error = new Error(msg);
    error.help = help;

    throw error;
};

export { throwError };
