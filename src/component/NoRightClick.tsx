'use client'
import React, { useEffect } from 'react';

const NoRightClick: React.FC = () => {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    // Attach the event listener when the component mounts
    document.addEventListener('contextmenu', handleContextMenu);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return <></>; // Empty fragment as the component doesn't render anything
};

export default NoRightClick;
