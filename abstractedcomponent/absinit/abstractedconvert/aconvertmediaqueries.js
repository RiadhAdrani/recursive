import proptoselector from "../../../vdom/props/proptoselector.js";
import aconvert from "./aconvert.js";

export default (queries) => {
     const output = [];

     for (let q in queries) {
          const item = { condition: q };
          for (let s in queries[q]) {
               if (proptoselector.hasOwnProperty(s)) {
                    item[s] = aconvert(queries[q][s]);
               }
          }
          output.push(item);
     }

     return output;
};
