import React from 'react';
import { ViewMode } from '../types';
import { Wifi, PhoneCall, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/images/simpink_net_logo_1786572887035.jpg';

interface FooterProps {
  onSelectView: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="Simpink Net Provider Logo" 
                className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 ring-2 ring-blue-500/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-lg font-black tracking-tight text-white">
                  SIMPINK <span className="text-blue-400">NET</span>
                </span>
                <p className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                  NET PROVIDER WIFI BROADBAND
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Penyedia jaringan internet Fiber Optic & Satelit super cepat, stabil, & terpercaya untuk rumah, usaha, cafe, dan kantor dengan jaminan tanpa kuota FUP.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sertifikasi Broadband Provider 100% Resmi</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Layanan Utama</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectView('payment')} className="hover:text-blue-400 transition-all">
                  Bayar Tagihan WiFi Online
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('packages')} className="hover:text-blue-400 transition-all">
                  Daftar Paket Internet Rumah
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('packages')} className="hover:text-blue-400 transition-all">
                  Paket Bisnis & Cafe Dedicated 1:1
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('coverage')} className="hover:text-blue-400 transition-all">
                  Cek Area Jangkauan Fiber ODP
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('support')} className="hover:text-blue-400 transition-all">
                  Speedtest & Lapor Kendala
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kontak & Customer Care</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
                <span>WA Hotline: <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-sky-300 font-bold hover:underline">0812-3456-7890</a></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Email: support@simpinknet.provider.id</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Gedung Simpink Tower, Jl. Fiber Optic Utama No. 88, Jakarta / Bandung / Surabaya</span>
              </li>
            </ul>
          </div>

          {/* Payment Methods Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Metode Pembayaran</h4>
            <p className="text-slate-400">
              Mendukung pembayaran serba otomatis via QRIS (GoPay, DANA, OVO, ShopeePay), Virtual Account BCA, Mandiri, BRI, BNI, Indomaret, & Alfamart.
            </p>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] text-slate-400 font-mono">
              STATUS SERVER BILLING: <span className="text-emerald-400 font-bold">ONLINE 100%</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Simpink Net Provider WiFi. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="text-blue-400 font-bold">Simpink Net Provider WiFi — Koneksi Tanpa Batas, Cepat & Terjangkau.</p>
        </div>

      </div>
    </footer>
  );
};
