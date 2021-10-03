import handlesameselector from "./handlesameselector.js";
import proptoselector from "./proptoselector.js";

export default (array) => {
     const output = {};

     for (let i in array) {
          if (output[`${array[i].selector}${proptoselector[array[i].type]}`]) {
               output[`${array[i].selector}${proptoselector[array[i].type]}`] = handlesameselector(
                    array[i].content,
                    output[`${array[i].selector}${proptoselector[array[i].type]}`]
               );
          } else output[`${array[i].selector}${proptoselector[array[i].type]}`] = array[i].content;
     }

     return output;
};
