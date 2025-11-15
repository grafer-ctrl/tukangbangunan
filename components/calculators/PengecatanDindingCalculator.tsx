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

const PengecatanDindingCalculator: React.FC = () => {
    const [inputs, setInputs] = useState({
        panjang: '',
        tinggi: '',
        lapisan: '2',
        dayaSebar: '10' // m²/liter
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof typeof inputs) => {
        setInputs(prev => ({...prev, [name]: e.target.value }));
    };

    const results = useMemo(() => {
        const p = parseFloat(inputs.panjang);
        const t = parseFloat(inputs.tinggi);
        const l = parseInt(inputs.lapisan, 10);
        const dS = parseFloat(inputs.dayaSebar);

        if (p > 0 && t > 0 && l > 0 && dS > 0) {
            const luasDinding = p * t;
            const totalLuasPengecatan = luasDinding * l;
            const totalCatLiter = totalLuasPengecatan / dS;
            const kalengUkuran5kg = Math.ceil(totalCatLiter / 4); // Asumsi 1 galon (5kg) = 4 liter
            const kalengUkuran25kg = Math.ceil(totalCatLiter / 20); // Asumsi 1 pail (25kg) = 20 liter

            return {
                luasDinding: luasDinding.toFixed(2),
                totalCatLiter: totalCatLiter.toFixed(2),
                kalengUkuran5kg,
                kalengUkuran25kg
            };
        }
        return null;

    }, [inputs]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Panjang Dinding" unit="meter" value={inputs.panjang} onChange={e => handleInputChange(e, 'panjang')} />
                <InputField label="Tinggi Dinding" unit="meter" value={inputs.tinggi} onChange={e => handleInputChange(e, 'tinggi')} />
                <InputField label="Jumlah Lapisan Cat" unit="lapis" value={inputs.lapisan} onChange={e => handleInputChange(e, 'lapisan')} />
                <InputField label="Daya Sebar Cat" unit="m²/liter" value={inputs.dayaSebar} onChange={e => handleInputChange(e, 'dayaSebar')} />
            </div>

            {results && (
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Hasil Perhitungan:</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Luas Dinding:</span>
                            <span className="font-bold text-lg text-blue-600">{results.luasDinding} m²</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Kebutuhan Cat:</span>
                            <span className="font-bold text-lg text-blue-600">{results.totalCatLiter} liter</span>
                        </div>
                         <hr className="border-dashed" />
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Estimasi Ukuran 5 kg (~4 liter):</span>
                            <span className="font-bold text-lg text-blue-600">{results.kalengUkuran5kg} kaleng</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-slate-600">Estimasi Ukuran 25 kg (~20 liter):</span>
                            <span className="font-bold text-lg text-blue-600">{results.kalengUkuran25kg} kaleng</span>
                        </div>
                    </div>
                     <p className="text-xs text-slate-500 mt-4">* Daya sebar cat dapat bervariasi tergantung merk dan jenis cat. Periksa kemasan cat untuk data yang lebih akurat.</p>
                </div>
            )}
        </div>
    );
};

export default PengecatanDindingCalculator;
