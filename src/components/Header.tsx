import React from 'react';
import { ViewMode } from '../types';
import { Wifi, CreditCard, ShieldCheck, Zap, BarChart3, HelpCircle, PhoneCall, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/images/simpink_net_logo_1786572887035.jpg';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  unpaidCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView, unpaidCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Jaringan Fiber Optic & Satelit Simpink Net 100% Normal & Online</span>
        <span className="hidden md:inline-block text-slate-400">• Hubungi CS / WA Hotline: <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="underline font-bold text-sky-400 hover:text-sky-300">0812-3456-7890</a></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => onSelectView('payment')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative">
              <img 
                src={logoImg} 
                alt="Simpink Net Provider WiFi Logo" 
                className="w-12 h-12 rounded-xl object-contain bg-white p-0.5 ring-2 ring-blue-500/30 shadow-md group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-0.5 rounded-full border-2 border-white">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  SIMPINK <span className="text-blue-600">NET</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                  PROVIDER WIFI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                High Speed Fiber Optic & Satellite Broadband
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectView('payment')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                currentView === 'payment'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Bayar Tagihan</span>
              {unpaidCount > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 animate-bounce">
                  {unpaidCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectView('packages')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                currentView === 'packages'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Daftar Paket WiFi</span>
            </button>

            <button
              onClick={() => onSelectView('coverage')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                currentView === 'coverage'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cek Area Jangkauan</span>
            </button>

            <button
              onClick={() => onSelectView('support')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                currentView === 'support'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>Speedtest & Bantuan</span>
            </button>
          </nav>

          {/* Right Controls: Admin Toggle & Quick Call */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectView('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
              title="Akses Portal Pemilik / Admin Simpink Net"
            >
              <BarChart3 className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Owner / Admin Portal</span>
            </button>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Simpink%20Net,%20saya%20ingin%20bertanya%20mengenai%20layanan%20wifi"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WA CS</span>
            </a>
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center justify-between gap-1 pb-2.5 overflow-x-auto no-scrollbar border-t border-slate-200 pt-2 text-xs">
          <button
            onClick={() => onSelectView('payment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentView === 'payment' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Bayar Tagihan</span>
          </button>

          <button
            onClick={() => onSelectView('packages')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentView === 'packages' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Paket WiFi</span>
          </button>

          <button
            onClick={() => onSelectView('coverage')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentView === 'coverage' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Jangkauan</span>
          </button>

          <button
            onClick={() => onSelectView('support')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentView === 'support' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Speedtest</span>
          </button>

          <button
            onClick={() => onSelectView('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentView === 'admin' ? 'bg-slate-900 text-white font-bold' : 'text-slate-700 bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
            <span>Admin</span>
          </button>
        </div>

      </div>
    </header>
  );
};
