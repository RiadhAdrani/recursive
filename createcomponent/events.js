export default (component, htmlElement) => {
     if (component.events) {
          // add event listeners

          htmlElement.events = {};

          if (component.events.onClick) {
               htmlElement.events.onClick = component.events.onClick;

               htmlElement.addEventListener("click", (e) => {
                    htmlElement.events.onClick(e);
               });
          }
          if (component.events.onChange) {
               htmlElement.events.onChange = component.events.onChange;

               htmlElement.addEventListener("input", (e) => {
                    htmlElement.events.onChange(e);
               });
          }
          if (component.events.onChanged) {
               htmlElement.events.onChanged = component.events.onChanged;

               htmlElement.addEventListener("change", (e) => {
                    htmlElement.events.onChanged(e);
               });
          }

          if (component.events.onMouseDown) {
               htmlElement.events.onMouseDown = component.events.onMouseDown;

               htmlElement.addEventListener("mousedown", (e) => {
                    htmlElement.events.onMouseDown(e);
               });
          }

          if (component.events.onMouseEnter) {
               htmlElement.events.onMouseEnter = component.events.onMouseEnter;

               htmlElement.addEventListener("mouseenter", (e) => {
                    htmlElement.events.onMouseEnter(e);
               });
          }

          if (component.events.onMouseLeave) {
               htmlElement.events.onMouseLeave = component.events.onMouseLeave;

               htmlElement.addEventListener("mouseleave", (e) => {
                    htmlElement.events.onMouseLeave(e);
               });
          }

          if (component.events.onMouseMove) {
               htmlElement.events.onMouseMove = component.events.onMouseMove;

               htmlElement.addEventListener("mousemove", (e) => {
                    htmlElement.events.onMouseMove(e);
               });
          }

          if (component.events.onMouseMove) {
               htmlElement.events.onMouseMove = component.events.onMouseMove;

               htmlElement.addEventListener("mousemove", (e) => {
                    htmlElement.events.onMouseMove(e);
               });
          }

          if (component.events.onMouseOver) {
               htmlElement.events.onMouseOver = component.events.onMouseOver;

               htmlElement.addEventListener("mouseover", (e) => {
                    htmlElement.events.onMouseOver(e);
               });
          }

          if (component.events.onMouseOut) {
               htmlElement.events.onMouseOut = component.events.onMouseOut;

               htmlElement.addEventListener("mouseout", (e) => {
                    htmlElement.events.onMouseOut(e);
               });
          }

          if (component.events.onMouseUp) {
               htmlElement.events.onMouseUp = component.events.onMouseUp;

               htmlElement.addEventListener("mouseup", (e) => {
                    htmlElement.events.onMouseUp(e);
               });
          }
     }
};
