
import React, { useState, useMemo } from 'react';

const InputField = ({ label, unit, value, onChange }: { label: string, unit: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <input type="number" value={value} onChange={onChange} className="block w-full p-3 border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-500 sm:text-sm">{unit}</span>
            </div>
        </div>
    </div>
);

const PlesteranDindingCalculator: React.FC = () => {
    const [inputs, setInputs] = useState({
        panjang: '',
        tinggi: '',
        tebal: '15',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof typeof inputs) => {
        setInputs(prev => ({...prev, [name]: e.target.value }));
    };

    const results = useMemo(() => {
        const p = parseFloat(inputs.panjang);
        const t = parseFloat(inputs.tinggi);
        const tebalMm = parseFloat(inputs.tebal);

        if (p > 0 && t > 0 && tebalMm > 0) {
            const luasDinding = p * t;
            const tebalM = tebalMm / 1000;
            
            // Analisa SNI Plesteran 1:4
            const koefSemen = 6.24; // kg/m2
            const koefPasir = 0.024; // m3/m2
            
            const kebutuhanSemen = luasDinding * koefSemen * (tebalMm / 15);
            const kebutuhanPasir = luasDinding * koefPasir * (tebalMm / 15);
            
            return {
                luasDinding: luasDinding.toFixed(2),
                kebutuhanSemen: kebutuhanSemen.toFixed(2),
                kebutuhanPasir: kebutuhanPasir.toFixed(3),
            };
        }
        return null;

    }, [inputs]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Panjang Dinding" unit="meter" value={inputs.panjang} onChange={e => handleInputChange(e, 'panjang')} />
                <InputField label="Tinggi Dinding" unit="meter" value={inputs.tinggi} onChange={e => handleInputChange(e, 'tinggi')} />
                 <div className="md:col-span-2">
                    <InputField label="Tebal Plesteran" unit="mm" value={inputs.tebal} onChange={e => handleInputChange(e, 'tebal')} />
                </div>
            </div>

            {results && (
                 <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Hasil Perhitungan (untuk {results.luasDinding} m²):</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Kebutuhan Semen:</span>
                            <span className="font-bold text-lg text-blue-600">{results.kebutuhanSemen} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Kebutuhan Pasir:</span>
                            <span className="font-bold text-lg text-blue-600">{results.kebutuhanPasir} m³</span>
                        </div>
                    </div>
                     <p className="text-xs text-slate-500 mt-4">* Perhitungan berdasarkan SNI untuk plesteran 1:4 (Semen:Pasir) dengan tebal referensi 15mm.</p>
                </div>
            )}
        </div>
    );
};

export default PlesteranDindingCalculator;
