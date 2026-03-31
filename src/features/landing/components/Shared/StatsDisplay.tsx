// src/features/landing/components/shared/StatsDisplay.tsx
import React from 'react';

interface Stat {
  value: string;
  label: string;
  icon?: 'clock' | 'heart' | 'star';
}

interface StatsDisplayProps {
  stats: Stat[];
  variant?: 'inline' | 'grid';
  className?: string;
}

const icons = {
  clock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  variant = 'inline',
  className = '',
}) => {
  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-lg ${className}`}>
        {stats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            {index > 0 && <div className="w-px h-10 bg-gray-200" aria-hidden="true" />}
            <div className="flex items-center gap-3">
              {stat.icon && (
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  {icons[stat.icon]}
                </div>
              )}
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-6 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl font-light text-primary-color">{stat.value}</div>
          <div className="text-xs uppercase tracking-wider text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};