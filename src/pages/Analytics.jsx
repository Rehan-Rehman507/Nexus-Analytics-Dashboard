import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import CustomerGrowthChart from '../components/charts/CustomerGrowthChart';
import AcquisitionDonutChart from '../components/charts/AcquisitionDonutChart';
import StatCard from '../components/common/StatCard';
import Button from '../components/common/Button';
import { exportToCSV } from '../utils/exportCSV';
import {
  TrendingUp,
  Activity,
  Globe,
  PieChart,
  Download,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';

const FUNNEL_STAGES = [
  { stage: 'Site Impressions', count: '142,500', rate: '100%', color: '#8B5CF6' },
  { stage: 'Unique Visitors', count: '58,400', rate: '41.0%', color: '#6366F1' },
  { stage: 'Trial Accounts', count: '8,920', rate: '15.3%', color: '#3B82F6' },
  { stage: 'Checkout Initiated', count: '3,240', rate: '36.3%', color: '#06B6D4' },
  { stage: 'Paid Subscriptions', count: '1,429', rate: '44.1%', color: '#10B981' },
];

const GEO_DATA = [
  { country: 'United States', code: 'US', revenue: '$24,150.00', share: 50, flag: '🇺🇸' },
  { country: 'United Kingdom', code: 'GB', revenue: '$8,210.00', share: 17, flag: '🇬🇧' },
  { country: 'European Union', code: 'EU', revenue: '$7,240.00', share: 15, flag: '🇪🇺' },
  { country: 'Japan & APAC', code: 'JP', revenue: '$5,320.00', share: 11, flag: '🇯🇵' },
  { country: 'Rest of World', code: 'ROW', revenue: '$3,374.00', share: 7, flag: '🌐' },
];

export default function Analytics() {
  const handleExportData = () => {
    exportToCSV(GEO_DATA, 'nexus-geography-analytics.csv');
    toast.success('Geographic distribution exported');
  };

  return (
    <PageLayout
      title="Analytics & Business Intelligence"
      subtitle="In-depth conversion funnels, cohort growth metrics, and geographic distribution"
      actions={
        <Button variant="outline" size="sm" icon={Download} onClick={handleExportData}>
          Export Intelligence
        </Button>
      }
    >
      {/* Top Benchmark Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Customer Lifetime Value (LTV)"
          value="$2,450.00"
          change={7.6}
          isPositive={true}
          comparison="vs last quarter ($2,280)"
          icon={TrendingUp}
          color="#8B5CF6"
          sparklineData={[2100, 2180, 2220, 2280, 2350, 2400, 2450]}
        />
        <StatCard
          title="CAC Payback Period"
          value="4.2 Mos"
          change={12.5}
          isPositive={true}
          comparison="improved from 4.8 months"
          icon={Clock}
          color="#10B981"
          sparklineData={[5.2, 5.0, 4.8, 4.6, 4.4, 4.3, 4.2]}
        />
        <StatCard
          title="Net Revenue Retention (NRR)"
          value="118.4%"
          change={3.2}
          isPositive={true}
          comparison="industry benchmark: 105%"
          icon={Activity}
          color="#3B82F6"
          sparklineData={[112, 114, 115, 116, 117, 118, 118.4]}
        />
        <StatCard
          title="Avg Revenue Per User (ARPU)"
          value="$134.20"
          change={5.4}
          isPositive={true}
          comparison="expanded via tier upsells"
          icon={Zap}
          color="#F59E0B"
          sparklineData={[118, 122, 125, 129, 131, 134.2]}
        />
      </div>

      {/* Primary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomerGrowthChart />
        </div>
        <div className="lg:col-span-1">
          <AcquisitionDonutChart />
        </div>
      </div>

      {/* Secondary Intelligence: Funnel & Geo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-white">Full-Funnel Conversion Velocity</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drop-off trajectory from visitor impressions to revenue settlement
            </p>
          </div>

          <div className="space-y-4">
            {FUNNEL_STAGES.map((item, idx) => (
              <div key={item.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-200">{item.stage}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono">{item.count}</span>
                    <span className="font-semibold text-white w-14 text-right">
                      {item.rate}
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-[#0B0D12] rounded-full overflow-hidden border border-[#252B38]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${100 - idx * 18}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-[#10131B] border border-[#252B38] flex items-center justify-between text-xs text-slate-400">
            <span>Overall Visitor-to-Customer conversion:</span>
            <span className="font-bold text-emerald-400">2.45%</span>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Geographic Revenue Share</h3>
              <p className="text-xs text-slate-400 mt-0.5">Global performance by regional market</p>
            </div>
            <Globe className="w-5 h-5 text-violet-400" />
          </div>

          <div className="space-y-3.5">
            {GEO_DATA.map((geo) => (
              <div
                key={geo.code}
                className="p-3 rounded-xl bg-[#10131B]/60 border border-[#252B38] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{geo.flag}</span>
                  <div>
                    <div className="text-xs font-semibold text-white">{geo.country}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{geo.code} Territory</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-100">{geo.revenue}</div>
                  <div className="text-[10px] text-violet-400 font-medium">{geo.share}% Share</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
