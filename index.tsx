import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// --- TYPES ---
interface Calculator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

// --- SHARED COMPONENTS ---
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

// --- CALCULATOR COMPONENTS ---

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

// --- LAYOUT COMPONENTS ---

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

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 text-white mt-12">
            <div className="container mx-auto px-4 py-6 text-center">
                <p>&copy; {new Date().getFullYear()} Kalkulator Tukang Bangunan. Semua hak dilindungi.</p>
            </div>
        </footer>
    );
};

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


// --- CONSTANTS & CONFIG ---

const BrickIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4zM4 12h8m-8 4h16m-8-8h8" />
    </svg>
);

const TileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
    </svg>
);

const PaintIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0a4 4 0 004-4V5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12V5a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" />
    </svg>
);

const ConcreteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const CALCULATORS: Calculator[] = [
    { id: 'keramik', title: 'Kebutuhan Keramik', description: 'Hitung jumlah keramik, dus, dan nat yang dibutuhkan untuk lantai.', icon: <TileIcon />, component: KeramikCalculator },
    { id: 'dinding-bata', title: 'Dinding Bata', description: 'Estimasi kebutuhan bata merah atau batako, semen, dan pasir.', icon: <BrickIcon />, component: DindingBataCalculator },
    { id: 'plesteran-dinding', title: 'Plesteran Dinding', description: 'Kalkulasi kebutuhan semen dan pasir untuk plesteran dinding.', icon: <PaintIcon />, component: PlesteranDindingCalculator },
    { id: 'pengecatan-dinding', title: 'Pengecatan Dinding', description: 'Hitung kebutuhan cat berdasarkan luas dinding dan jumlah lapisan.', icon: <PaintIcon />, component: PengecatanDindingCalculator },
    { id: 'beton-sloof', title: 'Beton Sloof', description: 'Hitung volume dan material untuk pembuatan beton sloof.', icon: <ConcreteIcon />, component: PlaceholderCalculator },
    { id: 'rangka-atap', title: 'Rangka Atap Baja Ringan', description: 'Estimasi kebutuhan baja ringan untuk konstruksi atap.', icon: <BrickIcon />, component: PlaceholderCalculator },
    { id: 'pondasi-batu-kali', title: 'Pondasi Batu Kali', description: 'Kalkulasi volume dan material untuk pondasi batu kali.', icon: <ConcreteIcon />, component: PlaceholderCalculator },
    { id: 'pasang-paving-block', title: 'Pasang Paving Block', description: 'Hitung jumlah paving block dan pasir alas yang dibutuhkan.', icon: <TileIcon />, component: PlaceholderCalculator },
    { id: 'instalasi-listrik', title: 'Instalasi Listrik', description: 'Estimasi kebutuhan kabel, stop kontak, dan saklar per ruangan.', icon: <BrickIcon />, component: PlaceholderCalculator },
    { id: 'plafon-gipsum', title: 'Plafon Gipsum', description: 'Hitung kebutuhan gipsum, rangka hollow, dan komponen lainnya.', icon: <TileIcon />, component: PlaceholderCalculator },
    { id: 'bekisting', title: 'Bekisting Kolom', description: 'Hitung kebutuhan kayu dan paku untuk bekisting kolom.', icon: <ConcreteIcon />, component: PlaceholderCalculator },
    { id: 'pembesian-beton', title: 'Pembesian Beton', description: 'Kalkulasi total panjang dan berat besi beton yang dibutuhkan.', icon: <ConcreteIcon />, component: PlaceholderCalculator },
    { id: 'acian-dinding', title: 'Acian Dinding', description: 'Hitung kebutuhan semen instan atau campuran untuk acian.', icon: <PaintIcon />, component: PlaceholderCalculator },
    { id: 'rabat-beton', title: 'Rabat Beton', description: 'Estimasi kebutuhan material untuk lantai kerja atau rabat beton.', icon: <ConcreteIcon />, component: PlaceholderCalculator },
    { id: 'tangga-beton', title: 'Tangga Beton', description: 'Hitung volume beton dan pembesian untuk pembuatan tangga.', icon: <ConcreteIcon />, component: PlaceholderCalculator },
    { id: 'septic-tank', title: 'Galian Septic Tank', description: 'Hitung volume galian tanah untuk septic tank konvensional.', icon: <BrickIcon />, component: PlaceholderCalculator },
    { id: 'kusen-pintu-jendela', title: 'Kusen Pintu & Jendela', description: 'Estimasi kebutuhan kayu untuk pembuatan kusen.', icon: <BrickIcon />, component: PlaceholderCalculator },
    { id: 'pasang-genteng', title: 'Pasang Genteng', description: 'Hitung jumlah genteng dan reng yang diperlukan untuk atap.', icon: <TileIcon />, component: PlaceholderCalculator },
    { id: 'waterproofing', title: 'Waterproofing Dak', description: 'Hitung kebutuhan bahan waterproofing untuk dak beton.', icon: <PaintIcon />, component: PlaceholderCalculator },
    { id: 'sambungan-pipa', title: 'Sambungan Pipa Air', description: 'Estimasi kebutuhan pipa dan fitting untuk instalasi air bersih.', icon: <BrickIcon />, component: PlaceholderCalculator },
];

// --- PAGE COMPONENTS ---

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


// --- MAIN APP COMPONENT ---

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

// --- RENDER APPLICATION ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
