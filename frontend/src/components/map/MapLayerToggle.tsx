import React, { useState, useRef, useEffect } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import type { MapLayerVisibility } from '../../types/drrm';

interface MapLayerToggleProps {
  layers: MapLayerVisibility;
  onToggleLayer: (layer: keyof MapLayerVisibility) => void;
}

export const MapLayerToggle: React.FC<MapLayerToggleProps> = ({
  layers,
  onToggleLayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const layerOptions: { key: keyof MapLayerVisibility; label: string; dotClass: string }[] = [
    { key: 'evacuationCenters', label: 'Evacuation Centers', dotClass: 'bg-emerald-500' },
    { key: 'evacuationRoutes', label: 'Evacuation Routes', dotClass: 'bg-blue-500' },
    { key: 'hazardZones', label: 'Hazard Zones', dotClass: 'bg-rose-500' },
  ];

  return (
    <div ref={containerRef} className="absolute top-4 right-4 z-[1000] select-none">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white text-slate-800 text-xs font-medium shadow-xs border border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
        aria-expanded={isOpen}
      >
        <Layers className="w-4 h-4 text-slate-500" />
        <span>Map layers</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-xs border border-slate-200 p-2.5 text-xs text-slate-700">
          <div className="px-2 py-1 text-xs font-semibold text-slate-500">
            Display overlays
          </div>
          <div className="space-y-1.5 mt-1">
            {layerOptions.map(({ key, label, dotClass }) => (
              <label
                key={key}
                className="flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dotClass}`} />
                  <span className="font-medium text-slate-700">{label}</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers[key]}
                  onChange={() => onToggleLayer(key)}
                  className="w-4 h-4 text-slate-900 accent-slate-900 rounded border-slate-300 focus:ring-slate-500 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapLayerToggle;
