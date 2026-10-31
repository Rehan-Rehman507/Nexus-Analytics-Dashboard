import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { revenuePeriods } from '../../data/revenueData';
import { formatCurrency } from '../../utils/formatCurrency';

// Custom sleek tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151923] border border-[#252B38] rounded-xl p-3 shadow-dropdown-dark text-xs backdrop-blur-md">
        <div className="font-semibold text-slate-300 pb-2 mb-2 border-b border-[#252B38]">
          {label} Performance
        </div>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-400 capitalize">{entry.name}:</span>
              </div>
              <span className="font-semibold text-white">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ showExpenses = true }) {
  const [period, setPeriod] = useState('monthly');
  const data = revenuePeriods[period] || revenuePeriods.monthly;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
      {/* Header with period toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">Revenue Performance</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Gross revenue vs previous period comparative trajectory
          </p>
        </div>

        {/* Period Switcher (Weekly, Monthly, Yearly) */}
        <div className="flex items-center p-1 bg-[#0B0D12] rounded-xl border border-[#252B38] self-start sm:self-auto">
          {['weekly', 'monthly', 'yearly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-all ${
                period === p
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="previousGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#252B38"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#252B38' }}
            />

            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#252B38' }}
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', color: '#94A3B8' }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              name="Current Revenue"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#revenueGrad)"
            />

            <Area
              type="monotone"
              dataKey="previous"
              name="Previous Period"
              stroke="#3B82F6"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#previousGrad)"
            />

            {showExpenses && (
              <Area
                type="monotone"
                dataKey="expenses"
                name="Operating Costs"
                stroke="#F59E0B"
                strokeWidth={1.5}
                fillOpacity={0}
                fill="transparent"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
