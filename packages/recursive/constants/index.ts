// Router
export const ROUTER_DYNAMIC_REG_EXP = /:[^:;]*;/g;
export const ROUTER_ANCHOR_REG_EXP = /#[\w.~:?#[\]@!$&'()*+,;=-]+$/;
export const ROUTER_PATH_STATE = "router-path";
export const ROUTER_ROUTE_STATE = "router-route";
export const ROUTER_ANCHOR_STATE = "router-anchor";
export const ROUTER_NOT_FOUND_ROUTE = "/404";

// DEVELOPMENT
export const DEVELOPMENT_MODE = "development";

// ORCHESTRATOR
export const ORCHESTRATOR_FREE = "free";
export const ORCHESTRATOR_HANDLING_REQUESTS = "handling-requests";
export const ORCHESTRATOR_COMPUTE_TREE = "calculating-tree";
export const ORCHESTRATOR_COMPUTE_STYLE = "calculating-style";
export const ORCHESTRATOR_RENDERING = "rendering";
export const ORCHESTRATOR_UPDATING = "updating";
export const ORCHESTRATOR_COMPUTE_DIFF = "calculating-diff";
export const ORCHESTRATOR_EXEC_BEFORE_DESTROYED = "execute-before-destroyed";
export const ORCHESTRATOR_COMMIT_INTO_TREE = "commit-into-tree";
export const ORCHESTRATOR_EXEC_ON_DESTROYED = "execute-on-destroyed";
export const ORCHESTRATOR_EXEC_ON_CREATED = "execute-on-created";
export const ORCHESTRATOR_EXEC_ON_UPDATED = "execute-on-updated";
export const ORCHESTRATOR_CLEAN_STATES = "clean-states";

// RENDERER
export const FLAGS_FORCE_RERENDER = "forceRerender";
export const FLAGS_RENDER_IF = "renderIf";

export const HOOKS_ON_CREATED = "onCreated";
export const HOOKS_ON_UPDATED = "onUpdated";
export const HOOKS_ON_DESTROYED = "onDestroyed";
export const HOOKS_ON_REF = "onRef";
export const HOOKS_BEFORE_DESTROYED = "beforeDestroyed";
export const HOOKS_BEFORE_PREPARED = "beforePrepared";
export const HOOKS_ON_PREPARED = "onPrepared";

export const ELEMENT_TYPE_FRAGMENT = "fragment";
export const ELEMENT_TYPE_TEXT_NODE = "#text";
export const ELEMENT_TYPE_RAW = "#raw";

export const RENDERER_PHASE_ON_CREATED = "onCreated";
export const RENDERER_PHASE_ON_UPDATED = "onUpdated";
export const RENDERER_PHASE_ON_DESTROYED = "onDestroyed";
export const RENDERER_PHASE_BEFORE_DESTROYED = "beforeDestroyed";
export const RENDERER_PHASE_CHANGES = "changes";

export const RECURSIVE_ELEMENT_SYMBOL = Symbol.for("recursive.element");

// STATE

export const STATE_STATE_STORE = "state";
export const STATE_CACHE_STORE = "cache";
export const STATE_REF_STORE = "ref";
export const STATE_RESERVED_STORE = "reserved";
export const STATE_EFFECT_STORE = "effect";
