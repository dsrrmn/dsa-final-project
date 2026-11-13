import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIB = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface HazardMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export const HazardMap: React.FC<HazardMapProps> = ({
  center = [13.1391, 123.7438],
  zoom = 13,
  className = '',
}) => {
  return (
    <div className={`w-full h-full min-h-[500px] relative overflow-hidden rounded border border-[var(--color-rule)] ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer attribution={TILE_ATTRIB} url={TILE_URL} />
        <Marker position={center}>
          <Popup>
            <div className="p-1 space-y-1 text-xs font-[var(--font-body)]">
              <h4 className="font-semibold text-[var(--color-ink)]">
                Barangay DRRM Command Post
              </h4>
              <p className="text-[var(--color-muted)]">
                Primary emergency operations and hazard coordination center.
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HazardMap;
