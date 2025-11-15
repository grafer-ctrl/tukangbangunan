
import React from 'react';

const PlaceholderCalculator: React.FC = () => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
                <div className="py-1">
                    <svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8h2v2H9v-2z"/></svg>
                </div>
                <div>
                    <p className="font-bold">Segera Hadir</p>
                    <p className="text-sm">Kalkulator ini sedang dalam pengembangan dan akan segera tersedia. Terima kasih atas kesabaran Anda!</p>
                </div>
            </div>
        </div>
    );
};

export default PlaceholderCalculator;
