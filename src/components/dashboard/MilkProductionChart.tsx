import React from 'react';

interface MilkData {
  date: string;
  total: number;
}

interface MilkProductionChartProps {
  data: MilkData[];
  period: 'day' | 'week' | 'month';
}

const MilkProductionChart: React.FC<MilkProductionChartProps> = ({ data, period }) => {
  // Find the max value to scale the chart
  const maxValue = Math.max(...data.map((item) => item.total));
  
  // Format the date based on the period
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (period === 'day') return date.toLocaleDateString('en-US', { day: 'numeric' });
    if (period === 'week') return `Week ${Math.ceil(date.getDate() / 7)}`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full h-64">
      <div className="flex items-end h-48 space-x-2">
        {data.map((item, index) => {
          const heightPercentage = (item.total / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full">
                <div
                  className="bg-primary hover:bg-primary-dark transition-colors rounded-t-md w-full"
                  style={{ height: `${heightPercentage}%` }}
                >
                  <div className="absolute -top-8 w-full text-center text-sm font-medium text-gray-700">
                    {item.total.toFixed(1)} L
                  </div>
                </div>
              </div>
              <div className="w-full pt-2 text-xs text-center truncate">{formatDate(item.date)}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-sm font-medium text-gray-500">
          {data.length > 0 ? formatDate(data[0].date) : ''}
        </div>
        <div className="text-sm font-medium text-gray-500">
          {data.length > 0 ? formatDate(data[data.length - 1].date) : ''}
        </div>
      </div>
    </div>
  );
};

export default MilkProductionChart;
