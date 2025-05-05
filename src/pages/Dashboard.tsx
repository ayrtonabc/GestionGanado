import React, { useMemo } from 'react'; // Import useMemo
import { Cog as Cow, Milk, Calendar, AlertCircle, Users, Heart, MoveRight } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import EventsTimeline from '../components/dashboard/EventsTimeline';
import MilkProductionChart from '../components/dashboard/MilkProductionChart';
import { 
  animals as allAnimals, 
  breedingRecords as allBreedingRecords, 
  notifications as allNotifications, // Assuming notifications might also be filtered later
  veterinaryVisits as allVisits // Import all visits for upcoming events
} from '../data/mockData';
import { useEstablishment } from '../context/EstablishmentContext'; // Import context hook

const Dashboard: React.FC = () => {
  const { currentEstablishmentId, getEstablishmentName } = useEstablishment(); // Get context values

  // Filter data based on the selected establishment
  const animals = useMemo(() => {
    if (currentEstablishmentId === 'global') return allAnimals;
    return allAnimals.filter(a => a.currentEstablishmentId === currentEstablishmentId);
  }, [currentEstablishmentId]);

  const breedingRecords = useMemo(() => {
    if (currentEstablishmentId === 'global') return allBreedingRecords;
    return allBreedingRecords.filter(br => br.establishmentId === currentEstablishmentId);
  }, [currentEstablishmentId]);
  
  const veterinaryVisits = useMemo(() => {
    if (currentEstablishmentId === 'global') return allVisits;
    return allVisits.filter(v => v.establishmentId === currentEstablishmentId);
  }, [currentEstablishmentId]);

  // Recalculate stats based on filtered data
  const totalAnimals = animals.length;
  const activeAnimals = animals.filter(a => a.status !== 'sold' && a.status !== 'deceased').length;
  const lactatingAnimals = animals.filter(a => a.status === 'lactating').length;
  
  const totalMilk = animals
    .filter(a => a.status === 'lactating' && a.milkProduction && a.milkProduction.length > 0) // Ensure only lactating cows contribute
    .reduce((sum, animal) => {
      // Find the latest milk production record for the current establishment or any if global
      const relevantProduction = currentEstablishmentId === 'global' 
        ? animal.milkProduction! 
        : animal.milkProduction!.filter(mp => mp.establishmentId === currentEstablishmentId);
      
      if (relevantProduction.length > 0) {
         // Sort by date descending to get the latest
        const latestRecord = relevantProduction.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        return sum + latestRecord.total;
      }
      return sum;
    }, 0);
  
  const avgMilkPerCow = lactatingAnimals > 0 ? (totalMilk / lactatingAnimals).toFixed(1) : '0.0';
  
  const pendingPregnancyChecks = breedingRecords
    .filter(record => record.status === 'pending' && record.pregnancyCheckDate)
    .length;

  // Mock chart data - ideally this would also be filtered/aggregated by establishment
  const milkChartData = useMemo(() => {
    // Placeholder: In a real app, fetch/filter this data based on currentEstablishmentId
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      // Simulate different production levels based on establishment (very basic)
      let baseProduction = 25;
      if (currentEstablishmentId === 'est-1') baseProduction = 30;
      if (currentEstablishmentId === 'est-2') baseProduction = 15; // Breeding center
      if (currentEstablishmentId === 'est-3') baseProduction = 0; // Fattening station
      
      return {
        date: date.toISOString().split('T')[0],
        // Add some randomness, ensure non-negative
        total: Math.max(0, baseProduction + (Math.random() * 10 - 5)), 
      };
    });
  }, [currentEstablishmentId]); 

  // Filter upcoming events based on establishment
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of day for comparison

    const futureVisits = veterinaryVisits
      .filter(visit => visit.nextVisitDate && new Date(visit.nextVisitDate) >= today)
      .map(visit => ({
        id: `visit-${visit.id}`,
        title: `Następna wizyta: ${visit.veterinarian}`,
        date: visit.nextVisitDate!,
        type: 'health' as const,
        description: `Typ: ${visit.type}. Dotyczy: ${visit.animals.length} zwierz.`,
      }));

    const expectedCalvings = breedingRecords
      .filter(record => record.status === 'confirmed' && record.expectedCalvingDate && new Date(record.expectedCalvingDate) >= today)
      .map(record => {
        const animal = allAnimals.find(a => a.identifier === record.animalId); // Find animal from global list
        return {
          id: `calving-${record.id}`,
          title: 'Oczekiwany poród',
          date: record.expectedCalvingDate!,
          type: 'birth' as const,
          description: `Matka: ${animal?.name || record.animalId}`,
          animalId: record.animalId,
          animalName: animal?.name,
        };
      });
      
    const pregnancyChecks = breedingRecords
      .filter(record => record.status === 'pending' && record.pregnancyCheckDate && new Date(record.pregnancyCheckDate) >= today)
      .map(record => {
         const animal = allAnimals.find(a => a.identifier === record.animalId);
         return {
           id: `pregcheck-${record.id}`,
           title: 'Kontrola ciąży',
           date: record.pregnancyCheckDate!,
           type: 'breeding' as const,
           description: `Zwierzę: ${animal?.name || record.animalId}`,
           animalId: record.animalId,
           animalName: animal?.name,
         };
      });

    // Combine and sort events by date
    return [...futureVisits, ...expectedCalvings, ...pregnancyChecks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  }, [breedingRecords, veterinaryVisits, currentEstablishmentId]); // Add currentEstablishmentId dependency if needed for animal lookup

  // Filter notifications based on establishment (if applicable)
  const notifications = useMemo(() => {
     if (currentEstablishmentId === 'global') return allNotifications;
     // Filter notifications that are either global (no establishmentId) or match the current one
     return allNotifications.filter(n => !n.establishmentId || n.establishmentId === currentEstablishmentId);
  }, [currentEstablishmentId]);


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Display current establishment name */}
        <h1 className="text-2xl font-medium text-gray-900">
          Panel główny: <span className="text-primary">{getEstablishmentName(currentEstablishmentId)}</span>
        </h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline-primary">Eksportuj raport</button>
          <button className="btn btn-primary">Dodaj zwierzę</button>
        </div>
      </div>

      {/* Stats Cards - now reflect filtered data */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Wszystkie zwierzęta"
          value={totalAnimals}
          icon={<Cow className="w-5 h-5" />}
          description={`W ${currentEstablishmentId === 'global' ? 'całym systemie' : 'tym gospodarstwie'}`}
        />
        <StatCard
          title="Aktywne zwierzęta"
          value={activeAnimals}
          icon={<Users className="w-5 h-5" />}
          description={totalAnimals > 0 ? `${Math.round((activeAnimals / totalAnimals) * 100)}% stada` : 'Brak danych'}
          color="secondary"
        />
        <StatCard
          title="Średnia mleka/krowę"
          value={`${avgMilkPerCow} L`}
          icon={<Milk className="w-5 h-5" />}
          // Trend might need more complex logic based on historical data per establishment
          // trend={{ value: 5.2, positive: true }} 
          description="Średnia dzienna"
          color="accent"
        />
        <StatCard
          title="Oczekujące kontrole"
          value={pendingPregnancyChecks}
          icon={<AlertCircle className="w-5 h-5" />}
          description="Kontrole ciąży do wykonania"
          color="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Produkcja mleka (Symulacja)</h2>
                {/* Period selection can remain */}
                <div className="inline-flex rounded-md">
                  <button className="px-3 py-1 text-sm font-medium bg-primary text-white rounded-l-md">Dzień</button>
                  <button className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">Tydzień</button>
                  <button className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-r-md">Miesiąc</button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Pass filtered/simulated chart data */}
              <MilkProductionChart data={milkChartData} period="day" />
            </div>
          </div>
        </div>

        {/* Notifications - now uses filtered notifications */}
        <div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Powiadomienia</h2>
            </div>
            <div className="p-6 flex-grow overflow-y-auto">
              {notifications.length > 0 ? (
                 <EventsTimeline events={notifications.slice(0, 5).map(n => ({ // Map notifications to event format
                   id: n.id,
                   title: n.title,
                   date: n.date,
                   type: n.type === 'error' ? 'health' : n.type === 'warning' ? 'health' : 'other', // Basic type mapping
                   description: n.message,
                 }))} />
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Brak powiadomień.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events - now uses filtered events */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg font-medium text-gray-900">Nadchodzące wydarzenia</h2>
          </div>
        </div>
        <div className="p-6">
          {upcomingEvents.length > 0 ? (
            <EventsTimeline events={upcomingEvents.slice(0, 5)} /> // Limit displayed events
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">Brak nadchodzących wydarzeń.</p>
          )}
        </div>
      </div>

      {/* Quick Actions - remain unchanged */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Szybkie akcje</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <button className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
              <Users className="w-6 h-6 mb-2 text-primary" />
              <span className="text-sm font-medium text-gray-900">Zarejestruj zwierzę</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-secondary/5 rounded-lg border border-secondary/20 hover:bg-secondary/10 transition-colors">
              <MoveRight className="w-6 h-6 mb-2 text-secondary" />
              <span className="text-sm font-medium text-gray-900">Zapisz przemieszczenie</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-accent/5 rounded-lg border border-accent/20 hover:bg-accent/10 transition-colors">
              <Heart className="w-6 h-6 mb-2 text-accent" />
              <span className="text-sm font-medium text-gray-900">Zapisz rozród</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
