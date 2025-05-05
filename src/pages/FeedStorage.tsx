import React from 'react';
import { Plus, Filter, AlertCircle, Package, TrendingDown, BarChart2 } from 'lucide-react';

const FeedStorage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Magazyn pasz</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline-primary flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtry
          </button>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Dodaj zapas
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <span className="stat-title">Całkowite zapasy</span>
          <div className="stat-value">12,500 kg</div>
          <div className="stat-desc">Wszystkie rodzaje pasz</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Wartość zapasów</span>
          <div className="stat-value">45,000 zł</div>
          <div className="stat-desc">Szacowana wartość</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Niski stan</span>
          <div className="stat-value text-warning">2</div>
          <div className="stat-desc">Produkty do uzupełnienia</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Zużycie dzienne</span>
          <div className="stat-value">420 kg</div>
          <div className="stat-desc">Średnie zużycie</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Stan magazynowy</h2>
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
                        Min. stan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Pasza Premium
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Koncentrat
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        2,500 kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        500 kg
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
                  <h3 className="text-sm font-medium text-yellow-800">Niski stan magazynowy</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    Siano - pozostało 200 kg (minimum: 300 kg)
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <h3 className="text-sm font-medium text-red-800">Zbliżający się termin ważności</h3>
                  <p className="mt-1 text-sm text-red-700">
                    Premiks witaminowy - expires in 5 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Zużycie</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Pasza Premium</span>
                  <span className="text-sm font-medium text-gray-900">150 kg/dzień</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Siano</span>
                  <span className="text-sm font-medium text-gray-900">200 kg/dzień</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Kiszonka</span>
                  <span className="text-sm font-medium text-gray-900">70 kg/dzień</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedStorage;
