export type ViewMode = 'payment' | 'packages' | 'coverage' | 'support' | 'admin';

export interface WifiPackage {
  id: string;
  name: string;
  speedMbps: number;
  priceMonthly: number;
  category: 'home' | 'business' | 'addon';
  description: string;
  features: string[];
  recommendedDevices: string;
  isPopular?: boolean;
  isDedicated?: boolean;
  fupLimit?: string;
  discountPercentage?: number;
}

export interface Subscriber {
  id: string; // e.g., SPN-2026-01
  fullName: string;
  phone: string;
  email: string;
  address: string;
  odpCode?: string;
  packageId: string;
  packageName: string;
  speedMbps: number;
  monthlyFee: number;
  status: 'active' | 'suspended' | 'pending_installation';
  installationDate: string;
}

export interface Bill {
  id: string; // e.g., BILL-202608-01
  subscriberId: string;
  subscriberName: string;
  subscriberAddress: string;
  subscriberPhone: string;
  packageName: string;
  speedMbps: number;
  periodMonth: string; // e.g. "Agustus 2026"
  dueDate: string;
  amount: number;
  adminFee: number;
  taxAmount: number;
  totalAmount: number;
  status: 'UNPAID' | 'PAID' | 'OVERDUE';
  paidAt?: string;
  paymentMethod?: string;
  transactionRef?: string;
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  category: 'qris' | 'ewallet' | 'va' | 'retail';
  iconName: string;
  accountNumber?: string;
  instructions: string[];
  fee: number;
}

export interface DisruptionTicket {
  id: string;
  subscriberId: string;
  subscriberName: string;
  issueType: 'slow' | 'offline' | 'blinking_red' | 'billing' | 'other';
  description: string;
  createdAt: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
}

export interface CoverageArea {
  id: string;
  regionName: string;
  district: string;
  city: string;
  status: 'AVAILABLE' | 'EXPANDING' | 'FULL';
  availablePorts: number;
  odpCode: string;
}
