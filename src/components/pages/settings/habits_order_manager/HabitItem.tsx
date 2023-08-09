// import { ListItem, ListItemText } from "@mui/material";
// import React from "react";

// type Props = {
//     name: string;
// };

// function HabitItem({ name, listIndex, index, moveItem, handleDragStart }: Props) {
//     return (
//         <ListItem key={name} draggable onDragStart={(e) => handleDragStart(e, item, listIndex)}>
//             <ListItemText primary={name} />
//             <div>
//                 <button onClick={() => index > 0 && moveItem(index, index - 1, listIndex)}>
//                     Move Up
//                 </button>
//                 <button
//                     onClick={() =>
//                         index < list.items.length - 1 && moveItem(index, index + 1, listIndex)
//                     }
//                 >
//                     Move Down
//                 </button>
//             </div>
//         </ListItem>
//     );
// }

// export default HabitItem;
