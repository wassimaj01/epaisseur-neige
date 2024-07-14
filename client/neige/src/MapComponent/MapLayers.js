import React from 'react';
import { Source, Layer } from 'react-map-gl';

const MapLayers = ({ layerVisibility, snowColorScale, snowSizeScale, minSnowDepth, maxSnowDepth }) => {
  const neige4326Layer = {
    id: 'neige4326-layer',
    type: 'circle',
    source: 'neige4326',
    'source-layer': 'neige4326',
    layout: {
      visibility: layerVisibility.neige4326 ? 'visible' : 'none',
    },
    paint: {
      'circle-color': snowColorScale,
      'circle-radius': snowSizeScale,
      'circle-opacity': 1,
    },
    filter: ['all', ['>=', ['get', 'snow_depth'], minSnowDepth], ['<=', ['get', 'snow_depth'], maxSnowDepth]]
  };

  const neige4326_2Layer = {
    id: 'neige4326_2-layer',
    type: 'circle',
    source: 'neige4326_2',
    'source-layer': 'neige4326_2',
    layout: {
      visibility: layerVisibility.neige4326_2 ? 'visible' : 'none',
    },
    paint: {
      'circle-color': snowColorScale,
      'circle-radius': snowSizeScale,
      'circle-opacity': 1,
    },
    filter: ['all', ['>=', ['get', 'snow_depth'], minSnowDepth], ['<=', ['get', 'snow_depth'], maxSnowDepth]]
  };

  const dem3857Layer = {
    id: 'dem3857-layer',
    type: 'raster',
    source: 'dem3857',
    layout: {
      visibility: layerVisibility.dem3857 ? 'visible' : 'none',
    },
    paint: {
      'raster-opacity': 0.8,
    },
  };

  const dem3857_2Layer = {
    id: 'dem3857_2-layer',
    type: 'raster',
    source: 'dem3857_2',
    layout: {
      visibility: layerVisibility.dem3857_2 ? 'visible' : 'none',
    },
    paint: {
      'raster-opacity': 0.8,
    },
  };

  return (
    <>
      <Source id="neige4326" type="vector" url="http://localhost:8080/data/neige4326.json">
        <Layer {...neige4326Layer} />
      </Source>
      <Source id="neige4326_2" type="vector" url="http://localhost:8080/data/neige4326_2.json">
        <Layer {...neige4326_2Layer} />
      </Source>
      <Source id="dem3857" type="raster" tiles={['http://localhost:8080/data/dem3857/{z}/{x}/{y}.png']} tileSize={256} minzoom={0} maxzoom={22}>
        <Layer {...dem3857Layer} />
      </Source>
      <Source id="dem3857_2" type="raster" tiles={['http://localhost:8080/data/dem3857_2/{z}/{x}/{y}.png']} tileSize={256} minzoom={0} maxzoom={22}>
        <Layer {...dem3857_2Layer} />
      </Source>
    </>
  );
};

export default MapLayers;
