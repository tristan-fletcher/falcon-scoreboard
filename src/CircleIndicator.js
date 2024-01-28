import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './CircleIndicator.css';

const CircleIndicator = forwardRef((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    advanceIndex() {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }
  }));

  const handleClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  return (
    <div className="circle-indicator" onClick={handleClick}>
      <div className={`circle ${activeIndex >= 0 ? 'solid' : 'hollow'}`}></div>
      <div className={`circle ${activeIndex >= 1 ? 'solid' : 'hollow'}`}></div>
      <div className={`circle ${activeIndex >= 2 ? 'solid' : 'hollow'}`}></div>
    </div>
  );
});

export default CircleIndicator;