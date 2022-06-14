const Run = () => {
    document.title = "Testing ...";

    const tests = [];

    console.log(`%cRunning ${tests.length} Tests ...`, "background:purple;padding:5px;");

    const success = [];
    const fail = [];

    tests.forEach((test) => {
        let style = "";
        let msg = "";

        if (test.passed) {
            msg = `%c${test.name} : passed`;
            style = "color:#00ff00;font-size:10px;";
        } else {
            msg = `%c${test.name} : failed \nExpected "${test.premise}" but got "${test.result}"`;
            style = "color:white;font-size:1em;background:#aa0000;padding:5px";
        }

        console.log(msg, style);

        if (test.passed) success.push(test.name);
        else fail.push(test.name);
    });

    document.title = `Completed ${success.length}/${tests.length} Tests`;

    console.log(
        `%cCompleted ${success.length}/${tests.length} Tests`,
        "background:purple;padding:5px;"
    );
};

export { Run };
