class SetState {
     constructor(value) {
          this.value = value;
     }

     setValue(newVal) {
          this.value = newVal;
          window.vDOM.update();
     }
}

export default SetState;
