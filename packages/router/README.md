## `RecursiveRouter`

Manage App routing.

This is like an `abstract` class, non-implemented methods should be overriden with platform-specific methods in order for the renderer to work correctly :

-   `useRouterMakeURL`
-   `useRouterGetLocationPath`
-   `useRouterReplaceState`
-   `useRouterPushState`
-   `useRouterScrollToTop`
-   `useRouterGoToAnchor`
-   `useRouterNavigationListener`
-   `useRouterGetRoute`
-   `useRouterOnLoad`
-   `useRouterSetTitle`
