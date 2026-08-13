import { WifiPackage, Subscriber, Bill, PaymentMethodOption, CoverageArea } from '../types';

export const INITIAL_PACKAGES: WifiPackage[] = [
  {
    id: 'pkg-home-10',
    name: 'Simpink Hemat 10 Mbps',
    speedMbps: 10,
    priceMonthly: 150000,
    category: 'home',
    description: 'Cocok untuk kebutuhan internet harian, media sosial, dan video call.',
    features: [
      'Kecepatan 10 Mbps (Upload/Download)',
      '100% Fiber Optic Tanpa Kuota (Truly Unlimited)',
      'Cocok untuk 1 - 3 Perangkat',
      'Gratis Modem WiFi Dual Band',
      'Layanan Bantuan 24/7'
    ],
    recommendedDevices: '1-3 HP / Laptop',
    fupLimit: 'Tanpa FUP'
  },
  {
    id: 'pkg-home-30',
    name: 'Simpink Family 30 Mbps',
    speedMbps: 30,
    priceMonthly: 235000,
    category: 'home',
    description: 'Paket terfavorit keluarga! Ideal untuk streaming Full HD, Zoom, dan kerja dari rumah.',
    features: [
      'Kecepatan 30 Mbps Super Cepat',
      '100% Fiber Optic Simetris',
      'Cocok untuk 4 - 8 Perangkat',
      'Gratis Sewa Router Mesh WiFi Dual Band',
      'Prioritas Bebas Latensi Rendah',
      'Gratis Biaya Pemasangan Pertama'
    ],
    recommendedDevices: '4-8 Perangkat',
    isPopular: true,
    fupLimit: 'Tanpa FUP'
  },
  {
    id: 'pkg-home-50',
    name: 'Simpink Gamer & Stream 50 Mbps',
    speedMbps: 50,
    priceMonthly: 340000,
    category: 'home',
    description: 'Nge-game tanpa lag & nonton 4K UHD lancar jaya untuk seluruh anggota keluarga.',
    features: [
      'Kecepatan 50 Mbps Ultra Cepat',
      'Jaringan Ping Rendah Khusus Gaming',
      'Cocok untuk 8 - 12 Perangkat',
      'Router High-Power WiFi 6 Enabled',
      'Akses VIP Customer Care Simpink'
    ],
    recommendedDevices: '8-12 Perangkat',
    fupLimit: 'Tanpa FUP'
  },
  {
    id: 'pkg-home-100',
    name: 'Simpink Ultimate Fiber 100 Mbps',
    speedMbps: 100,
    priceMonthly: 520000,
    category: 'home',
    description: 'Performa maksimal tanpa batas untuk rumah pintar, kreator konten, & heavy downloader.',
    features: [
      'Kecepatan 100 Mbps Super Broadband',
      'Koneksi Simetris 1:1 Download & Upload',
      'Dukungan Multi-Stream 4K / 8K Video',
      'Gratis IP Dynamic Publik',
      'Layanan Teknisi On-Site Prioritas Utama'
    ],
    recommendedDevices: '12+ Perangkat / Smart Home',
    fupLimit: 'Tanpa FUP'
  },
  {
    id: 'pkg-biz-100',
    name: 'Simpink Business Dedicated 100 Mbps',
    speedMbps: 100,
    priceMonthly: 850000,
    category: 'business',
    description: 'Solusi koneksi Dedicated Fiber Optic untuk Cafe, Kantor, & Usaha UMKM.',
    features: [
      'Ratio Bandwidth Dedicated 1:1 Guaranteed',
      'SLA Jaringan 99.8% Uptime',
      'Gratis 1 Static IP Public',
      'Dukungan Custom Hotspot Portal Voucher',
      'Teknisi Khusus Bisnis Standby 24/7'
    ],
    recommendedDevices: 'Kantor / Cafe hingga 30 User',
    isDedicated: true
  },
  {
    id: 'pkg-biz-300',
    name: 'Simpink Enterprise Pro 300 Mbps',
    speedMbps: 300,
    priceMonthly: 1750000,
    category: 'business',
    description: 'Koneksi ultra premium kapasitas tinggi untuk perusahaan & gedung operasional.',
    features: [
      'Bandwidth Dedicated 300 Mbps Pure Fiber',
      'SLA Jaringan 99.9% Uptime SLA',
      'Bisa Request 2 Static IP Public',
      'Router Enterprise Grade Dual WAN Backup',
      'Account Manager Khusus'
    ],
    recommendedDevices: 'Kantor / Gedung 50+ User',
    isDedicated: true
  },
  {
    id: 'pkg-addon-booster',
    name: 'Speed Booster 24 Jam (+50 Mbps)',
    speedMbps: 50,
    priceMonthly: 25000,
    category: 'addon',
    description: 'Tambah kecepatan internet Anda sebesar +50 Mbps selama 24 jam instan.',
    features: [
      'Langsung Aktif dalam 2 Menit',
      'Tanpa Mengubah Masa Aktif Paket Utama',
      'Cocok Saat Ada Event / Download File Besar'
    ],
    recommendedDevices: 'Semua Paket Utama'
  },
  {
    id: 'pkg-addon-ipstatic',
    name: 'IP Publik Statis (Bulanan)',
    speedMbps: 0,
    priceMonthly: 60000,
    category: 'addon',
    description: 'Alamat IP Statis Dedicated untuk server lokal, CCTV, & VPN kantor.',
    features: [
      'Alamat IP Tetap Permanen',
      'Akses Port Forwarding Terbuka',
      'Ideal untuk Remote Server & CCTV'
    ],
    recommendedDevices: 'CCTV / Server'
  }
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  {
    id: 'SPN-2026-01',
    fullName: 'Ahmad Subagja',
    phone: '081234567890',
    email: 'ahmad.subagja@gmail.com',
    address: 'Jl. Merdeka No. 45, Blok A3, Komplek Simpink Perdana, Jakarta',
    odpCode: 'ODP-SPN-MDK-01/12',
    packageId: 'pkg-home-30',
    packageName: 'Simpink Family 30 Mbps',
    speedMbps: 30,
    monthlyFee: 235000,
    status: 'active',
    installationDate: '2025-03-15'
  },
  {
    id: 'SPN-2026-02',
    fullName: 'Siti Nurhaliza',
    phone: '085711223344',
    email: 'siti.nurhaliza@yahoo.com',
    address: 'Jl. Mawar Melati No. 12, RT 04/RW 02, Bandung',
    odpCode: 'ODP-SPN-MWR-02/08',
    packageId: 'pkg-home-50',
    packageName: 'Simpink Gamer & Stream 50 Mbps',
    speedMbps: 50,
    monthlyFee: 340000,
    status: 'active',
    installationDate: '2025-06-10'
  },
  {
    id: 'SPN-2026-03',
    fullName: 'Budi Santoso',
    phone: '081987654321',
    email: 'budi.santoso@outlook.com',
    address: 'Ruko Simpink Central Kav. 8, Jl. Gatot Subroto, Surabaya',
    odpCode: 'ODP-SPN-GTS-05/16',
    packageId: 'pkg-biz-100',
    packageName: 'Simpink Business Dedicated 100 Mbps',
    speedMbps: 100,
    monthlyFee: 850000,
    status: 'active',
    installationDate: '2024-11-01'
  },
  {
    id: 'SPN-2026-04',
    fullName: 'Rina Permata',
    phone: '082144332211',
    email: 'rina.permata@gmail.com',
    address: 'Perumahan Simpink Indah Blok C2 No. 9, Semarang',
    odpCode: 'ODP-SPN-SMG-03/04',
    packageId: 'pkg-home-10',
    packageName: 'Simpink Hemat 10 Mbps',
    speedMbps: 10,
    monthlyFee: 150000,
    status: 'active',
    installationDate: '2026-01-20'
  }
];

export const INITIAL_BILLS: Bill[] = [
  {
    id: 'BILL-202608-001',
    subscriberId: 'SPN-2026-01',
    subscriberName: 'Ahmad Subagja',
    subscriberAddress: 'Jl. Merdeka No. 45, Blok A3, Komplek Simpink Perdana, Jakarta',
    subscriberPhone: '081234567890',
    packageName: 'Simpink Family 30 Mbps',
    speedMbps: 30,
    periodMonth: 'Agustus 2026',
    dueDate: '2026-08-20',
    amount: 235000,
    adminFee: 0,
    taxAmount: 25850,
    totalAmount: 260850,
    status: 'UNPAID'
  },
  {
    id: 'BILL-202608-002',
    subscriberId: 'SPN-2026-02',
    subscriberName: 'Siti Nurhaliza',
    subscriberAddress: 'Jl. Mawar Melati No. 12, RT 04/RW 02, Bandung',
    subscriberPhone: '085711223344',
    packageName: 'Simpink Gamer & Stream 50 Mbps',
    speedMbps: 50,
    periodMonth: 'Agustus 2026',
    dueDate: '2026-08-20',
    amount: 340000,
    adminFee: 0,
    taxAmount: 37400,
    totalAmount: 377400,
    status: 'UNPAID'
  },
  {
    id: 'BILL-202608-003',
    subscriberId: 'SPN-2026-03',
    subscriberName: 'Budi Santoso',
    subscriberAddress: 'Ruko Simpink Central Kav. 8, Jl. Gatot Subroto, Surabaya',
    subscriberPhone: '081987654321',
    packageName: 'Simpink Business Dedicated 100 Mbps',
    speedMbps: 100,
    periodMonth: 'Agustus 2026',
    dueDate: '2026-08-15',
    amount: 850000,
    adminFee: 0,
    taxAmount: 93500,
    totalAmount: 943500,
    status: 'PAID',
    paidAt: '2026-08-05 10:14:22',
    paymentMethod: 'QRIS - GoPay',
    transactionRef: 'TX-SPN-8829103'
  },
  {
    id: 'BILL-202608-004',
    subscriberId: 'SPN-2026-04',
    subscriberName: 'Rina Permata',
    subscriberAddress: 'Perumahan Simpink Indah Blok C2 No. 9, Semarang',
    subscriberPhone: '082144332211',
    packageName: 'Simpink Hemat 10 Mbps',
    speedMbps: 10,
    periodMonth: 'Agustus 2026',
    dueDate: '2026-08-10',
    amount: 150000,
    adminFee: 0,
    taxAmount: 16500,
    totalAmount: 166500,
    status: 'OVERDUE'
  }
];

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'qris_instant',
    name: 'QRIS Instant (Semua E-Wallet & Mobile Banking)',
    category: 'qris',
    iconName: 'QrCode',
    fee: 0,
    instructions: [
      'Buka aplikasi e-wallet (GoPay, DANA, OVO, ShopeePay, LinkAja) atau Mobile Banking pilihan Anda.',
      'Pilih menu Scan QRIS / Bayar.',
      'Arahkan kamera ke QR Code yang tertera di layar.',
      'Periksa nama penerima SIMPINK NET PROVIDER WIFI dan jumlah total bayar.',
      'Konfirmasi pembayaran dan masukkan PIN Anda.'
    ]
  },
  {
    id: 'va_bca',
    name: 'BCA Virtual Account',
    category: 'va',
    iconName: 'Building2',
    accountNumber: '88019283748291',
    fee: 1000,
    instructions: [
      'Buka myBCA / m-BCA / KlikBCA / ATM BCA.',
      'Pilih menu Transfer > Virtual Account.',
      'Masukkan nomor Virtual Account: 88019283748291.',
      'Jumlah pembayaran akan terisi otomatis sesuai tagihan.',
      'Konfirmasi transaksi dan simpan resi transaksi.'
    ]
  },
  {
    id: 'va_mandiri',
    name: 'Mandiri Virtual Account (Livin)',
    category: 'va',
    iconName: 'Building2',
    accountNumber: '89102837465920',
    fee: 1000,
    instructions: [
      'Buka aplikasi Livin\' by Mandiri.',
      'Pilih menu Bayar > Buat Pembayaran Baru > Multipayment.',
      'Pilih penyedia jasa SIMPINK NET atau masukkan kode perusahaan 89102.',
      'Masukkan nomor Virtual Account: 89102837465920.',
      'Periksa nominal dan selesaikan pembayaran.'
    ]
  },
  {
    id: 'va_bri',
    name: 'BRI Virtual Account (BRIVA)',
    category: 'va',
    iconName: 'Building2',
    accountNumber: '12903847561029',
    fee: 1000,
    instructions: [
      'Buka aplikasi BRImo / ATM BRI.',
      'Pilih menu Pembayaran > BRIVA.',
      'Masukkan nomor BRIVA: 12903847561029.',
      'Konfirmasi detail tagihan Simpink Net dan bayar.'
    ]
  },
  {
    id: 'ewallet_dana',
    name: 'DANA E-Wallet',
    category: 'ewallet',
    iconName: 'Wallet',
    fee: 0,
    instructions: [
      'Masukkan nomor HP terdaftar DANA Anda.',
      'Klik Bayar Sekarang, Anda akan mendapatkan notifikasi persetujuan di aplikasi DANA.',
      'Buka aplikasi DANA dan tekan Konfirmasi Pembayaran.'
    ]
  },
  {
    id: 'ewallet_gopay',
    name: 'GoPay',
    category: 'ewallet',
    iconName: 'Wallet',
    fee: 0,
    instructions: [
      'Buka aplikasi Gojek / GoPay.',
      'Konfirmasi pembayaran tagihan Simpink Net.',
      'Selesaikan transaksi dengan PIN GoPay.'
    ]
  },
  {
    id: 'retail_indomaret',
    name: 'Indomaret / Alfamart',
    category: 'retail',
    iconName: 'Store',
    accountNumber: 'SPN-PAY-99201',
    fee: 2500,
    instructions: [
      'Kunjungi gerai Indomaret / Alfamart terdekat.',
      'Informasikan kepada kasir untuk melakukan pembayaran tagihan internet SIMPINK NET PROVIDER.',
      'Tunjukkan kode pembayaran SPN-PAY-99201 atau ID Pelanggan Anda.',
      'Bayar nominal tagihan ke kasir dan simpan struk cetak sebagai bukti.'
    ]
  }
];

export const COVERAGE_AREAS: CoverageArea[] = [
  { id: 'cov-1', regionName: 'Komplek Simpink Perdana', district: 'Kebayoran', city: 'Jakarta Selatan', status: 'AVAILABLE', availablePorts: 12, odpCode: 'ODP-SPN-JKS-01' },
  { id: 'cov-2', regionName: 'Perumahan Mawar Melati', district: 'Coblong', city: 'Bandung', status: 'AVAILABLE', availablePorts: 6, odpCode: 'ODP-SPN-BDG-03' },
  { id: 'cov-3', regionName: 'Ruko Simpink Central & Commercial', district: 'Gubeng', city: 'Surabaya', status: 'AVAILABLE', availablePorts: 18, odpCode: 'ODP-SPN-SBY-02' },
  { id: 'cov-4', regionName: 'Perumahan Simpink Indah Phase 2', district: 'Banyumanik', city: 'Semarang', status: 'EXPANDING', availablePorts: 0, odpCode: 'ODP-SPN-SMG-05' },
  { id: 'cov-5', regionName: 'Kawasan Wisata & Residensi Batu', district: 'Batu', city: 'Malang', status: 'AVAILABLE', availablePorts: 9, odpCode: 'ODP-SPN-MLG-01' },
  { id: 'cov-6', regionName: 'Sektor Medan Kota Baru', district: 'Medan Baru', city: 'Medan', status: 'AVAILABLE', availablePorts: 15, odpCode: 'ODP-SPN-MDN-04' }
];
