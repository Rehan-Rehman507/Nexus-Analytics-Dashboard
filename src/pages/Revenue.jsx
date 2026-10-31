import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import StatCard from '../components/common/StatCard';
import RevenueChart from '../components/charts/RevenueChart';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  revenueStatsSummary,
  revenueBreakdown,
  revenueByPaymentMethod,
  revenueBreakdownTableData,
} from '../data/revenueData';
import { formatCurrency } from '../utils/formatCurrency';
import { exportToCSV } from '../utils/exportCSV';
import {
  DollarSign,
  TrendingUp,
  Receipt,
  RotateCcw,
  CreditCard,
  Download,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Revenue() {
  const handleExportRevenue = () => {
    try {
      exportToCSV(revenueBreakdownTableData, 'nexus-revenue-streams.csv');
      toast.success('Revenue stream records exported to CSV');
    } catch {
      toast.error('Failed to export revenue data');
    }
  };

  return (
    <PageLayout
      title="Revenue Management"
      subtitle="Financial performance, operating margins, cash flow and itemized revenue streams"
      actions={
        <Button variant="primary" size="sm" icon={Download} onClick={handleExportRevenue}>
          Export Revenue CSV
        </Button>
      }
    >
      {/* 4 Core Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(revenueStatsSummary.totalRevenue)}
          change={12.8}
          isPositive={true}
          comparison="vs previous month ($42,810)"
          icon={DollarSign}
          color="#8B5CF6"
          sparklineData={[32000, 35000, 39000, 42000, 45000, 48294]}
        />

        <StatCard
          title="Net Revenue"
          value={formatCurrency(revenueStatsSummary.netRevenue)}
          change={14.1}
          isPositive={true}
          comparison="after fees & infra expenses"
          icon={TrendingUp}
          color="#10B981"
          sparklineData={[24000, 26000, 28000, 31000, 33000, 35394]}
        />

        <StatCard
          title="Gross Invoiced"
          value={formatCurrency(revenueStatsSummary.grossRevenue)}
          change={9.5}
          isPositive={true}
          comparison="total checkout billings"
          icon={Receipt}
          color="#3B82F6"
          sparklineData={[38000, 41000, 44000, 48000, 50000, 52140]}
        />

        <StatCard
          title="Refunds & Disputes"
          value={formatCurrency(revenueStatsSummary.refunds)}
          change={-1.8}
          isPositive={false}
          comparison="2.4% refund rate (low)"
          icon={RotateCcw}
          color="#EF4444"
          sparklineData={[4200, 4100, 4000, 3900, 3860, 3846]}
        />
      </div>

      {/* Main Revenue Chart */}
      <RevenueChart showExpenses={true} />

      {/* Secondary Row: Revenue By Category & Payment Gateway */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
          <h3 className="text-base font-semibold text-white mb-1">Revenue by Product Line</h3>
          <p className="text-xs text-slate-400 mb-5">
            Contribution percentage from services and offerings
          </p>

          <div className="space-y-4">
            {revenueBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {formatCurrency(cat.amount)}
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">
                      {cat.growth}
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-[#0B0D12] rounded-full overflow-hidden border border-[#252B38]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
          <h3 className="text-base font-semibold text-white mb-1">Payment Method Distribution</h3>
          <p className="text-xs text-slate-400 mb-5">
            Settlement channels processed across gateways
          </p>

          <div className="space-y-3.5">
            {revenueByPaymentMethod.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-xl bg-[#10131B]/60 border border-[#252B38] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${item.color}15`,
                      borderColor: `${item.color}30`,
                      color: item.color,
                    }}
                  >
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.percentage}% of volume</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white">
                    {formatCurrency(item.value)}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium">Verified Rail</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Itemized Revenue Streams Table */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Itemized Revenue Streams</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Performance by subscription tier and channel
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">5 Active Revenue Pipelines</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#252B38] text-slate-400 font-semibold bg-[#10131B]/60">
                <th className="py-3 px-4">Stream Identifier</th>
                <th className="py-3 px-4">Sales Channel</th>
                <th className="py-3 px-4">Gross Revenue</th>
                <th className="py-3 px-4">Processing Fee</th>
                <th className="py-3 px-4">Net Settled</th>
                <th className="py-3 px-4">Trajectory</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252B38]/60 text-slate-300">
              {revenueBreakdownTableData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    {row.stream}
                    <div className="text-[10px] text-slate-400 font-mono font-normal">{row.id}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{row.channel}</td>
                  <td className="py-3 px-4 font-semibold text-white">{formatCurrency(row.gross)}</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">-{formatCurrency(row.fee)}</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{formatCurrency(row.net)}</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{row.growth}</td>
                  <td className="py-3 px-4">
                    <Badge variant={row.status === 'Active' ? 'success' : 'warning'}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
