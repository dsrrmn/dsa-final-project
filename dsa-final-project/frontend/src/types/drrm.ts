export type HotlineGroup = 'GENERAL' | 'SPECIFIC';

export type DisasterCategory = 'FIRE' | 'CRIME' | 'MEDICAL' | 'RESCUE';

export interface EmergencyHotline {
  id: number;
  groupType: HotlineGroup;
  category?: DisasterCategory;
  agencyName: string;
  phoneNumber: string;
}

export interface WeatherAdvisory {
  temperatureC: number;
  condition: string;
  rainfallMm: number;
  windKph: number;
  alertLevel: 'NORMAL' | 'ADVISORY' | 'WARNING';
  alertMessage: string;
}

export interface MapLayerVisibility {
  evacuationCenters: boolean;
  evacuationRoutes: boolean;
  hazardZones: boolean;
}

export interface NearestEvacuationCenter {
  id: number;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  estimatedMaxCapacity: number;
  status: 'OPEN' | 'STANDBY' | 'CLOSED';
}

export interface EvacuationCenterSummary {
  id: number;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  currentOccupancy: number;
  maxCapacity: number;
  status: 'OPEN' | 'NEAR_FULL' | 'FULL';
}

export interface EvacuationCenter {
  id: string | number;
  name: string;
  address: string;
  capacity: number;
  currentOccupancy: number;
  latitude: number;
  longitude: number;
  isOpen: boolean;
}

export type HazardType = 'flood' | 'landslide' | 'storm_surge' | 'typhoon' | string;
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical' | string;

export interface HazardZone {
  id: string | number;
  name: string;
  hazardType: HazardType;
  severityLevel: SeverityLevel;
  coordinates: [number, number][] | [number, number][][];
}
