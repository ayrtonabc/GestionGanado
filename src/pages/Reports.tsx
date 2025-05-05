import React from 'react';
import { FileText, Download, Filter, BarChart2 } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Raporty</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline-primary flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtry
          </button>
          <button className="btn btn-primary flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Eksportuj
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart2 className="w-8 h-8 text-primary" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Produkcja mleka</h3>
                  <p className="text-sm text-gray-500">Dzienny raport wydajności</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-secondary" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Finanse</h3>
                  <p className="text-sm text-gray-500">Miesięczne zestawienie</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-accent" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Stado</h3>
                  <p className="text-sm text-gray-500">Status i statystyki</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Historia raportów</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nazwa raportu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data generowania
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        Raport produkcji mleka
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2023-11-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      PDF
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Gotowy
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3">
                      Pobierz
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Udostępnij
                    </button>
                  </td>
                </tr>
                {/* Add more rows */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
