export default (newComponent, render) => {
     if (newComponent.events) {
          // replace with new onClick event
          if (!render.events) {
               render.events = {};
          }

          if (newComponent.events.onClick) {
               render.events.onClick = newComponent.events.onClick;
          } else {
               render.events.onClick = () => {};
          }

          if (newComponent.events.onChange) {
               render.events.onChange = newComponent.events.onChange;
          } else {
               render.events.onChange = () => {};
          }

          if (newComponent.events.onChanged) {
               render.events.onChanged = newComponent.events.onChanged;
          } else {
               render.events.onChanged = () => {};
          }

          if (newComponent.events.onMouseDown) {
               render.events.onMouseDown = newComponent.events.onMouseDown;
          } else {
               render.events.onMouseDown = () => {};
          }

          if (newComponent.events.onMouseEnter) {
               render.events.onMouseEnter = newComponent.events.onMouseEnter;
          } else {
               render.events.onMouseEnter = () => {};
          }

          if (newComponent.events.onMouseLeave) {
               render.events.onMouseLeave = newComponent.events.onMouseLeave;
          } else {
               render.events.onMouseLeave = () => {};
          }

          if (newComponent.events.onMouseMove) {
               render.events.onMouseMove = newComponent.events.onMouseMove;
          } else {
               render.events.onMouseMove = () => {};
          }

          if (newComponent.events.onMouseOver) {
               render.events.onMouseOver = newComponent.events.onMouseOver;
          } else {
               render.events.onMouseOver = () => {};
          }

          if (newComponent.events.onMouseOut) {
               render.events.onMouseOut = newComponent.events.onMouseOut;
          } else {
               render.events.onMouseOut = () => {};
          }

          if (newComponent.events.onMouseUp) {
               render.events.onMouseUp = newComponent.events.onMouseUp;
          } else {
               render.events.onMouseUp = () => {};
          }
     } else {
          render.events = {};
     }
};
