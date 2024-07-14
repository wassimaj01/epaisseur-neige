import React from 'react';
import './LayerSwitcher.css'; // Import the CSS file for styling

const LayerSwitcher = ({ layerVisibility, toggleLayerVisibility, minSnowDepth, setMinSnowDepth, maxSnowDepth, setMaxSnowDepth }) => {
  return (
    <div className="layer-switcher">
      <h4>Layer Control</h4>
      <div>
        <label>Min Snow Depth: {minSnowDepth} cm</label>
        <input
          type="range"
          min="0"
          max="14"
          value={minSnowDepth}
          onChange={(e) => setMinSnowDepth(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Max Snow Depth: {maxSnowDepth} cm</label>
        <input
          type="range"
          min="0"
          max="14"
          value={maxSnowDepth}
          onChange={(e) => setMaxSnowDepth(Number(e.target.value))}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={layerVisibility.neige4326}
            onChange={() => toggleLayerVisibility('neige4326')}
          />
          neige4326
        </label>
        <label>
          <input
            type="checkbox"
            checked={layerVisibility.neige4326_2}
            onChange={() => toggleLayerVisibility('neige4326_2')}
          />
          neige4326_2
        </label>
        <label>
          <input
            type="checkbox"
            checked={layerVisibility.dem3857}
            onChange={() => toggleLayerVisibility('dem3857')}
          />
          dem3857
        </label>
        <label>
          <input
            type="checkbox"
            checked={layerVisibility.dem3857_2}
            onChange={() => toggleLayerVisibility('dem3857_2')}
          />
          dem3857_2
        </label>
      </div>
    </div>
  );
};

export default LayerSwitcher;
