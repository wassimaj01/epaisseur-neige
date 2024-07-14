import React from 'react';
import './Legend.css'; // Import the CSS file for styling

const Legend = () => {
  return (
    <div className="legend">
      <h4>Snow Depth (cm)</h4>
      <div className="legend-section">
        {[
          { range: '0 - 4', color: '#0c2c84' },
          { range: '4 - 8', color: '#225ea8' },
          { range: '8 - 12', color: '#1d91c0' },
          { range: '12 - 14', color: '#41b6c4' },
          { range: '14+', color: '#7fcdbb' }
        ].map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></div>
            <span>{item.range}</span>
          </div>
        ))}
      </div>

      <h4>Elevation (m) - dem3857_2</h4>
      <div className="legend-section">
        {[
          { range: '-7 - -2.5', color: '#000000' },
          { range: '-2.5 - 2', color: '#555555' },
          { range: '2 - 6', color: '#AAAAAA' },
          { range: '6 - 10', color: '#FFFFFF', borderColor: '#000000' }, // Add black border to white color
        ].map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: item.color, borderColor: item.borderColor || 'transparent' }}
            ></div>
            <span>{item.range}</span>
          </div>
        ))}
      </div>

      <h4>Elevation (m) - dem3857</h4>
      <div className="legend-section">
        {[
          { range: '-20 - -5', color: '#000000' },
          { range: '-5 - 10', color: '#555555' },
          { range: '10 - 25', color: '#AAAAAA' },
          { range: '25 - 40', color: '#FFFFFF', borderColor: '#000000' }, // Add black border to white color
        ].map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: item.color, borderColor: item.borderColor || 'transparent' }}
            ></div>
            <span>{item.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
