
import React from 'react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <div>{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
          <p className="text-slate-500 mt-1 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;
