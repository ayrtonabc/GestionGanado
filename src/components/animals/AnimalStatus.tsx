import React from 'react';
import { AnimalStatus as StatusType } from '../../types';

interface AnimalStatusProps {
  status: StatusType;
}

const AnimalStatus: React.FC<AnimalStatusProps> = ({ status }) => {
  const getStatusBadgeClass = () => {
    switch (status) {
      case 'calf':
        return 'bg-blue-100 text-blue-800';
      case 'heifer':
        return 'bg-purple-100 text-purple-800';
      case 'lactating':
        return 'bg-green-100 text-green-800';
      case 'dry':
        return 'bg-yellow-100 text-yellow-800';
      case 'pregnant':
        return 'bg-pink-100 text-pink-800';
      case 'bull':
        return 'bg-indigo-100 text-indigo-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      case 'deceased':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default AnimalStatus;
