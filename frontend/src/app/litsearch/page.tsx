import Navbar from './navbar';
import DotGridBackground from './grid-bg';
import ChatWindow from './chat-window'
import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';
import DragComponents from '../drag/page';


// import {Draggable} from './Draggable';
// import {Droppable} from './Droppable';

export default function LitSearch() {
    return (
        <div className="bg-white">
            
            <div className="absolute inset-0 h-full w-full bg-[#F5F5F5] bg-[radial-gradient(#A9A9A9,transparent_1px)] [background-size:16px_16px]"></div>
            <Navbar/>
            <ChatWindow/>
            <DragComponents />
        </div>
    );
}

// "use client";

// import Navbar from './navbar';
// import ChatWindow from './chat-window';
// import React, { useState } from 'react';
// import { DndContext, useDraggable, useDroppable, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';

// const DraggableItem = ({ text }: { text: string }) => {
    
//   const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
//     id: text,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       style={{
//         padding: '10px',
//         backgroundColor: isDragging ? 'lightgray' : 'white',
//         border: '1px solid black',
//         margin: '5px',
//         cursor: 'move',
//       }}
//     >
//       {text}
//     </div>
//   );
// };

// const Whiteboard = ({ components }: { components: UniqueIdentifier[] }) => {
//   const { setNodeRef } = useDroppable({
//     id: 'whiteboard',
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         width: '100%',
//         height: '500px',
//         border: '2px dashed gray',
//         position: 'relative',
//         backgroundColor: 'green',
//       }}
//     >
//       {components.map((component, index) => (
//         <div
//           key={index}
//           style={{
//             position: 'absolute',
//             top: `${Math.random() * 80}%`,
//             left: `${Math.random() * 80}%`,
//             padding: '10px',
//             backgroundColor: 'lightblue',
//             border: '1px solid blue',
//           }}
//         >
//           {component}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Sidebar = () => {
//   return (
//     <div
//       style={{
//         width: '200px',
//         height: '100%',
//         backgroundColor: '#f0f0f0',
//         padding: '10px',
//         overflowY: 'scroll',
//         position: 'absolute',
//         top: '0',
//         left: '0',
//       }}
//     >
//       <h3>Sidebar</h3>
//       <DraggableItem text="Component 1" />
//       <DraggableItem text="Component 2" />
//       <DraggableItem text="Component 3" />
//     </div>
//   );
// };

// export default function LitSearch() {
//     // Update state type to UniqueIdentifier[] instead of string[]
//     const [components, setComponents] = useState<UniqueIdentifier[]>([]);
  
//     return (
//       <div className="bg-white">
//         <Navbar />
//         <ChatWindow />
        
//         <DndContext
//         //   onDragEnd={({ active, over }: DragEndEvent) => {
//         //     // When dragging ends, add the item to the whiteboard if dropped there
//         //     if (over && over.id === 'whiteboard') {
//         //       setComponents((prev) => [...prev, active.id]); // Add the dragged component to the whiteboard
//         //     }
//         //   }}
//         >
//                 <DraggableItem text="Componented 1" />

//           <div style={{ display: 'flex', height: '100vh', width: "50vw" }}>
//             {/* Sidebar */}
//             <Sidebar />
            
//             {/* Whiteboard */}
//             <Whiteboard components={components} />
//           </div>
//         </DndContext>
//       </div>
//     );
//   }
  