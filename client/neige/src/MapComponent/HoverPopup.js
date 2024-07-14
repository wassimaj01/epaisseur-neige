import React from 'react';
import { Popup } from 'react-map-gl';

const HoverPopup = ({ hoverInfo }) => {
  if (!hoverInfo) return null;

  return (
    <Popup
      longitude={hoverInfo.longitude}
      latitude={hoverInfo.latitude}
      closeOnClick={false}
      closeButton={false}
      offsetTop={-10}
      anchor="bottom"
    >
      <div style={{
        padding: '10px',
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        fontSize: '12px',
        lineHeight: '1.5'
      }}>
        <strong>Snow Depth:</strong> {hoverInfo.snow_depth.toFixed(2)} cm<br />
        <strong>Coordinates:</strong> {hoverInfo.longitude.toFixed(4)}, {hoverInfo.latitude.toFixed(4)}
      </div>
    </Popup>
  );
};

export default HoverPopup;
