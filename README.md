# [Recursive](https://riadhadrani.github.io/recursive-website/) [![Version](https://img.shields.io/badge/version-v0.4.0--alpha-blue)](https://github.com/RiadhAdrani/recursive/releases) [![Version](https://img.shields.io/badge/javascript-100-yellow)](https://github.com/RiadhAdrani/recursive/releases) [![Contribute](https://img.shields.io/badge/contribute-not--yet-red)](https://github.com/RiadhAdrani/recursive/issues)

Recursive is an ongoing project to build a functional, component-based, Javascript only, beautiful and interactive Web applications.

-    **Component-Based** Build encapsulated components, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM, while maintaining high performance

-    **Declarative** Recursive.Js makes it easy to create interactive UIs. Design simple views for each state in your application, and Recursive.Js will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.

-    **Virtual DOM** Recursive.Js is powered by a virtual DOM, which is a representation of the actual Document Object Model (DOM) in Javascript. The VDOM makes it easier to loop over components and compare them to minimally update specific values in the actual HTML document.

## Installation

Recursive is still not 100% production-ready, but you can help us test features despite the fact that the library could be drastically changed from version to version.

For now, you can download the source code, and inside your `index.js` you render your app like this:

```js
import { Render } from "./recursive-js/Recursive.js";
import { P } from "./recursive-js/Recursive-Components.js";
Render(() => P({ text: "Hello World" }));
```

## Documentation

[Website is under construction...](https://riadhadrani.github.io/recursive-website/)
Detailed documentation will be coming soon

## Examples

[Coming soon ...](https://riadhadrani.github.io/recursive-website/)
