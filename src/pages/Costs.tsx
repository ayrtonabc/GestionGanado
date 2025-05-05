import React, { useState } from 'react';
import { Plus, Filter, Download, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { expenses } from '../data/mockData';

const Costs: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgExpensePerDay = totalExpenses / 30; // Simplified calculation

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const getCategoryTranslation = (category: string): string => {
    const translations: Record<string, string> = {
      feed: 'Pasza',
      medication: 'Leki',
      veterinary: 'Weterynarz',
      equipment: 'Sprzęt',
      labor: 'Praca',
      other: 'Inne'
    };
    return translations[category] || category;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Koszty</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline-primary flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Eksportuj raport
          </button>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Dodaj wydatek
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <span className="stat-title">Całkowite wydatki</span>
          <div className="stat-value">{totalExpenses.toLocaleString('pl-PL')} zł</div>
          <div className="stat-desc">W tym miesiącu</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Średni dzienny koszt</span>
          <div className="stat-value">{avgExpensePerDay.toFixed(0)} zł</div>
          <div className="stat-desc">Średnia z 30 dni</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Największy wydatek</span>
          <div className="stat-value">Pasza</div>
          <div className="stat-desc">45% całkowitych kosztów</div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Trend</span>
          <div className="stat-value text-success">-5.2%</div>
          <div className="stat-desc">W porównaniu z poprzednim miesiącem</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium text-gray-900">Historia wydatków</h2>
                </div>
                <div className="inline-flex rounded-md">
                  <select 
                    className="select text-sm"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="week">Tydzień</option>
                    <option value="month">Miesiąc</option>
                    <option value="quarter">Kwartał</option>
                    <option value="year">Rok</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Opis
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kwota
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(expense.date).toLocaleDateString('pl-PL')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            {getCategoryTranslation(expense.category)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expense.amount.toLocaleString('pl-PL')} zł
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Podział wydatków</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(expensesByCategory).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full bg-primary mr-2`}></div>
                      <span className="text-sm font-medium text-gray-700">
                        {getCategoryTranslation(category)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900 font-medium">
                      {amount.toLocaleString('pl-PL')} zł
                    </span>
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

export default Costs;
