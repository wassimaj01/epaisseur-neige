import React, { useEffect, useRef } from 'react';

const BasemapControl = ({ map }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && map) {
      const controlContainer = containerRef.current;
      map.getContainer().appendChild(controlContainer);

      const handleClick = (e) => {
        if (e.target.dataset.style) {
          const style = e.target.dataset.style;
          map.setStyle(style);

          if (style === 'mapbox://styles/mapbox/satellite-streets-v12') {
            map.on('style.load', () => {
              map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14,
              });
              map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
            });
          }
        }
      };

      controlContainer.addEventListener('click', handleClick);

      return () => {
        controlContainer.removeEventListener('click', handleClick);
        map.getContainer().removeChild(controlContainer);
      };
    }
  }, [map]);

  return (
    <div ref={containerRef} style={controlStyle}>
      <button data-style="mapbox://styles/mapbox/streets-v11" style={buttonStyle}>Standard</button>
      <button data-style="mapbox://styles/mapbox/satellite-v9" style={buttonStyle}>Satellite</button>
      <button data-style="mapbox://styles/mapbox/satellite-streets-v12" style={buttonStyle}>3D Terrain</button>
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
