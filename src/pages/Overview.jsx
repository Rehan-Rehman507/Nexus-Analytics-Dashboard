import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import StatCard from '../components/common/StatCard';
import RevenueChart from '../components/charts/RevenueChart';
import AcquisitionDonutChart from '../components/charts/AcquisitionDonutChart';
import Button from '../components/common/Button';
import AddEditProductModal from '../components/modals/AddEditProductModal';
import { dashboardKPIs, recentActivity, quickStats } from '../data/dashboardData';
import { revenueBreakdown } from '../data/revenueData';
import { formatCurrency } from '../utils/formatCurrency';
import {
  DollarSign,
  Users,
  ShoppingCart,
  Percent,
  Plus,
  ArrowUpRight,
  Download,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { exportToCSV } from '../utils/exportCSV';

export default function Overview() {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleQuickExport = () => {
    try {
      exportToCSV(recentActivity, 'nexus-activity-feed.csv');
      toast.success('Activity report exported to CSV');
    } catch {
      toast.error('Failed to export CSV');
    }
  };

  const actionButtons = (
    <>
      <Button
        variant="outline"
        size="sm"
        icon={Download}
        onClick={handleQuickExport}
      >
        Export Feed
      </Button>
      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Product
      </Button>
    </>
  );

  return (
    <PageLayout
      title="Good morning, Alex 👋"
      subtitle="Here's what's happening with your business today."
      actions={actionButtons}
    >
      {/* 4 Premium KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title={dashboardKPIs.totalRevenue.title}
          value={dashboardKPIs.totalRevenue.value}
          formattedValue={dashboardKPIs.totalRevenue.formattedValue}
          change={dashboardKPIs.totalRevenue.change}
          isPositive={dashboardKPIs.totalRevenue.isPositive}
          comparison={dashboardKPIs.totalRevenue.comparison}
          sparklineData={dashboardKPIs.totalRevenue.sparkline}
          icon={DollarSign}
          color="#8B5CF6"
          delay={0.05}
        />

        <StatCard
          title={dashboardKPIs.totalCustomers.title}
          value={dashboardKPIs.totalCustomers.value}
          formattedValue={dashboardKPIs.totalCustomers.formattedValue}
          change={dashboardKPIs.totalCustomers.change}
          isPositive={dashboardKPIs.totalCustomers.isPositive}
          comparison={dashboardKPIs.totalCustomers.comparison}
          sparklineData={dashboardKPIs.totalCustomers.sparkline}
          icon={Users}
          color="#3B82F6"
          delay={0.1}
        />

        <StatCard
          title={dashboardKPIs.totalOrders.title}
          value={dashboardKPIs.totalOrders.value}
          formattedValue={dashboardKPIs.totalOrders.formattedValue}
          change={dashboardKPIs.totalOrders.change}
          isPositive={dashboardKPIs.totalOrders.isPositive}
          comparison={dashboardKPIs.totalOrders.comparison}
          sparklineData={dashboardKPIs.totalOrders.sparkline}
          icon={ShoppingCart}
          color="#10B981"
          delay={0.15}
        />

        <StatCard
          title={dashboardKPIs.conversionRate.title}
          value={dashboardKPIs.conversionRate.value}
          formattedValue={dashboardKPIs.conversionRate.formattedValue}
          change={dashboardKPIs.conversionRate.change}
          isPositive={dashboardKPIs.conversionRate.isPositive}
          comparison={dashboardKPIs.conversionRate.comparison}
          sparklineData={dashboardKPIs.conversionRate.sparkline}
          icon={Percent}
          color="#F59E0B"
          delay={0.2}
        />
      </div>

      {/* Main Analytics Grid: Large Chart + Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart showExpenses={true} />
        </div>

        {/* Revenue Breakdown Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-white">Revenue Sources</h3>
              <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                100% Target
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Income distribution across primary sales pipelines
            </p>

            <div className="space-y-4">
              {revenueBreakdown.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">
                        {formatCurrency(item.amount)}
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 w-full bg-[#0B0D12] rounded-full overflow-hidden border border-[#252B38]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[#252B38]">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => navigate('/revenue')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Detailed Revenue Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Row: Acquisition Donut + Recent Activity + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Acquisition Donut */}
        <div className="lg:col-span-1">
          <AcquisitionDonutChart />
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Recent Transactions & Events</h3>
                <p className="text-xs text-slate-400 mt-0.5">Live account activations and order stream</p>
              </div>
              <button
                onClick={() => navigate('/transactions')}
                className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#252B38]/60">
              {recentActivity.map((act) => (
                <div key={act.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={act.avatar}
                      alt={act.user}
                      className="w-9 h-9 rounded-full object-cover border border-violet-500/20"
                    />
                    <div>
                      <div className="text-xs text-slate-200">
                        <span className="font-semibold text-white">{act.user}</span>{' '}
                        <span className="text-slate-400">{act.action}</span>{' '}
                        <span className="text-violet-400 font-medium">{act.target}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{act.time}</div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold font-mono ${
                      act.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {act.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar at Bottom */}
          <div className="pt-4 mt-2 border-t border-[#252B38] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {quickStats.map((stat) => (
              <div key={stat.label} className="p-2.5 rounded-xl bg-[#0B0D12] border border-[#252B38]">
                <div className="text-[10px] text-slate-400 truncate">{stat.label}</div>
                <div className="text-sm font-bold text-white mt-0.5 flex items-center justify-between">
                  <span>{stat.value}</span>
                  <span className="text-[10px] text-emerald-400 font-normal">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddEditProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </PageLayout>
  );
}
