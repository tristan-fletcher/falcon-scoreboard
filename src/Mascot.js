import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Mascot.css'; // make sure to create this CSS file

const Mascot = ({ position }) => {
  const [currentMascotIndex, setCurrentMascotIndex] = useState(0);

  const mascots = [
    '/mascots/falcon-1.jpeg',
    '/mascots/knights-1.png',
    '/mascots/falcon-2.png',
  ];
  
  // Function to handle the mascot click, cycling through the mascots array
  const handleMascotClick = () => {
    setCurrentMascotIndex((prevIndex) => (prevIndex + 1) % mascots.length);
  };

  // Return the mascot image with dynamic className based on the 'position' prop
  return (
    <img
      src={mascots[currentMascotIndex]}
      alt="Mascot"
      className={`mascot ${position}`}
      onClick={handleMascotClick}
    />
  );
};

// PropTypes to enforce prop types
Mascot.propTypes = {
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  mascots: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Mascot;