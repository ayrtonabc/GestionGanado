import React, { useState, useEffect } from 'react'; // Import useEffect
import { Search, Filter, ChevronDown } from 'lucide-react';
import { AnimalStatus } from '../../types';

interface AnimalFilterProps {
  onFilterChange: (filters: {
    search: string;
    status: AnimalStatus[];
    location: string[];
    breed: string[];
  }) => void;
  statusOptions: AnimalStatus[];
  locationOptions: string[];
  breedOptions: string[];
  currentFilters: { // Receive current filters as props
    search: string;
    status: AnimalStatus[];
    location: string[];
    breed: string[];
  };
}

const AnimalFilter: React.FC<AnimalFilterProps> = ({
  onFilterChange,
  statusOptions,
  locationOptions,
  breedOptions,
  currentFilters, // Use received filters
}) => {
  // Use props to initialize state, making the component controlled
  const [search, setSearch] = useState(currentFilters.search);
  const [selectedStatus, setSelectedStatus] = useState<AnimalStatus[]>(currentFilters.status);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(currentFilters.location);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(currentFilters.breed);
  
  const [showFilters, setShowFilters] = useState(false); // Keep local state for UI toggle

  // Effect to update local state if props change (e.g., clearing filters externally)
  useEffect(() => {
    setSearch(currentFilters.search);
    setSelectedStatus(currentFilters.status);
    setSelectedLocations(currentFilters.location);
    setSelectedBreeds(currentFilters.breed);
  }, [currentFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // Update local state immediately for input responsiveness
    // Call onFilterChange to update parent state
    onFilterChange({ 
      search: value, 
      status: selectedStatus, 
      location: selectedLocations, 
      breed: selectedBreeds 
    });
  };

  const toggleStatus = (status: AnimalStatus) => {
    let newStatus;
    if (selectedStatus.includes(status)) {
      newStatus = selectedStatus.filter((s) => s !== status);
    } else {
      newStatus = [...selectedStatus, status];
    }
    setSelectedStatus(newStatus); // Update local state
    // Call onFilterChange to update parent state
    onFilterChange({ search, status: newStatus, location: selectedLocations, breed: selectedBreeds });
  };

  const toggleLocation = (location: string) => {
    let newLocations;
    if (selectedLocations.includes(location)) {
      newLocations = selectedLocations.filter((loc) => loc !== location);
    } else {
      newLocations = [...selectedLocations, location];
    }
    setSelectedLocations(newLocations); // Update local state
    // Call onFilterChange to update parent state
    onFilterChange({ search, status: selectedStatus, location: newLocations, breed: selectedBreeds });
  };

  const toggleBreed = (breed: string) => {
    let newBreeds;
    if (selectedBreeds.includes(breed)) {
      newBreeds = selectedBreeds.filter((b) => b !== breed);
    } else {
      newBreeds = [...selectedBreeds, breed];
    }
    setSelectedBreeds(newBreeds); // Update local state
    // Call onFilterChange to update parent state
    onFilterChange({ search, status: selectedStatus, location: selectedLocations, breed: newBreeds });
  };

  const clearFilters = () => {
    // Call onFilterChange with empty filters to update parent state
    onFilterChange({
      search: '',
      status: [],
      location: [],
      breed: [],
    });
    // Local state will update via useEffect when props change
  };

  const getActiveFiltersCount = () => {
    return selectedStatus.length + selectedLocations.length + selectedBreeds.length;
  };

  const getStatusTranslation = (status: AnimalStatus): string => {
    const translations: Record<AnimalStatus, string> = {
      calf: 'Cielę',
      heifer: 'Jałówka',
      lactating: 'Laktacja',
      dry: 'Zasuszona',
      pregnant: 'Cielna',
      bull: 'Byk',
      sold: 'Sprzedana',
      deceased: 'Padła'
    };
    return translations[status];
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Szukaj po ID, nazwie, rasie, lokalizacji..." // Updated placeholder
            value={search} // Controlled input
            onChange={handleSearchChange}
          />
        </div>
        <button
          className={`btn flex items-center ${
            getActiveFiltersCount() > 0 ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-5 h-5 mr-2" />
          Filtry
          {getActiveFiltersCount() > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-white text-primary rounded-full text-xs">
              {getActiveFiltersCount()}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showFilters && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm animate-fade-in">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {statusOptions.map((status) => (
                  <label key={status} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-offset-0"
                      checked={selectedStatus.includes(status)} // Controlled checkbox
                      onChange={() => toggleStatus(status)}
                    />
                    <span className="ml-2 text-sm text-gray-700 select-none">
                      {getStatusTranslation(status)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Lokalizacja</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {locationOptions.map((location) => (
                  <label key={location} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-offset-0"
                      checked={selectedLocations.includes(location)} // Controlled checkbox
                      onChange={() => toggleLocation(location)}
                    />
                    <span className="ml-2 text-sm text-gray-700 select-none">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Breed Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rasa</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {breedOptions.map((breed) => (
                  <label key={breed} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-offset-0"
                      checked={selectedBreeds.includes(breed)} // Controlled checkbox
                      onChange={() => toggleBreed(breed)}
                    />
                    <span className="ml-2 text-sm text-gray-700 select-none">{breed}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
            <button
              className="btn btn-outline-primary mr-2"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0 && search === ''} // Disable if no filters active
            >
              Wyczyść filtry
            </button>
            {/* Apply button removed as filters apply instantly */}
            {/* <button
              className="btn btn-primary"
              onClick={() => setShowFilters(false)} // Just close the panel
            >
              Zamknij filtry
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalFilter;
