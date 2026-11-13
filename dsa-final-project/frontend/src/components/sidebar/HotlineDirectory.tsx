import React, { useState } from 'react';
import { Phone, Copy, Check, Flame, ShieldAlert, HeartPulse, LifeBuoy } from 'lucide-react';
import type { EmergencyHotline, DisasterCategory } from '../../types/drrm';

interface HotlineDirectoryProps {
  hotlines: EmergencyHotline[];
  borderless?: boolean;
  slotBadge?: string;
  className?: string;
}

export const HotlineDirectory: React.FC<HotlineDirectoryProps> = ({
  hotlines,
  borderless = false,
  slotBadge,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DisasterCategory | null>('FIRE');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generalHotlines = hotlines.filter((h) => h.groupType === 'GENERAL');
  const filteredSpecificHotlines = selectedCategory
    ? hotlines.filter((h) => h.groupType === 'SPECIFIC' && h.category === selectedCategory)
    : [];

  const categories: { key: DisasterCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'FIRE', label: 'Fire', icon: Flame },
    { key: 'CRIME', label: 'Crime', icon: ShieldAlert },
    { key: 'MEDICAL', label: 'Medical', icon: HeartPulse },
    { key: 'RESCUE', label: 'Rescue', icon: LifeBuoy },
  ];

  return (
    <div
      className={
        borderless
          ? `text-slate-800 space-y-4 ${className}`
          : `rounded-md border border-slate-200 bg-white p-4 shadow-xs text-slate-800 space-y-4 ${className}`
      }
    >
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-600" />
          <h3 className="text-xs font-semibold text-slate-700">
            Emergency hotlines
          </h3>
        </div>
        {slotBadge && (
          <span className="font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
            {slotBadge}
          </span>
        )}
      </div>

      {/* General Disaster (Always Visible) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">
            General disaster
          </span>
          <span className="text-[10px] text-slate-400 font-mono">24/7 Desk</span>
        </div>
        <div className="space-y-1.5">
          {generalHotlines.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors"
            >
              <div className="min-w-0 pr-2">
                <p className="text-xs font-medium text-slate-900 truncate">{h.agencyName}</p>
                <a
                  href={`tel:${h.phoneNumber.replace(/[^0-9+]/g, '')}`}
                  className="text-xs font-mono tabular-nums text-slate-600 hover:text-blue-600 hover:underline block"
                >
                  {h.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(h.id, h.phoneNumber)}
                  className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copy number"
                  aria-label="Copy phone number"
                >
                  {copiedId === h.id ? (
                    <span className="flex items-center text-[10px] font-medium text-emerald-600">
                      <Check className="w-3.5 h-3.5 mr-0.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`tel:${h.phoneNumber.replace(/[^0-9+]/g, '')}`}
                  className="p-1.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors"
                  title="Call hotline"
                  aria-label={`Call ${h.agencyName}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specific Disaster (Segmented Toggle Bar) */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">
            Specific disaster
          </span>
          <span className="text-[10px] text-slate-400">
            {selectedCategory ? 'Click active to hide' : 'Select category'}
          </span>
        </div>

        {/* Single-select segmented toggle bar */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-md border border-slate-200/80">
          {categories.map(({ key, label, icon: Icon }) => {
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(isSelected ? null : key)}
                className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                aria-pressed={isSelected}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Render ONLY the hotlines belonging to the currently active category */}
        {selectedCategory && (
          <div className="space-y-1.5 pt-1">
            {filteredSpecificHotlines.length > 0 ? (
              filteredSpecificHotlines.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-medium text-slate-900 truncate">{h.agencyName}</p>
                    <a
                      href={`tel:${h.phoneNumber.replace(/[^0-9+]/g, '')}`}
                      className="text-xs font-mono tabular-nums text-slate-600 hover:text-blue-600 hover:underline block"
                    >
                      {h.phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(h.id, h.phoneNumber)}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                      title="Copy number"
                      aria-label="Copy phone number"
                    >
                      {copiedId === h.id ? (
                        <span className="flex items-center text-[10px] font-medium text-emerald-600">
                          <Check className="w-3.5 h-3.5 mr-0.5" /> Copied
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={`tel:${h.phoneNumber.replace(/[^0-9+]/g, '')}`}
                      className="p-1.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors"
                      title="Call hotline"
                      aria-label={`Call ${h.agencyName}`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-md">
                No hotline listed for this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotlineDirectory;
