import { useState, useEffect } from 'react';

export const useActiveBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({
    '2xl': false,
    xl: false,
    lg: false,
    md: false,
    sm: false,
    xs: false,
  });

  // Function to check and update breakpoints
  const updateBreakpoints = () => {
    const twoXl = window.matchMedia('(min-width: 1536px)').matches;
    const xl = window.matchMedia('(min-width: 1280px)').matches;
    const lg = window.matchMedia('(min-width: 1024px)').matches;
    const md = window.matchMedia('(min-width: 768px)').matches;
    const sm = window.matchMedia('(min-width: 640px)').matches;
    const xs = window.matchMedia('(min-width: 480px)').matches;

    setBreakpoints({
      '2xl': twoXl,
      xl,
      lg,
      md,
      sm,
      xs,
    });
  };

  useEffect(() => {
    // Initial check when component mounts
    updateBreakpoints();

    // Add event listener for window resize
    window.addEventListener('resize', updateBreakpoints);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateBreakpoints);
    };
  }, []); // Empty dependency array to run only on mount and unmount

  return breakpoints;
};
