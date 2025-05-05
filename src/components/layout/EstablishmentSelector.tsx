import React from 'react';
import { Building2, Globe } from 'lucide-react'; // Import Globe icon
import { useEstablishment } from '../../context/EstablishmentContext'; // Import the hook

// No props needed as we get everything from context now
const EstablishmentSelector: React.FC = () => {
  // Get state and functions from the context
  const { 
    currentEstablishmentId, 
    setCurrentEstablishmentId, 
    establishments,
    getEstablishmentName 
  } = useEstablishment();

  const getEstablishmentType = (type: string): string => {
    const types = {
      dairy: 'Mleczne',
      breeding: 'Hodowlane',
      fattening: 'Opasowe'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="relative group">
      {/* Button displays the current selection name */}
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        {currentEstablishmentId === 'global' ? (
          <Globe className="w-5 h-5 text-primary" />
        ) : (
          <Building2 className="w-5 h-5 text-primary" />
        )}
        <span className="font-medium text-gray-900">
          {getEstablishmentName(currentEstablishmentId)}
        </span>
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {/* Global View Option */}
          <button
            key="global"
            className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-colors ${
              currentEstablishmentId === 'global'
                ? 'bg-primary/5 text-primary'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setCurrentEstablishmentId('global')}
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Global View</h3>
              <p className="text-xs text-gray-500">Show data from all establishments</p>
            </div>
          </button>

          {/* Divider */}
          <div className="my-1 border-t border-gray-100"></div>

          {/* Establishment Options */}
          {establishments.map((establishment) => (
            <button
              key={establishment.id}
              className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                establishment.id === currentEstablishmentId
                  ? 'bg-primary/5 text-primary'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setCurrentEstablishmentId(establishment.id)}
            >
              <div className="flex-shrink-0">
                {establishment.type === 'dairy' && (
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
                {establishment.type === 'breeding' && (
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
                {establishment.type === 'fattening' && (
                  <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{establishment.name}</h3>
                <p className="text-xs text-gray-500">{establishment.location}</p>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {getEstablishmentType(establishment.type)}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {establishment.capacity} sztuk
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstablishmentSelector;
