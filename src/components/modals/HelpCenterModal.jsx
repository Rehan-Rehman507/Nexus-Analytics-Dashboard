import React, { useState } from 'react';
import Modal from '../common/Modal';
import { HelpCircle, ChevronRight, MessageSquare, Mail, Search, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const FAQS = [
  {
    q: 'How does NEXUS calculate monthly MRR and conversion rate?',
    a: 'NEXUS aggregates recurring active subscriptions plus verified metered usage over 30-day trailing windows, normalized by total checkout page impressions.',
  },
  {
    q: 'Can I export all transaction records to CSV?',
    a: 'Yes, navigate to either Reports or Transactions and click "Export CSV" to trigger an instant client-side RFC 4180 compliant CSV download.',
  },
  {
    q: 'Where is demo application data persisted?',
    a: 'All product modifications, user preferences, dark/light theme choices and notifications are saved in browser LocalStorage. You can reset back to factory demo defaults in Settings at any time.',
  },
  {
    q: 'What stack powers this dashboard?',
    a: 'NEXUS is engineered with modern React, Tailwind CSS, Recharts for data visualization, Lucide React icons, and Framer Motion micro-interactions.',
  },
];

export default function HelpCenterModal({ isOpen, onClose }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="NEXUS Help Center"
      subtitle="Knowledge base, system documentation and live portfolio guidance"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs and help topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* FAQs */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Frequently Asked Questions
          </div>
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#252B38] bg-[#10131B]/50 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-3.5 flex items-center justify-between text-left text-xs font-medium text-slate-200 hover:text-white transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    activeFaq === idx ? 'rotate-90 text-violet-400' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-3.5 pb-3.5 text-xs text-slate-400 border-t border-[#252B38]/60 pt-2 bg-[#151923]/40 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-900/20 to-blue-900/20 border border-violet-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Have custom requirements?</h4>
              <p className="text-[11px] text-slate-400">
                Contact portfolio author Muhammad Rehan directly.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              toast.success('Support query submitted to demo queue!');
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium shadow-sm transition-all shrink-0"
          >
            Contact Creator
          </button>
        </div>
      </div>
    </Modal>
  );
}
