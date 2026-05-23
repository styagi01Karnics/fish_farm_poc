/** Ideal ranges from fish_pond_water_parameters.pdf */

export type ParameterStatus = 'Normal' | 'Warning' | 'Critical';

export interface WaterParameterDef {
  id: string;
  name: string;
  unit: string;
  description: string;
  idealMin?: number;
  idealMax?: number;
  idealExact?: number;
  warningMax?: number;
}

export const WATER_PARAMETER_DEFINITIONS: WaterParameterDef[] = [
  {
    id: 'ph',
    name: 'pH',
    unit: '',
    description:
      'Measures acidity or alkalinity. Ideal for a healthy fish pond is usually 6.5–8.5.',
    idealMin: 6.5,
    idealMax: 8.5,
  },
  {
    id: 'ammonia',
    name: 'Ammonia',
    unit: 'ppm',
    description:
      'Highly toxic waste from fish and decaying matter. Should ideally be 0 ppm.',
    idealExact: 0,
    warningMax: 0.25,
  },
  {
    id: 'nitrite',
    name: 'Nitrite',
    unit: 'ppm',
    description:
      'Produced when bacteria break down ammonia. Even small amounts are toxic; keep near 0 ppm.',
    idealExact: 0,
    warningMax: 0.5,
  },
  {
    id: 'nitrate',
    name: 'Nitrate',
    unit: 'mg/L',
    description:
      'End product of the nitrogen cycle. Keep below 25–30 mg/L to limit algae and fish stress.',
    idealMax: 30,
    warningMax: 40,
  },
  {
    id: 'dissolvedOxygen',
    name: 'Dissolved Oxygen (DO)',
    unit: 'mg/L',
    description: 'Crucial for fish respiration. Optimal levels are typically 6.0 mg/L or higher.',
    idealMin: 6.0,
  },
  {
    id: 'temperature',
    name: 'Water Temperature',
    unit: '°C',
    description:
      'Affects dissolved oxygen capacity and fish metabolism. Typical pond range 26–32°C.',
    idealMin: 26,
    idealMax: 32,
  },
  {
    id: 'alkalinity',
    name: 'Alkalinity (KH)',
    unit: 'ppm',
    description:
      "Buffers pH changes. Proper KH (usually 95–150 ppm) prevents dangerous pH crashes.",
    idealMin: 95,
    idealMax: 150,
  },
  {
    id: 'generalHardness',
    name: 'General Hardness (GH)',
    unit: 'ppm',
    description:
      'Dissolved calcium and magnesium; vital for bone and scale development. Typical range 75–150 ppm.',
    idealMin: 75,
    idealMax: 150,
  },
  {
    id: 'phosphates',
    name: 'Phosphates',
    unit: 'mg/L',
    description:
      'High levels from runoff or feed trigger algae growth. Keep low in production ponds.',
    idealMax: 0.05,
    warningMax: 0.1,
  },
];

export const PREVENTION_TIPS = [
  'Maintain pH between 6.5 and 8.5',
  'Keep dissolved oxygen above 5–6 mg/L',
  'Control ammonia and nitrite levels',
  'Use quality feed and avoid overfeeding',
  'Maintain proper stocking density',
  'Use probiotics regularly',
  'Ensure proper aeration in biofloc systems',
  'Remove dead fish immediately',
  'Quarantine new fish stock',
  'Regularly test pond water quality',
];

export const POND_CHEMICALS = [
  { name: 'Salt', purpose: 'Stress reduction and parasite control' },
  { name: 'Potassium Permanganate (KMnO₄)', purpose: 'Parasitic and bacterial control' },
  { name: 'Formalin', purpose: 'External parasite treatment' },
  { name: 'Hydrogen Peroxide', purpose: 'Water disinfection and oxygen improvement' },
  { name: 'Lime', purpose: 'pH correction and pond preparation' },
  { name: 'Probiotics', purpose: 'Improve water quality and gut health' },
  { name: 'Zeolite', purpose: 'Ammonia control' },
];
