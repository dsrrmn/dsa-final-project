import React, { useState } from 'react';
import { X, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

export type IncidentCategoryType =
  | 'Flooding'
  | 'Fire'
  | 'Landslide'
  | 'Medical Emergency'
  | 'Road Blockage';

export interface IncidentReportPayload {
  category: IncidentCategoryType;
  description: string;
  reporterName?: string;
  reporterContact?: string;
  latitude: number;
  longitude: number;
}

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: IncidentReportPayload) => void;
}

export const IncidentReportModal: React.FC<IncidentReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState<IncidentCategoryType>('Flooding');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [latitude, setLatitude] = useState('13.1391');
  const [longitude, setLongitude] = useState('123.7438');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);

  if (!isOpen) return null;

  const handleUseLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6));
          setLongitude(pos.coords.longitude.toFixed(6));
          setLocating(false);
        },
        () => {
          setLatitude('13.139100');
          setLongitude('123.743800');
          setLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setLatitude('13.139100');
      setLongitude('123.743800');
      setLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: IncidentReportPayload = {
      category,
      description,
      reporterName: reporterName.trim() || undefined,
      reporterContact: reporterContact.trim() || undefined,
      latitude: parseFloat(latitude) || 13.1391,
      longitude: parseFloat(longitude) || 123.7438,
    };

    if (onSubmit) {
      onSubmit(payload);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setDescription('');
        setReporterName('');
        setReporterContact('');
      }, 1200);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg border border-slate-200 overflow-hidden text-slate-800">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Submit an Incident Report
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            <h4 className="text-base font-semibold text-slate-900">
              Report Submitted Successfully
            </h4>
            <p className="text-xs text-slate-500">
              Disaster Response Command has been notified of this incident.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Incident Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategoryType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="Flooding">Flooding</option>
                <option value="Fire">Fire</option>
                <option value="Landslide">Landslide</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Road Blockage">Road Blockage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe current hazard conditions, affected road or structure, and urgent hazards..."
                rows={3}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Reporter Name (Optional)
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Juan dela Cruz"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Contact Number (Optional)
                </label>
                <input
                  type="tel"
                  value={reporterContact}
                  onChange={(e) => setReporterContact(e.target.value)}
                  placeholder="e.g. 0917-123-4567"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">Incident Location</span>
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={locating}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{locating ? 'Locating...' : 'Use Current Location'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Latitude</label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Longitude</label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-sm transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default IncidentReportModal;
