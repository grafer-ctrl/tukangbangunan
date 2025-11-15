
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CALCULATORS } from '../constants.tsx';

const CalculatorPage: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const calculator = CALCULATORS.find(c => c.id === calculatorId);

  if (!calculator) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Kalkulator tidak ditemukan</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Kembali ke Beranda</Link>
      </div>
    );
  }

  const CalculatorComponent = calculator.component;

  return (
    <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke semua kalkulator
        </Link>
      <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
        <div className="flex items-center mb-6">
            <div className="mr-4">{calculator.icon}</div>
            <div>
                <h1 className="text-3xl font-bold text-slate-800">{calculator.title}</h1>
                <p className="text-slate-500">{calculator.description}</p>
            </div>
        </div>
        <hr className="my-6"/>
        <CalculatorComponent />
      </div>
    </div>
  );
};

export default CalculatorPage;