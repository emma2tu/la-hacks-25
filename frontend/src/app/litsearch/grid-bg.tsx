import React from 'react';

const DotGridBackground = () => {
  const backgroundStyle = {
    backgroundColor: 'lightgrey', // Light grey background
    backgroundImage: `
      radial-gradient(circle, darkgrey 5px, transparent 5px) 0 0,
      radial-gradient(circle, darkgrey 5px, transparent 5px) 20px 20px
    `,
    backgroundSize: '40px 40px', // Control dot size and spacing
    backgroundRepeat: 'repeat', // Repeat the pattern across the screen
    height: '1000px', // Full height of the viewport
    margin: 0,
  };

  return <div style={backgroundStyle}></div>;
};

export default DotGridBackground;
