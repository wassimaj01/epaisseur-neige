import React from 'react';
import './Legend.css'; 

const Legend = () => {
  return (
    <div className="legend">
      <h4>Epaisseur de neige (metres)</h4>
      <div className="legend-section">
        {[
          { range: '0', color: '#FF0000' },
          { range: '1', color: '#FF7F00' },
          { range: '2', color: '#FFFF00' },
          { range: '3', color: '#00FF00' },
          { range: '4', color: '#00FFFF' },
          { range: '5', color: '#0000FF' },
          { range: '6', color: '#8B00FF' }
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

      <h4>Elevation - dem3857_2</h4>
      <div className="legend-section">
        {[
          { range: '-7 - -2.5', color: '#000000' },
          { range: '-2.5 - 2', color: '#555555' },
          { range: '2 - 6', color: '#AAAAAA' },
          { range: '6 - 10', color: '#FFFFFF', borderColor: '#000000' }, 
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

      <h4>Elevation - dem3857</h4>
      <div className="legend-section">
        {[
          { range: '-20 - -5', color: '#000000' },
          { range: '-5 - 10', color: '#555555' },
          { range: '10 - 25', color: '#AAAAAA' },
          { range: '25 - 40', color: '#FFFFFF', borderColor: '#000000' }, 
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