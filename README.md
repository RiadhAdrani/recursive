# [Project : Recursive](https://riadhadrani.github.io/recursive-website/)

Project Recursive is an ongoing project to build a functional, component-based, Javascript only, beautiful and interactive Web applications.

## Installation & Getting Started

Drag and drop this repo into your working directory, where your `index.js` is located, and import the library, and make the changes needed so your `index.html` looks like this :

```html
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

Now, in `index.js`:

```js
import App from "./App.js";

vDOM.app = () => App();
vDOM.render();
```

in `App.js`, we will write our "Hello World" app:

```js
import ParagraphView from "./recursivejs/createcomponent/components/text/ParagraphView.js";

export default () =>
     ButtonView({
          text: "Say 'Hello World'",
          style: {
               color: "white",
               backgroundColor: "red",
               textAlign: "center",
               fontSize: "2em",
               padding: "10px",
               alignSelf: "center",
               margin: "auto",
          },
          events: {
               onClick: () => {
                    alert("Hello World");
               },
          },
     });
```

The code above will render a red button containing a white text "Say'Hello World'" that will display an alert saying "Hello World".

And that's it for your first app! You should be on your way to create the new Facebook or Youtube !

## Documentation

Coming soon ...

## Examples

Coming soon ...
