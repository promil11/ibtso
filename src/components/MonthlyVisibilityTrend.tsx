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
  theme?: 'light' | 'dark';
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
  theme = 'light',
  selectedBrand,
  selectedCategory,
  selectedRegion,
  selectedCity,
  dealers,
  displays,
}) => {
  const isLight = theme === 'light';
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
      <div className={`border rounded-2xl p-6 shadow-xl relative overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-r from-white via-indigo-50/40 to-white border-slate-200 text-slate-900 shadow-slate-200/50'
          : 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800/80 text-white'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold shadow-sm ${
                isLight ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}>
                MoM Visibility Telemetry
              </span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Monthly Audit Progression</span>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <div className={`p-2 rounded-xl border shadow-md ${
                isLight ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <span>Month-on-Month Visibility Trends</span>
            </h1>
            <p className={`text-xs mt-1.5 max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Track how {selectedBrand} physical display presence and floor share fluctuate across consecutive monthly audits across Oman's 230 independent appliance retailers.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-3 p-3.5 rounded-2xl border text-xs shadow-inner ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'
          }`}>
            <div className="px-1">
              <span className={`block text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Latest MoM Shift</span>
              <div className="flex items-center gap-1 mt-1 font-black font-mono text-lg">
                {octDelta >= 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-4.5 h-4.5" /> +{octDelta}%
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center">
                    <ArrowDownRight className="w-4.5 h-4.5" /> {octDelta}%
                  </span>
                )}
              </div>
            </div>
            <div className={`px-1 border-l ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <span className={`block text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Quarterly Trajectory</span>
              <div className="flex items-center gap-1 mt-1 font-black font-mono text-lg">
                {threeMonthDelta >= 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-4.5 h-4.5" /> +{threeMonthDelta}%
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center">
                    <ArrowDownRight className="w-4.5 h-4.5" /> {threeMonthDelta}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Line Trend Chart */}
      <div className={`border rounded-2xl p-5 shadow-xl ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80 text-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Visibility Share Trajectory (% of Monitored IR Displays)
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              August 2026 → September 2026 → October 2026
            </p>
          </div>
          <div className={`text-xs px-3 py-1 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}>
            Scope: <span className="text-amber-600 dark:text-amber-400 font-bold">{selectedCategory}</span>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#e2e8f0' : '#1e293b'} />
              <XAxis dataKey="monthLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis unit="%" stroke="#94a3b8" fontSize={11} domain={[0, 'dataMax + 8']} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className={`p-3 rounded-xl shadow-2xl text-xs space-y-1.5 border ${
                        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}>
                        <p className={`font-bold border-b pb-1 mb-1 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>{label}</p>
                        {payload.map((entry: any) => (
                          <div key={entry.name} className="flex items-center justify-between gap-6 py-0.5">
                            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              {entry.name}:
                            </span>
                            <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{entry.value}%</span>
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
      <div className={`border rounded-2xl p-5 shadow-xl ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80 text-white'
      }`}>
        <h2 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Historical Audit Comparison Log
        </h2>
        <p className={`text-xs mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Detailed metrics across the previous three consecutive monthly audit cycles
        </p>

        <div className={`overflow-x-auto rounded-xl border ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
          <table className="w-full text-left text-xs">
            <thead className={`font-semibold border-b ${
              isLight ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-slate-950 text-slate-400 border-slate-800/80'
            }`}>
              <tr>
                <th className="py-3 px-4">Audit Cycle</th>
                <th className="py-3 px-4">Total Oman IR Displays</th>
                <th className="py-3 px-4">{selectedBrand} Units</th>
                <th className="py-3 px-4">{selectedBrand} Share</th>
                <th className="py-3 px-4">MoM Shift</th>
                <th className="py-3 px-4">Audit Execution Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-100 text-slate-700' : 'divide-slate-800/60 text-slate-300'}`}>
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
                  <tr key={m} className={
                    idx === months.length - 1 
                      ? (isLight ? 'bg-amber-50/80 font-medium' : 'bg-amber-500/10') 
                      : (isLight ? 'hover:bg-slate-50 transition-colors' : 'hover:bg-slate-800/40 transition-colors')
                  }>
                    <td className={`py-3 px-4 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {monthLabels[m]}
                    </td>
                    <td className={`py-3 px-4 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {displaysInMonth.length} displays audited
                    </td>
                    <td className={`py-3 px-4 font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {client ? client.modelsDisplayed : 0} units
                    </td>
                    <td className={`py-3 px-4 font-mono font-black text-sm ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
                      {shareVal}%
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {idx === 0 ? (
                        <span className={isLight ? 'text-slate-400' : 'text-slate-500'}>Baseline</span>
                      ) : delta >= 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{delta}%</span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 font-bold">{delta}%</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}>
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
