
import React from 'react';
import type { Calculator } from './types.ts';
import KeramikCalculator from './components/calculators/KeramikCalculator.tsx';
import DindingBataCalculator from './components/calculators/DindingBataCalculator.tsx';
import PlesteranDindingCalculator from './components/calculators/PlesteranDindingCalculator.tsx';
import PengecatanDindingCalculator from './components/calculators/PengecatanDindingCalculator.tsx';
import PlaceholderCalculator from './components/calculators/PlaceholderCalculator.tsx';

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


export const CALCULATORS: Calculator[] = [
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