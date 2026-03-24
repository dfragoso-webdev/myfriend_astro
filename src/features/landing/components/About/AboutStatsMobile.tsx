// src/features/landing/components/About/AboutStatsMobile.tsx
import React from 'react';

interface AboutStatsMobileProps {
  stats: {
    number: string;
    label: string;
  };
  happyCustomers: string;
}

export const AboutStatsMobile: React.FC<AboutStatsMobileProps> = ({
  stats,
  happyCustomers
}) => (
  <div className="mt-8 flex gap-6 lg:hidden">
    <div>
      <div className="text-2xl font-light text-primary-color">
        {stats.number}
      </div>
      <div className="text-xs uppercase tracking-wider text-gray-500">
        {stats.label}
      </div>
    </div>
    <div>
      <div className="text-2xl font-light text-primary-color">100%</div>
      <div className="text-xs uppercase tracking-wider text-gray-500">
        {happyCustomers}
      </div>
    </div>
  </div>
);