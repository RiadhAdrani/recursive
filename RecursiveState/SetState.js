import { throwError } from "../RecursiveDOM/RecursiveError";
import RecursiveOrchestrator from "../RecursiveOrchestrator/RecursiveOrchestrator";
import StateRegistrey from "./StateRegistry.js";

/**
 * ### SetState
 * Stateful Object, used to automatically update the UI whenever a change occurs to its value.
 * @see {@link RecursiveDOM}
 */
class SetState {
     /**
      * Create a stateful object.
      * @param {any} value define an initial value.
      * @param {String} uid state unique identifier.
      * @param {Function} beforeDestroyed executes before the state got cleaned up by the `StateRegistry`.
      * @param {Function} onInit executes after the state has been initialized. Allow the user to perform async call and update the state accordingly
      * @returns {SetState} stateful object
      */
     constructor(value, uid, beforeDestroyed, onInit) {
          this.uid = uid;
          this.value = value;
          this.beforeDestroyed = beforeDestroyed;
          this.onInit = onInit;
          this.preValue = undefined;
     }

     static reservedStates = ["route"];

     /**
      * Update the value of the stateful object and make the needed changes in the DOM.
      * @param {any} newVal new value
      */
     setValue(newVal) {
          this.preValue = this.value;
          this.value = newVal;

          RecursiveOrchestrator.notifyStateChanged(this.uid);

          if (
               !RecursiveOrchestrator.isBatching() &&
               RecursiveOrchestrator.singleton.step === RecursiveOrchestrator.states.FREE
          ) {
               RecursiveOrchestrator.requestUpdate(this.uid);
          }
     }

     /**
      * Update the DOM after preforming certain actions bundled inside a function.
      * Recommended when calling setState in an asynchronous function.
      * @param {Function} actions - a function that will be executed before updating the DOM.
      */
     static updateAfter(actions) {
          RecursiveOrchestrator.requestBatchingStart("update-after");
          actions();
          RecursiveOrchestrator.requestBatchingEnd("update-after");
     }

     /**
      * Create a stateful object and return its params as an array
      * @param {any} value define an initial value.
      * @param {String} uid state unique identifier.
      * @param {Function} beforeDestroyed executes before the state got cleaned up by the `StateRegistry`.
      * @param {Function} onInit executes after the state has been initialized. Allow the user to perform async call and update the state accordingly
      * @returns {Array} an array containing data and state manipulation functions.
      */
     static setState(uid, initValue, onInit, beforeDestroyed) {
          if (SetState.reservedStates.includes(uid))
               throwError(`${uid} is a reserved state UID`, [
                    `You have used a reserved UID from this list : ${SetState.reservedStates}`,
               ]);

          return StateRegistrey.singleton.setState(
               new SetState(initValue, uid, beforeDestroyed, onInit)
          );
     }

     /**
      * Create a reserved stateful object and return its params as an array
      * @param {any} uid state unique identifier
      * @param {any} initValue define an initial value
      * @returns {Array} an array containing data and state manipulation functions.
      */
     static setReservedState(uid, initValue) {
          const res = new SetState(initValue, uid);
          res.isReserved = true;
          return StateRegistrey.singleton.setState(res);
     }
}

export default SetState;
