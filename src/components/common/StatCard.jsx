import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import MiniSparkline from './MiniSparkline';

export default function StatCard({
  title,
  value,
  formattedValue,
  change,
  isPositive = true,
  comparison = 'compared to previous period',
  icon: Icon,
  sparklineData = [],
  color = '#8B5CF6',
  delay = 0,
}) {
  const isUp = isPositive ?? change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative p-5 rounded-2xl bg-[#151923] border border-[#252B38] hover:border-slate-700/80 transition-all duration-300 group shadow-card-dark overflow-hidden"
    >
      {/* Subtle top accent highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`
        }}
      />

      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
          {title}
        </span>
        {Icon && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200"
            style={{
              backgroundColor: `${color}15`,
              borderColor: `${color}30`,
              color: color,
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {formattedValue || value}
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <div className="hidden sm:block">
            <MiniSparkline data={sparklineData} color={color} isPositive={isUp} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded-md ${
            isUp
              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
              : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
          }`}
        >
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isUp ? '+' : ''}{change}%
        </span>
        <span className="text-slate-400 text-[11px] truncate">{comparison}</span>
      </div>
    </motion.div>
  );
}
