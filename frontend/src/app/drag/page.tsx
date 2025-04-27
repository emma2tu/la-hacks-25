// "use client";
// import React, { useRef, useEffect } from "react";

// // Helper function to make an element draggable
// const dragElement = (elmnt: HTMLElement) => {
//   let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//   // When mouse button is pressed down
//   const dragMouseDown = (e: MouseEvent) => {
//     e.preventDefault();
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     document.onmousemove = elementDrag;
//   };

//   // Drag the element as mouse moves
//   const elementDrag = (e: MouseEvent) => {
//     e.preventDefault();
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
//     elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
//   };

//   // Stop dragging when mouse is released
//   const closeDragElement = () => {
//     document.onmouseup = null;
//     document.onmousemove = null;
//   };

//   // Add mouse down event listener
//   if (elmnt) {
//     elmnt.onmousedown = dragMouseDown;
//   }
// };

// const DragAndDropPage: React.FC = () => {
//   const draggableRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // When component is mounted, enable dragging for all elements
//   useEffect(() => {
//     draggableRefs.current.forEach((ref) => {
//       if (ref) {
//         dragElement(ref);
//       }
//     });
//   }, []);

//   // Array of draggable components with their unique ids
//   const draggableItems = [
//     { id: "box1", color: "lightblue", text: "Box 1" },
//     { id: "box2", color: "lightgreen", text: "Box 2" },
//     { id: "box3", color: "lightcoral", text: "Box 3" },
//   ];

//   return (
//     <div>
//       <h1>Drag and Drop Page</h1>
//       <p>Drag the boxes around!</p>
//       {draggableItems.map((item, index) => (
//         <div
//           key={item.id}
//           ref={(el) => {
//             draggableRefs.current[index] = el; // Assign ref dynamically
//           }}
//           style={{
//             width: "150px",
//             height: "150px",
//             background: item.color,
//             padding: "20px",
//             borderRadius: "10px",
//             cursor: "move",
//             position: "absolute",
//             top: `${250}px`, // Offset each box vertically for visibility
//             left: `${index * 200 + 200}px`, // Offset each box horizontally for visibility
//           }}
//         >
//           <h3>{item.text}</h3>
//           <p>Drag me around!</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DragAndDropPage;

"use client";
import React, { useRef, useEffect } from "react";
import InfoCard from "@/app/component"; // Adjust the import path as necessary

// Helper function to make an element draggable
const dragElement = (elmnt: HTMLElement) => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  // When mouse button is pressed down
  const dragMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  // Drag the element as mouse moves
  const elementDrag = (e: MouseEvent) => {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  };

  // Stop dragging when mouse is released
  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  // Add mouse down event listener
  if (elmnt) {
    elmnt.onmousedown = dragMouseDown;
  }
};

interface DraggableItemProps {
  id: number;
  color: string;
  children: React.ReactNode; // Content that can be passed dynamically
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, color, children }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (itemRef.current) {
      dragElement(itemRef.current);
    }
  }, []);

  return (
    <div
      ref={itemRef}
      id={String(id)}
      style={{
        width: "150px",
        height: "150px",
        background: color,
        padding: "20px",
        borderRadius: "10px",
        cursor: "move",
        position: "absolute",
        top: `${-50 + (id * 100)}px`,   // Formula for top
        left: `${50 + (id * 150)}px`,  // Formula for left
      }}
    >
      {children}
    </div>
  );
};

const DragAndDropPage: React.FC = () => {
  const draggableItems = [
    { id: 1, color: "transparent", content: <div className="m-4  rounded-lg w-80 h-64">
        <InfoCard
            title="Research on AI"
            images={[
                'https://clevertap.com/wp-content/uploads/2019/04/Neural_Network_Brain_Mimic.jpeg',
      
            ]}
            findings="Our research suggests that AI could improve automation in many industries."
            readMore="https://example.com/research"
    
        />
    </div> },
    { id: 2, color: "transparent", content: <div className="m-4  rounded-lg w-80 h-64">
        <InfoCard
            title="Research on AI"
            images={[
                'https://miro.medium.com/v2/resize:fit:1024/0*lyVC9DDkDSbWyC71.jpg',
          
            ]}
            findings="Our research suggests that AI could improve automation in many industries."
            readMore="https://example.com/research"
    
        />
    </div> },
    { id: 3, color: "transparent", content: <div className="m-4  rounded-lg w-80 h-64">
        <InfoCard
            title="Research on AI"
            images={[
                'https://www.aamc.org/sites/default/files/medical-research-lab.jpg',
            ]}
            findings="Our research suggests that AI could improve automation in many industries."
            readMore="https://example.com/research"
    
        />
    </div> },
  ];

  return (
    <div>
      <h1>Drag and Drop Page</h1>
      <p>Drag the boxes around!</p>
      {draggableItems.map((item) => (
        <DraggableItem key={item.id} id={item.id} color={item.color}>
          <h3>{item.content}</h3>
        </DraggableItem>
      ))}
    </div>
  );
};

export default DragAndDropPage;

