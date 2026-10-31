import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import { reportCategories, reportsData } from '../data/reportsData';
import { exportToCSV } from '../utils/exportCSV';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Reports() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('revenue');
  const [reportPeriod, setReportPeriod] = useState('Quarter 1 (2024)');

  const currentCategory =
    reportCategories.find((c) => c.id === selectedCategoryId) || reportCategories[0];
  const currentReport = reportsData[selectedCategoryId] || reportsData.revenue;

  const handleDownloadCSV = () => {
    try {
      exportToCSV(
        currentReport.csvRows,
        `nexus-${selectedCategoryId}-report-Q1-2024.csv`
      );
      toast.success(
        `Exported ${currentCategory.name} to CSV successfully!`
      );
    } catch {
      toast.error('Failed to export report CSV');
    }
  };

  return (
    <PageLayout
      title="Business Reports & Data Export"
      subtitle="Executive summaries, automated spreadsheets, cohort metrics and compliance data"
      actions={
        <Button
          variant="primary"
          size="sm"
          icon={Download}
          onClick={handleDownloadCSV}
        >
          Export Report CSV
        </Button>
      }
    >
      {/* Category Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCategories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-violet-600/15 border-violet-500/50 shadow-sm'
                  : 'bg-[#151923] border-[#252B38] hover:border-slate-700/80'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500" />
              )}
              <div className="flex items-center justify-between mb-2">
                <FileText
                  className={`w-5 h-5 ${
                    isSelected ? 'text-violet-400' : 'text-slate-400'
                  }`}
                />
                {isSelected && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-300 bg-violet-500/20 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-white">{cat.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {currentReport.summary.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-[#151923] border border-[#252B38]"
          >
            <span className="text-xs text-slate-400">{stat.label}</span>
            <div className="text-xl font-bold text-white mt-1">{stat.value}</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">
              {stat.change} vs baseline
            </div>
          </div>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-semibold text-white">
              {currentCategory.name} Visual Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparative metric aggregation over {reportPeriod}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="px-2.5 py-1 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-violet-500"
            >
              <option value="Quarter 1 (2024)">Quarter 1 (2024)</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Annual Year-to-Date">Annual Year-to-Date</option>
            </select>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentReport.chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#252B38" vertical={false} />
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151923',
                  borderColor: '#252B38',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Bar
                dataKey={
                  selectedCategoryId === 'revenue'
                    ? 'gross'
                    : selectedCategoryId === 'customer'
                    ? 'retainedUsers'
                    : selectedCategoryId === 'sales'
                    ? 'deals'
                    : 'rev'
                }
                fill="#8B5CF6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Data Preview Table */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">
              Tabular Data Preview (CSV Source)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {currentReport.csvRows.length} rows ready to download
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#252B38]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#252B38] bg-[#10131B] text-slate-400 font-semibold">
                {Object.keys(currentReport.csvRows[0] || {}).map((col) => (
                  <th key={col} className="py-3 px-4 capitalize">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252B38]/60 text-slate-300">
              {currentReport.csvRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/20">
                  {Object.values(row).map((val, cIdx) => (
                    <td key={cIdx} className="py-3 px-4 font-mono">
                      {typeof val === 'number' ? val.toLocaleString() : String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
