import React, { useState, useEffect } from 'react';
import { Bill, PaymentMethodOption } from '../types';
import { PAYMENT_METHODS } from '../data/mockData';
import { 
  Search, CreditCard, CheckCircle, Clock, AlertTriangle, QrCode, 
  Building2, Wallet, Store, Copy, Check, ArrowRight, Printer, 
  Share2, ShieldCheck, Download, Sparkles, RefreshCw, Zap, Wifi
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoImg from '../assets/images/simpink_net_logo_1786572887035.jpg';

interface BillPaymentProps {
  bills: Bill[];
  onPayBillSuccess: (billId: string, paymentMethodName: string, txRef: string) => void;
  onSelectPackages: () => void;
}

export const BillPayment: React.FC<BillPaymentProps> = ({ bills, onPayBillSuccess, onSelectPackages }) => {
  const [searchQuery, setSearchQuery] = useState<string>('SPN-2026-01');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodOption>(PAYMENT_METHODS[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentStep, setPaymentStep] = useState<'search' | 'checkout' | 'success'>('search');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [lastReceipt, setLastReceipt] = useState<{
    bill: Bill;
    methodName: string;
    txRef: string;
    paidAt: string;
  } | null>(null);

  // Auto search initial bill
  useEffect(() => {
    handleSearch('SPN-2026-01');
  }, [bills]);

  const handleSearch = (queryStr?: string) => {
    const q = (queryStr !== undefined ? queryStr : searchQuery).trim().toLowerCase();
    if (!q) return;

    const found = bills.find(
      b => b.subscriberId.toLowerCase() === q ||
           b.subscriberPhone.includes(q) ||
           b.id.toLowerCase() === q ||
           b.subscriberName.toLowerCase().includes(q)
    );

    if (found) {
      setSelectedBill(found);
      if (found.status === 'PAID') {
        setPaymentStep('search'); // Show already paid status
      } else {
        setPaymentStep('checkout');
      }
    } else {
      setSelectedBill(null);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleProcessPayment = () => {
    if (!selectedBill) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const txRef = `TX-SPN-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      });

      onPayBillSuccess(selectedBill.id, selectedMethod.name, txRef);

      const updatedBill: Bill = {
        ...selectedBill,
        status: 'PAID',
        paidAt: now,
        paymentMethod: selectedMethod.name,
        transactionRef: txRef
      };

      setLastReceipt({
        bill: updatedBill,
        methodName: selectedMethod.name,
        txRef,
        paidAt: now
      });

      setSelectedBill(updatedBill);
      setPaymentStep('success');

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error("Confetti error", err);
      }
    }, 2200);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-8 lg:p-10 border border-pink-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-pink-400" />
            <span>Portal Resmi Bayar Tagihan Internet WiFi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Bayar Tagihan <span className="bg-gradient-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Simpink Net</span> Cepat & Otomatis
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Masukkan <strong className="text-pink-300">ID Pelanggan</strong> atau <strong className="text-pink-300">Nomor Telepon</strong> terdaftar untuk mengecek tagihan dan melakukan pembayaran via QRIS, Virtual Account, E-Wallet, atau Minimarket.
          </p>

          {/* Search Box */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-2.5 rounded-2xl border-2 border-pink-500/40 shadow-xl focus-within:border-pink-400 transition-all">
              <div className="flex-1 flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-pink-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Contoh ID: SPN-2026-01 atau No HP: 081234567890"
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none py-2 font-medium"
                />
              </div>

              <button
                onClick={() => handleSearch()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm transition-all shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2"
              >
                <span>Cek Tagihan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Demo Subscriber Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Contoh Pelanggan:</span>
              {bills.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSearchQuery(b.subscriberId);
                    handleSearch(b.subscriberId);
                  }}
                  className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                    searchQuery === b.subscriberId
                      ? 'bg-pink-500/20 border-pink-400 text-pink-200 font-bold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-pink-500/50'
                  }`}
                >
                  <span>{b.subscriberId}</span>
                  <span className="text-[10px] text-slate-400">({b.subscriberName.split(' ')[0]})</span>
                  {b.status === 'PAID' ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  ) : b.status === 'OVERDUE' ? (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Billing Interaction Container */}
      {!selectedBill ? (
        <div className="bg-slate-800/60 rounded-3xl p-8 border border-slate-700 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mx-auto text-pink-400 border border-pink-500/20">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">ID Pelanggan Tidak Ditemukan</h3>
          <p className="text-slate-300 text-sm">
            Pastikan Anda memasukkan nomor ID Pelanggan yang benar (contoh: <code className="text-pink-300 bg-slate-900 px-2 py-0.5 rounded">SPN-2026-01</code>) atau pilih salah satu tombol contoh di atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Subscriber & Bill Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-xl space-y-6">
              
              {/* Card Header & Status Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/30">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Rincian Tagihan</h3>
                    <p className="text-xs text-slate-400">Periode: {selectedBill.periodMonth}</p>
                  </div>
                </div>

                {selectedBill.status === 'PAID' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>LUNAS</span>
                  </span>
                ) : selectedBill.status === 'OVERDUE' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>JATUH TEMPO</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>BELUM DIBAYAR</span>
                  </span>
                )}
              </div>

              {/* Subscriber Details */}
              <div className="space-y-3 text-sm">
                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/50 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">ID Pelanggan:</span>
                    <span className="font-mono font-bold text-pink-300">{selectedBill.subscriberId}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Nama Pelanggan:</span>
                    <span className="font-semibold text-white">{selectedBill.subscriberName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">No. HP:</span>
                    <span className="text-slate-300">{selectedBill.subscriberPhone}</span>
                  </div>
                  <div className="pt-1 border-t border-slate-800 text-xs">
                    <span className="text-slate-400 block mb-0.5">Alamat Pemasangan:</span>
                    <span className="text-slate-300 line-clamp-2">{selectedBill.subscriberAddress}</span>
                  </div>
                </div>

                {/* Package Info */}
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-3.5 rounded-2xl border border-pink-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-pink-300 font-bold block">Paket Terdaftar</span>
                    <h4 className="font-extrabold text-white">{selectedBill.packageName}</h4>
                    <span className="text-xs text-slate-300">{selectedBill.speedMbps} Mbps Dedicated Fiber</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Jatuh Tempo</span>
                    <span className="text-xs font-bold text-amber-300">{selectedBill.dueDate}</span>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Biaya Langganan WiFi ({selectedBill.periodMonth})</span>
                    <span>{formatRupiah(selectedBill.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Admin Sistem</span>
                    <span className="text-emerald-400 font-bold">GRATIS (Rp 0)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PPN 11%</span>
                    <span>{formatRupiah(selectedBill.taxAmount)}</span>
                  </div>
                  {selectedMethod && selectedMethod.fee > 0 && paymentStep !== 'success' && (
                    <div className="flex justify-between text-amber-300">
                      <span>Biaya Layanan ({selectedMethod.name.split(' ')[0]})</span>
                      <span>{formatRupiah(selectedMethod.fee)}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-700 pt-3 flex justify-between items-center text-sm font-bold text-white">
                    <span>Total Pembayaran:</span>
                    <span className="text-xl font-black bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">
                      {formatRupiah(selectedBill.totalAmount + (selectedMethod?.fee || 0))}
                    </span>
                  </div>
                </div>

              </div>

              {/* Already Paid Box */}
              {selectedBill.status === 'PAID' && (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Tagihan Ini Sudah Lunas Ditagihkan</span>
                  </div>
                  <p>Terbayar pada {selectedBill.paidAt || 'bulan ini'} via {selectedBill.paymentMethod || 'Metode Otomatis'}.</p>
                  <p className="font-mono text-[11px] text-emerald-400">Ref: {selectedBill.transactionRef}</p>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Checkout or Receipt View */}
          <div className="lg:col-span-7">
            {paymentStep === 'success' && lastReceipt ? (
              /* Success Receipt View */
              <div className="bg-slate-800/90 rounded-3xl p-6 lg:p-8 border-2 border-emerald-500/50 shadow-2xl space-y-6 animate-fade-in">
                <div className="text-center space-y-3 pb-6 border-b border-slate-700">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/30 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Pembayaran Berhasil!</h2>
                  <p className="text-slate-300 text-sm">
                    Terima kasih! Tagihan internet Simpink Net Anda telah aktif kembali untuk periode <strong className="text-pink-300">{lastReceipt.bill.periodMonth}</strong>.
                  </p>
                </div>

                {/* Printable Struk/Receipt Box */}
                <div id="receipt-print-area" className="bg-slate-900 p-6 rounded-2xl border border-slate-700 space-y-4 text-xs font-mono text-slate-300 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/40 uppercase tracking-widest">
                    STAMP: LUNAS
                  </div>

                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <img src={logoImg} alt="Simpink Net" className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-white text-sm">SIMPINK NET PROVIDER WIFI</h4>
                      <p className="text-[11px] text-slate-400">Bukti Pembayaran Resmi WiFi Broadband</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-500 block">No. Transaksi:</span>
                      <span className="font-bold text-pink-300">{lastReceipt.txRef}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Waktu Bayar:</span>
                      <span>{lastReceipt.paidAt}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">ID Pelanggan:</span>
                      <span className="font-bold text-white">{lastReceipt.bill.subscriberId}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Nama Pelanggan:</span>
                      <span className="font-bold text-white">{lastReceipt.bill.subscriberName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Paket WiFi:</span>
                      <span>{lastReceipt.bill.packageName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Metode Bayar:</span>
                      <span className="text-cyan-300 font-bold">{lastReceipt.methodName}</span>
                    </div>
                  </div>

                  <div className="border-t border-b border-slate-800 py-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Tagihan Bulanan</span>
                      <span>{formatRupiah(lastReceipt.bill.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PPN 11%</span>
                      <span>{formatRupiah(lastReceipt.bill.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white text-sm pt-1">
                      <span>TOTAL LUNAS:</span>
                      <span className="text-emerald-400">{formatRupiah(lastReceipt.bill.totalAmount)}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-slate-500 italic pt-1">
                    Simpan struk ini sebagai bukti pembayaran sah Simpink Net Provider WiFi. Layanan Anda otomatis diperpanjang.
                  </p>
                </div>

                {/* Receipt Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Struk</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `*BUKTI PEMBAYARAN SIMPINK NET*\nNo Transaksi: ${lastReceipt.txRef}\nID Pelanggan: ${lastReceipt.bill.subscriberId}\nNama: ${lastReceipt.bill.subscriberName}\nTotal: ${formatRupiah(lastReceipt.bill.totalAmount)}\nStatus: LUNAS`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Kirim WA</span>
                  </a>

                  <button
                    onClick={() => {
                      setPaymentStep('search');
                      setSelectedBill(null);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
                  >
                    <span>Bayar Tagihan Lain</span>
                  </button>
                </div>
              </div>
            ) : selectedBill.status === 'PAID' ? (
              /* Display already paid message and option to check other */
              <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white">Tagihan Telah Terbayar</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Pelanggan <strong className="text-white">{selectedBill.subscriberName}</strong> ({selectedBill.subscriberId}) sudah melunasi tagihan bulan {selectedBill.periodMonth}.
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={onSelectPackages}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-xs hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-600/30"
                  >
                    Lihat Paket WiFi Lain / Upgrade Speed
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Method Selection & Checkout */
              <div className="bg-slate-800/90 rounded-3xl p-6 lg:p-8 border border-slate-700 shadow-xl space-y-6">
                
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-pink-400" />
                    <span>Pilih Metode Pembayaran</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Pilihan pembayaran serba otomatis & langsung terverifikasi seketika.
                  </p>
                </div>

                {/* Method Category Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod.id === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method)}
                        className={`p-4 rounded-2xl text-left border transition-all duration-200 flex items-start gap-3 relative ${
                          isSelected
                            ? 'bg-gradient-to-br from-slate-800 to-pink-950/60 border-pink-500 ring-2 ring-pink-500/40 shadow-lg shadow-pink-500/10'
                            : 'bg-slate-900/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                          {method.category === 'qris' && <QrCode className="w-5 h-5" />}
                          {method.category === 'va' && <Building2 className="w-5 h-5" />}
                          {method.category === 'ewallet' && <Wallet className="w-5 h-5" />}
                          {method.category === 'retail' && <Store className="w-5 h-5" />}
                        </div>

                        <div className="flex-1 pr-4">
                          <h4 className="font-bold text-white text-xs sm:text-sm">{method.name}</h4>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {method.fee === 0 ? 'Bebas Biaya Admin' : `Biaya +${formatRupiah(method.fee)}`}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="absolute top-3 right-3 text-pink-400">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Instructions Box Based on Selected Method */}
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-pink-500/30 space-y-4">
                  
                  {/* QRIS Display View */}
                  {selectedMethod.category === 'qris' && (
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="bg-white p-3 rounded-2xl shadow-xl border-2 border-pink-500 text-center shrink-0">
                        <div className="w-36 h-36 bg-slate-100 flex items-center justify-center relative p-1 rounded-lg">
                          {/* QR Simulation SVG */}
                          <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100">
                            <rect width="100" height="100" fill="#fff"/>
                            <path d="M10 10h30v30h-30zM60 10h30v30h-30zM10 60h30v30h-30z" fill="#1e293b"/>
                            <path d="M18 18h14v14h-14zM68 18h14v14h-14zM18 68h14v14h-14z" fill="#fff"/>
                            <rect x="45" y="10" width="10" height="20" fill="#ec4899"/>
                            <rect x="45" y="40" width="20" height="10" fill="#1e293b"/>
                            <rect x="70" y="50" width="20" height="20" fill="#ec4899"/>
                            <rect x="50" y="70" width="20" height="20" fill="#1e293b"/>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img src={logoImg} alt="Simpink Logo" className="w-8 h-8 rounded-full border-2 border-white shadow-md object-cover" referrerPolicy="no-referrer" />
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-800 tracking-wider block mt-1">
                          SIMPINK NET QRIS
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <span className="font-bold text-pink-300 text-sm block">Panduan QRIS Instant:</span>
                        <ol className="list-decimal list-inside space-y-1 text-slate-300">
                          {selectedMethod.instructions.map((inst, idx) => (
                            <li key={idx}>{inst}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Virtual Account / Retail Code Display */}
                  {(selectedMethod.category === 'va' || selectedMethod.category === 'retail') && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                            {selectedMethod.category === 'va' ? 'Nomor Virtual Account' : 'Kode Pembayaran Minimarket'}
                          </span>
                          <span className="text-lg font-mono font-bold text-pink-300 tracking-wider">
                            {selectedMethod.accountNumber}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(selectedMethod.accountNumber!, 'va')}
                          className="px-3 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 text-xs font-bold border border-pink-500/40 flex items-center gap-1.5 transition-all"
                        >
                          {copiedText === 'va' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Kode</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-slate-300 block">Langkah-Langkah:</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                          {selectedMethod.instructions.map((inst, idx) => (
                            <li key={idx}>{inst}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* E-Wallet Phone Input */}
                  {selectedMethod.category === 'ewallet' && (
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-300">
                        Nomor HP Terdaftar ({selectedMethod.name}):
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedBill.subscriberPhone}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-pink-500 focus:outline-none"
                        placeholder="Contoh: 081234567890"
                      />
                      <p className="text-[11px] text-slate-400">
                        Aplikasi e-wallet Anda akan menerima notifikasi konfirmasi pembayaran otomatis.
                      </p>
                    </div>
                  )}

                </div>

                {/* Final Checkout Action Button */}
                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                    isProcessing
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 via-fuchsia-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-600/30 hover:scale-[1.01]'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin text-pink-400" />
                      <span>Memproses Pembayaran Ke Server Simpink Net...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Konfirmasi & Bayar Sekarang ({formatRupiah(selectedBill.totalAmount + selectedMethod.fee)})</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Transaksi Terenkripsi 256-bit & Terverifikasi Otomatis</span>
                </div>

              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
