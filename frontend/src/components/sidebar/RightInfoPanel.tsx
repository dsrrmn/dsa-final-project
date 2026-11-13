import React from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { WeatherCard } from './WeatherCard';
import { HotlineDirectory } from './HotlineDirectory';
import type { WeatherAdvisory, EmergencyHotline } from '../../types/drrm';

interface RightInfoPanelProps {
  weather: WeatherAdvisory;
  hotlines: EmergencyHotline[];
  isOpen: boolean;
  onToggle: () => void;
}

export const RightInfoPanel: React.FC<RightInfoPanelProps> = ({
  weather,
  hotlines,
  isOpen,
  onToggle,
}) => {
  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute top-4 right-36 z-[1000] flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-slate-700 text-xs font-medium shadow-xs border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          title="Open information panel"
          aria-label="Open information panel"
        >
          <PanelRightOpen className="w-4 h-4 text-slate-500" />
          <span>Info</span>
        </button>
      )}

      <aside
        className={`h-full flex flex-col shrink-0 bg-slate-50 ${
          isOpen
            ? 'w-full md:w-96 border-l border-slate-200'
            : 'w-0 overflow-hidden border-0'
        }`}
      >
        {isOpen && (
          <div className="flex flex-col h-full w-full md:w-96">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white shrink-0">
              <span className="text-xs font-semibold text-slate-800">
                Situational overview
              </span>
              <button
                type="button"
                onClick={onToggle}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Collapse panel"
                aria-label="Collapse panel"
              >
                <PanelRightClose className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <WeatherCard weather={weather} />
              <HotlineDirectory hotlines={hotlines} />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default RightInfoPanel;
