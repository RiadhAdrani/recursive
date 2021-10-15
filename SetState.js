class SetState {
     constructor(value) {
          this.value = value;
     }

     setValue(newVal) {
          if (!vDOM.renderState) {
               throw "Cannot change the state after the VDOM has just rerendered as it will a cause an infinite Rerender loop.";
          }
          this.value = newVal;
          vDOM.update();
     }
}

export default SetState;
