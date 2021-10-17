class SetState {
     constructor(value) {
          this.value = value;
     }

     setValue(newVal) {
          this.value = newVal;
          vDOM.update();
     }
}

export default SetState;
