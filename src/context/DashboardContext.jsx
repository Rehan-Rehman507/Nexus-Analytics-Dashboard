import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { initialProducts } from '../data/productsData';
import { initialTransactions } from '../data/transactionsData';
import { initialNotifications } from '../data/notificationsData';

const DashboardContext = createContext();

const DEFAULT_PROFILE = {
  fullName: 'Alex Reynolds',
  email: 'alex.reynolds@nexus-platform.io',
  role: 'VP of Product Engineering',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  currency: 'USD',
  timezone: 'UTC -08:00 (Pacific Time)',
  language: 'English (US)',
  notifications: {
    email: true,
    productUpdates: true,
    securityAlerts: true
  }
};

export function DashboardProvider({ children }) {
  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      const stored = localStorage.getItem('nexus_sidebar_collapsed');
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Date range filter
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Products (persisted in LocalStorage)
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('nexus_products');
      return stored ? JSON.parse(stored) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Transactions (persisted in LocalStorage)
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem('nexus_transactions');
      return stored ? JSON.parse(stored) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  });

  // Notifications (persisted in LocalStorage)
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('nexus_notifications');
      return stored ? JSON.parse(stored) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  // User Profile Settings (persisted in LocalStorage)
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('nexus_user_profile');
      return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
    } catch (e) { console.error(e); }
  }, [isSidebarCollapsed]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_products', JSON.stringify(products));
    } catch (e) { console.error(e); }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_transactions', JSON.stringify(transactions));
    } catch (e) { console.error(e); }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_notifications', JSON.stringify(notifications));
    } catch (e) { console.error(e); }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_user_profile', JSON.stringify(userProfile));
    } catch (e) { console.error(e); }
  }, [userProfile]);

  // Product CRUD
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `PROD-0${products.length + 1}`,
      unitsSold: Number(productData.unitsSold) || 0,
      price: Number(productData.price) || 0,
      revenue: (Number(productData.price) || 0) * (Number(productData.unitsSold) || 0),
      stockCount: Number(productData.stockCount) || 10,
      rating: 5.0,
      image: productData.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&auto=format&fit=crop&q=80',
    };
    setProducts((prev) => [newProduct, ...prev]);
    toast.success(`Product "${newProduct.name}" created successfully!`);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          if (updatedFields.price !== undefined || updatedFields.unitsSold !== undefined) {
            updated.revenue = Number(updated.price) * Number(updated.unitsSold);
          }
          return updated;
        }
        return item;
      })
    );
    toast.success('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Product ${prod ? `"${prod.name}"` : ''} removed.`);
  };

  // Transaction Actions
  const updateTransactionStatus = (id, status) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status } : tx))
    );
    toast.success(`Transaction ${id} status updated to ${status}`);
  };

  // Notification Actions
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read.');
  };

  const clearNotifications = () => {
    setNotifications([]);
    toast.success('Notifications cleared.');
  };

  // User Profile
  const updateUserProfile = (newFields) => {
    setUserProfile((prev) => ({ ...prev, ...newFields }));
    toast.success('Settings saved successfully!');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem('nexus_products');
    localStorage.removeItem('nexus_transactions');
    localStorage.removeItem('nexus_notifications');
    localStorage.removeItem('nexus_user_profile');
    localStorage.removeItem('nexus_theme');

    setProducts(initialProducts);
    setTransactions(initialTransactions);
    setNotifications(initialNotifications);
    setUserProfile(DEFAULT_PROFILE);
    setDateRange('Last 30 Days');

    toast.success('Demo data restored to initial factory defaults!');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const openMobileSidebar = () => setIsMobileSidebarOpen(true);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <DashboardContext.Provider
      value={{
        isSidebarCollapsed,
        toggleSidebar,
        isMobileSidebarOpen,
        openMobileSidebar,
        closeMobileSidebar,
        isSearchOpen,
        openSearch,
        closeSearch,
        dateRange,
        setDateRange,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        transactions,
        updateTransactionStatus,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        userProfile,
        updateUserProfile,
        resetDemoData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
