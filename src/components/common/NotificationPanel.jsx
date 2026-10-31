import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Trash2, ArrowUpRight, DollarSign, UserCheck, AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function NotificationPanel({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
  } = useDashboard();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const getIcon = (type) => {
    switch (type) {
      case 'revenue':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'success':
        return <UserCheck className="w-4 h-4 text-violet-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-blue-400" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.18 }}
          className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#151923] border border-[#252B38] shadow-dropdown-dark overflow-hidden z-50 backdrop-blur-md"
        >
          {/* Header */}
          <div className="p-4 border-b border-[#252B38] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-100">Notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-600 text-white">
                  {unreadNotificationsCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {notifications.length > 0 && (
                <>
                  <button
                    onClick={markAllNotificationsAsRead}
                    title="Mark all as read"
                    className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={clearNotifications}
                    title="Clear all"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#252B38]/60">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                    !item.isRead
                      ? 'bg-violet-600/5 hover:bg-violet-600/10'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[#10131B] border border-[#252B38] shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs font-medium truncate ${
                          !item.isRead ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {item.title}
                      </h4>
                      {!item.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-400">
                <Bell className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                <p className="text-xs">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-[#10131B] border-t border-[#252B38] text-center">
              <span className="text-[11px] text-slate-500">
                Showing live alerts & updates
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
