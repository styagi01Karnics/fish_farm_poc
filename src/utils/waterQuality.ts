import type { ParameterStatus } from '../data/waterParameters';
import { WATER_PARAMETER_DEFINITIONS } from '../data/waterParameters';

export type WaterQuality = 'Good' | 'Moderate' | 'Poor';
export type PondStatus = 'Normal' | 'Warning' | 'Critical';

export interface PondReadings {
  ph: number;
  ammonia: number;
  nitrite: number;
  nitrate: number;
  dissolvedOxygen: number;
  temperature: number;
  alkalinity: number;
  generalHardness: number;
  phosphates: number;
  waterLevel: string;
}

export function evaluateParameter(
  paramId: string,
  value: number,
): ParameterStatus {
  const def = WATER_PARAMETER_DEFINITIONS.find((p) => p.id === paramId);
  if (!def) return 'Normal';

  if (def.idealExact !== undefined) {
    if (value <= def.idealExact) return 'Normal';
    if (def.warningMax !== undefined && value <= def.warningMax) return 'Warning';
    return 'Critical';
  }

  if (def.idealMin !== undefined && value < def.idealMin) {
    if (paramId === 'dissolvedOxygen' && value >= 5) return 'Warning';
    return value < (def.idealMin - (paramId === 'ph' ? 0.5 : 10)) ? 'Critical' : 'Warning';
  }

  if (def.idealMax !== undefined && value > def.idealMax) {
    if (def.warningMax !== undefined && value <= def.warningMax) return 'Warning';
    return 'Critical';
  }

  if (def.idealMin !== undefined && def.idealMax !== undefined) {
    if (value >= def.idealMin && value <= def.idealMax) return 'Normal';
    const margin =
      paramId === 'ph' ? 0.3 : paramId === 'temperature' ? 2 : 15;
    if (value >= def.idealMin - margin && value <= def.idealMax + margin) return 'Warning';
    return 'Critical';
  }

  if (def.idealMin !== undefined && value >= def.idealMin) return 'Normal';
  if (def.idealMax !== undefined && value <= def.idealMax) return 'Normal';

  return 'Normal';
}

export function computeOverallQuality(readings: PondReadings): WaterQuality {
  const ids = [
    'ph',
    'ammonia',
    'nitrite',
    'nitrate',
    'dissolvedOxygen',
    'temperature',
    'alkalinity',
    'generalHardness',
    'phosphates',
  ] as const;
  const statuses = ids.map((id) =>
    evaluateParameter(id, readings[id as keyof PondReadings] as number),
  );
  const critical = statuses.filter((s) => s === 'Critical').length;
  const warning = statuses.filter((s) => s === 'Warning').length;
  if (critical > 0) return 'Poor';
  if (warning >= 2) return 'Moderate';
  if (warning === 1) return 'Moderate';
  return 'Good';
}

export function computePondStatus(readings: PondReadings): PondStatus {
  const quality = computeOverallQuality(readings);
  if (quality === 'Poor') return 'Critical';
  if (quality === 'Moderate') return 'Warning';
  return 'Normal';
}

export function formatIdealRange(paramId: string): string {
  const def = WATER_PARAMETER_DEFINITIONS.find((p) => p.id === paramId);
  if (!def) return '—';
  if (def.idealExact !== undefined) return `0 ${def.unit}`.trim();
  if (def.idealMin !== undefined && def.idealMax !== undefined) {
    return `${def.idealMin}–${def.idealMax} ${def.unit}`.trim();
  }
  if (def.idealMin !== undefined) return `≥ ${def.idealMin} ${def.unit}`.trim();
  if (def.idealMax !== undefined) return `< ${def.idealMax} ${def.unit}`.trim();
  return '—';
}

export function getReadingValue(readings: PondReadings, paramId: string): number {
  return readings[paramId as keyof PondReadings] as number;
}
