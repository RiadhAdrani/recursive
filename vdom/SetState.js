import RecursiveDOM from "../RecursiveDOM.js";

/**
 * ### SetState
 * Stateful Object, used to automatically update the UI whenever a change occurs to its value.
 * @see {@link RecursiveDOM}
 */
class SetState {
     /**
      * Create a stateful object.
      * @param {any} value define an initial value
      * @returns {SetState} stateful object
      */
     constructor(value) {
          this.value = value;
     }

     /**
      * Update the value of the stateful object and make the needed changes in the DOM.
      * @param {any} newVal new value
      */
     setValue(newVal) {
          if (!vDOM) throw "[VDOM] no VirtualDOM in the current document.";
          this.value = newVal;
          vDOM.update();
     }

     static updateAfter(actions) {
          try {
               actions();
               vDOM.update();
          } catch (e) {}
     }
}

export default SetState;
