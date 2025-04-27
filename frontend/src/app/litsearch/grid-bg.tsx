import React from 'react';
import DragComponents from '../drag/page';

const DotGridBackground = () => {
  const backgroundStyle = {
    backgroundColor: 'lightgrey', // Light grey background
    backgroundImage: `
      radial-gradient(circle, darkgrey 5px, transparent 5px) 0 0,
      radial-gradient(circle, darkgrey 5px, transparent 5px) 20px 20px
    `,
    backgroundSize: '40px 40px', // Control dot size and spacing
    backgroundRepeat: 'repeat', // Repeat the pattern across the screen
    height: '120px', // Full height of the viewport
    margin: 0,
  };

  return <div style={backgroundStyle}>
    <div className="absolute inset-0 h-full w-full bg-[#F5F5F5] bg-[radial-gradient(#A9A9A9,transparent_1px)] [background-size:16px_16px]"></div>
    <DragComponents />
  </div>;
};

export default DotGridBackground;



