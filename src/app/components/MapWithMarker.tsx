import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngExpression } from 'leaflet';

function MapCenterUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  
  return null;
}

interface MapWithMarkerProps {
  lat?: number | string;
  lng?: number | string;
  zoom?: number;
  contactName?: string;
  contactDetails?: {
    address?: string;
    cep?: string;
    [key: string]: any;
  };
  height?: string;
  width?: string;
}

export const MapWithMarker: React.FC<MapWithMarkerProps> = ({ 
  lat, 
  lng, 
  zoom = 13,
  contactName = 'Location',
  contactDetails = {},
  height = '100%',
  width = '100%'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }
  }, []);

  const parseCoordinate = (coord: number | string | undefined): number | undefined => {
    if (coord === undefined || coord === null) return undefined;
    
    if (typeof coord === 'string') {
      const parsed = parseFloat(coord);
      return isNaN(parsed) ? undefined : parsed;
    }
    
    if (typeof coord === 'number' && !isNaN(coord) && isFinite(coord)) {
      return coord;
    }
    
    return undefined;
  };

  const parsedLat = parseCoordinate(lat);
  const parsedLng = parseCoordinate(lng);

  if (!isMounted) {
    return (
      <div style={{ 
        height, 
        width,
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '8px'
      }}>
        <p>Loading Map...</p>
      </div>
    );
  }

  if (parsedLat === undefined || parsedLng === undefined) {
    return (
      <div style={{ 
        height, 
        width,
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '8px'
      }}>
        <p>Select a contact to see the location</p>
      </div>
    );
  }

  const position: LatLngExpression = [parsedLat, parsedLng];

  return (
    <MapContainer 
      center={position} 
      zoom={zoom} 
      style={{ height, width, borderRadius: '8px' }}
      scrollWheelZoom={true}
      className="leaflet-container"
      attributionControl={true}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={position}>
        <Popup>
          <div style={{ maxWidth: '200px', padding: '8px' }}>
            <strong style={{ fontSize: '16px', marginBottom: '8px', display: 'block' }}>
              {contactName}
            </strong>
            {contactDetails.address && (
              <div style={{ marginBottom: '4px' }}>
                {contactDetails.address}
              </div>
            )}
            {contactDetails.cep && (
              <div style={{ marginBottom: '4px' }}>
                CEP: {contactDetails.cep}
              </div>
            )}
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              Lat: {parsedLat.toFixed(6)} | Lng: {parsedLng.toFixed(6)}
            </div>
          </div>
        </Popup>
      </Marker>
      
      <MapCenterUpdater lat={parsedLat} lng={parsedLng} />
    </MapContainer>
  );
};

export default MapWithMarker;