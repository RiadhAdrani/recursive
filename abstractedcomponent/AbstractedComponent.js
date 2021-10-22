import absinitstyle from "./absinit/absinitstyle.js";
import CreateComponent from "../createcomponent/CreateComponent.js";

class AbstractedComponent extends CreateComponent {
     constructor({
          tag,
          children,
          props = {},
          style = {
               className: "",
               normal: {},
               hover: {},
               focus: {},
               active: {},
          },
          hooks = {
               onCreated: null,
               beforeDestroyed: null,
               onDestroyed: null,
               onUpdated: null,
               onStateUpdated: null,
          },
          events = {},
     }) {
          super({ tag, ...props, ...hooks, events, children });

          absinitstyle(this, style);
     }
}

export default AbstractedComponent;
