import React, { useState } from 'react';
import { WifiPackage } from '../types';
import { INITIAL_PACKAGES } from '../data/mockData';
import { 
  Zap, Check, ShieldCheck, Cpu, Smartphone, Tv, HardDrive, 
  HelpCircle, ChevronRight, Sparkles, Filter, Calculator, CheckCircle2 
} from 'lucide-react';

interface PackagesCatalogProps {
  onSelectPackageToRegister: (pkg: WifiPackage) => void;
}

export const PackagesCatalog: React.FC<PackagesCatalogProps> = ({ onSelectPackageToRegister }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'home' | 'business' | 'addon'>('all');
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  // Calculator State
  const [devicesCount, setDevicesCount] = useState<number>(4);
  const [streaming4k, setStreaming4k] = useState<boolean>(true);
  const [gaming, setGaming] = useState<boolean>(true);
  const [cctvCount, setCctvCount] = useState<number>(2);

  const filteredPackages = INITIAL_PACKAGES.filter(pkg => {
    if (activeTab === 'all') return true;
    return pkg.category === activeTab;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Calculate recommended package based on usage
  const getRecommendedSpeed = () => {
    let speedNeeded = devicesCount * 5;
    if (streaming4k) speedNeeded += 15;
    if (gaming) speedNeeded += 10;
    speedNeeded += cctvCount * 4;

    if (speedNeeded <= 15) return INITIAL_PACKAGES.find(p => p.id === 'pkg-home-10')!;
    if (speedNeeded <= 35) return INITIAL_PACKAGES.find(p => p.id === 'pkg-home-30')!;
    if (speedNeeded <= 65) return INITIAL_PACKAGES.find(p => p.id === 'pkg-home-50')!;
    return INITIAL_PACKAGES.find(p => p.id === 'pkg-home-100')!;
  };

  const recommendedPkg = getRecommendedSpeed();

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header Title Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold">
          <Zap className="w-4 h-4 text-pink-400" />
          <span>DAFTAR PAKET BROADBAND SIMPINK NET</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Pilih Paket WiFi <span className="bg-gradient-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Fiber Optic</span> Terbaik
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Nikmati koneksi internet unlimited simetris 100% Fiber Optic tanpa FUP, tanpa batas kuota, latensi rendah untuk game online & kerja dari rumah.
        </p>

        {/* Speed Calculator Banner Toggle Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800 to-pink-950 hover:from-slate-700 hover:to-pink-900 border border-pink-500/40 text-pink-200 text-xs sm:text-sm font-bold shadow-lg transition-all"
          >
            <Calculator className="w-4 h-4 text-pink-400" />
            <span>Bingung Pilih Paket? Hitung Kebutuhan Kecepatan Di Sini</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Interactive Speed Calculator Modal / Box */}
      {showCalculator && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-pink-950 p-6 lg:p-8 rounded-3xl border-2 border-pink-500/50 shadow-2xl max-w-3xl mx-auto space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/40">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Kalkulator Kebutuhan WiFi</h3>
                <p className="text-xs text-slate-300">Sesuaikan jumlah perangkat & aktivitas harian Anda</p>
              </div>
            </div>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1 rounded-lg bg-slate-800"
            >
              Tutup [X]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300">
            {/* Devices Slider */}
            <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
              <label className="flex justify-between font-bold text-white">
                <span>Jumlah Perangkat (HP/Laptop):</span>
                <span className="text-pink-400 font-mono text-sm">{devicesCount} Perangkat</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={devicesCount}
                onChange={(e) => setDevicesCount(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            {/* CCTV Count */}
            <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
              <label className="flex justify-between font-bold text-white">
                <span>Jumlah Kamera CCTV Online:</span>
                <span className="text-pink-400 font-mono text-sm">{cctvCount} Kamera</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={cctvCount}
                onChange={(e) => setCctvCount(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            {/* Checkboxes for 4K and Gaming */}
            <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
              <span className="font-bold text-white">Streaming 4K / Smart TV:</span>
              <button
                onClick={() => setStreaming4k(!streaming4k)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  streaming4k ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {streaming4k ? 'YA (Aktif)' : 'TIDAK'}
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
              <span className="font-bold text-white">Sering Game Online (Low Latency):</span>
              <button
                onClick={() => setGaming(!gaming)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  gaming ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {gaming ? 'YA (Aktif)' : 'TIDAK'}
              </button>
            </div>
          </div>

          {/* Calculator Result Box */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">Rekomendasi Paket Simpink Net:</span>
              <h4 className="text-lg font-black text-white">{recommendedPkg.name}</h4>
              <p className="text-xs text-slate-300">{recommendedPkg.speedMbps} Mbps Dedicated Fiber • {formatRupiah(recommendedPkg.priceMonthly)} / bln</p>
            </div>

            <button
              onClick={() => {
                setShowCalculator(false);
                onSelectPackageToRegister(recommendedPkg);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30 whitespace-nowrap"
            >
              Daftar Paket Rekomendasi Ini
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Semua Paket
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            🏡 Paket Rumah (Home Fiber)
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'business'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            🏢 Paket Bisnis & Cafe
          </button>
          <button
            onClick={() => setActiveTab('addon')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'addon'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            ⚡ Booster & Add-on
          </button>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => {
          return (
            <div
              key={pkg.id}
              className={`relative bg-slate-800/90 rounded-3xl p-7 border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl ${
                pkg.isPopular
                  ? 'border-2 border-pink-500 ring-2 ring-pink-500/20 bg-gradient-to-b from-slate-800 via-slate-800 to-pink-950/40'
                  : pkg.isDedicated
                  ? 'border-cyan-500/50 bg-gradient-to-b from-slate-800 to-cyan-950/30'
                  : 'border-slate-700/80 hover:border-pink-500/50'
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg border border-pink-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>TERFAVORIT KELUARGA</span>
                </div>
              )}

              {pkg.isDedicated && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg border border-cyan-300">
                  DEDICATED BANDWIDTH 1:1
                </div>
              )}

              <div className="space-y-6 pt-2">
                
                {/* Header Info */}
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-pink-400 block mb-1">
                    {pkg.category === 'home' ? 'Home Broadband' : pkg.category === 'business' ? 'Business Fiber' : 'Add-on Booster'}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Speed & Price Display */}
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/70 space-y-1">
                  {pkg.speedMbps > 0 && (
                    <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs text-slate-400 font-medium">Kecepatan:</span>
                      <span className="text-2xl font-black text-pink-300 font-mono">{pkg.speedMbps} <span className="text-xs font-normal text-slate-400">Mbps</span></span>
                    </div>
                  )}

                  <div className="pt-2 flex items-baseline justify-between">
                    <span className="text-xs text-slate-400 font-medium">Biaya Bulanan:</span>
                    <div>
                      <span className="text-2xl font-black text-white">{formatRupiah(pkg.priceMonthly)}</span>
                      <span className="text-[11px] text-slate-400 font-normal"> / bln</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 text-xs text-slate-300">
                  <span className="font-bold text-white text-[11px] uppercase tracking-wider block">Fasilitas & Keunggulan:</span>
                  <ul className="space-y-2">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-700/80 mt-6">
                <button
                  onClick={() => onSelectPackageToRegister(pkg)}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-600/30'
                      : 'bg-slate-700 hover:bg-slate-600 text-white hover:text-pink-200'
                  }`}
                >
                  <span>Daftar Paket Ini Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* SLA & Guarantee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/70 space-y-2">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-sm">100% Pure Fiber Optic</h4>
          <p className="text-xs text-slate-400">Jaringan serat optik hingga ke dalam rumah tanpa interferensi cuaca hujan.</p>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/70 space-y-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-sm">Gratis Biaya Pemasangan</h4>
          <p className="text-xs text-slate-400">Dapatkan gratis instalasi kabel & modem router dual-band untuk pendaftaran bulan ini.</p>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/70 space-y-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-sm">Layanan CS & Teknisi 24/7</h4>
          <p className="text-xs text-slate-400">Tim teknisi lokal Simpink Net standby membantu jika terjadi kendala jaringan.</p>
        </div>
      </div>

    </div>
  );
};
