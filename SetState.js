class SetState {
     constructor(value) {
          this.value = value;
     }

     setValue(newVal) {
          if (newVal) this.value = newVal;
          vDOM.update();
     }
}

export default SetState;
