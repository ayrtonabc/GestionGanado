import React, { useState } from 'react';
import { Plus, Filter, Download, BarChart2 } from 'lucide-react';
import MilkProductionChart from '../components/dashboard/MilkProductionChart';
import { animals, milkQualityTests } from '../data/mockData';

const MilkProduction: React.FC = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');

  const totalDailyProduction = animals
    .filter(a => a.milkProduction && a.milkProduction.length > 0)
    .reduce((sum, animal) => {
      const lastRecord = animal.milkProduction![animal.milkProduction!.length - 1];
      return sum + lastRecord.total;
    }, 0);

  const milkingCows = animals.filter(a => a.status === 'lactating').length;
  const avgProduction = milkingCows > 0 ? totalDailyProduction / milkingCows : 0;

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toISOString().split('T')[0],
      total: 25 + Math.random() * 10,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Produkcja mleka</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline-primary flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Eksportuj dane
          </button>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Dodaj wpis
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <span className="stat-title">Dzienna produkcja</span>
          <div className="stat-value">{totalDailyProduction.toFixed(1)} L</div>
          <div className="stat-desc">Łączna produkcja z dzisiaj</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Średnia na krowę</span>
          <div className="stat-value">{avgProduction.toFixed(1)} L</div>
          <div className="stat-desc">Dzienna średnia na krowę</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Krowy w laktacji</span>
          <div className="stat-value">{milkingCows}</div>
          <div className="stat-desc">Aktywnie dojone krowy</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Jakość mleka</span>
          <div className="stat-value">A+</div>
          <div className="stat-desc">Ostatni test jakości</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart2 className="w-5 h-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium text-gray-900">Wykres produkcji</h2>
                </div>
                <div className="inline-flex rounded-md">
                  <button 
                    className={`px-3 py-1 text-sm font-medium rounded-l-md ${
                      period === 'day' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setPeriod('day')}
                  >
                    Dzień
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm font-medium ${
                      period === 'week' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setPeriod('week')}
                  >
                    Tydzień
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm font-medium rounded-r-md ${
                      period === 'month' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setPeriod('month')}
                  >
                    Miesiąc
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <MilkProductionChart data={chartData} period={period} />
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Ostatnie testy jakości</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {milkQualityTests.map((test, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Partia: {test.batchId}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(test.date).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        Zaakceptowane
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Tłuszcz:</p>
                        <p className="font-medium">{test.fatContent}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Białko:</p>
                        <p className="font-medium">{test.proteinContent}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilkProduction;
