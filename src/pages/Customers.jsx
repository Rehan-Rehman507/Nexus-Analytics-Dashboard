import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import StatCard from '../components/common/StatCard';
import CustomerGrowthChart from '../components/charts/CustomerGrowthChart';
import AcquisitionDonutChart from '../components/charts/AcquisitionDonutChart';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { customerStats, customersList } from '../data/customersData';
import { formatCurrency } from '../utils/formatCurrency';
import { exportToCSV } from '../utils/exportCSV';
import {
  Users,
  UserPlus,
  UserCheck,
  Percent,
  Download,
  Mail,
  MoreVertical,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Customers() {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredCustomers = selectedStatus === 'All'
    ? customersList
    : customersList.filter((c) => c.status === selectedStatus);

  const handleExportCustomers = () => {
    try {
      const exportable = customersList.map((c) => ({
        ID: c.id,
        Name: c.name,
        Email: c.email,
        Location: c.location,
        Orders: c.orders,
        TotalSpent: c.totalSpent,
        Status: c.status,
        Tier: c.tier,
        Joined: c.joined,
      }));
      exportToCSV(exportable, 'nexus-customers.csv');
      toast.success('Customer directory exported to CSV');
    } catch {
      toast.error('Failed to export customers');
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover border border-violet-500/20"
          />
          <div>
            <div className="font-semibold text-white">{row.name}</div>
            <div className="text-[11px] text-slate-400 font-mono">{row.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (val) => (
        <a
          href={`mailto:${val}`}
          className="text-slate-300 hover:text-violet-400 flex items-center gap-1.5 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-slate-500" />
          <span>{val}</span>
        </a>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (val) => <span className="text-slate-300">{val}</span>,
    },
    {
      key: 'orders',
      label: 'Orders',
      sortable: true,
      render: (val) => (
        <span className="font-medium text-slate-200">{val} orders</span>
      ),
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      render: (val) => (
        <span className="font-bold text-emerald-400">
          {formatCurrency(val)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      key: 'tier',
      label: 'Plan Tier',
      render: (val) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
          {val}
        </span>
      ),
    },
  ];

  return (
    <PageLayout
      title="Customer Analytics & Directory"
      subtitle="Comprehensive view of subscriber base, retention, lifetime value and accounts"
      actions={
        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCustomers}>
          Export Customers CSV
        </Button>
      }
    >
      {/* 4 Customer Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Customers"
          value={customerStats.totalCustomers.toLocaleString()}
          change={8.2}
          isPositive={true}
          comparison="vs previous month (2,630)"
          icon={Users}
          color="#8B5CF6"
          sparklineData={[2100, 2250, 2400, 2550, 2700, 2845]}
        />

        <StatCard
          title="New Signups"
          value={customerStats.newCustomers.toLocaleString()}
          change={19.4}
          isPositive={true}
          comparison="acquired this 30-day window"
          icon={UserPlus}
          color="#10B981"
          sparklineData={[280, 310, 340, 370, 390, 412]}
        />

        <StatCard
          title="Returning Customers"
          value={customerStats.returningCustomers.toLocaleString()}
          change={6.8}
          isPositive={true}
          comparison="85.5% repeat activation rate"
          icon={UserCheck}
          color="#3B82F6"
          sparklineData={[1800, 1950, 2100, 2250, 2380, 2433]}
        />

        <StatCard
          title="Customer Retention Rate"
          value={`${customerStats.retentionRate}%`}
          change={1.8}
          isPositive={true}
          comparison="SaaS standard benchmark: 88%"
          icon={Percent}
          color="#F59E0B"
          sparklineData={[91, 92, 92.5, 93, 93.8, 94.2]}
        />
      </div>

      {/* Customer Growth & Acquisition Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomerGrowthChart />
        </div>
        <div className="lg:col-span-1">
          <AcquisitionDonutChart />
        </div>
      </div>

      {/* Customer Activity Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">Customer Activity Directory</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any customer row to review contact info and purchase history
            </p>
          </div>

          {/* Status Filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#10131B] border border-[#252B38] rounded-xl self-start sm:self-auto">
            {['All', 'Active', 'Pending', 'Inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredCustomers}
          searchPlaceholder="Search customer by name, email, or city..."
          searchKeys={['name', 'email', 'location', 'tier']}
          initialSortKey="totalSpent"
          initialSortDir="desc"
          pageSize={6}
          onRowClick={(row) => toast(`Selected customer: ${row.name} (${row.tier} Plan)`)}
        />
      </div>
    </PageLayout>
  );
}
