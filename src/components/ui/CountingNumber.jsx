import React, { useState, useEffect, useRef } from 'react';

const CountingNumber = ({ endValue, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  const targetLastTwo = endValue % 100;
  const staticPart = Math.floor(endValue / 100) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setIsVisible(true);
      else { setIsVisible(false); setCount(0); }
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = targetLastTwo / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetLastTwo) { setCount(targetLastTwo); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, targetLastTwo, duration]);

  return <span ref={domRef}>{(staticPart + count).toLocaleString()}</span>;
};

export default CountingNumber;
