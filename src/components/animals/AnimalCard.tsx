import React from 'react';
import { Animal } from '../../types';
import AnimalStatus from './AnimalStatus';
import { Link } from 'react-router-dom';
import { Cog as Cow, Calendar, MapPin, Weight, Scale } from 'lucide-react';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <Link 
      to={`/animals/${animal.id}`} 
      className="block h-full transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 bg-primary/5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {animal.name || `Animal ${animal.identifier}`}
            </h3>
            <AnimalStatus status={animal.status} />
          </div>
          <p className="mt-1 text-sm text-gray-500">{animal.identifier}</p>
        </div>
        
        <div className="flex-grow p-4 space-y-3">
          <div className="flex items-center text-sm text-gray-700">
            <Cow className="w-4 h-4 mr-2 text-gray-500" />
            <span>{animal.breed}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <span>Born: {new Date(animal.birthDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            <span>{animal.location}{animal.group ? ` (${animal.group})` : ''}</span>
          </div>
          
          {animal.weight && (
            <div className="flex items-center text-sm text-gray-700">
              <Weight className="w-4 h-4 mr-2 text-gray-500" />
              <span>{animal.weight} kg</span>
            </div>
          )}
          
          {animal.status === 'lactating' && animal.milkProduction && animal.milkProduction.length > 0 && (
            <div className="flex items-center text-sm text-primary font-medium">
              <Scale className="w-4 h-4 mr-2" />
              <span>Last yield: {animal.milkProduction[animal.milkProduction.length - 1].total} L</span>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-gray-50 text-right">
          <span className="text-sm font-medium text-primary hover:text-primary-dark">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AnimalCard;
