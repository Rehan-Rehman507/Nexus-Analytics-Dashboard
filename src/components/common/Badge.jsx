import React from 'react';

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  };

  // Auto-detect based on text value if variant not explicitly customized
  let selectedVariant = variant;
  const text = String(children || '').toLowerCase();
  if (variant === 'default') {
    if (['completed', 'active', 'in stock', 'success', 'paid'].includes(text)) {
      selectedVariant = 'success';
    } else if (['pending', 'low stock', 'reviewing', 'starter'].includes(text)) {
      selectedVariant = 'warning';
    } else if (['failed', 'refunded', 'out of stock', 'inactive'].includes(text)) {
      selectedVariant = 'danger';
    } else if (['pro', 'enterprise'].includes(text)) {
      selectedVariant = 'purple';
    }
  }

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[selectedVariant] || variants.default} ${sizes[size]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {children}
    </span>
  );
}
