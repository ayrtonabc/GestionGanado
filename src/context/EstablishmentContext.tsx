import React, { createContext, useContext, useState, ReactNode } from 'react';
import { establishments } from '../data/mockData';
import { Establishment } from '../types'; // Import Establishment type

// Define the type for the context value
interface EstablishmentContextType {
  // Allow 'global' as a possible value for the current establishment
  currentEstablishmentId: string | 'global'; 
  setCurrentEstablishmentId: (id: string | 'global') => void;
  establishments: Establishment[]; // Add the list of establishments to the context
  getEstablishmentName: (id: string | 'global') => string; // Helper to get name
}

// Create the context with an initial undefined value
const EstablishmentContext = createContext<EstablishmentContextType | undefined>(undefined);

// Define the provider component
export const EstablishmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with 'global' as the default view
  const [currentEstablishmentId, setCurrentEstablishmentId] = useState<string | 'global'>('global');

  // Function to get the name of the current selection (establishment or "Global")
  const getEstablishmentName = (id: string | 'global'): string => {
    if (id === 'global') {
      return 'Global View';
    }
    const establishment = establishments.find(est => est.id === id);
    return establishment ? establishment.name : 'Unknown Establishment';
  };

  // Provide the state and setter to consuming components
  const contextValue: EstablishmentContextType = {
    currentEstablishmentId,
    setCurrentEstablishmentId,
    establishments, // Provide the full list
    getEstablishmentName,
  };

  return (
    <EstablishmentContext.Provider value={contextValue}>
      {children}
    </EstablishmentContext.Provider>
  );
};

// Custom hook to use the EstablishmentContext
export const useEstablishment = (): EstablishmentContextType => {
  const context = useContext(EstablishmentContext);
  if (context === undefined) {
    throw new Error('useEstablishment must be used within an EstablishmentProvider');
  }
  return context;
};
