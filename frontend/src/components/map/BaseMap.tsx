import React, { useEffect, type ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MAP_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface BaseMapProps {
  center?: [number, number];
  zoom?: number;
  children?: ReactNode;
}

export const BaseMap: React.FC<BaseMapProps> = ({
  center = [13.1391, 123.7438],
  zoom = 14,
  children,
}) => {
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_TILE_URL} />
        {children}
      </MapContainer>
    </div>
  );
};

export default BaseMap;
