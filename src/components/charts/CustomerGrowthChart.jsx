import React from 'react';
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
import { customerGrowthData } from '../../data/customersData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151923] border border-[#252B38] rounded-xl p-3 shadow-dropdown-dark text-xs">
        <div className="font-semibold text-slate-300 pb-2 mb-2 border-b border-[#252B38]">
          {label} Cohort
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
                {entry.value.toLocaleString()} users
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function CustomerGrowthChart() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">Customer Base Growth</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Active customer trajectory vs newly acquired accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            +71.8% YTD Growth
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={customerGrowthData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#252B38" vertical={false} />

            <XAxis
              dataKey="month"
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
              dataKey="activeCustomers"
              name="Active Accounts"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#activeGrad)"
            />

            <Area
              type="monotone"
              dataKey="newCustomers"
              name="New Signups"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#newGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
