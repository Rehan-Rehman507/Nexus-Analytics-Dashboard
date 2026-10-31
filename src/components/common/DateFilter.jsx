import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../../context/DashboardContext';

const dateOptions = [
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'Last 90 Days',
  'This Year',
  'Custom Range',
];

export default function DateFilter() {
  const { dateRange, setDateRange } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 hover:bg-slate-800/80 border border-[#252B38] text-xs font-medium text-slate-300 hover:text-white transition-all shadow-sm"
        aria-label="Filter by date range"
      >
        <Calendar className="w-3.5 h-3.5 text-violet-400" />
        <span>{dateRange}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-[#151923] border border-[#252B38] shadow-dropdown-dark p-1.5 z-40 backdrop-blur-md"
          >
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-2.5 py-1">
              Select Timeframe
            </div>
            {dateOptions.map((option) => {
              const isSelected = dateRange === option;
              return (
                <button
                  key={option}
                  onClick={() => {
                    setDateRange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    isSelected
                      ? 'bg-violet-600/20 text-violet-300 font-medium'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-violet-400" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
