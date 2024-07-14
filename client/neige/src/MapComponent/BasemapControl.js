import React, { useEffect, useRef } from 'react';

const BasemapControl = ({ map }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && map) {
      const controlContainer = containerRef.current;
      map.getContainer().appendChild(controlContainer);

      controlContainer.addEventListener('click', (e) => {
        if (e.target.dataset.style) {
          map.setStyle(e.target.dataset.style);
        }
      });
    }

    return () => {
      if (containerRef.current && map) {
        const controlContainer = containerRef.current;
        map.getContainer().removeChild(controlContainer);
      }
    };
  }, [map]);

  return (
    <div ref={containerRef} style={controlStyle}>
      <button data-style="mapbox://styles/mapbox/streets-v11" style={buttonStyle}>Standard</button>
      <button data-style="mapbox://styles/mapbox/satellite-v9" style={buttonStyle}>Satellite</button>
    </div>
  );
};

const controlStyle = {
  position: 'absolute',
  top: '10px',
  right: '60px',
  background: '#fff',
  padding: '5px',
  borderRadius: '3px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
  zIndex: 1,
};

const buttonStyle = {
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  background: '#fff',
  outline: 'none',
};

export default BasemapControl;
