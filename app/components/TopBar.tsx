import { useState } from 'react';

interface TopBarProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export function TopBar({ dateRange, onDateRangeChange }: TopBarProps) {
  const dateRanges = ['7d', '14d', '30d'];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Supply<span className="text-blue-600">Sight</span>
        </h1>
        
        <div className="flex gap-2">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => onDateRangeChange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dateRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}