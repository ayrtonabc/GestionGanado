import React from 'react';
import { Plus, Filter, AlertCircle, Pill, Calendar } from 'lucide-react';

const Medications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Leki</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline-primary flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtry
          </button>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Dodaj lek
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <span className="stat-title">Całkowity zapas</span>
          <div className="stat-value">45</div>
          <div className="stat-desc">Różne leki</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Wartość</span>
          <div className="stat-value">12,500 zł</div>
          <div className="stat-desc">Szacowana wartość</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Niski stan</span>
          <div className="stat-value text-warning">3</div>
          <div className="stat-desc">Leki do uzupełnienia</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Przeterminowane</span>
          <div className="stat-value text-error">1</div>
          <div className="stat-desc">Do utylizacji</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Inwentarz leków</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nazwa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Typ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data ważności
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Antybiotyk X
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Antybiotyk
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        500 ml
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2024-05-30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          OK
                        </span>
                      </td>
                    </tr>
                    {/* Add more rows */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-warning" />
                <h2 className="text-lg font-medium text-gray-900">Alerty</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <h3 className="text-sm font-medium text-yellow-800">Niski stan</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    Antybiotyk Y - pozostało 50 ml (minimum: 100 ml)
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <h3 className="text-sm font-medium text-red-800">Termin ważności</h3>
                  <p className="mt-1 text-sm text-red-700">
                    Witamina Z - wygasa za 5 dni
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Zaplanowane podania</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Antybiotyk X</p>
                    <p className="text-xs text-gray-500">Krowa #1234</p>
                  </div>
                  <span className="text-sm text-gray-500">Dziś, 14:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Witamina D</p>
                    <p className="text-xs text-gray-500">Grupa cieląt</p>
                  </div>
                  <span className="text-sm text-gray-500">Jutro, 09:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medications;
