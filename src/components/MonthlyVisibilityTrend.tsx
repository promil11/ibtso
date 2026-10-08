import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Sparkles,
  BarChart2
} from 'lucide-react';
import type { Brand, Category, OmanRegion, Dealer, ModelDisplay } from '../types/intelligence';
import { calculateBrandShares, filterDisplays } from '../utils/analytics';
import { BRANDS, CATEGORIES } from '../data/mockDealers';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  CartesianGrid 
} from 'recharts';

interface Props {
  selectedBrand: Brand;
  selectedCategory: Category | 'All Categories';
  selectedRegion: OmanRegion | 'All Regions';
  selectedCity: string | 'All Cities';
  dealers: Dealer[];
  displays: ModelDisplay[];
}

const BRAND_COLORS: Record<string, string> = {
  'LG': '#ef4444',
  'Samsung': '#3b82f6',
  'Midea': '#06b6d4',
  'Gree': '#10b981',
  'Toshiba': '#f59e0b',
  'Super General': '#8b5cf6',
  'Philips': '#ec4899',
  'Haier': '#14b8a6',
  'Hitachi': '#f97316',
  'Panasonic': '#6366f1',
  'Beko': '#84cc16',
  'Siemens': '#0ea5e9',
};

export const MonthlyVisibilityTrend: React.FC<Props> = ({
  selectedBrand,
  selectedCategory,
  selectedRegion,
  selectedCity,
  dealers,
  displays,
}) => {
  const months = ['2026-08', '2026-09', '2026-10'];
  const monthLabels: Record<string, string> = {
    '2026-08': 'Aug 2026',
    '2026-09': 'Sep 2026',
    '2026-10': 'Oct 2026 (Latest)',
  };

  // Compare active brand with top 4 rivals
  const rivals = BRANDS.filter(b => b !== selectedBrand).slice(0, 4);
  const trackedBrands = [selectedBrand, ...rivals];

  // Build trendline series
  const trendData = months.map((m) => {
    const mDisplays = filterDisplays(displays, dealers, {
      category: selectedCategory,
      region: selectedRegion,
      city: selectedCity,
      month: m,
    });
    const shares = calculateBrandShares(mDisplays);

    const row: any = {
      month: m,
      monthLabel: monthLabels[m] || m,
    };

    trackedBrands.forEach((b) => {
      const metric = shares.find(s => s.brand === b);
      row[b] = metric ? metric.visibilityShare : 0;
    });

    return row;
  });

  // Calculate MoM deltas for active brand
  const augShare = (trendData[0] && (trendData[0][selectedBrand] as number)) || 0;
  const sepShare = (trendData[1] && (trendData[1][selectedBrand] as number)) || 0;
  const octShare = (trendData[2] && (trendData[2][selectedBrand] as number)) || 0;

  const sepDelta = Number((sepShare - augShare).toFixed(1));
  const octDelta = Number((octShare - sepShare).toFixed(1));
  const threeMonthDelta = Number((octShare - augShare).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Trends Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                MoM Visibility Telemetry
              </span>
              <span className="text-xs text-slate-400">Monthly Audit Progression</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              <span>Month-on-Month Visibility Trends</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Track how {selectedBrand} physical display presence and floor share fluctuate across consecutive monthly audits across Oman's 230 independent appliance retailers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Latest MoM Shift</span>
              <div className="flex items-center gap-1 mt-0.5 font-bold font-mono text-base">
                {octDelta >= 0 ? (
                  <span className="text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-4 h-4" /> +{octDelta}%
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center">
                    <ArrowDownRight className="w-4 h-4" /> {octDelta}%
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Quarterly Trajectory</span>
              <div className="flex items-center gap-1 mt-0.5 font-bold font-mono text-base">
                {threeMonthDelta >= 0 ? (
                  <span className="text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-4 h-4" /> +{threeMonthDelta}%
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center">
                    <ArrowDownRight className="w-4 h-4" /> {threeMonthDelta}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Line Trend Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white">
              Visibility Share Trajectory (% of Monitored IR Displays)
            </h2>
            <p className="text-xs text-slate-400">
              August 2026 → September 2026 → October 2026
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Scope: <span className="text-slate-200 font-semibold">{selectedCategory}</span>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="monthLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis unit="%" stroke="#94a3b8" fontSize={11} domain={[0, 'dataMax + 8']} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg shadow-2xl text-xs space-y-1">
                        <p className="font-bold text-white border-b border-slate-800 pb-1 mb-1">{label}</p>
                        {payload.map((entry: any) => (
                          <div key={entry.name} className="flex items-center justify-between gap-6 py-0.5">
                            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              {entry.name}:
                            </span>
                            <span className="font-mono font-bold text-white">{entry.value}%</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" height={36} />

              {/* Client brand highlighted with bold gold line */}
              <Line
                type="monotone"
                dataKey={selectedBrand}
                name={`${selectedBrand} (Client Brand)`}
                stroke="#f59e0b"
                strokeWidth={3.5}
                dot={{ r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />

              {/* Competitor lines */}
              {rivals.map((b) => (
                <Line
                  key={b}
                  type="monotone"
                  dataKey={b}
                  name={b}
                  stroke={BRAND_COLORS[b] || '#64748b'}
                  strokeWidth={1.8}
                  strokeDasharray="4 4"
                  dot={{ r: 3.5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Audit Breakdown Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-bold text-white mb-1">
          Historical Audit Comparison Log
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Detailed metrics across the previous three consecutive monthly audit cycles
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Audit Cycle</th>
                <th className="py-2.5 px-3">Total Oman IR Displays</th>
                <th className="py-2.5 px-3">{selectedBrand} Units</th>
                <th className="py-2.5 px-3">{selectedBrand} Share</th>
                <th className="py-2.5 px-3">MoM Shift</th>
                <th className="py-2.5 px-3">Audit Execution Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {months.map((m, idx) => {
                const displaysInMonth = filterDisplays(displays, dealers, {
                  category: selectedCategory,
                  region: selectedRegion,
                  city: selectedCity,
                  month: m,
                });
                const shares = calculateBrandShares(displaysInMonth);
                const client = shares.find(s => s.brand === selectedBrand);
                const shareVal = client ? client.visibilityShare : 0;
                const prevVal = idx > 0 ? (trendData[idx - 1][selectedBrand] as number) : shareVal;
                const delta = Number((shareVal - prevVal).toFixed(1));

                return (
                  <tr key={m} className={idx === months.length - 1 ? 'bg-amber-500/5' : 'hover:bg-slate-800/40'}>
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {monthLabels[m]}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">
                      {displaysInMonth.length} displays audited
                    </td>
                    <td className="py-2.5 px-3 font-mono text-white font-bold">
                      {client ? client.modelsDisplayed : 0} units
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                      {shareVal}%
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {idx === 0 ? (
                        <span className="text-slate-500">Baseline</span>
                      ) : delta >= 0 ? (
                        <span className="text-emerald-400 font-bold">+{delta}%</span>
                      ) : (
                        <span className="text-rose-400 font-bold">{delta}%</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        100% Census Completed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
