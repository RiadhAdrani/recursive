## `RecursiveState`

Manage App state.

A modular _`store`_ containing all used states.

States are divided into 4 categories:

-   `State` : A normal stateful object, initialized using _`setState()`_ method. If the state goes unused in a rendering iteration, the state will be deleted from the repository and therefor data will be lost.

-   `Cache`: Another stateful object, initialized with _`setCache()`_ method. Cached states will not be deleted from the repository like the previous type, unless the ammount of items exceeds the _`cacheSize`_ which is by default _`1000`_.

-   `Reference` : Used to store and get an element from the tree of components. Such item could be initialized by returning a _`string`_ from the _`onRef`_ hook within the desired component. The string represent the _`key`_ of the element which could be retreived using _`getRef()`_ method.

-   `Reserved` : Used internally by the framework. used with the _`RecursiveRouter`_.
