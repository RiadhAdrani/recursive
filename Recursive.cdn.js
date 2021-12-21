import { Init, Components, Route, Router } from "./Recursive.js";

Init({
     root: document.getElementById("app"),
     styleRoot: document.getElementById("app-style"),
     staticStyleRoot: document.getElementById("app-static-style"),
     options: {},
});

window.Components = Components;
window.Router = { Router, Route };
