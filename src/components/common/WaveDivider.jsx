import React from 'react';

const WaveDivider = ({ fillColor, statsBg, style = {} }) => {
  return (
    <div style={{
      lineHeight: 0,
      width: '100%',
      backgroundColor: 'transparent',
      marginTop: '-5px',
      position: 'relative',
      zIndex: 5,
      overflow: 'hidden',
      ...style
    }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '102px',
          display: 'block',
          transform: 'scale(1.01)',
          shapeRendering: 'geometricPrecision'
        }}
      >
        <path
          d="M0,60 C240,100 480,100 720,60 C960,20 1200,20 1440,60 L1440,120 L0,120 Z"
          fill={fillColor || "#74c655"}
        />
        {statsBg && (
          <path
            d="M0,80 C360,120 720,40 1080,80 C1260,100 1440,90 1440,90 L1440,120 L0,120 Z"
            fill={statsBg}
          />
        )}
      </svg>
    </div>
  );
};

export default WaveDivider;
