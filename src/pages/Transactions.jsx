import React, { useState, useMemo } from 'react';
import PageLayout from '../components/layout/PageLayout';
import StatCard from '../components/common/StatCard';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import TransactionDetailModal from '../components/modals/TransactionDetailModal';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency } from '../utils/formatCurrency';
import { exportToCSV } from '../utils/exportCSV';
import {
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Download,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Transactions() {
  const { transactions } = useDashboard();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // Top statistics
  const stats = useMemo(() => {
    const total = transactions.length;
    const successful = transactions.filter((t) => t.status === 'Completed').length;
    const pending = transactions.filter((t) => t.status === 'Pending').length;
    const failed = transactions.filter((t) => t.status === 'Failed' || t.status === 'Refunded').length;

    return { total, successful, pending, failed };
  }, [transactions]);

  // Filtered dataset
  const filteredData = useMemo(() => {
    if (statusFilter === 'All') return transactions;
    return transactions.filter((t) => t.status === statusFilter);
  }, [transactions, statusFilter]);

  const handleExportCSV = () => {
    try {
      const exportable = transactions.map((t) => ({
        TransactionID: t.id,
        Customer: t.customer,
        Email: t.email,
        Date: t.date,
        Amount: t.amount,
        PaymentMethod: t.paymentMethod,
        Status: t.status,
        Item: t.item,
      }));
      exportToCSV(exportable, 'nexus-transactions-ledger.csv');
      toast.success('Transactions ledger downloaded');
    } catch {
      toast.error('Failed to export ledger');
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'Transaction ID',
      render: (val, row) => (
        <div>
          <span className="font-mono font-semibold text-white hover:text-violet-400 transition-colors">
            {val}
          </span>
          <div className="text-[10px] text-slate-400 truncate">{row.item}</div>
        </div>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <img
            src={row.avatar}
            alt={val}
            className="w-7 h-7 rounded-full object-cover border border-violet-500/20"
          />
          <div>
            <div className="font-medium text-slate-200">{val}</div>
            <div className="text-[10px] text-slate-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Timestamp',
      sortable: true,
      render: (val) => <span className="text-slate-400 font-mono text-[11px]">{val}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (val, row) => (
        <span className="font-bold text-white font-mono">
          {formatCurrency(val, row.currency)}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      label: 'Payment Method',
      render: (val) => <span className="text-slate-300">{val}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTransaction(row);
          }}
          className="p-1.5 rounded-lg border border-[#252B38] bg-[#0B0D12] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
          title="View Receipt Details"
        >
          <Eye className="w-3.5 h-3.5 text-violet-400" />
          <span>Receipt</span>
        </button>
      ),
    },
  ];

  return (
    <PageLayout
      title="Transaction Records & Invoices"
      subtitle="Complete ledger of payments, billing status, fee deductions and digital receipts"
      actions={
        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
          Export Ledger CSV
        </Button>
      }
    >
      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Transactions"
          value={stats.total.toString()}
          change={15.4}
          isPositive={true}
          comparison="aggregated across all gateways"
          icon={ArrowRightLeft}
          color="#8B5CF6"
          sparklineData={[8, 9, 10, 11, 11, 12]}
        />

        <StatCard
          title="Successful Settled"
          value={stats.successful.toString()}
          change={12.1}
          isPositive={true}
          comparison="92.4% settlement success rate"
          icon={CheckCircle2}
          color="#10B981"
          sparklineData={[6, 7, 8, 8, 9, 9]}
        />

        <StatCard
          title="Pending Authorization"
          value={stats.pending.toString()}
          change={-2.4}
          isPositive={true}
          comparison="awaiting bank confirmation"
          icon={Clock}
          color="#F59E0B"
          sparklineData={[3, 3, 2, 2, 2, 2]}
        />

        <StatCard
          title="Failed / Refunded"
          value={stats.failed.toString()}
          change={-8.5}
          isPositive={false}
          comparison="declined by issuing bank"
          icon={XCircle}
          color="#EF4444"
          sparklineData={[3, 2, 2, 1, 2, 2]}
        />
      </div>

      {/* Filter and Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">Live Transaction Ledger</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any transaction row or receipt button to inspect order details and toggle status
            </p>
          </div>

          {/* Status Filter Pill Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-[#10131B] border border-[#252B38] rounded-xl self-start sm:self-auto">
            {['All', 'Completed', 'Pending', 'Failed', 'Refunded'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          searchPlaceholder="Search by ID, customer name, email, or license..."
          searchKeys={['id', 'customer', 'email', 'item', 'paymentMethod']}
          initialSortKey="date"
          initialSortDir="desc"
          pageSize={7}
          onRowClick={(row) => setSelectedTransaction(row)}
        />
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={Boolean(selectedTransaction)}
        onClose={() => setSelectedTransaction(null)}
      />
    </PageLayout>
  );
}
