import React, { useState, useMemo } from 'react'; // Import useMemo
import { PlusCircle, List, Grid, AlertCircle } from 'lucide-react'; // Import AlertCircle
import { Animal, AnimalStatus } from '../types';
import AnimalCard from '../components/animals/AnimalCard';
import AnimalFilter from '../components/animals/AnimalFilter';
import AnimalStatusComponent from '../components/animals/AnimalStatus';
import { animals as allAnimals } from '../data/mockData'; // Rename imported data
import { useEstablishment } from '../context/EstablishmentContext'; // Import context hook

const Animals: React.FC = () => {
  const { currentEstablishmentId } = useEstablishment(); // Get current establishment ID
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    search: '',
    status: [] as AnimalStatus[],
    location: [] as string[],
    breed: [] as string[],
  });

  // Filter animals based on the selected establishment first
  const animalsForEstablishment = useMemo(() => {
    if (currentEstablishmentId === 'global') {
      return allAnimals; // Show all if global is selected
    }
    return allAnimals.filter(animal => animal.currentEstablishmentId === currentEstablishmentId);
  }, [currentEstablishmentId]);

  // Apply local filters (search, status, etc.) to the establishment-filtered list
  const filteredAnimals = useMemo(() => {
    let filtered = [...animalsForEstablishment];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        animal =>
          animal.identifier.toLowerCase().includes(searchTerm) ||
          (animal.name && animal.name.toLowerCase().includes(searchTerm)) ||
          animal.breed.toLowerCase().includes(searchTerm) ||
          animal.location.toLowerCase().includes(searchTerm) ||
          (animal.group && animal.group.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(animal => filters.status.includes(animal.status));
    }

    if (filters.location.length > 0) {
      // Filter based on location within the already establishment-filtered list
      filtered = filtered.filter(animal => filters.location.includes(animal.location));
    }

    if (filters.breed.length > 0) {
      filtered = filtered.filter(animal => filters.breed.includes(animal.breed));
    }

    return filtered;
  }, [animalsForEstablishment, filters]);

  // Derive filter options from the animals relevant to the current establishment
  const statusOptions = useMemo(() => [...new Set(animalsForEstablishment.map(animal => animal.status))], [animalsForEstablishment]);
  const locationOptions = useMemo(() => [...new Set(animalsForEstablishment.map(animal => animal.location))], [animalsForEstablishment]);
  const breedOptions = useMemo(() => [...new Set(animalsForEstablishment.map(animal => animal.breed))], [animalsForEstablishment]);

  const handleFilterChange = (newFilters: {
    search: string;
    status: AnimalStatus[];
    location: string[];
    breed: string[];
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Zwierzęta</h1>
        <button className="btn btn-primary flex items-center">
          <PlusCircle className="w-5 h-5 mr-2" />
          Dodaj nowe zwierzę
        </button>
      </div>

      {/* Pass the dynamically generated options based on current establishment */}
      <AnimalFilter
        onFilterChange={handleFilterChange}
        statusOptions={statusOptions}
        locationOptions={locationOptions}
        breedOptions={breedOptions}
        // Pass current filter state to keep filter component controlled
        currentFilters={filters} 
      />

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-700">
          Wyświetlono <span className="font-medium">{filteredAnimals.length}</span> z <span className="font-medium">{animalsForEstablishment.length}</span> zwierząt
        </p>
        <div className="flex items-center space-x-2">
          <button
            className={`p-2 rounded-md ${
              viewMode === 'list' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-md ${
              viewMode === 'grid' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {filteredAnimals.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID/Nazwa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rasa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data urodzenia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokalizacja
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Akcje
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAnimals.map(animal => (
                    <tr key={animal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {animal.name || 'Bez nazwy'}
                            </div>
                            <div className="text-sm text-gray-500">{animal.identifier}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{animal.breed}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AnimalStatusComponent status={animal.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(animal.birthDate).toLocaleDateString('pl-PL')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {animal.location}
                        {animal.group && <span className="ml-1">({animal.group})</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href={`/animals/${animal.id}`} className="text-primary hover:text-primary-dark mr-3">
                          Podgląd
                        </a>
                        <a href={`/animals/${animal.id}/edit`} className="text-secondary hover:text-secondary-dark">
                          Edytuj
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        // Display message when no animals match filters for the current establishment
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <AlertCircle className="w-full h-full" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {animalsForEstablishment.length === 0 
              ? 'Brak zwierząt w tym gospodarstwie' 
              : 'Nie znaleziono zwierząt pasujących do filtrów'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {animalsForEstablishment.length > 0 
              ? 'Spróbuj dostosować kryteria wyszukiwania lub filtrowania.'
              : 'Wybierz inne gospodarstwo lub widok globalny.'}
          </p>
          {animalsForEstablishment.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => handleFilterChange({ search: '', status: [], location: [], breed: [] })}
                className="btn btn-outline-primary"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Animals;
