import { Column, P } from "../../components.js";
import { Render } from "../../index.js";
import CreateComponent from "../create-component/CreateComponent.js";
import { setState } from "../recursive-state/SetState.js";
import { Run } from "../recursive-test/RecursiveTest.js";

Run({});

// Render(() => {
//     const [count, setCount] = setState("count", 10);

//     const array = (() => {
//         const output = [];
//         for (let i = 0; i < count; i++) {
//             output.push(i);
//         }
//         return output;
//     })();

//     return new CreateComponent({
//         tag: "column-view",
//         props: { id: "yeet", className: "how-many-count-" + count },
//         style: { className: "holy-shit", inline: { color: "#" + count * 10 } },
//         children: array.map((item, index) =>
//             P({ text: `You clicked me : ${count} times`, key: index })
//         ),
//         hooks: {
//             onCreated: () => {
//                 console.log("created");
//             },
//         },
//         events: {
//             onClick: () => {
//                 setCount(count + 1);
//             },
//         },
//     });
// });
