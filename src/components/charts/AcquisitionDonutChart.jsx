import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { acquisitionSources } from '../../data/customersData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#151923] border border-[#252B38] rounded-xl p-2.5 shadow-dropdown-dark text-xs">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-semibold text-white">{data.name}</span>
        </div>
        <div className="mt-1 text-slate-300">
          <span className="font-bold text-violet-400">{data.value}%</span> of total
          <span className="text-slate-400 text-[10px] ml-1.5">({data.count} users)</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function AcquisitionDonutChart() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-white">Acquisition Channels</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Top sources driving new customer signups
        </p>
      </div>

      <div className="relative h-56 sm:h-60 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={acquisitionSources}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={84}
              paddingAngle={4}
              dataKey="value"
            >
              {acquisitionSources.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#151923"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            2,845
          </span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Total Users
          </span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="space-y-2 pt-2 border-t border-[#252B38]">
        {acquisitionSources.map((src) => (
          <div key={src.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: src.color }}
              />
              <span className="text-slate-300 font-medium">{src.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-[11px]">{src.count}</span>
              <span className="font-semibold text-white w-8 text-right">
                {src.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
