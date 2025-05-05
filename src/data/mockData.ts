import { Animal, BreedingRecord, CalvingRecord, Expense, Feed, Medication, MedicationRecord, Movement, Notification, MilkProduction, VeterinaryVisit, Task, MaintenanceRecord, Establishment } from '../types';

export const establishments: Establishment[] = [
  {
    id: 'est-1',
    name: 'Gospodarstwo Mleczne Główne',
    location: 'Dolina Centralna',
    type: 'dairy',
    capacity: 500,
    facilities: {
      milkingParlor: true,
      quarantineArea: true,
      calvingPens: true,
      feedlot: false
    },
    climate: {
      averageTemp: 18,
      rainfall: 1200,
      altitude: 1500
    }
  },
  {
    id: 'est-2',
    name: 'Centrum Hodowlane',
    location: 'Region Północny',
    type: 'breeding',
    capacity: 300,
    facilities: {
      milkingParlor: false,
      quarantineArea: true,
      calvingPens: true,
      feedlot: false
    },
    climate: {
      averageTemp: 22,
      rainfall: 800,
      altitude: 800
    }
  },
  {
    id: 'est-3',
    name: 'Stacja Opasu',
    location: 'Region Południowy',
    type: 'fattening',
    capacity: 400,
    facilities: {
      milkingParlor: false,
      quarantineArea: true,
      calvingPens: false,
      feedlot: true
    },
    climate: {
      averageTemp: 20,
      rainfall: 1000,
      altitude: 1200
    }
  }
];

export const animals: Animal[] = [
  {
    id: '1',
    identifier: 'PL-2021-001',
    name: 'Bella',
    birthDate: '2021-03-15',
    gender: 'female',
    breed: 'Holstein-Friesian',
    status: 'lactating',
    currentEstablishmentId: 'est-1',
    location: 'Sector A',
    group: 'Grupa Laktacji 1',
    motherId: '15',
    weight: 650,
    lastHealthCheck: '2023-10-20',
    notes: 'Wysoka produkcja mleka',
    milkProduction: [
      { date: '2023-11-01', morning: 15.2, evening: 14.6, total: 29.8, establishmentId: 'est-1' },
      { date: '2023-11-02', morning: 15.4, evening: 15.0, total: 30.4, establishmentId: 'est-1' },
      { date: '2023-11-03', morning: 15.0, evening: 14.8, total: 29.8, establishmentId: 'est-1' }
    ],
    movements: [
      {
        id: 'mov-1',
        animalId: '1',
        date: '2023-06-15',
        fromEstablishmentId: 'est-2',
        toEstablishmentId: 'est-1',
        fromLocation: 'Obszar Hodowlany',
        toLocation: 'Sektor A',
        reason: 'Rozpoczęcie laktacji',
        performedBy: 'Jan Kowalski',
        transportDetails: {
          vehicle: 'Ciężarówka 1',
          duration: 2,
          distance: 150
        }
      }
    ]
  },
  {
    id: '2',
    identifier: 'PL-2021-002',
    name: 'Luna',
    birthDate: '2021-04-10',
    gender: 'female',
    breed: 'Simental',
    status: 'pregnant',
    currentEstablishmentId: 'est-2',
    location: 'Strefa Ciąży',
    group: 'Grupa Ciężarne',
    motherId: '16',
    weight: 520,
    lastHealthCheck: '2023-09-15',
    notes: 'Ciąża potwierdzona 2023-09-15',
    movements: []
  }
];

export const expenses: Expense[] = [
  {
    id: '1',
    date: '2023-11-01',
    category: 'feed',
    description: 'Zakup paszy Premium',
    amount: 2500,
    establishmentId: 'est-1'
  },
  {
    id: '2',
    date: '2023-11-03',
    category: 'veterinary',
    description: 'Kontrola rutynowa',
    amount: 800,
    establishmentId: 'est-2'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Wymagana kontrola zdrowia',
    message: 'Zwierzę PL-2021-001 wymaga rutynowej kontroli zdrowia',
    type: 'warning',
    date: '2023-11-05',
    read: false
  },
  {
    id: '2',
    title: 'Alert produkcji mleka',
    message: 'Nietypowy spadek produkcji mleka dla zwierzęcia PL-2021-001',
    type: 'error',
    date: '2023-11-04',
    read: false
  },
  {
    id: '3',
    title: 'Szczepienie zakończone',
    message: 'Zaplanowane szczepienia zakończone dla grupy A',
    type: 'success',
    date: '2023-11-03',
    read: true
  },
  {
    id: '4',
    title: 'Aktualizacja stanu pasz',
    message: 'Stan pasz zaktualizowany - pozostał zapas na 2 tygodnie',
    type: 'info',
    date: '2023-11-02',
    read: true
  }
];

export const breedingRecords: BreedingRecord[] = [
  {
    id: '1',
    date: '2023-10-15',
    animalId: 'PL-2021-002',
    type: 'artificial',
    semenBatch: 'SB-2023-156',
    technician: 'Maria Kowalska',
    notes: 'Standardowa procedura',
    status: 'pending',
    establishmentId: 'est-2',
    pregnancyCheckDate: '2023-11-15'
  },
  {
    id: '2',
    date: '2023-09-20',
    animalId: 'PL-2021-003',
    type: 'artificial',
    semenBatch: 'SB-2023-142',
    technician: 'Maria Kowalska',
    notes: 'Druga próba',
    status: 'confirmed',
    establishmentId: 'est-2',
    pregnancyCheckDate: '2023-10-20'
  },
  {
    id: '3',
    date: '2023-09-10',
    animalId: 'PL-2021-004',
    type: 'natural',
    bullId: 'BULL-2022-001',
    technician: 'Piotr Nowak',
    notes: 'Program krycia naturalnego',
    status: 'failed',
    establishmentId: 'est-2',
    pregnancyCheckDate: '2023-10-10'
  }
];

export const veterinaryVisits: VeterinaryVisit[] = [
  {
    id: '1',
    date: '2023-11-15',
    veterinarian: 'dr Jan Kowalski',
    type: 'routine',
    animals: ['1', '2'],
    findings: 'Rutynowe badanie kontrolne',
    recommendations: 'Brak zaleceń',
    cost: 450,
    establishmentId: 'est-1',
    nextVisitDate: '2023-12-15'
  },
  {
    id: '2',
    date: '2023-11-10',
    veterinarian: 'dr Anna Nowak',
    type: 'emergency',
    animals: ['1'],
    findings: 'Lekka kulawizna',
    recommendations: 'Przepisano leki przeciwzapalne',
    cost: 800,
    establishmentId: 'est-1',
    nextVisitDate: '2023-11-17'
  },
  {
    id: '3',
    date: '2023-11-05',
    veterinarian: 'dr Jan Kowalski',
    type: 'followup',
    animals: ['2'],
    findings: 'Kontrola po szczepieniu',
    recommendations: 'Brak przeciwwskazań',
    cost: 300,
    establishmentId: 'est-1',
    nextVisitDate: null
  }
];

export const milkQualityTests = [
  {
    batchId: 'MLK-2023-001',
    date: '2023-11-05',
    fatContent: 3.8,
    proteinContent: 3.2
  },
  {
    batchId: 'MLK-2023-002',
    date: '2023-11-04',
    fatContent: 3.9,
    proteinContent: 3.3
  },
  {
    batchId: 'MLK-2023-003',
    date: '2023-11-03',
    fatContent: 3.7,
    proteinContent: 3.1
  }
];
