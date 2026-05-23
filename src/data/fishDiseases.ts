export type DiseaseCategory =
  | 'Bacterial'
  | 'Fungal'
  | 'Parasitic'
  | 'Viral'
  | 'Water Quality'
  | 'Biofloc Related';

export interface FishDisease {
  id: string;
  name: string;
  category: DiseaseCategory;
  symptoms: string;
  commonTreatment: string;
  linkedParameters?: string[];
}

export const FISH_DISEASES: FishDisease[] = [
  {
    id: 'aeromoniasis',
    name: 'Aeromoniasis',
    category: 'Bacterial',
    symptoms: 'Red spots, ulcers, fin rot',
    commonTreatment: 'Salt bath, antibiotics, probiotics',
    linkedParameters: ['ammonia', 'nitrite'],
  },
  {
    id: 'columnaris',
    name: 'Columnaris',
    category: 'Bacterial',
    symptoms: 'White patches, gill damage',
    commonTreatment: 'KMnO₄, improved water quality',
    linkedParameters: ['dissolvedOxygen', 'temperature'],
  },
  {
    id: 'edwardsiellosis',
    name: 'Edwardsiellosis',
    category: 'Bacterial',
    symptoms: 'Internal bleeding, weak swimming',
    commonTreatment: 'Antibiotics under expert guidance',
  },
  {
    id: 'streptococcosis',
    name: 'Streptococcosis',
    category: 'Bacterial',
    symptoms: 'Pop-eye, spinning movement',
    commonTreatment: 'Antibiotics and water management',
  },
  {
    id: 'saprolegniasis',
    name: 'Saprolegniasis',
    category: 'Fungal',
    symptoms: 'Cotton-like fungal growth',
    commonTreatment: 'Salt treatment, antifungal treatment',
  },
  {
    id: 'gill-rot',
    name: 'Gill Rot',
    category: 'Fungal',
    symptoms: 'Damaged gills, breathing problem',
    commonTreatment: 'Improve aeration and water quality',
    linkedParameters: ['dissolvedOxygen'],
  },
  {
    id: 'white-spot',
    name: 'White Spot Disease',
    category: 'Parasitic',
    symptoms: 'White spots on body',
    commonTreatment: 'Salt treatment, formalin',
  },
  {
    id: 'trichodiniasis',
    name: 'Trichodiniasis',
    category: 'Parasitic',
    symptoms: 'Excess mucus, rubbing behavior',
    commonTreatment: 'KMnO₄ treatment',
  },
  {
    id: 'argulus',
    name: 'Argulus (Fish Lice)',
    category: 'Parasitic',
    symptoms: 'Visible lice on fish body',
    commonTreatment: 'Parasitic treatment',
  },
  {
    id: 'lernaea',
    name: 'Lernaea (Anchor Worm)',
    category: 'Parasitic',
    symptoms: 'Worm attached to skin',
    commonTreatment: 'Manual removal and treatment',
  },
  {
    id: 'gill-flukes',
    name: 'Gill Flukes',
    category: 'Parasitic',
    symptoms: 'Fast breathing, damaged gills',
    commonTreatment: 'Salt and antiparasitic treatment',
    linkedParameters: ['dissolvedOxygen'],
  },
  {
    id: 'khv',
    name: 'KHV',
    category: 'Viral',
    symptoms: 'High mortality in carp',
    commonTreatment: 'Biosecurity and quarantine',
  },
  {
    id: 'tilapia-lake-virus',
    name: 'Tilapia Lake Virus',
    category: 'Viral',
    symptoms: 'Weakness, mortality',
    commonTreatment: 'Prevention and isolation',
  },
  {
    id: 'brown-blood',
    name: 'Brown Blood Disease',
    category: 'Water Quality',
    symptoms: 'Fish gasping at surface',
    commonTreatment: 'Reduce nitrite levels',
    linkedParameters: ['nitrite'],
  },
  {
    id: 'ammonia-toxicity',
    name: 'Ammonia Toxicity',
    category: 'Water Quality',
    symptoms: 'Red gills, stress',
    commonTreatment: 'Water exchange and probiotics',
    linkedParameters: ['ammonia'],
  },
  {
    id: 'gas-bubble',
    name: 'Gas Bubble Disease',
    category: 'Water Quality',
    symptoms: 'Bubbles under skin',
    commonTreatment: 'Adjust aeration',
    linkedParameters: ['dissolvedOxygen'],
  },
  {
    id: 'biofloc-stress',
    name: 'Biofloc Stress Syndrome',
    category: 'Biofloc Related',
    symptoms: 'Gill blockage, low oxygen',
    commonTreatment: 'Control floc density',
    linkedParameters: ['dissolvedOxygen'],
  },
];
