import React, { useState } from 'react';
import { Bill, Subscriber } from '../types';
import { 
  BarChart3, Users, DollarSign, Clock, AlertTriangle, CheckCircle2, 
  Plus, MessageSquare, Search, Filter, Printer, Download, RefreshCw, ShieldCheck, Phone
} from 'lucide-react';

interface AdminDashboardProps {
  bills: Bill[];
  subscribers: Subscriber[];
  onMarkAsPaid: (billId: string) => void;
  onAddNewBill: (newBill: Bill) => void;
  onAddNewSubscriber: (newSub: Subscriber) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bills,
  subscribers,
  onMarkAsPaid,
  onAddNewBill,
  onAddNewSubscriber
}) => {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'UNPAID' | 'PAID' | 'OVERDUE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddSubModal, setShowAddSubModal] = useState<boolean>(false);

  // New Subscriber Form State
  const [newSubName, setNewSubName] = useState<string>('');
  const [newSubPhone, setNewSubPhone] = useState<string>('');
  const [newSubAddress, setNewSubAddress] = useState<string>('');
  const [newSubPackage, setNewSubPackage] = useState<string>('Simpink Family 30 Mbps');
  const [newSubPrice, setNewSubPrice] = useState<number>(235000);

  // Calculations
  const totalSubscribersCount = subscribers.length;
  const paidBills = bills.filter(b => b.status === 'PAID');
  const unpaidBills = bills.filter(b => b.status === 'UNPAID' || b.status === 'OVERDUE');

  const totalCollectedRevenue = paidBills.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalUnpaidAmount = unpaidBills.reduce((acc, b) => acc + b.totalAmount, 0);

  const filteredBills = bills.filter(b => {
    const matchesFilter = filterStatus === 'ALL' || b.status === filterStatus;
    const matchesSearch = 
      b.subscriberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subscriberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subscriberPhone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCreateSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName || !newSubPhone) return;

    const subId = `SPN-2026-${String(subscribers.length + 1).padStart(2, '0')}`;
    const newSub: Subscriber = {
      id: subId,
      fullName: newSubName,
      phone: newSubPhone,
      email: `${newSubName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address: newSubAddress || 'Alamat Terdaftar Simpink Net',
      packageId: 'pkg-custom',
      packageName: newSubPackage,
      speedMbps: 30,
      monthlyFee: newSubPrice,
      status: 'active',
      installationDate: new Date().toISOString().split('T')[0]
    };

    const newBill: Bill = {
      id: `BILL-202608-${String(bills.length + 1).padStart(3, '0')}`,
      subscriberId: subId,
      subscriberName: newSubName,
      subscriberAddress: newSubAddress,
      subscriberPhone: newSubPhone,
      packageName: newSubPackage,
      speedMbps: 30,
      periodMonth: 'Agustus 2026',
      dueDate: '2026-08-20',
      amount: newSubPrice,
      adminFee: 0,
      taxAmount: Math.round(newSubPrice * 0.11),
      totalAmount: Math.round(newSubPrice * 1.11),
      status: 'UNPAID'
    };

    onAddNewSubscriber(newSub);
    onAddNewBill(newBill);

    setShowAddSubModal(false);
    setNewSubName('');
    setNewSubPhone('');
    setNewSubAddress('');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-8 rounded-3xl border border-cyan-500/30 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>PORTAL OWNER & ADMIN SIMPINK NET PROVIDER</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Dashboard Pengelolaan Tagihan & Pelanggan
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm">
            Monitoring pendapatan bulanan, status tagihan terbayar, dan manajemen akun pelanggan Simpink Net.
          </p>
        </div>

        <button
          onClick={() => setShowAddSubModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pelanggan Baru</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700/80 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase">PELANGGAN AKTIF</span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{totalSubscribersCount}</div>
          <span className="text-[11px] text-emerald-400 font-medium">100% Terhubung Fiber</span>
        </div>

        <div className="bg-slate-800/90 p-6 rounded-3xl border border-emerald-500/30 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-bold uppercase">PENDAPATAN TERMASUK (LUNAS)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">{formatRupiah(totalCollectedRevenue)}</div>
          <span className="text-[11px] text-emerald-300 font-medium">{paidBills.length} Tagihan Terbayar</span>
        </div>

        <div className="bg-slate-800/90 p-6 rounded-3xl border border-amber-500/30 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 font-bold uppercase">PIUTANG / BELUM BAYAR</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">{formatRupiah(totalUnpaidAmount)}</div>
          <span className="text-[11px] text-amber-200 font-medium">{unpaidBills.length} Tagihan Belum Lunas</span>
        </div>

        <div className="bg-slate-800/90 p-6 rounded-3xl border border-cyan-500/30 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-cyan-400 font-bold uppercase">TOTAL BANDWIDTH OLT</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">1.2 <span className="text-sm font-normal text-slate-400">Gbps</span></div>
          <span className="text-[11px] text-cyan-300 font-medium">Kapasitas Core Uplink</span>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {(['ALL', 'UNPAID', 'PAID', 'OVERDUE'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterStatus === st
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {st === 'ALL' ? 'Semua Status' : st === 'UNPAID' ? 'Belum Bayar' : st === 'PAID' ? 'Lunas' : 'Jatuh Tempo'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-700 w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nama / ID Pelanggan..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Bills Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">ID / Pelanggan</th>
                <th className="py-3.5 px-4">Paket WiFi</th>
                <th className="py-3.5 px-4">Periode & Tempo</th>
                <th className="py-3.5 px-4">Total Tagihan</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredBills.map((b) => (
                <tr key={b.id} className="hover:bg-slate-700/30 transition-all">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{b.subscriberName}</div>
                    <div className="font-mono text-[11px] text-pink-400">{b.subscriberId}</div>
                    <div className="text-[10px] text-slate-400">{b.subscriberPhone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-200">{b.packageName}</div>
                    <div className="text-[10px] text-slate-400">{b.speedMbps} Mbps Dedicated</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-200">{b.periodMonth}</div>
                    <div className="text-[10px] text-amber-300">Tempo: {b.dueDate}</div>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-white text-sm">
                    {formatRupiah(b.totalAmount)}
                  </td>
                  <td className="py-4 px-4">
                    {b.status === 'PAID' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>LUNAS</span>
                      </span>
                    ) : b.status === 'OVERDUE' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>JATUH TEMPO</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                        <Clock className="w-3 h-3" />
                        <span>BELUM BAYAR</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {b.status !== 'PAID' && (
                      <button
                        onClick={() => onMarkAsPaid(b.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow transition-all"
                      >
                        Tandai Lunas
                      </button>
                    )}

                    <a
                      href={`https://wa.me/62${b.subscriberPhone.replace(/^0/, '')}?text=${encodeURIComponent(
                        `Halo Kak ${b.subscriberName},\nPengingat tagihan WiFi Simpink Net periode ${b.periodMonth} sebesar ${formatRupiah(b.totalAmount)}. Mohon dapat melakukan pembayaran sebelum tanggal ${b.dueDate} via website resmi Simpink Net. Terima kasih!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-pink-300 font-bold text-[11px] transition-all"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WA Remind</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal Add New Subscriber */}
      {showAddSubModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-pink-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white">Tambah Pelanggan WiFi Baru</h3>
              <button
                onClick={() => setShowAddSubModal(false)}
                className="text-slate-400 hover:text-white font-bold text-xs"
              >
                Tutup [X]
              </button>
            </div>

            <form onSubmit={handleCreateSubscriber} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Nama Lengkap Pelanggan:</label>
                <input
                  type="text"
                  required
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="Contoh: Bambang Kusuma"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Nomor HP / WhatsApp:</label>
                <input
                  type="text"
                  required
                  value={newSubPhone}
                  onChange={(e) => setNewSubPhone(e.target.value)}
                  placeholder="Contoh: 081299887766"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Alamat Pemasangan:</label>
                <input
                  type="text"
                  value={newSubAddress}
                  onChange={(e) => setNewSubAddress(e.target.value)}
                  placeholder="Jl. Anggrek No. 10, Jakarta"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Pilihan Paket:</label>
                  <select
                    value={newSubPackage}
                    onChange={(e) => setNewSubPackage(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                  >
                    <option value="Simpink Hemat 10 Mbps">Simpink Hemat 10 Mbps</option>
                    <option value="Simpink Family 30 Mbps">Simpink Family 30 Mbps</option>
                    <option value="Simpink Gamer & Stream 50 Mbps">Simpink Gamer 50 Mbps</option>
                    <option value="Simpink Ultimate 100 Mbps">Simpink Ultimate 100 Mbps</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Biaya Bulanan (Rp):</label>
                  <input
                    type="number"
                    value={newSubPrice}
                    onChange={(e) => setNewSubPrice(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30"
              >
                Simpan & Terbitkan Tagihan Pertama
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
