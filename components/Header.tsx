
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-slate-800">Kalkulator Tukang Bangunan</h1>
                <p className="text-slate-600 mt-1">Solusi cepat dan akurat untuk semua kebutuhan perhitungan konstruksi Anda.</p>
            </div>
        </header>
    );
};

export default Header;
