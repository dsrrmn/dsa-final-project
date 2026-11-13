import React from 'react';
import { Building2 } from 'lucide-react';
import type { NearestEvacuationCenter } from '../../types/drrm';

interface EvacuationCapacityCardProps {
  center: NearestEvacuationCenter;
  className?: string;
}

export const EvacuationCapacityCard: React.FC<EvacuationCapacityCardProps> = ({
  center,
  className = '',
}) => {
  const statusStyles = {
    OPEN: {
      label: 'OPEN',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
    },
    STANDBY: {
      label: 'STANDBY',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
    },
    CLOSED: {
      label: 'CLOSED',
      badge: 'bg-slate-100 text-slate-600 border-slate-200',
      dot: 'bg-slate-400',
    },
  }[center.status];

  return (
    <div
      className={`bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between text-slate-800 ${className}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 min-w-0">
            <Building2 className="w-4 h-4 text-slate-600 shrink-0" />
            <h2 className="text-xs font-semibold text-slate-700 truncate">
              Nearest evacuation
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded font-mono">
              slot 02
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${statusStyles.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
              {statusStyles.label}
            </span>
          </div>
        </div>

        {/* Center Details */}
        <div className="mt-3 space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-900 truncate" title={center.name}>
              {center.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              <span className="font-mono tabular-nums">{center.distanceKm}</span> km · ~
              <span className="font-mono tabular-nums">{center.etaMinutes}</span> min
            </p>
          </div>

          {/* Metric Box Matching Demographics Slot */}
          <div className="p-3 rounded-md border border-dashed border-slate-200 bg-slate-50/50 flex flex-col justify-center">
            <span className="text-[11px] font-medium text-slate-500">Est. max capacity</span>
            <span className="mt-1 font-mono text-xs font-semibold text-slate-900 tabular-nums">
              ~{center.estimatedMaxCapacity} pax
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-2.5 mt-3">
        Primary safe zone designated for flash floods and high winds.
      </p>
    </div>
  );
};

export default EvacuationCapacityCard;
