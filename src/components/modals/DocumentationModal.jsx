import React from 'react';
import Modal from '../common/Modal';
import { BookOpen, Code2, Layers, Cpu, Database, CheckCircle2 } from 'lucide-react';

export default function DocumentationModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="NEXUS Architecture & Documentation"
      subtitle="Comprehensive overview of component hierarchy, state flow and design tokens"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        {/* Intro */}
        <div className="p-4 rounded-xl bg-[#10131B] border border-[#252B38]">
          <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-violet-400" />
            Project Blueprint: NEXUS Analytics SaaS
          </h4>
          <p className="text-slate-400">
            NEXUS is engineered as a production-grade enterprise dashboard demonstrating advanced frontend React architecture, interactive Recharts data visualization, state persistence, responsive drawer layouts, and accessibility standards.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-[#252B38] bg-[#151923]/60">
            <div className="flex items-center gap-2 font-semibold text-slate-100 mb-1">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Tailwind Design System</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Deep charcoal canvas (#0B0D12), slate surfaces (#151923), and violet/cyan accents with full light mode support.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-[#252B38] bg-[#151923]/60">
            <div className="flex items-center gap-2 font-semibold text-slate-100 mb-1">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Persistent State Engine</span>
            </div>
            <p className="text-[11px] text-slate-400">
              LocalStorage synchronization keeps product CRUD, notification read states, and user preferences persisted.
            </p>
          </div>
        </div>

        {/* Feature Checklist */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Key Modules & Capabilities
          </h4>
          <ul className="space-y-2">
            {[
              'Interactive Recharts with dynamic period filters (Weekly, Monthly, Yearly)',
              'Global command palette modal (⌘K) searching across pages, products, customers & transactions',
              'RFC 4180 compliant CSV export engine for revenue and operational reports',
              'Full CRUD operations for product inventory with real-time state reactivity',
              'Custom pagination, multi-column sorting, and instant search on all data tables',
              'Full dark/light mode toggle with smooth theme transition',
            ].map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
