# [Recursive](https://riadhadrani.github.io/recursive-website/) [![Version](https://img.shields.io/npm/v/@riadh-adrani/recursive?color=blue)](https://www.npmjs.com/package/@riadh-adrani/recursive) [![Licence](https://img.shields.io/npm/l/@riadh-adrani/recursive)](https://github.com/RiadhAdrani/recursive/issues)

Recursive is a javascript framework to build a declarative, component-based, Javascript only web apps.

-   **Component-Based** : Build encapsulated components, and compose them to make complex UIs. Since everything is implemented with Javascript, you can highly customize your app by adding data and states to your UI.

-   **Declarative** : Recursive make the job simpler by abstracting a lot of ambiguities. Declarative components are predictable and easier to debug.

-   **99.9% Javascript** : If you love Javascript and hate HTML, this is the way ! With Recursive, even style sheets could be written with Javascript!

## Installation

Recursive is still not 100% production-ready, but you can help us test features despite the fact that the library could be drastically changed from version to version.

##### `Vanilla Javascript`

Clone the repo from github and reference it from your `index.js`

```shell
git clone https://github.com/RiadhAdrani/recursive.git
```

##### `Node`

Using `create-recursive-app` to create a fresh project:

```shell
npx @riadh-adrani/create-recursive-app project-name
```

Or you can add it to an existing project :

```shell
npm i @riadh-adrani/recursive
```

## How it works

Inside your `index.js` you render your app like this:

##### `Vanilla Javascript`

```js
import { Render } from "./recursive-js/index.js";
import { P } from "./recursive-js/components.js";

Render(() => P({ text: "Hello World" }));
```

##### `Node`

```js
import { Render } from "@riadh-adrani/recursive";
import { P } from "@riadh-adrani/recursive/components";

Render(() => P({ text: "Hello World" }));
```

## Features

-   `Virtual DOM` : Just like React and Flutter, this framework relies on a virtual DOM to make changes to the real DOM.
-   `State Management` : Declare states with unique identifier to access them from anywhere in the Tree of components.
-   `Router` : Create the illusion of directories for your website.
-   `Hooks` : control components' life cycle with preset functions.

## Small projects made with Recursive.js

-   `My Portfolio` `v0.6` : [Live version](https://riadhadrani.github.io/RiadhAdrani/).

-   `Dwidder : Twitter clone` `v0.5` : [Live version](https://riadhadrani.github.io/dwidder/).

-   `Color Noter Web` `v0.4` : [Live version](https://riadhadrani.github.io/color-noter-web/).

## Documentation

Not yet ...
