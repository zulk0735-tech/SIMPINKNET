import React, { useState } from 'react';
import { ViewMode, Bill, Subscriber, WifiPackage } from './types';
import { INITIAL_BILLS, INITIAL_SUBSCRIBERS, INITIAL_PACKAGES } from './data/mockData';
import { Header } from './components/Header';
import { BillPayment } from './components/BillPayment';
import { PackagesCatalog } from './components/PackagesCatalog';
import { CoverageChecker } from './components/CoverageChecker';
import { SpeedtestAndSupport } from './components/SpeedtestAndSupport';
import { AdminDashboard } from './components/AdminDashboard';
import { NewSubscriberModal } from './components/NewSubscriberModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('payment');
  const [bills, setBills] = useState<Bill[]>(INITIAL_BILLS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);
  
  // Registration Modal State
  const [registerPkg, setRegisterPkg] = useState<WifiPackage | null>(null);
  const [registerAddress, setRegisterAddress] = useState<string>('');

  const unpaidCount = bills.filter(b => b.status === 'UNPAID' || b.status === 'OVERDUE').length;

  const handlePayBillSuccess = (billId: string, paymentMethodName: string, txRef: string) => {
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'medium' });
    setBills(prev => prev.map(b => {
      if (b.id === billId) {
        return {
          ...b,
          status: 'PAID',
          paidAt: now,
          paymentMethod: paymentMethodName,
          transactionRef: txRef
        };
      }
      return b;
    }));
  };

  const handleAdminMarkAsPaid = (billId: string) => {
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'medium' });
    setBills(prev => prev.map(b => {
      if (b.id === billId) {
        return {
          ...b,
          status: 'PAID',
          paidAt: now,
          paymentMethod: 'Verifikasi Admin Simpink Net',
          transactionRef: `ADM-SPN-${Math.floor(100000 + Math.random() * 900000)}`
        };
      }
      return b;
    }));
  };

  const handleAddNewBill = (newBill: Bill) => {
    setBills(prev => [newBill, ...prev]);
  };

  const handleAddNewSubscriber = (newSub: Subscriber) => {
    setSubscribers(prev => [newSub, ...prev]);
  };

  const handleSuccessRegister = (newSub: Subscriber, initialBill: Bill) => {
    handleAddNewSubscriber(newSub);
    handleAddNewBill(initialBill);
  };

  const handleSelectPackageToRegister = (pkg: WifiPackage) => {
    setRegisterPkg(pkg);
  };

  const handleRegisterFromCoverage = (locationName: string) => {
    setRegisterAddress(locationName);
    // Default to popular package
    const defaultPkg = INITIAL_PACKAGES.find(p => p.id === 'pkg-home-30') || INITIAL_PACKAGES[0];
    setRegisterPkg(defaultPkg);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        unpaidCount={unpaidCount}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentView === 'payment' && (
          <BillPayment
            bills={bills}
            onPayBillSuccess={handlePayBillSuccess}
            onSelectPackages={() => setCurrentView('packages')}
          />
        )}

        {currentView === 'packages' && (
          <PackagesCatalog
            onSelectPackageToRegister={handleSelectPackageToRegister}
          />
        )}

        {currentView === 'coverage' && (
          <CoverageChecker
            onRegisterLocation={handleRegisterFromCoverage}
          />
        )}

        {currentView === 'support' && (
          <SpeedtestAndSupport />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            bills={bills}
            subscribers={subscribers}
            onMarkAsPaid={handleAdminMarkAsPaid}
            onAddNewBill={handleAddNewBill}
            onAddNewSubscriber={handleAddNewSubscriber}
          />
        )}
      </main>

      {/* Registration Modal */}
      {registerPkg && (
        <NewSubscriberModal
          pkg={registerPkg}
          initialAddress={registerAddress}
          onClose={() => setRegisterPkg(null)}
          onSuccessRegister={handleSuccessRegister}
        />
      )}

      {/* Footer */}
      <Footer onSelectView={setCurrentView} />

    </div>
  );
}
