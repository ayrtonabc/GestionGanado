import React from 'react';
import { Plus, Calendar, Search } from 'lucide-react';
import { veterinaryVisits } from '../data/mockData';

const Veterinary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Wizyty weterynaryjne</h1>
        <button className="btn btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Zaplanuj wizytę
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">Następna wizyta</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-900">15 grudnia 2023</p>
                <p className="text-sm text-gray-500">dr Jan Kowalski</p>
              </div>
              <button className="btn btn-outline-primary text-sm">
                Szczegóły
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">Statystyki miesięczne</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Wizyty</p>
                <p className="text-lg font-medium text-gray-900">8</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Koszty</p>
                <p className="text-lg font-medium text-gray-900">2,450 zł</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">Szybkie akcje</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <button className="btn btn-outline-primary w-full text-sm">
                Dodaj notatkę
              </button>
              <button className="btn btn-outline-primary w-full text-sm">
                Przeglądaj dokumenty
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-grow max-w-sm">
              <input
                type="text"
                placeholder="Szukaj wizyt..."
                className="input pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weterynarz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zwierzęta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Koszt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {veterinaryVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(visit.date).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.veterinarian}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.type === 'routine' ? 'Rutynowa' : visit.type === 'emergency' ? 'Nagła' : 'Kontrolna'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.animals.length} zwierząt
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.cost} zł
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href={`/veterinary/${visit.id}`} className="text-primary hover:text-primary-dark mr-3">
                        Szczegóły
                      </a>
                      <button className="text-gray-600 hover:text-gray-900">
                        Edytuj
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Veterinary;
