import RecursiveDOM from "./RecursiveDOM.js";
import RecursiveEvents from "./RecursiveEvents.js";

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
          this.value = newVal;
          RecursiveEvents.update();
     }

     static updateAfter(actions) {
          try {
               actions();
               RecursiveEvents.update();
          } catch (e) {}
     }
}

export default SetState;
