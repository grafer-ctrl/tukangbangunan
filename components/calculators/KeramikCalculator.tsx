
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

const KeramikCalculator: React.FC = () => {
    const [inputs, setInputs] = useState({
        panjangRuangan: '',
        lebarRuangan: '',
        panjangKeramik: '40',
        lebarKeramik: '40',
        isiDus: '6',
        lebarNat: '3'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof typeof inputs) => {
        setInputs(prev => ({...prev, [name]: e.target.value }));
    };

    const results = useMemo(() => {
        const pR = parseFloat(inputs.panjangRuangan) * 100; // cm
        const lR = parseFloat(inputs.lebarRuangan) * 100; // cm
        const pK = parseFloat(inputs.panjangKeramik); // cm
        const lK = parseFloat(inputs.lebarKeramik); // cm
        const isi = parseInt(inputs.isiDus, 10);
        const nat = parseFloat(inputs.lebarNat) / 10; // cm

        if (pR > 0 && lR > 0 && pK > 0 && lK > 0 && isi > 0 && nat >= 0) {
            const luasArea = (pR / 100) * (lR / 100);
            
            const keramikDenganNatP = pK + nat;
            const keramikDenganNatL = lK + nat;
            
            const butuhKeramikP = Math.ceil(pR / keramikDenganNatP);
            const butuhKeramikL = Math.ceil(lR / keramikDenganNatL);
            
            const totalKeramik = butuhKeramikP * butuhKeramikL;
            const totalDus = Math.ceil(totalKeramik / isi);

            return {
                luasArea: luasArea.toFixed(2),
                totalKeramik: totalKeramik.toLocaleString(),
                totalDus: totalDus.toLocaleString()
            };
        }
        return null;

    }, [inputs]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Panjang Ruangan" unit="meter" value={inputs.panjangRuangan} onChange={e => handleInputChange(e, 'panjangRuangan')} />
                <InputField label="Lebar Ruangan" unit="meter" value={inputs.lebarRuangan} onChange={e => handleInputChange(e, 'lebarRuangan')} />
                <InputField label="Panjang Keramik" unit="cm" value={inputs.panjangKeramik} onChange={e => handleInputChange(e, 'panjangKeramik')} />
                <InputField label="Lebar Keramik" unit="cm" value={inputs.lebarKeramik} onChange={e => handleInputChange(e, 'lebarKeramik')} />
                <InputField label="Isi Keramik per Dus" unit="buah" value={inputs.isiDus} onChange={e => handleInputChange(e, 'isiDus')} />
                <InputField label="Lebar Nat / Sambungan" unit="mm" value={inputs.lebarNat} onChange={e => handleInputChange(e, 'lebarNat')} />
            </div>

            {results && (
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Hasil Perhitungan:</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Luas Area Pemasangan:</span>
                            <span className="font-bold text-lg text-blue-600">{results.luasArea} m²</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Kebutuhan Keramik (approx.):</span>
                            <span className="font-bold text-lg text-blue-600">{results.totalKeramik} buah</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Jumlah Dus yang Dibutuhkan:</span>
                            <span className="font-bold text-lg text-blue-600">{results.totalDus} dus</span>
                        </div>
                    </div>
                     <p className="text-xs text-slate-500 mt-4">* Hasil perhitungan adalah estimasi. Disarankan untuk membeli 5-10% lebih banyak untuk cadangan.</p>
                </div>
            )}
        </div>
    );
};

export default KeramikCalculator;
