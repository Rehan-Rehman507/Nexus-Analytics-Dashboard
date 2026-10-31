import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { CreditCard, CheckCircle2, Clock, AlertOctagon, RotateCcw, Copy, ExternalLink, Printer } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDashboard } from '../../context/DashboardContext';

export default function TransactionDetailModal({ transaction, isOpen, onClose }) {
  const { updateTransactionStatus } = useDashboard();
  if (!transaction) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Transaction ${transaction.id}`}
      subtitle="Complete settlement record and billing receipt"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Top Summary Card */}
        <div className="p-4 rounded-xl bg-[#10131B] border border-[#252B38] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Settlement Amount
            </span>
            <div className="text-2xl font-bold text-white mt-0.5">
              {formatCurrency(transaction.amount, transaction.currency)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
              <span>{transaction.date}</span>
              <span>•</span>
              <button
                onClick={() => copyToClipboard(transaction.id)}
                className="hover:text-violet-400 flex items-center gap-1"
                title="Copy ID"
              >
                <span>{transaction.id}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <Badge size="md">{transaction.status}</Badge>
            <span className="text-[11px] text-slate-500 font-mono">
              AUTH-{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>
        </div>

        {/* Customer Information */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Customer Information
          </h4>
          <div className="p-3.5 rounded-xl bg-[#10131B]/60 border border-[#252B38] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={transaction.avatar}
                alt={transaction.customer}
                className="w-10 h-10 rounded-full object-cover border border-violet-500/30"
              />
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  {transaction.customer}
                </div>
                <div className="text-xs text-slate-400">
                  {transaction.email}
                </div>
              </div>
            </div>
            <Badge variant="purple" size="xs">Verified Buyer</Badge>
          </div>
        </div>

        {/* Order Item & Financial Breakdown */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Invoice Breakdown
          </h4>
          <div className="rounded-xl border border-[#252B38] divide-y divide-[#252B38]/60 text-xs">
            <div className="p-3 flex justify-between items-center text-slate-300">
              <div>
                <div className="font-medium text-slate-100">{transaction.item}</div>
                <div className="text-[11px] text-slate-400">Digital SaaS License • Qty: 1</div>
              </div>
              <span className="font-semibold text-white">
                {formatCurrency(transaction.amount)}
              </span>
            </div>
            <div className="p-3 flex justify-between items-center text-slate-400">
              <span>Estimated Sales Tax (8%)</span>
              <span>{formatCurrency(transaction.tax || 0)}</span>
            </div>
            <div className="p-3 flex justify-between items-center text-slate-400">
              <span>Payment Gateway Processing Fee</span>
              <span>-{formatCurrency(transaction.fee || 0)}</span>
            </div>
            <div className="p-3 flex justify-between items-center bg-[#10131B]/40 font-semibold text-slate-200">
              <span>Net Settled Amount</span>
              <span className="text-emerald-400">
                {formatCurrency(transaction.amount - (transaction.fee || 0))}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Details */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Payment Method
          </h4>
          <div className="p-3 rounded-xl bg-[#10131B]/60 border border-[#252B38] flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-violet-400" />
              <span className="font-medium">{transaction.paymentMethod}</span>
            </div>
            <span className="text-slate-400 text-[11px]">Instant ACH / Card Rails</span>
          </div>
        </div>

        {/* Status Actions */}
        <div className="pt-2 border-t border-[#252B38] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1">Change status:</span>
            {['Completed', 'Pending', 'Refunded'].map((st) => (
              <button
                key={st}
                disabled={transaction.status === st}
                onClick={() => updateTransactionStatus(transaction.id, st)}
                className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-colors ${
                  transaction.status === st
                    ? 'bg-violet-600 text-white cursor-default'
                    : 'border border-[#252B38] text-slate-300 hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} icon={Printer}>
              Print
            </Button>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
