import React from 'react';

export default function LoadingSkeleton({ variant = 'card', count = 1 }) {
  const skeletons = Array.from({ length: count });

  if (variant === 'stat-card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#151923] border border-[#252B38] animate-pulse"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 bg-slate-800 rounded w-24"></div>
              <div className="w-8 h-8 rounded-lg bg-slate-800"></div>
            </div>
            <div className="h-8 bg-slate-800 rounded w-32 mb-3"></div>
            <div className="h-3 bg-slate-800 rounded w-44"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="w-full bg-[#151923] border border-[#252B38] rounded-2xl p-4 animate-pulse">
        <div className="h-10 bg-slate-800/80 rounded-xl mb-4 w-full"></div>
        {skeletons.map((_, i) => (
          <div key={i} className="flex gap-4 py-3 border-b border-slate-800/50">
            <div className="h-4 bg-slate-800 rounded w-1/4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-[#151923] border border-[#252B38] animate-pulse space-y-4">
      <div className="h-6 bg-slate-800 rounded w-1/3"></div>
      <div className="h-48 bg-slate-800/60 rounded-xl"></div>
    </div>
  );
}
