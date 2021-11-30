# [Project : Recursive || "Kompose" in the making](https://riadhadrani.github.io/recursive-website/)

Project Recursive is an ongoing project to build a functional, component-based, Javascript only, beautiful and interactive Web applications.

## Getting Started

Drop this repo into your working directory, where your `index.js` is located, and that's it for the setup part. Then, import the library, and make the changes needed so your `index.html` looks like this :

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

          // Initializing global variables and methods //
          <script src="init.js" type="module"></script>

          // This is your starting point
          <script src="index.js" type="module"></script>
     </body>
</html>
```

In `init.js`, we will initiate the Virtual DOM:

```js
import RecursiveDOM from "./recursivejs/RecursiveDOM.js";
RecursiveDOM.init(document.getElementById("app"), document.getElementById("app-style"));
```

Now, in `index.js`:

```js
import App from "./App.js";

vDOM.app = () => App();
vDOM.render();
```

Finally, in `App.js`, we will write our "Hello World" app:

```js
import ButtonView from "./recursivejs/createcomponent/components/forms/ButtonView.js";

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

### Stateful Object (SetState)

A stateful variable is an object that will change the state of the application whenever you change its value. In this library, you can use `setState`, an object having a `value` property (Obviously containing the var value) and a `setValue` method which takes have one parameter `newValue`. calling `setState` will change the value of the object and execute a rerender of UI (minimal changes).
Building on the "Hello World" demo, we will change the code so the button will display the number of times we clicked on it,we will add a couple of things:

1. First, add a stateful object and initialize it at `0` :

     ```js
     const times = setState(0);
     ```

2. Then, we change the text of the button:

     ```js
     ...
     text: `You clicked me ${times.value} time${times.value > 1 ? "s" : ""}`,
     ...
     ```

     the expression below will add an "s" if the value of times is greater than 1, else it will add an empty string, which is nothing.

     ```js
     ${times.value > 1 ? "s" : ""}
     ```

3. Finally, we will change the `onClick` event to increment the value of `times`

     ```js
     ...
     events:{
          onClick: () => {
               times.setValue(times.value + 1)
          }
     }
     ...
     ```

Your `App.js` should look like this:

```js
import ButtonView from "./recursivejs/createcomponent/components/forms/ButtonView.js";

// we added the stateful object here
const times = setState(0);

export default () =>
     ButtonView({
          // display the value of times
          text: `You clicked me ${times.value} time${times.value > 1 ? "s" : ""}`,
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
               // and changed the onClick event
               onClick: () => {
                    times.setValue(times.value + 1);
               },
          },
     });
```

Now challenge your friends to a clicking game !

### Routing

To add multiple pages with different URLs, you should routing, which is a complexe implementation of the `setState` feature and the browser's `history` object.
If you are coming from `React`, `Angular`, `Vue` or any other web framework, this will be another cup of tea for you, otherwise, just focus and follow along:

1. We will import the Router class:

     ```js
     import Router from "./recursivejs/router/Router.js";
     ```

2. Import two other premade component: `ParagraphView`, the equivalent of `<p>` and `DividerView` which plays the role of the most used tag `<div>`:

     ```js
     import ParagraphView from "./recursivejs/createcomponent/components/text/ParagraphView.js";
     import DividerView from "./recursivejs/createcomponent/components/text/DividerView.js";
     ```

     you can import them as `p` and `div` or whatever you are comfortable with, like this:

     ```js
     import p from "./recursivejs/createcomponent/components/text/ParagraphView.js";
     import div from "./recursivejs/createcomponent/components/text/DividerView.js";
     ```

     But, we will use the import statement.

3. We need to initialize the routing system. Just before the export statement, add this line:

     ```js
     const router = new Router();
     ```

     `Router` constructor accepts one parameter, which is an array of `Routes`, a `Route` is like a directory in your web app. to create one, `Router` already have a premade function for them:

     ```js
     Router.Route({
          name: "/",
          title: "Tab title",
          component: () => YourComponent,
     }),
     ```

     - `name` the url of the route, the main route should have `/` as a route, the other can look like this `/my-page`.
     - `title` the title of the route which will appear on the - browser tab.
     - `component` the component that represent the route.

     we will have two routes, a main one for the button clicker and second one to reset the counter:

     ```js
     const router = new Router([
          Router.Route({
               name: "/",
               title: "Button Clicker",
               component: () => ButtonClicker(),
          }),
          Router.Route({
               name: "/reset",
               title: "Button Reset",
               component: () => ResetClicker(),
          }),
     ]);
     ```

     We will create `ButtonClicker` and `ResetClicker`

4. We will add both component just before the `Router`. for the `ButtonClicker` we will add a `ParagraphView` as a text, below the button that will direct us to the reset page when clicked. We will wrap them both in a `DividerView` as a container, we will make some changes so the elements are centered. Your function should look like this:

     ```js
     const ButtonClicker = () =>
          DividerView({
               style: {
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
               },
               children: [
                    ButtonView({
                         text: `You clicked me ${times.value} time${times.value > 1 ? "s" : ""}`,
                         style: {
                              color: "white",
                              backgroundColor: "red",
                              fontSize: "2em",
                              padding: "10px",
                              alignSelf: "center",
                         },
                         events: {
                              onClick: () => {
                                   times.setValue(times.value + 1);
                              },
                         },
                    }),
                    ParagraphView({
                         text: "Go to reset page.",
                         style: {
                              color: "blue",
                              cursor: "pointer",
                         },
                         events: {
                              onClick: () => {
                                   router.goTo("/reset");
                              },
                         },
                    }),
               ],
          });
     ```

     If you missed it, We added an event listener to the `ParagraphView`, we used the router method `goTo()` that accepts one argument which is the `name` of the route that the app will redirect to.

5. For `ResetClicker`, we will copy paste the `ButtonClicker` and make some changes: the `text` property of the button will contain "Reset Clicker", the `onClick` event will change the value of the stateful object to `0`, and the `ParagraphView` will redirect us to the main page and have its text changed. Your function for the `ResetClicker` should look something like this:

     ```js
     const ResetClicker = () =>
          DividerView({
               style: {
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
               },
               children: [
                    ButtonView({
                         text: `Reset Clicker`,
                         style: {
                              color: "white",
                              backgroundColor: "red",
                              fontSize: "2em",
                              padding: "10px",
                              alignSelf: "center",
                         },
                         events: {
                              onClick: () => {
                                   times.setValue(0);
                              },
                         },
                    }),
                    ParagraphView({
                         text: "Go to clicker.",
                         style: {
                              color: "blue",
                              cursor: "pointer",
                         },
                         events: {
                              onClick: () => {
                                   router.goTo("/");
                              },
                         },
                    }),
               ],
          });
     ```

6. At the end of the file, change the value of `vDOM.app` and set it to render the current `Route`:

     ```js
     vDOM.app = () => router.render();
     ```

And that's it for the Routing.

### Refactoring your code

In the previous section, we wrote duplicate code that could be written differently and efficiently, and that is for `ButtonClicker` and `ResetClicker`:

We will make a function named `Template` that will have some parameters to change the UI accordingly:

`buttonText` change the text of the button
`buttonOnClick` the function that will execute when the button is clicked
`text` text below the button
`directTo` the route that the app will redirect to when the text is clicked

```js
const Template = ({ buttonText, buttonOnClick, text, directTo }) =>
     DividerView({
          style: {
               margin: "auto",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               textAlign: "center",
          },
          children: [
               ButtonView({
                    text: buttonText,
                    style: {
                         color: "white",
                         backgroundColor: "red",
                         fontSize: "2em",
                         padding: "10px",
                         alignSelf: "center",
                    },
                    events: {
                         onClick: () => buttonOnClick(),
                    },
               }),
               ParagraphView({
                    text: text,
                    style: {
                         color: "blue",
                         cursor: "pointer",
                    },
                    events: {
                         onClick: () => {
                              router.goTo(directTo);
                         },
                    },
               }),
          ],
     });
```

Now we will change `ButtonClicker` to look like this:

```js
const ButtonClicker = () =>
     Template({
          buttonText: `You clicked me ${times.value} time${times.value > 1 ? "s" : ""}`,
          buttonOnClick: () => {
               times.setValue(times.value + 1);
          },
          text: "Go to reset page",
          directTo: "/reset",
     });
```

and the same goes to `ResetClicker` :

```js
const ResetClicker = () =>
     Template({
          buttonText: "Reset Clicker",
          buttonOnClick: () => {
               times.setValue(0);
          },
          text: "go to clicker",
          directTo: "/",
     });
```

You can go another step and make `Template` in a seperate file and import it in your `App.js` to make the file look cleaner.

```js
import Template from "./Template.js";
```

### Stateful vs Stateless Components

A Stateful component is a component that can react to state changes. In `Recursive`, a Stateful Component is just a function that returns a component, the Stateless one is just a constant.

This component will react to the changes of `times`

```js
const statful = () => ButtonView({ text: `You clicked on me ${times.value}` });
```

While this one won't, unless you wrap it in another stateful component.

```js
const statless = ButtonView({ text: `You clicked on me ${times.value}` });
```

### Style vs StyleSheet

The `style` parameter in ready-made components refer to the inline style that will be applied to the component:

```js
ButtonView({
     text: "Click",
     style: {
          color: "white",
          backgroundColor: "red",
          fontSize: "2em",
          padding: "10px",
          alignSelf: "center",
          },
}),
```

`style` is stronger than `styleSheet` which is a seperate parameter that too contains style for the components, but it is approached differently, and you can add other features like `states`, `animations` and `mediaQueries` here is the same button but using the `styleSheet`:

```js
ButtonView({
     text: "Click",
     styleSheet:{
          className: "button",
          normal: {
               color: "white",
               backgroundColor: "red",
          }
     },
}),
```

#### > styleSheet and states

In `styleSheet`, you should add a `className`, think of it like grouping the style of multiple components into one class. And then we have `normal` that contains the definition of the style, well, `normal` refer to the style of the component in the normal state, and you guessed it, you can add `hover` which will change the style when the component is being hovered on, there are many other states, like `active` for when the component is being clicked on, `focus` which define the changes to be made when the element is focused, or `placeholder` which will style the placeholder text of an `InputView`.

Here's the same button, but with a different `backgroundColor` for each state:

```js
ButtonView({
     text: "Click",
     styleSheet:{
          className: "button",
          normal: {
               color: "white",
               backgroundColor: "red",
          },
          hover:{
               backgroundColor:"blue",
          },
          active: {
               backgroundColor: "black",
          }
     },
}),
```

#### > styleSheet and animations

In `styleSheet`, You can add `animations`: let's add a looping animation that will change the color of the button:

```js
ButtonView({
     text: "Click",
     styleSheet: {
          className: "button",
          normal: {
               color: "white",
               backgroundColor: "red",
               animation: "change-color 2s infinite",
          },
          animations: [
               {
                    name: "change-color",
                    steps: {
                         "0%": { backgroundColor: "red" },
                         "50%": { backgroundColor: "yellow" },
                         "100%": { backgroundColor: "red" },
                    },
               },
          ],
     },
});
```

We added a key named `animations` that contains an array of animations. The `animation` object is composed of two keys:
`name` - the name of the animation.
`steps` - the steps of the animation.

At the `normal` style state of the component we added the key `animation` with the value `change-color 2s infinite` which translate to "play the animation named `change-color` for a duration of `2s` and loop it an `infinite` amount of times."

You can make things wilder by adding an animations for the `hover` state.

#### > styleSheet and mediaQueries

`MediaQueries` are here too, let's add one that changes the color of the button to `blue` when the browser screen is less than `1000px`:

```js
ButtonView({
     text: "Click",
     styleSheet: {
          className: "button",
          normal: {
               color: "white",
               backgroundColor: "red",
          },
          mediaQueries: [{ condition: "(max-width:1000px)", normal: { backgroundColor: "blue" } }],
     },
});
```

We added a key named `mediaQueries` to `styleSheet`. This object should contains an array of `queries`. A `query` is an object composed of at least one value:
`condition` - the condition to watch for to apply the new style, it is the same in `css`.
`state` - You can add the name of the state that you want to be changed: `normal`, `hover`, `focus`, `active`... In our case, we just changed the `normal` style state.

#### > Something to keep in mind when using styleSheet

While using `styleSheet` offers many possibilities, it like using the `Cascading Style Sheet`, so you should be aware of the overriding that could happen when you give two different component the same style `className`. In fact, every different component should have a different style `className`.

#### > Where is the styleSheet rendered in?

The `RecursiveDOM` collect all the `styleSheet` and make some computations to remove duplicates and merge styles, and then translate it to plain `css` and render it in the `<style>` element that you specified when initiating the `RecursiveDOM`.

### Hooks

Hooks are methods executed at lifecycle changes, like when a component is created or destroyed, each case have a dedicated hook. As for now, we have 4 hooks:
`onCreated` - executes after the component has been injected in the DOM.
`onUpdated` - executes when at least one property has changed. the only property excluded from this rule is the `tag` property.
`onDestroyed` - executes when the component has been removed from the DOM.
`beforeDestroyed` - executes just before removing the component from the DOM.

```js
ButtonView({
     text: "Click",
     styleSheet: {
          className: "button",
          normal: {
               color: "white",
               backgroundColor: "red",
               padding: "10px",
          },
     },
     hooks: {
          onCreated: () => {
               console.log("The button was created !");
          },
     },
});
```

`onCreated` hook will display `the button was created` in the console.

## Documentation

[Website is under construction](https://riadhadrani.github.io/recursive-website/)

## Examples

[Coming soon ...](https://riadhadrani.github.io/recursive-website/)
