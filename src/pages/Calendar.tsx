import React from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Kalendarz</h1>
        <button className="btn btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nowe wydarzenie
        </button>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline-primary">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-medium text-gray-900">Listopad 2023</h2>
              <button className="btn btn-outline-primary">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="btn btn-outline-primary">Dzień</button>
              <button className="btn btn-outline-primary">Tydzień</button>
              <button className="bg-primary text-white btn">Miesiąc</button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">Pon</div>
            <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">Wt</div>
            <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">Śr</div>
            <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">Czw</div>
            <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">Pt</div>
            <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">Sob</div>
            <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">Nd</div>

            {/* Calendar grid */}
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-2 h-32 border-t first:border-t-0 border-gray-200"
              >
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{index + 1}</span>
                  {index === 14 && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                      15
                    </span>
                  )}
                </div>
                {index === 14 && (
                  <div className="mt-2">
                    <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1">
                      Wizyta wet. 10:00
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs p-1 rounded">
                      Szczepienia
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
