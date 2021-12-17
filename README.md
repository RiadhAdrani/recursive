# [Project : Recursive](https://riadhadrani.github.io/recursive-website/)

Project Recursive is an ongoing project to build a functional, component-based, Javascript only, beautiful and interactive Web applications.

## Getting Started

To get started, we need first to make the library works.
First, Create your `index.html` and `index.js` in a folder, then, download and drop this repo in the same location. Second, we need to import the library, and make the changes needed so your `index.html` recognize it correctly, your `index.html` should look something like this:

```html
<!DOCTYPE html>
<html lang="en">
     <head>
          <title>First App</title>
          <!-- static style will be injected here -->
          <style id="app-static-style"></style>

          <!-- components style will be dynamically injected and removed here -->
          <style id="app-style"></style>
     </head>
     <body>
          <!-- this div will host your app -->
          <div id="app"></div>

          <!-- importing init.js : initiating the RecursiveDOM and global variables -->
          <script src="init.js" type="module"></script>

          <!-- importing index.js : include app logic -->
          <script src="index.js" type="module"></script>
     </body>
</html>
```

If you missed it, you need to create an `init.js` in which we will initiate the Virtual DOM and global variables:

```js
import RecursiveDOM from "./recursivejs/RecursiveDOM.js";

RecursiveDOM.init(
     document.getElementById("app"),
     document.getElementById("app-style"),
     document.getElementById("app-static-style")
);
```

Now, in `index.js`, we will build our app UI.
Let's write `Hello World`; we will create a `button` that will display an alert saying "Hello World":

```js
import { Button } from "./recursivejs/createcomponent/Components.js";

vDOM.app = () =>
     Button({
          text: "Say Hello World",
          events: {
               onClick: () => {
                    alert("Hello World");
               },
          },
     });

vDOM.render();
```

And that's it as a "Hello World"! You should be on your way to create the new Facebook or Youtube ! Let's take this a step further with styligng !

### Style vs StyleSheet vs StaticStyle

To make our button `red` for example, `RecursiveJS` provide you with a multitude of methods, with each one having its own advantages and drawbacks:

#### `Standard external style.css`

This is the standard way of styling your app, you just create a `.css` file and link it to your `index.html`, buisness as usual:

```css
button {
     background: red;
     color: white;
     padding: 5px 10px;
}
```

But that's not really why you are using this library, we want everything inside the `js` files.

#### `RecursiveDOM's static style sheet`

This feature allow you to create an equivalent style sheet within your `index.js`, just before rendering:

```js
import { Button } from "./recursivejs/createcomponent/Components.js";

vDOM.app = () =>
     Button({
          text: "Say Hello World",
          events: {
               onClick: () => {
                    alert("Hello World");
               },
          },
     });

// Add static style here:
vDOM.staticStyle = {
     selectors:{
          "button":{
               background: "red";
               color: "white";
               padding: "5px 10px";
          }
     }
}

vDOM.render();
```

And as its name suggest, the style written is `static` and will be injected when the app first load, just like an external `css` file.

#### `Component's inline style`

This is the equivalent representation of the inline style in this library, and its simple and easy. In our `Hello World` app, we will add a `key` named `style` in which we will declare our style.

```js
import { Button } from "./recursivejs/createcomponent/Components.js";

vDOM.app = () =>
     Button({
          text: "Say Hello World",
          events: {
               onClick: () => {
                    alert("Hello World");
               },
          },
          // we added the style here:
          style: {
               background: "red",
               color: "white",
               padding: "5px 10px",
          },
     });

vDOM.render();
```

Yeah that's cool, but what if you wanted to go to the next level with a `hover` or `active` effect ? Well for that you need a `styleSheet`.

#### `Component's styleSheet`

The `styleSheet` key is the equivalent of your external `.css` file, but cooler, because its within your UI declaration and is computed automatically. It provides other features compared to the `style` key, like the ability to add other states other than the `normal` one; like `hover`, `active`, `focus` ...etc
To implement this feature, we add a key named `styleSheet`, in which we have to add a `className` and the description of each state we want. The `className` is needed for the `RecursiveDOM` to compute styles and create its own style sheet then inject it in the `style` tag we specified early.
Let's remake our red button :

```js
import { Button } from "./recursivejs/createcomponent/Components.js";

vDOM.app = () =>
     Button({
          text: "Say Hello World",
          events: {
               onClick: () => {
                    alert("Hello World");
               },
          },
          styleSheet: {
               className: "hello-world-button",
               normal: {
                    background: "red",
                    color: "white",
                    padding: "5px 10px",
               },
          },
     });

vDOM.render();
```

Below `normal` state, we can add a `hover` state, let's make the button `blue` when hovered on:

```js
import { Button } from "./recursivejs/createcomponent/Components.js";

vDOM.app = () =>
     Button({
          text: "Say Hello World",
          events: {
               onClick: () => {
                    alert("Hello World");
               },
          },
          styleSheet: {
               className: "hello-world-button",
               normal: {
                    background: "red",
                    color: "white",
                    padding: "5px 10px",
               }
               hover: {
                    background: "blue",
               }
          }
     });

vDOM.render();
```

And that's the basics of `styleSheet`! Yep, we are just scratching the surface, you can add a handful of other useful `states`, `animations` and `mediaQueries` to make your app looks professional!

### State

A `state` is the representation of the UI inside the `RecursiveDOM`. When the state changes, the virtual DOM create a new representation and compare it to the old one to make minimal changes to the UI which can help save time and improve performance.

#### `SetState`

To bind values to the UI, we use a `SetState` object:

```js
const iteration = setState(0);
```

The `setState` function is available globally, it accepts any type of data as the initial value, let's use it with our button:

```js
import { Button } from "./recursivejs/createcomponent/Components.js";

const iteration = setState(0);

vDOM.app = () =>
     Button({
          text: `You clicked ${iteration.value}`,
          events: {
               onClick: () => {
                    iteration.setValue(iteration.value + 1);
               },
          },
     });

vDOM.render();
```

Now whenever you click on the button, the value of `iteration` will increase and the UI will be changed accordingly !

#### `updateAfter`

The use of `setState` can be annoying when the state is represented by a large object, a `JSON` or `Array` for example, you need to get the current value and change what you need to change. Let's look at this example;

```js
const selection = setState({
     RecursiveJs: { selected: true },
     React: { selected: true },
     Angular: { selected: false },
     Vue: { selected: true },
     Svelte: { selected: true },
     Ember: { selected: false },
});
```

To change the value of `Angular.selected` you may do something like this:

```js
// inside your component
onClick: () => {
     const currentSelection = selection.value;
     currentSelection.Angular.selected = true;
     selection.setValue(currentSelection);
};
```

Or maybe something like this if you love Javascript shenanigans:

```js
// inside your component
onClick: () => {
     selection.setValue({ ...selection.value, Angular: { selected: true } });
};
```

Huh? that's cool, but in reality this is a simple example! What if you need to change specific values in a bigger, more complexe object ? What if you wanted to change multiple `State` variables/objects ? For that you need `updateAfter` function; It is a globally available function that will change the UI after executing a function you specify as an argument. The last example will be:

```js
// inside your component
onClick: () => {
     updateAfter(() => {
          selection.value.Angular.selected = true;
     });
};
```

This is a more advanced approach, and it make your code looks cleaner and easier to debug and follow, BUT it's unsafe espacially when you don't use `State` objects and go with a normal variable.

### Routing

To add multiple pages with different URLs, you should use routing, which is a complexe implementation of the `setState` feature and the browser's `history` object.
If you are coming from `React`, `Angular`, `Vue` or any other web framework, this will be another cup of tea for you, otherwise, just focus and follow along:
Let's create an `About` page:

1. We will import the Router:

     ```js
     import Router from "./recursivejs/router/Router.js";
     ```

2. Import other premade components:

     ```js
     import { Button, P, Div, Link } from "./recursivejs/createcomponent/Components.js";
     ```

3. We need to initialize the routing system. Just before the export statement, add this line:

     ```js
     window.router = new Router();
     ```

     `Router` constructor accepts one parameter, which is the root `Route`; a `Route` is like a directory in your web app. to create one, `Router` already have a premade function for them:

     ```js
     Router.Route({
          name: "/",
          title: "Tab title",
          component: () => YourComponent(),
          subRoutes: []
     }),
     ```

     - `name` the url of the route, the main route should have `/` as a route, the other can look like this `/my-page`.
     - `title` the title of the route which will appear on the - browser tab.
     - `component` the component that represent the route.
     - `subRoutes` sub pages as an array of `Route`

     we will have the `root` page and an `About` one, and make the `router` global:

     ```js
     import { Button, P, Div, Link } from "./recursivejs/createcomponent/Components.js";
     import Router from "./recursivejs/router/Router.js";

     const iteration = setState(0);

     const MainPage = () =>
               Div({
                    children:[
                         Button({
                              text: `You clicked ${iteration.value}`,
                              events: {
                                   onClick: () => {
                                        iteration.setValue(iteration.value + 1);
                                   },
                              },
                         }),
                         Link({
                              children:"About",
                              to:"/about"
                         })
                    });

     const AboutPage = () =>
               Div({
                    children:[
                         P({
                              text: `Hello World made with Recursive.Js`,
                         }),
                         Link({
                              children:"About",
                              to:"/"
                         })
                    })
               ]});


     window.router = new Router(
          Router.Route({
               name:"/",
               title: "Hello World",
               component () => MainPage(),
               subRoutes:[
                    Router.Route({
                         name:"/about",
                         title: "About",
                         component: () => AboutPage(),
                    })
               ]
          );

     vDOM.app = router.render();
     vDOM.render();
     ```

## Documentation

[Website is under construction](https://riadhadrani.github.io/recursive-website/)

## Examples

[Coming soon ...](https://riadhadrani.github.io/recursive-website/)
