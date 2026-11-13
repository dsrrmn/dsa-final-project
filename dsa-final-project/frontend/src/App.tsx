import React, { useState } from 'react';
import { Users, MapPin, Radio } from 'lucide-react';
import { BaseMap } from './components/map/BaseMap';
import { MapLayerToggle } from './components/map/MapLayerToggle';
import { IncidentReportModal, type IncidentReportPayload } from './components/incidents/IncidentReportModal';
import { WeatherCard } from './components/sidebar/WeatherCard';
import { HotlineDirectory } from './components/sidebar/HotlineDirectory';
import { EvacuationCapacityCard } from './components/telemetry/EvacuationCapacityCard';
import type {
  MapLayerVisibility,
  WeatherAdvisory,
  EmergencyHotline,
  NearestEvacuationCenter,
} from './types/drrm';

const INITIAL_WEATHER: WeatherAdvisory = {
  temperatureC: 28,
  condition: 'Heavy Rainshowers',
  rainfallMm: 18.5,
  windKph: 35,
  alertLevel: 'ADVISORY',
  alertMessage: 'Tropical Depression advisory: localized moderate to heavy rainfall expected over low-lying puroks.',
};

const INITIAL_HOTLINES: EmergencyHotline[] = [
  {
    id: 1,
    groupType: 'GENERAL',
    agencyName: 'Barangay Hall Action Center',
    phoneNumber: '(052) 742-5001',
  },
  {
    id: 2,
    groupType: 'GENERAL',
    agencyName: 'Barangay Tanod Security Desk',
    phoneNumber: '0917-555-0101',
  },
  {
    id: 3,
    groupType: 'GENERAL',
    agencyName: 'Barangay DRRM Response Team',
    phoneNumber: '0920-555-0102',
  },
  {
    id: 4,
    groupType: 'SPECIFIC',
    category: 'FIRE',
    agencyName: 'BFP Fire Sub-Station',
    phoneNumber: '(052) 742-1911',
  },
  {
    id: 5,
    groupType: 'SPECIFIC',
    category: 'CRIME',
    agencyName: 'PNP Municipal Police Station',
    phoneNumber: '117 / 0998-598-6001',
  },
  {
    id: 6,
    groupType: 'SPECIFIC',
    category: 'MEDICAL',
    agencyName: 'Rural Health Unit & Emergency EMS',
    phoneNumber: '(052) 742-2200',
  },
  {
    id: 7,
    groupType: 'SPECIFIC',
    category: 'RESCUE',
    agencyName: 'MDRRMO Search & Rescue Operations',
    phoneNumber: '0919-000-7272',
  },
];

const INITIAL_NEAREST_EVACUATION: NearestEvacuationCenter = {
  id: 1,
  name: 'Legazpi Port Multi-Purpose Hall',
  distanceKm: 0.8,
  etaMinutes: 3,
  estimatedMaxCapacity: 250,
  status: 'OPEN',
};

export const App: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const [layers, setLayers] = useState<MapLayerVisibility>({
    evacuationCenters: true,
    evacuationRoutes: true,
    hazardZones: false,
  });

  const [weather] = useState<WeatherAdvisory>(INITIAL_WEATHER);
  const [hotlines] = useState<EmergencyHotline[]>(INITIAL_HOTLINES);
  const [evacuationCenter] = useState<NearestEvacuationCenter>(INITIAL_NEAREST_EVACUATION);

  const handleToggleLayer = (layerKey: keyof MapLayerVisibility) => {
    setLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  const handleIncidentSubmit = (payload: IncidentReportPayload) => {
    console.info('Incident report logged:', payload);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-[var(--font-body)] flex flex-col">
      {/* ── 1. Header (h-14 bg-white border-b border-slate-200) ── */}
      <header className="shrink-0 h-14 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-semibold">
            tpl
          </div>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight m-0">
              Template
            </h1>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              this is just a template, not the final project
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-600 tabular-nums">
            13.1391° N, 123.7438° E
          </span>
        </div>
      </header>

      {/* ── 2. Main Container (mx-auto max-w-[1440px] p-4 lg:p-6 space-y-4) ── */}
      <main className="mx-auto max-w-[1440px] w-full p-4 lg:p-6 space-y-4 flex-1">
        {/* Row 1 — 3-Column Telemetry Strip (grid grid-cols-1 md:grid-cols-3 gap-4) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Col 1 (Demographics | slot 01) */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-600" />
                  <h2 className="text-xs font-semibold text-slate-700">Demographics</h2>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                  slot 01
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="p-3 rounded-md border border-dashed border-slate-200 bg-slate-50/50 flex flex-col justify-center">
                  <span className="text-[11px] font-medium text-slate-500">Total population</span>
                  <span className="mt-1 font-mono text-xs font-semibold text-slate-400">[data slot]</span>
                </div>
                <div className="p-3 rounded-md border border-dashed border-slate-200 bg-slate-50/50 flex flex-col justify-center">
                  <span className="text-[11px] font-medium text-slate-500">Vulnerable sectors</span>
                  <span className="mt-1 font-mono text-xs font-semibold text-slate-400">[data slot]</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-2.5">
              Template slot for demographic census and distribution charts.
            </p>
          </div>

          {/* Col 2 (Nearest evacuation | slot 02) */}
          <EvacuationCapacityCard center={evacuationCenter} />

          {/* Col 3 (Localized weather | slot 03) */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <WeatherCard weather={weather} borderless slotBadge="slot 03" />
          </div>
        </section>

        {/* Row 2 — 12-Column Split Workspace (grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left (lg:col-span-8): Framed Barangay Map Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col min-h-[540px] shadow-xs">
            {/* Compact card header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-600" />
                <h2 className="text-xs font-semibold text-slate-800">Barangay map</h2>
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums hidden sm:block">
                Coordinates: 13.1391° N, 123.7438° E · Philippines sector
              </span>
            </div>

            {/* Relative Map Viewport (Unobstructed Canvas) */}
            <div className="relative flex-1 min-h-[480px]">
              <BaseMap />

              {/* Floating Layer Controls */}
              <MapLayerToggle layers={layers} onToggleLayer={handleToggleLayer} />
            </div>
          </div>

          {/* Right (lg:col-span-4 flex flex-col gap-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Top: Emergency Hotlines (slot 04) */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
              <HotlineDirectory hotlines={hotlines} borderless slotBadge="slot 04" />
            </div>

            {/* Bottom: Incident Dispatch Queue (slot 05) */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-slate-600" />
                    <h3 className="text-xs font-semibold text-slate-700">Incident dispatch queue</h3>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                    slot 05
                  </span>
                </div>

                <div className="my-3 p-4 rounded-md border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    [slot: incident dispatch feed queue]
                  </span>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed max-w-xs">
                    Dedicated queue slot for DSA triage queue and priority-ordered incident response routing.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Queue status</span>
                  <span className="tabular-nums">0 active dispatches</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2 px-3 rounded-md flex items-center justify-center gap-2 shadow-xs whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="whitespace-nowrap">Submit an Incident Report</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Incident Report Modal ── */}
      <IncidentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleIncidentSubmit}
      />
    </div>
  );
};

export default App;
