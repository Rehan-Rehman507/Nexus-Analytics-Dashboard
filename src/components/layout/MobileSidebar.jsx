import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  Users,
  ArrowRightLeft,
  Package,
  FileText,
  Settings,
  HelpCircle,
  BookOpen,
  X,
  Zap,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const navItems = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Revenue', path: '/revenue', icon: DollarSign },
  { name: 'Customers', path: '/customers', icon: Users, badge: '2.8k' },
  { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function MobileSidebar({ onOpenHelp, onOpenDocs }) {
  const { isMobileSidebarOpen, closeMobileSidebar, userProfile } = useDashboard();
  const location = useLocation();

  return (
    <AnimatePresence>
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileSidebar}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-72 max-w-[85vw] h-full bg-[#10131B] border-r border-[#252B38] flex flex-col z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#252B38]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-glow-purple">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold tracking-wider text-base text-white">
                      NEXUS
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 bg-violet-500/20 text-violet-300 rounded border border-violet-500/30">
                      PRO
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Business Analytics
                  </span>
                </div>
              </div>

              <button
                onClick={closeMobileSidebar}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
                Main Menu
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-violet-600/15 text-violet-300 font-semibold border border-violet-500/25 shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-[#252B38] space-y-2">
              <button
                onClick={() => {
                  closeMobileSidebar();
                  onOpenHelp();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Help Center</span>
              </button>

              <button
                onClick={() => {
                  closeMobileSidebar();
                  onOpenDocs();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Documentation</span>
              </button>

              <div className="pt-2 flex items-center gap-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.fullName}
                  className="w-9 h-9 rounded-full object-cover border border-violet-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200 truncate">
                    {userProfile.fullName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {userProfile.email}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
