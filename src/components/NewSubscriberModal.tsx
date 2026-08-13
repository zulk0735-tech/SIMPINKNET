import React, { useState } from 'react';
import { WifiPackage, Subscriber, Bill } from '../types';
import { CheckCircle2, ShieldCheck, Zap, X, Calendar, MapPin, Phone, User, Send } from 'lucide-react';
import logoImg from '../assets/images/simpink_net_logo_1786572887035.jpg';

interface NewSubscriberModalProps {
  pkg: WifiPackage;
  initialAddress?: string;
  onClose: () => void;
  onSuccessRegister: (sub: Subscriber, initialBill: Bill) => void;
}

export const NewSubscriberModal: React.FC<NewSubscriberModalProps> = ({
  pkg,
  initialAddress = '',
  onClose,
  onSuccessRegister
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>(initialAddress);
  const [preferredDate, setPreferredDate] = useState<string>('2026-08-15');
  const [isDone, setIsDone] = useState<boolean>(false);
  const [createdSubId, setCreatedSubId] = useState<string>('');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    const subId = `SPN-2026-${Math.floor(10 + Math.random() * 90)}`;
    setCreatedSubId(subId);

    const newSub: Subscriber = {
      id: subId,
      fullName,
      phone,
      email: `${fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address,
      packageId: pkg.id,
      packageName: pkg.name,
      speedMbps: pkg.speedMbps,
      monthlyFee: pkg.priceMonthly,
      status: 'active',
      installationDate: preferredDate
    };

    const taxAmount = Math.round(pkg.priceMonthly * 0.11);
    const initialBill: Bill = {
      id: `BILL-202608-${Math.floor(100 + Math.random() * 900)}`,
      subscriberId: subId,
      subscriberName: fullName,
      subscriberAddress: address,
      subscriberPhone: phone,
      packageName: pkg.name,
      speedMbps: pkg.speedMbps,
      periodMonth: 'Agustus 2026',
      dueDate: preferredDate,
      amount: pkg.priceMonthly,
      adminFee: 0,
      taxAmount,
      totalAmount: pkg.priceMonthly + taxAmount,
      status: 'UNPAID'
    };

    onSuccessRegister(newSub, initialBill);
    setIsDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-pink-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative my-8 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Pendaftaran Berhasil!</h3>
              <p className="text-xs text-slate-300">
                Selamat! ID Pelanggan Simpink Net Anda adalah:
              </p>
              <div className="text-xl font-mono font-bold text-pink-300 bg-slate-950 py-2.5 rounded-2xl border border-pink-500/40 inline-block px-6">
                {createdSubId}
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Tim teknisi Simpink Net akan menghubungi WhatsApp <strong className="text-white">{phone}</strong> untuk konfirmasi jadwal survey & pemasangan kabel Fiber Optic pada <strong className="text-pink-300">{preferredDate}</strong>.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-600/30"
            >
              Lihat Tagihan Pertama & Selesaikan
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <img src={logoImg} alt="Simpink Net" className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">Pendaftaran WiFi Baru</span>
                <h3 className="text-lg font-black text-white">{pkg.name}</h3>
                <p className="text-xs text-slate-300">{pkg.speedMbps} Mbps Fiber • {formatRupiah(pkg.priceMonthly)} / bln</p>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-pink-400" />
                  <span>Nama Lengkap Pendaftar:</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Hendra Wijaya"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span>Nomor WhatsApp Aktif:</span>
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span>Alamat Lengkap Pemasangan:</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Jl. Mawar No. 15, RT 02/RW 05, Kelurahan, Kota..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  <span>Pilihan Jadwal Pemasangan Teknisi:</span>
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>Biaya Langganan Pertama:</span>
                  <span className="text-white">{formatRupiah(pkg.priceMonthly)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Biaya Instalasi & Kabel:</span>
                  <span>GRATIS (Promo Moon)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pendaftaran & Dapatkan ID Pelanggan</span>
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
