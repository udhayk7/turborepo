import React from 'react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  className?: string;
};

export function StatsCard({
  title,
  value,
  description,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("bg-white p-5 rounded-lg border border-gray-200", className)}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary-50">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {description && (
          <span className="text-xs text-gray-500 mt-1">{description}</span>
        )}
      </div>
    </div>
  );
}
