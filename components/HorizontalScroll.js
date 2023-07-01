import React, { useEffect, useRef } from 'react';
// import './HorizontalScroll.css'; // Import CSS file for styling

const HorizontalScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0; // Reset scroll position to the beginning
      }
    };

    const scrollInterval = setInterval(() => {
      container.scrollLeft += 2; // Increment scroll position
    }, 40);

    container.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex overflow-x-hidden w-full" ref={containerRef}>
      {children}
    </div>
  );
};

export default HorizontalScroll;
