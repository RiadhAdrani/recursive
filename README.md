# [Recursive](https://riadhadrani.github.io/recursive-website/) [![Version](https://img.shields.io/npm/v/@riadh-adrani/recursive?color=blue)](https://github.com/RiadhAdrani/recursive/releases) [![Licence](https://img.shields.io/npm/l/@riadh-adrani/recursive)](https://github.com/RiadhAdrani/recursive/issues)

Recursive is a javascript library to build a declarative, component-based, Javascript only web apps.

-    **Component-Based** : Build encapsulated components, and compose them to make complex UIs. Since everything is implemented with Javascript, you can highly customize your app by adding data and states to your UI.

-    **Declarative** : Recursive make the job simpler by abstracting a lot of ambiguities. Declarative components are predictable and easier to debug.

-    **99.9% Javascript** : If you love Javascript and hate HTML, this is the way ! With Recursive, even style sheets could be written with Javascript!

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

Or add to an existing project :

```shell
npm i @riadh-adrani/recursive
```

## Hello World

Inside your `index.js` you render your app like this:

##### `Vanilla Javascript`

```js
import { Render } from "./recursive-js/Recursive.js";
import { P } from "./recursive-js/Recursive-Components.js";
Render(() => P({ text: "Hello World" }));
```

##### `Node`

```js
import { Recursive, Components } from "@riadh-adrani/recursive";
const { P } = Components;
Recursive.Render(() => P({ text: "Hello World" }));
```

## Documentation

[Website is under construction...](https://riadhadrani.github.io/recursive-website/)

## Examples

[Coming soon ...](https://riadhadrani.github.io/recursive-website/)
