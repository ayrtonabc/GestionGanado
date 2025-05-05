import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
  };

  return (
    <div className="stat-card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <span className="stat-title">{title}</span>
        <div className={`p-2 rounded-md ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="flex items-center mt-2">
        {trend && (
          <div className={`flex items-center mr-2 text-sm ${trend.positive ? 'text-success' : 'text-error'}`}>
            <span className="inline-block mr-1">
              {trend.positive ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
            </span>
            <span>{trend.value}%</span>
          </div>
        )}
        {description && <span className="stat-desc">{description}</span>}
      </div>
    </div>
  );
};

export default StatCard;
