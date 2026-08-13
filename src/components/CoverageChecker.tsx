import React, { useState } from 'react';
import { COVERAGE_AREAS } from '../data/mockData';
import { Search, MapPin, CheckCircle2, Clock, AlertCircle, PhoneCall, Radio, Send, ShieldCheck } from 'lucide-react';

interface CoverageCheckerProps {
  onRegisterLocation: (locationName: string) => void;
}

export const CoverageChecker: React.FC<CoverageCheckerProps> = ({ onRegisterLocation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customAddress, setCustomAddress] = useState<string>('');
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  const filteredAreas = COVERAGE_AREAS.filter(area => 
    area.regionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestODP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAddress) return;
    setRequestSubmitted(true);
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 lg:p-10 border border-slate-700 shadow-2xl space-y-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold">
            <Radio className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>PETA FIBER OPTIC SIMPINK NET</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Cek Jangkauan Fiber Optic Di Area Anda
          </h1>

          <p className="text-slate-300 text-sm">
            Ketik nama Kota, Kecamatan, atau nama Perumahan Anda untuk mengecek ketersediaan port ODP (Optical Distribution Point) Simpink Net.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl">
          <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-2xl border border-slate-700 focus-within:border-pink-500 transition-all">
            <Search className="w-5 h-5 text-pink-400 shrink-0 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Kota / Perumahan (Contoh: Jakarta, Bandung, Simpink, Kebayoran)..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Area List Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-pink-400" />
          <span>Daftar Wilayah Tercover ({filteredAreas.length} Wilayah)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 hover:border-pink-500/50 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-pink-400 uppercase font-bold">{area.district}, {area.city}</span>
                    <h4 className="text-base font-extrabold text-white mt-0.5">{area.regionName}</h4>
                  </div>

                  {area.status === 'AVAILABLE' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>TERCOVER</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                      <Clock className="w-3 h-3" />
                      <span>EKSPANSI</span>
                    </span>
                  )}
                </div>

                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kode ODP OLT:</span>
                    <span className="text-pink-300 font-bold">{area.odpCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Port Tersedia:</span>
                    <span className={area.availablePorts > 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                      {area.availablePorts > 0 ? `${area.availablePorts} Port Kosong` : 'Port Penuh (Dalam Penambahan)'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRegisterLocation(`${area.regionName}, ${area.district}, ${area.city}`)}
                className="w-full py-2.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Daftar Pemasangan Di Lokasi Ini</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Request Coverage for New Address */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl border border-pink-500/30 shadow-xl max-w-2xl mx-auto space-y-6">
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-black text-white">Alamat Anda Belum Ada Di Daftar?</h3>
          <p className="text-xs text-slate-300">
            Kirimkan alamat lengkap lokasi rumah/kantor Anda untuk survey penarikan tiang & penambahan port ODP Simpink Net.
          </p>
        </div>

        {requestSubmitted ? (
          <div className="bg-emerald-950/60 p-6 rounded-2xl border border-emerald-500/40 text-center space-y-2 text-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-base text-white">Pengajuan Survey Berhasil Diterima!</h4>
            <p className="text-xs">
              Tim Lapangan Simpink Net akan menghubungi Anda via WhatsApp untuk jadwal survey teknisi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRequestODP} className="space-y-4">
            <textarea
              required
              rows={3}
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="Masukkan alamat lengkap (Nama Jalan, No. Rumah, RT/RW, Kecamatan, Kota)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Permintaan Survey Jaringan Baru</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
