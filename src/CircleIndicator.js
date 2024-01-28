import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './CircleIndicator.css';

const CircleIndicator = forwardRef(
  ({ count = 3, firstCircleHollow = false, size = 'medium' }, ref) => {
    // Set initial index to -1 if the first circle should start as hollow
    const initialIndex = firstCircleHollow ? -1 : 0;
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    useImperativeHandle(ref, () => ({
      advanceIndex() {
        setActiveIndex((prevIndex) => {
          // When cycling, if the first circle is hollow, it should remain so
          if (firstCircleHollow && prevIndex + 1 === count) {
            return -1;
          } else {
            return (prevIndex + 1) % count;
          }
        });
      }
    }));

    const handleClick = () => {
      setActiveIndex((prevIndex) => {
        // Same logic for handleClick as advanceIndex
        if (firstCircleHollow && prevIndex + 1 === count) {
          return -1;
        } else {
          return (prevIndex + 1) % count;
        }
      });
    };

    const circles = [];
    for (let i = 0; i < count; i++) {
      circles.push(
        <div
          key={i}
          className={`circle ${size} ${i <= activeIndex ? 'solid' : 'hollow'}`}
        ></div>
      );
    }

    return (
      <div className="circle-indicator" onClick={handleClick}>
        {circles}
      </div>
    );
  }
);

export default CircleIndicator;