class RefRegistry {
     static singleton = new RefRegistry();

     constructor() {
          if (RefRegistry.singleton instanceof RefRegistry)
               throwError("Ref Registry already exists", [
                    "Ref Resigtry cannot be instanciated more than once. Are you trying to manually create an object?",
               ]);

          this.refs = {};
     }

     static clean() {
          for (let ref in this.singleton.refs) {
               const obj = this.singleton.refs[ref];
               if (!obj.exists) {
                    this.unRef(ref);
               } else {
                    obj.exists = false;
               }
          }
     }

     static getRef(ref) {
          if (this.singleton.refs[ref]) return this.singleton.refs[ref].el;
          else return document.createElement("div");
     }

     static setRef(ref, el) {
          this.singleton.refs[ref] = { ref, el, exists: true };
     }

     static unRef(ref) {
          delete this.singleton.refs[ref];
     }
}

export default RefRegistry;
