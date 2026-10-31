import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../../context/DashboardContext';

export default function PageLayout({
  title,
  subtitle,
  actions,
  children,
}) {
  const { isSidebarCollapsed } = useDashboard();

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
      }`}
    >
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Dynamic Page Header */}
        {(title || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
            <div>
              {title && (
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-2.5 flex-wrap">
                {actions}
              </div>
            )}
          </div>
        )}

        {/* Animated Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="space-y-6"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer watermark */}
      <footer className="border-t border-[#252B38]/60 py-4 px-6 text-center text-xs text-slate-500">
        <p>
          <span className="font-semibold text-slate-400">NEXUS</span> — Built with React & Tailwind CSS for{' '}
          <span className="text-violet-400 font-medium">Muhammad Rehan’s</span> Engineering Portfolio.
        </p>
      </footer>
    </div>
  );
}
