import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardProvider, useDashboard } from './context/DashboardContext';

import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import MobileSidebar from './components/layout/MobileSidebar';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import HelpCenterModal from './components/modals/HelpCenterModal';
import DocumentationModal from './components/modals/DocumentationModal';

// Pages
import Overview from './pages/Overview';
import Analytics from './pages/Analytics';
import Revenue from './pages/Revenue';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function AppLayout() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const { openSearch } = useDashboard();

  // Listen to custom global shortcut open
  useEffect(() => {
    const handleOpenSearch = () => openSearch();
    document.addEventListener('nexus-open-search', handleOpenSearch);
    return () => document.removeEventListener('nexus-open-search', handleOpenSearch);
  }, [openSearch]);

  return (
    <div className="min-h-screen bg-[#0B0D12] dark:bg-[#0B0D12] light:bg-[#F8FAFC] text-slate-100 transition-colors duration-200">
      {/* Fixed Desktop Sidebar */}
      <Sidebar
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileSidebar
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Top Header Bar */}
      <Topbar onOpenHelp={() => setIsHelpOpen(true)} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Interactive Modals */}
      <GlobalSearchModal />
      <HelpCenterModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Notification Toaster */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#151923',
            color: '#F8FAFC',
            border: '1px solid #252B38',
            borderRadius: '12px',
            fontSize: '12px',
            boxShadow: '0 10px 30px -4px rgba(0,0,0,0.5)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#151923',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#151923',
            },
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <AppLayout />
      </DashboardProvider>
    </ThemeProvider>
  );
}
