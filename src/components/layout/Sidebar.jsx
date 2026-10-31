import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ChevronLeft,
  ChevronRight,
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

export default function Sidebar({ onOpenHelp, onOpenDocs }) {
  const { isSidebarCollapsed, toggleSidebar, userProfile } = useDashboard();
  const location = useLocation();

  return (
    <aside
      className={`hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ease-in-out border-r border-[#252B38] bg-[#10131B] text-slate-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-[#252B38]/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-glow-purple shrink-0">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-base text-white">
                  NEXUS
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 bg-violet-500/20 text-violet-300 rounded border border-violet-500/30">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                Business Analytics
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
          {!isSidebarCollapsed ? 'Main Menu' : '•••'}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={isSidebarCollapsed ? item.name : undefined}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative ${
                isActive
                  ? 'bg-violet-600/15 text-violet-300 font-semibold border border-violet-500/25 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-violet-500 rounded-r-full"
                />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-violet-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              {!isSidebarCollapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}
              {!isSidebarCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Sidebar Sections */}
      <div className="p-3 border-t border-[#252B38]/80 space-y-1">
        <button
          onClick={onOpenHelp}
          title={isSidebarCollapsed ? 'Help Center' : undefined}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
        >
          <HelpCircle className="w-4 h-4 shrink-0 text-slate-400" />
          {!isSidebarCollapsed && <span>Help Center</span>}
        </button>

        <button
          onClick={onOpenDocs}
          title={isSidebarCollapsed ? 'Documentation' : undefined}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
        >
          <BookOpen className="w-4 h-4 shrink-0 text-slate-400" />
          {!isSidebarCollapsed && <span>Documentation</span>}
        </button>

        {/* User preview card in sidebar */}
        <div className="pt-2 mt-2 border-t border-[#252B38]/60">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#151923]/60 border border-[#252B38]/40">
            <img
              src={userProfile.avatar}
              alt={userProfile.fullName}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-violet-500/30"
            />
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {userProfile.fullName}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {userProfile.email}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="w-full mt-2 flex items-center justify-center py-2 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors border border-transparent hover:border-[#252B38]"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-violet-400" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4 text-slate-400" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
