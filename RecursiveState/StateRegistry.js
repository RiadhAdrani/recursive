import { throwError } from "@riadh-adrani/recursive/RecursiveDOM/RecursiveError";
import RecursiveEvents from "../RecursiveDOM/RecursiveEvents.js";
import SetState from "./SetState.js";

/**
 * ### StateRegistry
 * A Registry containing a list of states.
 * Do not create your own `StateRegistry`, this will be handled by the `RecursiveState`.
 */
class StateRegistry {
     static globalRegistry = undefined;

     static eventIsExecuting = false;

     static batched = false;

     /**
      * Create a new state registry.
      * Do not create your own `StateRegistry`, this will be handled by the `RecursiveState`.
      * @returns { StateRegistry } a new registry object
      */
     constructor() {
          if (StateRegistry.globalRegistry != undefined) throwError('State Registry already exists',['State Resigtry cannot be instanciated more than once. Are you trying to manually create an object?'])

          this.states = {};
          this.current = [];
          this.new = [];

          addEventListener(RecursiveEvents.EVENTS._BATCHING_STARTED, () => {
               StateRegistry.eventIsExecuting = true;
          });

          addEventListener(RecursiveEvents.EVENTS._BATCHING_ENDED, () => {
               StateRegistry.eventIsExecuting = false;

               if (StateRegistry.batched) {
                    RecursiveEvents.update();
                    StateRegistry.batched = false;
               }
          });

          addEventListener(RecursiveEvents.EVENTS._DOM_DID_RENDER, () => {
               this.current = this.new;
               this.new = [];
          });

          addEventListener(RecursiveEvents.EVENTS._DOM_DID_UPDATE, () => {
               for (let i = 0; i < this.current.length; i++) {
                    const uid = this.current[i];

                    if (SetState.reservedStates.includes(uid)) {
                         continue;
                    }
                    if (this.new.indexOf(uid) === -1) {
                         delete this.states[uid];
                    }
               }

               this.current = this.new;
               this.new = [];
          });
     }

     /**
      * Create or returns the state object if it already exists in the `globalRegistry`.
      * @param {SetState} state stateful object
      * @returns {Array | undefined} an array of length 3 : [`value`,`setValue`,`free`]
      * * `value` current value
      * * `setValue` a function that update the `value` with a new one.
      * * `free` remove the state from the `StateRegistry`
      */
     setState(state) {
          if (!state.uid) throwError('State object does not have a valid uid',['setState accepts two parameters: the first is the unique identifier (UID) and the second is the initial value.'])

          if (!this.states[state.uid]) {
               this.states[state.uid] = state;
          }

          this.new.push(state.uid);

          const get = this.states[state.uid].value;
          const set = (newVal) => {
               if (this.states[state.uid]) this.states[state.uid].setValue(newVal);
          };

          return [get, set];
     }

     /**
      * returns the state object if it already exists in the `globalRegistry`.
      * @param {string} uid state unique identifier
      * @returns {Array | undefined} an array of length 3 : [`value`,`setValue`,`free`]
      * * `value` current valued
      * * `setValue` a function that update the `value` with a new one.
      * * `free` remove the state from the `StateRegistry`
      */
     getState(uid) {
          if (!this.states[uid]) {
               throwError(`State with the UID ${uid} does not exist!`,['You tried to access a non-existant state.','States could be cleared upon updates, when they are out of scope.'])
          }

          const get = this.states[uid].value;
          const set = (newVal) => {
               if (this.states[uid]) this.states[uid].setValue(newVal);
          };

          return [get, set];
     }
}

export default StateRegistry;
