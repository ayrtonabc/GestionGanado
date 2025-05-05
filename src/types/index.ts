// Enhanced type definitions for the cattle management system

export interface Establishment {
  id: string;
  name: string;
  location: string;
  type: 'dairy' | 'breeding' | 'fattening';
  capacity: number;
  facilities: {
    milkingParlor?: boolean;
    quarantineArea?: boolean;
    calvingPens?: boolean;
    feedlot?: boolean;
  };
  climate: {
    averageTemp: number;
    rainfall: number;
    altitude: number;
  };
}

export interface Animal {
  id: string;
  identifier: string;
  name?: string;
  birthDate: string;
  gender: 'male' | 'female';
  breed: string;
  status: AnimalStatus;
  currentEstablishmentId: string;
  location: string;
  group?: string;
  motherId?: string;
  fatherId?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  weight?: number;
  lastHealthCheck?: string;
  notes?: string;
  milkProduction?: MilkProduction[];
  movements: Movement[];
}

export type AnimalStatus = 
  | 'calf' 
  | 'heifer'
  | 'lactating'
  | 'dry'
  | 'pregnant'
  | 'bull'
  | 'sold'
  | 'deceased';

export interface MilkProduction {
  date: string;
  morning: number;
  evening: number;
  total: number;
  establishmentId: string;
}

export interface BreedingRecord {
  id: string;
  animalId: string;
  date: string;
  type: 'natural' | 'artificial';
  bullId?: string;
  bullName?: string;
  semenBatch?: string;
  technician?: string;
  status: 'pending' | 'confirmed' | 'failed';
  pregnancyCheckDate?: string;
  expectedCalvingDate?: string;
  notes?: string;
  establishmentId: string;
}

export interface CalvingRecord {
  id: string;
  motherId: string;
  date: string;
  calfIds: string[];
  difficulty: 'easy' | 'moderate' | 'difficult' | 'assisted';
  complications?: string[];
  notes?: string;
  establishmentId: string;
}

export interface Movement {
  id: string;
  animalId: string;
  date: string;
  fromEstablishmentId: string;
  toEstablishmentId: string;
  fromLocation: string;
  toLocation: string;
  fromGroup?: string;
  toGroup?: string;
  reason?: string;
  performedBy: string;
  transportDetails?: {
    vehicle: string;
    duration: number;
    distance: number;
  };
}

export interface MedicationRecord {
  id: string;
  animalId: string;
  medicationId: string;
  medicationName: string;
  date: string;
  dosage: string;
  batchNumber?: string;
  withdrawalPeriodMilk?: number;
  withdrawalPeriodMeat?: number;
  administeredBy: string;
  reason?: string;
  notes?: string;
  establishmentId: string;
}

export interface Medication {
  id: string;
  name: string;
  type: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  expiryDate?: string;
  supplier?: string;
  notes?: string;
  establishmentId: string;
}

export interface Feed {
  id: string;
  name: string;
  type: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  purchaseDate?: string;
  expiryDate?: string;
  supplier?: string;
  notes?: string;
  establishmentId: string;
}

export interface Expense {
  id: string;
  date: string;
  category: 'feed' | 'medication' | 'veterinary' | 'equipment' | 'labor' | 'other';
  amount: number;
  description: string;
  supplier?: string;
  relatedAnimals?: string[];
  receipt?: string;
  establishmentId: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  date: string;
  read: boolean;
  relatedEntityId?: string;
  relatedEntityType?: string;
  establishmentId?: string;
}

export interface VeterinaryVisit {
  id: string;
  date: string;
  veterinarian: string;
  type: 'routine' | 'emergency' | 'followup';
  animals: string[];
  findings: string;
  recommendations?: string;
  nextVisitDate?: string;
  cost: number;
  establishmentId: string;
}

export interface MaintenanceRecord {
  id: string;
  equipment: string;
  date: string;
  type: 'preventive' | 'corrective' | 'emergency';
  description: string;
  technician: string;
  cost: number;
  nextMaintenanceDate?: string;
  establishmentId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string; // ID del usuario asignado
  assignedBy?: string; // ID del usuario que asignó la tarea
  category: 'veterinary' | 'maintenance' | 'feeding' | 'breeding' | 'other';
  establishmentId: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  comments?: string;
  attachments?: string[];
}

export interface MilkQualityTest {
  date: string;
  batchId: string;
  fatContent: number;
  proteinContent: number;
  bacterialCount: number;
  somaticCellCount: number;
  temperature: number;
  establishmentId: string;
}

export interface FeedConsumption {
  date: string;
  group: string;
  feed: string;
  amount: number;
  unit: string;
  establishmentId: string;
}
