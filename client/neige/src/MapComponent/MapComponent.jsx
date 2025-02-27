import React, { useState, useEffect, useCallback, useRef } from 'react';
import Map, { NavigationControl, ScaleControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import BasemapControl from './BasemapControl'; // Importer le contrôle des couches de base
import LayerSwitcher from './LayerSwitcher'; // Importer le composant LayerSwitcher
import Legend from './Legend'; // Importer le composant Legend
import HoverPopup from './HoverPopup'; // Importer le composant HoverPopup
import MapLayers from './MapLayers'; // Importer le composant MapLayers

const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3Vhc3NpbTAyIiwiYSI6ImNseWZta2U1YjAxNzUyanNkeDFtdXFrYmgifQ.pL2eB5mHJxjXeg4SZZrRtA'; // Remplacer par votre jeton d'accès valide

const MapComponent = () => {
  const mapRef = useRef();

  // Définir l'état initial de la carte
  const [viewport, setViewport] = useState({
    latitude: 44.92,
    longitude: 6.56,
    zoom: 12,
  });

  // Définir l'état pour les informations de survol
  const [hoverInfo, setHoverInfo] = useState(null);

  // Définir l'état pour la visibilité des couches
  const [layerVisibility, setLayerVisibility] = useState({
    neige4326: true,
    neige4326_2: true,
    dem3857: true,
    dem3857_2: true
  });

  // Définir l'état pour les valeurs minimales et maximales de profondeur de neige
  const [minSnowDepth, setMinSnowDepth] = useState(0);
  const [maxSnowDepth, setMaxSnowDepth] = useState(6);

  // useEffect() pour ajuster les limites de la carte en fonction des données raster
  useEffect(() => {
    const fetchRasterBounds = async () => {
      try {
        const response = await fetch('http://localhost:8080/data/dem3857_2.json'); // Supposons que les limites raster soient disponibles à ce point de terminaison
        const json = await response.json();
        if (mapRef.current) {
          mapRef.current.fitBounds(json.bounds, {
            padding: 20
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des limites raster:', error);
      }
    };

    fetchRasterBounds();
  }, []);

  // Définir l'échelle de couleur pour la profondeur de neige
  const snowColorScale = [
    'interpolate',
    ['linear'],
    ['get', 'snow_depth'],
    0, '#FF0000',  // Rouge
    1, '#FF7F00',  // Orange
    2, '#FFFF00',  // Jaune
    3, '#00FF00',  // Vert
    4, '#0000FF',  // Blue
    5, '#4B0082',  // Blue ciel
    6, '#9400D3'   // Violet 
  ];


  // Gestionnaire de la fonctionnalité Hover
  const onHover = useCallback((event) => {
    if (!event.point) return; // Quitter si event.point n'est pas disponible

    const features = event.features; // Les fonctionnalités sont désormais directement disponibles dans event

    if (features && features.length > 0) {
      const feature = features[0];
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        snow_depth: feature.properties.snow_depth
      });
    } else {
      setHoverInfo(null);
    }
  }, []);

  // Fonction pour basculer la visibilité des couches
  const toggleLayerVisibility = (layerId) => {
    setLayerVisibility(prevState => ({
      ...prevState,
      [layerId]: !prevState[layerId],
    }));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Composant LayerSwitcher pour basculer les couches */}
      <LayerSwitcher
        layerVisibility={layerVisibility}
        toggleLayerVisibility={toggleLayerVisibility}
        minSnowDepth={minSnowDepth}
        setMinSnowDepth={setMinSnowDepth}
        maxSnowDepth={maxSnowDepth}
        setMaxSnowDepth={setMaxSnowDepth}
      />
      {/* Composant Map de react-map-gl */}
      <Map
        ref={mapRef}
        {...viewport}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMouseMove={onHover}
        onMouseLeave={() => setHoverInfo(null)}
        onMove={evt => setViewport(evt.viewState)}
        interactiveLayerIds={['neige4326-layer', 'neige4326_2-layer']}
      >
        {/* Ajout des contrôleurs de carte */}
        <BasemapControl map={mapRef.current?.getMap()} />
        <ScaleControl position="bottom-right" />
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <GeolocateControl position="top-right" />

        {/* Composant MapLayers pour afficher les couches de la carte */}
        <MapLayers
          layerVisibility={layerVisibility}
          snowColorScale={snowColorScale}
          minSnowDepth={minSnowDepth}
          maxSnowDepth={maxSnowDepth}
        />

        {/* Composant HoverPopup pour afficher les informations quand on Hover */}
        <HoverPopup hoverInfo={hoverInfo} />
        {/* Composant Legend pour afficher la légende */}
        <Legend />
      </Map>
    </div>
  );
};

export default MapComponent;