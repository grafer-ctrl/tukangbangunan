
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CalculatorPage from './components/CalculatorPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kalkulator/:calculatorId" element={<CalculatorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
