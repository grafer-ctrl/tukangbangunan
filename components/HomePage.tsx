
import React from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../constants.tsx';
import CalculatorCard from './CalculatorCard.tsx';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
        <h2 className="text-4xl font-bold text-slate-800">Mulai Menghitung</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Temukan berbagai alat, referensi, dan panduan untuk membantu Anda merencanakan dan membangun proyek dengan efisien.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALCULATORS.map((calculator) => (
          <Link to={`/kalkulator/${calculator.id}`} key={calculator.id} className="block">
            <CalculatorCard 
              title={calculator.title}
              description={calculator.description}
              icon={calculator.icon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;