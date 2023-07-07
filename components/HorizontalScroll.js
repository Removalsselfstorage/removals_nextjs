import React, { useEffect, useRef } from 'react';
// import './HorizontalScroll.css'; // Import CSS file for styling

const HorizontalScroll = ({ children, speed }) => {
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
      container.scrollLeft += 3; // Increment scroll position
    }, speed);

    container.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex  w-full justify-center items-center overflow-x-hidden overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-default " ref={containerRef}>
      {children}
    </div>
  );
};

export default HorizontalScroll;
