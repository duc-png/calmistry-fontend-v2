import React, { useState, useEffect, useRef } from 'react';

const FadeInUp = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setIsVisible(entries[0].isIntersecting);
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={domRef} className={`fade-up-element ${isVisible ? 'is-visible' : ''}`}>{children}</div>;
};

export default FadeInUp;
