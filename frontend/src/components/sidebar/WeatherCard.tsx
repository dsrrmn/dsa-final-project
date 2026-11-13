import React from 'react';
import { CloudRain, Wind, CloudSun, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { WeatherAdvisory } from '../../types/drrm';

interface WeatherCardProps {
  weather: WeatherAdvisory;
  borderless?: boolean;
  slotBadge?: string;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  borderless = false,
  slotBadge,
  className = '',
}) => {
  const alertStyles = {
    NORMAL: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      callout: 'border-l-2 border-emerald-500 bg-emerald-50/60 text-emerald-900',
      dot: 'bg-emerald-500',
      icon: ShieldCheck,
    },
    ADVISORY: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      callout: 'border-l-2 border-amber-500 bg-amber-50/60 text-amber-900',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
    },
    WARNING: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      callout: 'border-l-2 border-rose-500 bg-rose-50/60 text-rose-900',
      dot: 'bg-rose-500',
      icon: AlertTriangle,
    },
  }[weather.alertLevel];

  const AlertIcon = alertStyles.icon;

  return (
    <div
      className={
        borderless
          ? `text-slate-800 flex flex-col justify-between h-full ${className}`
          : `rounded-md border border-slate-200 bg-white p-4 shadow-xs text-slate-800 flex flex-col justify-between h-full ${className}`
      }
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-slate-600" />
          <h3 className="text-xs font-semibold text-slate-700">
            Localized weather
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {slotBadge && (
            <span className="font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
              {slotBadge}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${alertStyles.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${alertStyles.dot}`} />
            {weather.alertLevel}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 tabular-nums">
            {weather.temperatureC}°C
          </span>
          <p className="text-xs text-slate-500 mt-0.5">{weather.condition}</p>
        </div>
        <div className="text-right space-y-1 text-xs">
          <div className="flex items-center justify-end gap-1.5 text-slate-600">
            <CloudRain className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono tabular-nums">{weather.rainfallMm} mm/h</span>
          </div>
          <div className="flex items-center justify-end gap-1.5 text-slate-600">
            <Wind className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono tabular-nums">{weather.windKph} km/h</span>
          </div>
        </div>
      </div>

      <div className={`mt-3.5 p-2.5 rounded-r-md text-xs flex items-start gap-2 ${alertStyles.callout}`}>
        <AlertIcon className="w-4 h-4 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{weather.alertMessage}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
