import React, { useEffect, useRef, useState } from "react";

const MapComponent = ({ onSelectOrigin, onSelectDestination }) => {
  const mapRef = useRef(null); // Referencia para el div que contendrá el mapa
  const [map, setMap] = useState(null);
  const [markerOrigin, setMarkerOrigin] = useState(null);
  const [markerDestination, setMarkerDestination] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 10.446359, lng: -84.570827 }, // Centrar el mapa en coordenadas iniciales
        zoom: 10, // Nivel de zoom inicial
        mapId: "FIGA_MAP_ID",
      });

      // Cuando el usuario haga clic en el mapa
      map.addListener("click", (event) => {
        const { lat, lng } = event.latLng.toJSON();

        if (!markerOrigin) {
          if (markerDestination) {
            markerDestination.setMap(null); // Limpiar destino si existe
          }
          const originMarker =
            new window.google.maps.marker.AdvancedMarkerElement({
              position: { lat, lng },
              map,
              title: "Origen",
            });
          setMarkerOrigin(originMarker);
          onSelectOrigin([lng, lat]); // Pasar las coordenadas al padre (formulario)
        } else if (!markerDestination) {
          const destinationMarker =
            new window.google.maps.marker.AdvancedMarkerElement({
              position: { lat, lng },
              map,
              title: "Destino",
            });
          setMarkerDestination(destinationMarker);
          onSelectDestination([lng, lat]); // Pasar las coordenadas al padre
        }
      });

      setMap(map);
    };

    if (window.google) {
      initMap();
    } else {
      window.onload = initMap; // Asegurarse de que la API de Google Maps esté cargada
    }

    return () => {
      if (markerOrigin) markerOrigin.setMap(null);
      if (markerDestination) markerDestination.setMap(null);
    };
  }, [onSelectOrigin, onSelectDestination]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export default MapComponent;
