
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

const DindingBataCalculator: React.FC = () => {
    const [inputs, setInputs] = useState({
        panjang: '',
        tinggi: '',
        jenisBata: 'merah'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof typeof inputs) => {
        setInputs(prev => ({...prev, [name]: e.target.value }));
    };

     const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInputs(prev => ({ ...prev, jenisBata: e.target.value }));
    };

    const results = useMemo(() => {
        const p = parseFloat(inputs.panjang);
        const t = parseFloat(inputs.tinggi);

        if (p > 0 && t > 0) {
            const luasDinding = p * t;
            let kebutuhanBata, kebutuhanSemen, kebutuhanPasir;
            
            if (inputs.jenisBata === 'merah') {
                kebutuhanBata = luasDinding * 70; // bata/m2
                kebutuhanSemen = luasDinding * 11.5; // kg/m2
                kebutuhanPasir = luasDinding * 0.04; // m3/m2
            } else { // batako
                kebutuhanBata = luasDinding * 11; // buah/m2
                kebutuhanSemen = luasDinding * 9.68; // kg/m2
                kebutuhanPasir = luasDinding * 0.038; // m3/m2
            }
            
            return {
                luasDinding: luasDinding.toFixed(2),
                kebutuhanBata: Math.ceil(kebutuhanBata).toLocaleString(),
                kebutuhanSemen: kebutuhanSemen.toFixed(2),
                kebutuhanPasir: kebutuhanPasir.toFixed(3)
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
                    <label htmlFor="jenis-bata" className="block text-sm font-medium text-slate-700">Jenis Bata</label>
                    <select id="jenis-bata" value={inputs.jenisBata} onChange={handleSelectChange} className="mt-1 block w-full p-3 border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option value="merah">Bata Merah (Standar)</option>
                        <option value="batako">Batako (20x40cm)</option>
                    </select>
                </div>
            </div>

            {results && (
                 <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Hasil Perhitungan (untuk {results.luasDinding} m²):</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Kebutuhan Bata:</span>
                            <span className="font-bold text-lg text-blue-600">{results.kebutuhanBata} buah</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Kebutuhan Semen Pasangan:</span>
                            <span className="font-bold text-lg text-blue-600">{results.kebutuhanSemen} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Kebutuhan Pasir Pasangan:</span>
                            <span className="font-bold text-lg text-blue-600">{results.kebutuhanPasir} m³</span>
                        </div>
                    </div>
                     <p className="text-xs text-slate-500 mt-4">* Perhitungan berdasarkan Standar Nasional Indonesia (SNI). Hasil dapat bervariasi.</p>
                </div>
            )}
        </div>
    );
};

export default DindingBataCalculator;
