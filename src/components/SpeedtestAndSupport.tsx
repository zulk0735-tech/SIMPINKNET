import React, { useState } from 'react';
import { DisruptionTicket } from '../types';
import { 
  Wifi, Gauge, RefreshCw, Send, CheckCircle2, AlertTriangle, 
  HelpCircle, ChevronDown, ChevronUp, LifeBuoy, ShieldCheck, Wrench 
} from 'lucide-react';

export const SpeedtestAndSupport: React.FC = () => {
  // Speedtest State
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [pingMs, setPingMs] = useState<number>(0);
  const [testStage, setTestStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');

  // Support Form State
  const [subId, setSubId] = useState<string>('SPN-2026-01');
  const [subName, setSubName] = useState<string>('Ahmad Subagja');
  const [issueType, setIssueType] = useState<'slow' | 'blinking_red' | 'offline' | 'other'>('slow');
  const [description, setDescription] = useState<string>('');
  const [submittedTicket, setSubmittedTicket] = useState<DisruptionTicket | null>(null);

  // FAQ Toggle
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const startSpeedTest = () => {
    setIsTesting(true);
    setTestStage('ping');
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPingMs(0);

    // Step 1: Ping
    setTimeout(() => {
      setPingMs(Math.floor(2 + Math.random() * 5));
      setTestStage('download');

      // Step 2: Download Speed animation
      let dVal = 0;
      const dInterval = setInterval(() => {
        dVal += Math.floor(Math.random() * 6) + 2;
        if (dVal >= 48.5) {
          dVal = 48.5;
          clearInterval(dInterval);
          setDownloadSpeed(48.5);
          setTestStage('upload');

          // Step 3: Upload Speed animation
          let uVal = 0;
          const uInterval = setInterval(() => {
            uVal += Math.floor(Math.random() * 6) + 2;
            if (uVal >= 47.2) {
              uVal = 47.2;
              clearInterval(uInterval);
              setUploadSpeed(47.2);
              setTestStage('complete');
              setIsTesting(false);
            } else {
              setUploadSpeed(uVal);
            }
          }, 80);
        } else {
          setDownloadSpeed(dVal);
        }
      }, 80);
    }, 1000);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    const newTicket: DisruptionTicket = {
      id: `TKT-SPN-${Math.floor(1000 + Math.random() * 9000)}`,
      subscriberId: subId,
      subscriberName: subName,
      issueType,
      description,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'OPEN'
    };

    setSubmittedTicket(newTicket);
  };

  const faqs = [
    {
      q: 'Bagaimana cara melakukan pembayaran tagihan WiFi Simpink Net?',
      a: 'Anda dapat masuk ke menu Bayar Tagihan pada website ini, lalu masukkan ID Pelanggan (contoh: SPN-2026-01). Pilih metode bayar QRIS, Virtual Account BCA/Mandiri/BRI, E-Wallet (DANA/GoPay), atau bayar langsung di Indomaret/Alfamart.'
    },
    {
      q: 'Berapa lama proses verifikasi pembayaran otomatis?',
      a: 'Seluruh sistem pembayaran Simpink Net sudah terintegrasi secara otomatis. Setelah Anda melakukan transaksi, status tagihan akan berubah menjadi LUNAS dalam kurun waktu 1 - 3 detik.'
    },
    {
      q: 'Apa yang harus dilakukan jika lampu indikator LOS di router berkedip MERAH?',
      a: 'Indikator LOS merah menandakan sinyal Fiber Optic terputus. Pastikan kabel optic kuning ke modem tidak terlipat tajam. Cobalah matikan (restart) router selama 10 detik. Jika tetap merah, kirimkan laporan gangguan di form halaman ini agar teknisi Simpink Net menuju lokasi Anda.'
    },
    {
      q: 'Apakah ada FUP atau batas kuota penggunaan?',
      a: 'Tidak ada! Semua paket internet Simpink Net Provider WiFi bersifat TRULY UNLIMITED tanpa penurun kecepatan (No FUP).'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Speedtest Tool Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-pink-950 p-8 rounded-3xl border-2 border-pink-500/30 shadow-2xl space-y-8 max-w-4xl mx-auto">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold">
            <Gauge className="w-4 h-4 text-pink-400" />
            <span>SPEEDTEST NETWORK DIAGNOSTIC</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Uji Kecepatan Koneksi Simpink Net
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Tes kecepatan Download, Upload, & Ping jaringan Fiber Optic Anda secara real-time.
          </p>
        </div>

        {/* Speedtest Dashboard Displays */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase">PING LATENCY</span>
            <div className="text-3xl font-black text-amber-300 font-mono">
              {pingMs} <span className="text-sm font-normal text-slate-400">ms</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">Jaringan Ultra Low Latency</span>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-pink-500/40 space-y-1">
            <span className="text-xs text-pink-400 font-bold uppercase">DOWNLOAD SPEED</span>
            <div className="text-4xl font-black text-white font-mono">
              {downloadSpeed.toFixed(1)} <span className="text-sm font-normal text-slate-400">Mbps</span>
            </div>
            <span className="text-[10px] text-pink-300 font-medium">Fiber Download Capacity</span>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-xs text-cyan-400 font-bold uppercase">UPLOAD SPEED</span>
            <div className="text-3xl font-black text-cyan-300 font-mono">
              {uploadSpeed.toFixed(1)} <span className="text-sm font-normal text-slate-400">Mbps</span>
            </div>
            <span className="text-[10px] text-cyan-200 font-medium">Koneksi Simetris 1:1</span>
          </div>

        </div>

        {/* Gauge Progress Animation Bar */}
        {isTesting && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-pink-300">
              <span>Status Pengujian: {testStage.toUpperCase()}</span>
              <span>100% Fiber Simpink</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-pink-500/30">
              <div 
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: testStage === 'ping' ? '20%' : testStage === 'download' ? '60%' : testStage === 'upload' ? '90%' : '100%' }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={startSpeedTest}
            disabled={isTesting}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl inline-flex items-center gap-2 ${
              isTesting
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-600/30'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Sedang Menguji Kecepatan...' : 'Mulai Speedtest Sekarang'}</span>
          </button>
        </div>

      </div>

      {/* Lapor Gangguan & Customer Support Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Support Ticket Form */}
        <div className="lg:col-span-7 bg-slate-800/90 p-7 rounded-3xl border border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/30">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Lapor Kendala / Ticket Bantuan</h3>
              <p className="text-xs text-slate-400">Sampaikan kendala koneksi agar teknisi Simpink Net menangani langsung</p>
            </div>
          </div>

          {submittedTicket ? (
            <div className="bg-emerald-950/80 p-6 rounded-2xl border border-emerald-500/50 text-center space-y-4 text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-white">Tiket Laporan Berhasil Ditambahkan!</h4>
                <p className="text-xs text-emerald-300">
                  Nomor Tiket: <strong className="font-mono text-white bg-slate-900 px-2 py-0.5 rounded">{submittedTicket.id}</strong>
                </p>
              </div>
              <p className="text-xs text-slate-300">
                Teknisi Simpink Net sedang meninjau status jaringan ODP Anda. CS kami akan menghubungi nomor terdaftar Anda segera.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-all"
              >
                Buat Laporan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">ID Pelanggan:</label>
                  <input
                    type="text"
                    required
                    value={subId}
                    onChange={(e) => setSubId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Nama Pelanggan:</label>
                  <input
                    type="text"
                    required
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Jenis Kendala / Masalah:</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                >
                  <option value="slow">Internet Lambat / Putus-Putus</option>
                  <option value="blinking_red">Modem Lampu LOS Merah Berkedip</option>
                  <option value="offline">Tidak Bisa Konek WiFi Sama Sekali</option>
                  <option value="other">Lainnya / Pertanyaan Tagihan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Deskripsi Kendala:</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan detail kendala yang dialami..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Tiket Laporan Ke Teknisi</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-pink-400" />
            <span>Pertanyaan Sering Diajukan (FAQ)</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs text-white flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-pink-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 border-t border-slate-700/50 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
