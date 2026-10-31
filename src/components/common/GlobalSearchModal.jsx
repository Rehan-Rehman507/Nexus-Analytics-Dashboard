import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, BarChart3, DollarSign, Users, ArrowRightLeft, Package, FileText, Settings, ArrowRight, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { customersList } from '../../data/customersData';

const navigationPages = [
  { name: 'Overview', path: '/', icon: LayoutDashboard, category: 'Pages' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, category: 'Pages' },
  { name: 'Revenue', path: '/revenue', icon: DollarSign, category: 'Pages' },
  { name: 'Customers', path: '/customers', icon: Users, category: 'Pages' },
  { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft, category: 'Pages' },
  { name: 'Products', path: '/products', icon: Package, category: 'Pages' },
  { name: 'Reports', path: '/reports', icon: FileText, category: 'Pages' },
  { name: 'Settings', path: '/settings', icon: Settings, category: 'Pages' },
];

export default function GlobalSearchModal() {
  const { isSearchOpen, closeSearch, products, transactions } = useDashboard();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          document.dispatchEvent(new CustomEvent('nexus-open-search'));
        }
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Search Results
  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        pages: navigationPages.slice(0, 5),
        products: products.slice(0, 3),
        customers: customersList.slice(0, 3),
        transactions: transactions.slice(0, 3),
      };
    }
    const q = query.toLowerCase();

    return {
      pages: navigationPages.filter((p) => p.name.toLowerCase().includes(q)),
      products: products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ),
      customers: customersList.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      ),
      transactions: transactions.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.customer.toLowerCase().includes(q) ||
          t.status.toLowerCase().includes(q)
      ),
    };
  }, [query, products, transactions]);

  const totalResultsCount =
    results.pages.length +
    results.products.length +
    results.customers.length +
    results.transactions.length;

  const handleSelectPage = (path) => {
    navigate(path);
    closeSearch();
  };

  const handleSelectProduct = (prod) => {
    navigate('/products');
    closeSearch();
  };

  const handleSelectCustomer = (cust) => {
    navigate('/customers');
    closeSearch();
  };

  const handleSelectTransaction = (tx) => {
    navigate('/transactions');
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#151923] border border-[#252B38] rounded-2xl shadow-dropdown-dark overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#252B38] gap-3">
              <Search className="w-5 h-5 text-violet-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across pages, customers, products, transactions..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-200 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700 rounded">
                ESC
              </kbd>
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
              {totalResultsCount === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-sm">No results found for "{query}"</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for "revenue", "sarah", "cloud", or "TX-9842"</p>
                </div>
              ) : (
                <>
                  {/* Pages Section */}
                  {results.pages.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                        Navigation Pages
                      </div>
                      <div className="space-y-1">
                        {results.pages.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.path}
                              onClick={() => handleSelectPage(item.path)}
                              className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-slate-300 hover:bg-violet-600/10 hover:text-white transition-colors group"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-violet-400 transition-opacity" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Products Section */}
                  {results.products.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                        Products ({results.products.length})
                      </div>
                      <div className="space-y-1">
                        {results.products.map((prod) => (
                          <button
                            key={prod.id}
                            onClick={() => handleSelectProduct(prod)}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                              />
                              <div className="text-left">
                                <div className="font-medium text-slate-200">{prod.name}</div>
                                <div className="text-[10px] text-slate-400">{prod.category} • ${prod.price.toFixed(2)}</div>
                              </div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                              {prod.stockStatus}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Customers Section */}
                  {results.customers.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                        Customers ({results.customers.length})
                      </div>
                      <div className="space-y-1">
                        {results.customers.map((cust) => (
                          <button
                            key={cust.id}
                            onClick={() => handleSelectCustomer(cust)}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={cust.avatar}
                                alt={cust.name}
                                className="w-7 h-7 rounded-full object-cover border border-slate-700"
                              />
                              <div className="text-left">
                                <div className="font-medium text-slate-200">{cust.name}</div>
                                <div className="text-[10px] text-slate-400">{cust.email} • {cust.location}</div>
                              </div>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-medium">
                              ${cust.totalSpent.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transactions Section */}
                  {results.transactions.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                        Transactions ({results.transactions.length})
                      </div>
                      <div className="space-y-1">
                        {results.transactions.map((tx) => (
                          <button
                            key={tx.id}
                            onClick={() => handleSelectTransaction(tx)}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors group"
                          >
                            <div className="text-left">
                              <div className="font-medium text-slate-200 flex items-center gap-2">
                                <span>{tx.id}</span>
                                <span className="text-slate-400 font-normal">— {tx.customer}</span>
                              </div>
                              <div className="text-[10px] text-slate-400">{tx.item} • {tx.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-slate-100">${tx.amount.toFixed(2)}</div>
                              <span className={`text-[10px] ${tx.status === 'Completed' ? 'text-emerald-400' : tx.status === 'Pending' ? 'text-amber-400' : 'text-rose-400'}`}>
                                {tx.status}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer with shortcut keys info */}
            <div className="px-4 py-2.5 bg-[#10131B] border-t border-[#252B38] flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-400">↑</kbd> <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-400">↓</kbd></span>
                <span>Select: <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-400">↵</kbd></span>
              </div>
              <span className="text-violet-400/80 font-medium">NEXUS Fast Finder</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
