import RecursiveEvents from "@riadh-adrani/recursive/RecursiveDOM/RecursiveEvents";
import SetState from "@riadh-adrani/recursive/RecursiveState/SetState";

function ThrowStateError(msg) {
     const e = new Error(`Failed to compute states => ${msg}`);
     throw e;
}

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
          if (StateRegistry.globalRegistry != undefined) throw "State Registery already exists";

          this.states = {};
          this.current = [];
          this.new = [];

          addEventListener("recursive-event-is-executing", () => {
               StateRegistry.eventIsExecuting = true;
          });

          addEventListener("recursive-event-finished", () => {
               StateRegistry.eventIsExecuting = false;

               if (StateRegistry.batched) {
                    RecursiveEvents.update();
                    StateRegistry.batched = false;
               }
          });

          addEventListener("recursive-did-render", () => {
               this.current = this.new;
               this.new = [];
          });

          addEventListener("recursive-did-update", () => {
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
          if (!state.uid) ThrowStateError(`State object does not have a valid uid.`);

          if (!this.states[state.uid]) {
               this.states[state.uid] = state;
          }

          this.new.push(state.uid);

          const get = this.states[state.uid].value;
          const set = (newVal) => {
               this.states[state.uid].setValue(newVal);
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
               throw `State with the UID ${uid} does not exist !`;
          }

          const get = this.states[uid].value;
          const set = (newVal) => {
               this.states[uid].setValue(newVal);
          };

          return [get, set];
     }
}

export default StateRegistry;
