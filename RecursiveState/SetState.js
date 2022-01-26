import { throwError } from "@riadh-adrani/recursive/RecursiveDOM/RecursiveError";
import RecursiveDOM from "../RecursiveDOM/RecursiveDOM.js";
import RecursiveEvents from "../RecursiveDOM/RecursiveEvents.js";
import StateRegistrey from "./StateRegistry.js";

/**
 * ### SetState
 * Stateful Object, used to automatically update the UI whenever a change occurs to its value.
 * @see {@link RecursiveDOM}
 */
class SetState {
     /**
      * Create a stateful object.
      * @param {any} value define an initial value
      * @param {any} uid state unique identifier
      * @returns {SetState} stateful object
      */
     constructor(value, uid) {
          this.value = value;
          this.uid = uid;
     }

     static reservedStates = ["route"];

     /**
      * Update the value of the stateful object and make the needed changes in the DOM.
      * @param {any} newVal new value
      */
     setValue(newVal) {
          this.value = newVal;

          if (StateRegistrey.eventIsExecuting) {
               StateRegistrey.batched = true;
          } else {
               RecursiveEvents.update();
          }
     }

     /**
      * Update the DOM after preforming certain actions bundled inside a function.
      * @param {Function} actions - a function that will be executed before updating the DOM.
      * @deprecated
      */
     static updateAfter(actions) {
          try {
               RecursiveEvents.startEvent();
               actions();
               RecursiveEvents.endEvent();
          } catch (e) {}
     }

     /**
      * Create a stateful object and return its params as an array
      * @param {any} uid state unique identifier
      * @param {any} initValue define an initial value
      * @returns {Array} an array of length 2 : [`value`, `setValue`]
      */
     static setState(uid, initValue) {
          if (SetState.reservedStates.includes(uid)) throwError(`${uid} is a reserved state UID`,[`You have used a reserved UID from this list : ${SetState.reservedStates}`])
          if (!StateRegistrey.globalRegistry) StateRegistrey.globalRegistry = new StateRegistrey();
          return StateRegistrey.globalRegistry.setState(new SetState(initValue, uid));
     }

     /**
      * Create a reserved stateful object and return its params as an array
      * @param {any} uid state unique identifier
      * @param {any} initValue define an initial value
      * @returns {Array} an array of length 2 : [`value`, `setValue`]
      */
     static setReservedState(uid, initValue) {
          if (!StateRegistrey.globalRegistry) StateRegistrey.globalRegistry = new StateRegistrey();
          const res = new SetState(initValue, uid);
          res.isReserved = true;
          return StateRegistrey.globalRegistry.setState(res);
     }
}

export default SetState;
