# [Project : Recursive](https://riadhadrani.github.io/recursive-website/)

Project Recursive is an ongoing project to build a functional, component-based, Javascript only tool to build beautiful and interactive Web applications.

## Installation & Getting Started

Drag and drop this repo into your working directory, where your index.js is located, and import the library, your

```js
<!DOCTYPE html>
<html lang="en">
     <head>
          <title>First App</title>

          // Style will be injected here
          <style id="app-style"></style>

     </head>
     <body>

          // UI will be injected here
          <div id="app"></div>

          // Initializing global variables and methods
          <script type="module">
               import RecursiveDOM from "./recursivejs/RecursiveDOM.js";
               RecursiveDOM.init(
                    document.getElementById("app"),
                    document.getElementById("app-style")
               );
          </script>

          // This is your starting point
          <script src="index.js" type="module"></script>

     </body>
</html>
```

Now, in your `index.js`:

```js
import App from "./App.js";

vDOM.app = () => App();
vDOM.render();
```

in `App.js`, start the party :)

```js
import ParagraphView from "./recursivejs/createcomponent/components/text/ParagraphView.js";

export default () => {
     return ParagraphView({ text: "Hello World" });
};
```

And that's it ! Your "Hello World" app using Project:Recursive, You should start creating your Facebook or Youtube clone now !

## Documentation

Coming soon ...

## Examples

Coming soon ...
