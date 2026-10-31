import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  Menu,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import DateFilter from '../common/DateFilter';
import NotificationPanel from '../common/NotificationPanel';

export default function Topbar({ onOpenHelp }) {
  const {
    openMobileSidebar,
    openSearch,
    unreadNotificationsCount,
    userProfile,
  } = useDashboard();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Compute breadcrumbs
  const pathnames = location.pathname.split('/').filter((x) => x);
  const currentPageTitle =
    pathnames.length === 0
      ? 'Overview'
      : pathnames[0].charAt(0).toUpperCase() + pathnames[0].slice(1);

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    toast.success('Signed out of demo session. Welcome back anytime!');
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#0B0D12]/90 dark:bg-[#0B0D12]/90 light:bg-white/90 backdrop-blur-md border-b border-[#252B38] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={openMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link
            to="/"
            className="hover:text-slate-200 transition-colors hidden sm:inline"
          >
            Nexus
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
          <span className="font-semibold text-slate-100">{currentPageTitle}</span>
        </nav>
      </div>

      {/* Center/Right: Global search bar, date range, actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Trigger */}
        <button
          onClick={openSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-[#252B38] text-xs text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all shadow-sm"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700">
            <span>⌘</span>K
          </kbd>
        </button>

        {/* Date Range Selector */}
        <DateFilter />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-[#252B38] transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-violet-400" />
          )}
        </button>

        {/* Notifications Icon with Panel */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen((prev) => !prev)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-[#252B38] transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            )}
          </button>
          <NotificationPanel
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-[#252B38] transition-all"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.fullName}
              className="w-7 h-7 rounded-full object-cover border border-violet-500/40"
            />
            <span className="hidden lg:inline text-xs font-medium text-slate-200">
              {userProfile.fullName.split(' ')[0]}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:inline" />
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#151923] border border-[#252B38] shadow-dropdown-dark p-1.5 z-40 backdrop-blur-md"
              >
                {/* Profile mini bio */}
                <div className="px-3 py-2.5 border-b border-[#252B38] mb-1">
                  <div className="text-xs font-semibold text-slate-100 truncate">
                    {userProfile.fullName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {userProfile.email}
                  </div>
                  <span className="mt-1.5 inline-block text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300">
                    Portfolio Demo Mode
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onOpenHelp();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Help Center</span>
                </button>

                <div className="my-1 border-t border-[#252B38]" />

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
