import { FISH_DISEASES } from './fishDiseases';
import {
  computeOverallQuality,
  computePondStatus,
  evaluateParameter,
  type PondReadings,
  type PondStatus,
  type WaterQuality,
} from '../utils/waterQuality';

export type { WaterQuality, PondStatus, PondReadings };

export interface Pond {
  id: string;
  name: string;
  location: string;
  stockingDensity: string;
  species: string;
  readings: PondReadings;
  waterQuality: WaterQuality;
  status: PondStatus;
  lastUpdated: string;
  activeDiseaseRisk?: string[];
}

function buildPond(
  partial: Omit<Pond, 'waterQuality' | 'status'> & { readings: PondReadings },
): Pond {
  return {
    ...partial,
    waterQuality: computeOverallQuality(partial.readings),
    status: computePondStatus(partial.readings),
  };
}

export const ponds: Pond[] = [
  buildPond({
    id: 'PND001',
    name: 'Pond A - North',
    location: 'North Zone Sector 1',
    stockingDensity: '8 fish/m³',
    species: 'Rohu, Catla',
    readings: {
      ph: 7.4,
      ammonia: 0,
      nitrite: 0,
      nitrate: 18,
      dissolvedOxygen: 6.8,
      temperature: 28.4,
      alkalinity: 120,
      generalHardness: 110,
      phosphates: 0.03,
      waterLevel: '2.40 m',
    },
    lastUpdated: '23 May, 10:30 AM',
  }),
  buildPond({
    id: 'PND002',
    name: 'Pond B - East',
    location: 'East Zone Sector 2',
    stockingDensity: '10 fish/m³',
    species: 'Tilapia',
    readings: {
      ph: 6.4,
      ammonia: 0.15,
      nitrite: 0.35,
      nitrate: 28,
      dissolvedOxygen: 5.2,
      temperature: 29.1,
      alkalinity: 88,
      generalHardness: 95,
      phosphates: 0.06,
      waterLevel: '1.85 m',
    },
    lastUpdated: '23 May, 10:25 AM',
    activeDiseaseRisk: ['Brown Blood Disease', 'Ammonia Toxicity'],
  }),
  buildPond({
    id: 'PND003',
    name: 'Pond C - South',
    location: 'South Zone Sector 1',
    stockingDensity: '7 fish/m³',
    species: 'Mrigal, Rohu',
    readings: {
      ph: 7.2,
      ammonia: 0,
      nitrite: 0.05,
      nitrate: 22,
      dissolvedOxygen: 6.1,
      temperature: 27.6,
      alkalinity: 105,
      generalHardness: 100,
      phosphates: 0.04,
      waterLevel: '2.10 m',
    },
    lastUpdated: '23 May, 10:20 AM',
  }),
  buildPond({
    id: 'PND004',
    name: 'Pond D - West',
    location: 'West Zone Sector 3',
    stockingDensity: '12 fish/m³',
    species: 'Tilapia, Pangasius',
    readings: {
      ph: 6.1,
      ammonia: 0.45,
      nitrite: 0.8,
      nitrate: 38,
      dissolvedOxygen: 4.2,
      temperature: 30.2,
      alkalinity: 72,
      generalHardness: 68,
      phosphates: 0.12,
      waterLevel: '1.62 m',
    },
    lastUpdated: '23 May, 10:15 AM',
    activeDiseaseRisk: ['Ammonia Toxicity', 'Gill Rot', 'Biofloc Stress Syndrome'],
  }),
  buildPond({
    id: 'PND005',
    name: 'Pond E - Central',
    location: 'Central Zone',
    stockingDensity: '9 fish/m³',
    species: 'Catla, Silver Carp',
    readings: {
      ph: 7.5,
      ammonia: 0,
      nitrite: 0,
      nitrate: 15,
      dissolvedOxygen: 6.5,
      temperature: 28.0,
      alkalinity: 130,
      generalHardness: 115,
      phosphates: 0.02,
      waterLevel: '2.35 m',
    },
    lastUpdated: '23 May, 10:10 AM',
  }),
  buildPond({
    id: 'PND006',
    name: 'Pond F - North (Biofloc)',
    location: 'North Zone Sector 2',
    stockingDensity: '15 fish/m³',
    species: 'Tilapia',
    readings: {
      ph: 7.0,
      ammonia: 0.08,
      nitrite: 0.2,
      nitrate: 32,
      dissolvedOxygen: 5.4,
      temperature: 29.5,
      alkalinity: 98,
      generalHardness: 90,
      phosphates: 0.08,
      waterLevel: '1.95 m',
    },
    lastUpdated: '23 May, 10:05 AM',
    activeDiseaseRisk: ['Biofloc Stress Syndrome'],
  }),
];

export const dashboardSummary = {
  waterQuality: {
    label: computeOverallQuality(ponds[0].readings) === 'Good' ? 'Good' : 'Mixed',
    subtext: `${ponds.filter((p) => p.waterQuality === 'Good').length} of ${ponds.length} ponds within ideal ranges`,
  },
  totalPonds: { value: ponds.length, subtext: 'Active monitored ponds' },
  alerts: {
    value: ponds.filter((p) => p.status !== 'Normal').length,
    subtext: 'Ammonia, nitrite, or DO out of range',
  },
  avgDissolvedOxygen: {
    value: `${(ponds.reduce((s, p) => s + p.readings.dissolvedOxygen, 0) / ponds.length).toFixed(1)} mg/L`,
    subtext: 'Target ≥ 6.0 mg/L',
  },
};

export const trendData = [
  { date: '17 May', temperature: 27, ph: 7.2, do: 6.2, ammonia: 0, nitrite: 0, nitrate: 16 },
  { date: '18 May', temperature: 28, ph: 7.3, do: 6.0, ammonia: 0, nitrite: 0.05, nitrate: 18 },
  { date: '19 May', temperature: 28.5, ph: 7.4, do: 6.4, ammonia: 0, nitrite: 0, nitrate: 17 },
  { date: '20 May', temperature: 28.8, ph: 7.3, do: 6.1, ammonia: 0.05, nitrite: 0, nitrate: 19 },
  { date: '21 May', temperature: 29, ph: 7.5, do: 6.5, ammonia: 0, nitrite: 0, nitrate: 15 },
  { date: '22 May', temperature: 28.6, ph: 7.4, do: 6.3, ammonia: 0, nitrite: 0, nitrate: 18 },
  { date: '23 May', temperature: 28.4, ph: 7.4, do: 6.8, ammonia: 0, nitrite: 0, nitrate: 18 },
];

export const recentAlerts = [
  {
    id: 1,
    severity: 'Critical' as const,
    title: 'Ammonia Toxicity risk',
    pond: 'Pond D - West',
    parameter: 'Ammonia',
    value: '0.45 ppm',
    ideal: '0 ppm',
    time: '10:15 AM',
    diseaseLink: 'Ammonia Toxicity',
  },
  {
    id: 2,
    severity: 'Critical' as const,
    title: 'Low Dissolved Oxygen',
    pond: 'Pond D - West',
    parameter: 'DO',
    value: '4.2 mg/L',
    ideal: '≥ 6.0 mg/L',
    time: '10:15 AM',
    diseaseLink: 'Biofloc Stress Syndrome',
  },
  {
    id: 3,
    severity: 'Warning' as const,
    title: 'Elevated Nitrite',
    pond: 'Pond B - East',
    parameter: 'Nitrite',
    value: '0.35 ppm',
    ideal: '~0 ppm',
    time: '10:25 AM',
    diseaseLink: 'Brown Blood Disease',
  },
  {
    id: 4,
    severity: 'Warning' as const,
    title: 'pH below ideal range',
    pond: 'Pond B - East',
    parameter: 'pH',
    value: '6.4',
    ideal: '6.5–8.5',
    time: '10:25 AM',
  },
  {
    id: 5,
    severity: 'Warning' as const,
    title: 'Nitrate approaching limit',
    pond: 'Pond F - North (Biofloc)',
    parameter: 'Nitrate',
    value: '32 mg/L',
    ideal: '< 30 mg/L',
    time: '10:05 AM',
  },
];

const snapshotPond = ponds[0];

export const parameterSnapshot = [
  { paramId: 'ph', label: 'pH', unit: '' },
  { paramId: 'ammonia', label: 'Ammonia', unit: 'ppm' },
  { paramId: 'nitrite', label: 'Nitrite', unit: 'ppm' },
  { paramId: 'nitrate', label: 'Nitrate', unit: 'mg/L' },
  { paramId: 'dissolvedOxygen', label: 'Dissolved Oxygen', unit: 'mg/L' },
  { paramId: 'temperature', label: 'Temperature', unit: '°C' },
  { paramId: 'alkalinity', label: 'Alkalinity (KH)', unit: 'ppm' },
].map((item) => {
  const raw = snapshotPond.readings[item.paramId as keyof typeof snapshotPond.readings];
  const value = typeof raw === 'number' ? String(raw) : raw;
  const status = typeof raw === 'number' ? evaluateParameter(item.paramId, raw) : 'Normal';
  return { ...item, value, status };
});

export const pondStats = {
  totalPonds: ponds.length,
  goodQuality: ponds.filter((p) => p.waterQuality === 'Good').length,
  moderateQuality: ponds.filter((p) => p.waterQuality === 'Moderate').length,
  poorQuality: ponds.filter((p) => p.waterQuality === 'Poor').length,
};

export const historyLog = [
  {
    id: 'H001',
    date: '23 May 2026',
    time: '10:30',
    pond: 'Pond A - North',
    event: 'Routine water test',
    parameters: 'All within ideal range',
    staff: 'Rakesh Kumar',
  },
  {
    id: 'H002',
    date: '23 May 2026',
    time: '10:15',
    pond: 'Pond D - West',
    event: 'Critical alert triggered',
    parameters: 'Ammonia 0.45 ppm, DO 4.2 mg/L',
    staff: 'System',
  },
  {
    id: 'H003',
    date: '22 May 2026',
    time: '16:00',
    pond: 'Pond F - North (Biofloc)',
    event: 'Probiotic application',
    parameters: 'Biofloc density adjusted',
    staff: 'Priya Sharma',
  },
  {
    id: 'H004',
    date: '22 May 2026',
    time: '09:00',
    pond: 'Pond B - East',
    event: 'Partial water exchange',
    parameters: '20% exchange after nitrite spike',
    staff: 'Amit Patel',
  },
  {
    id: 'H005',
    date: '21 May 2026',
    time: '14:30',
    pond: 'Pond D - West',
    event: 'Disease observation',
    parameters: 'Fish gasping — nitrite treatment started',
    staff: 'Rakesh Kumar',
  },
];

export const fieldTeam = [
  {
    id: 'T001',
    name: 'Rakesh Kumar',
    role: 'Super Admin',
    zone: 'All zones',
    lastVisit: '23 May, 10:30 AM',
    pondsChecked: 6,
  },
  {
    id: 'T002',
    name: 'Priya Sharma',
    role: 'Field Technician',
    zone: 'North Zone',
    lastVisit: '22 May, 16:00 PM',
    pondsChecked: 3,
  },
  {
    id: 'T003',
    name: 'Amit Patel',
    role: 'Field Technician',
    zone: 'East Zone',
    lastVisit: '22 May, 09:00 AM',
    pondsChecked: 2,
  },
  {
    id: 'T004',
    name: 'Suresh Reddy',
    role: 'Water Quality Analyst',
    zone: 'West & Central',
    lastVisit: '21 May, 14:30 PM',
    pondsChecked: 4,
  },
];

export const cameraFeeds = [
  {
    id: 'CAM001',
    pond: 'Pond A - North',
    status: 'Online',
    lastFrame: '23 May, 10:28 AM',
  },
  {
    id: 'CAM002',
    pond: 'Pond D - West',
    status: 'Online',
    lastFrame: '23 May, 10:27 AM',
  },
  {
    id: 'CAM003',
    pond: 'Pond F - North (Biofloc)',
    status: 'Online',
    lastFrame: '23 May, 10:25 AM',
  },
  {
    id: 'CAM004',
    pond: 'Pond C - South',
    status: 'Offline',
    lastFrame: '22 May, 18:00 PM',
  },
];

export const reportTemplates = [
  { id: 'R1', name: 'Daily Water Quality Summary', frequency: 'Daily' },
  { id: 'R2', name: 'Weekly Nitrogen Cycle Report', frequency: 'Weekly' },
  { id: 'R3', name: 'Monthly Disease & Mortality Log', frequency: 'Monthly' },
  { id: 'R4', name: 'Parameter Compliance (PDF ranges)', frequency: 'On demand' },
];

export const diseaseAlerts = ponds
  .filter((p) => p.activeDiseaseRisk?.length)
  .flatMap((p) =>
    (p.activeDiseaseRisk ?? []).map((diseaseName, i) => {
      const disease = FISH_DISEASES.find((d) => d.name === diseaseName);
      return {
        id: `${p.id}-d-${i}`,
        pond: p.name,
        disease: diseaseName,
        category: disease?.category ?? 'Water Quality',
        symptoms: disease?.symptoms ?? '',
        treatment: disease?.commonTreatment ?? '',
        severity: p.status,
      };
    }),
  );
