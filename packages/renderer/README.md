## `RecursiveRenderer`

Used to, `create`, `render` and `update` the application.

This is like an `abstract` class, non-implemented methods should be overriden with platform-specific methods in order for the renderer to work correctly :

-   `useRendererClean`
-   `useRendererOnTreePrepared`
-   `useRendererRemoveAttribute`
-   `useRendererSetAttribute`
-   `useRendererItemInTree`
-   `useRendererRemoveEvent`
-   `useRendererAddEvent`
-   `useRendererRenderTree`
-   `useRendererChangeElementPosition`
-   `useRendererRemoveElement`
-   `useRendererAddElement`
-   `useRendererReplaceElement`
-   `useRendererIsAttribute`
-   `useRendererIsEvent`
-   `useRendererCreateInstance`
-   `useRendererInjectEvents`
-   `useRendererInjectChildren`
-   `useRendererCreateRawContainer`
-   `useRendererUpdateRawContainersAgainstEachOthers`
