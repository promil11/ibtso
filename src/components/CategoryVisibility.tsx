import React, { useState } from 'react';
import { 
  Layers, 
  TrendingUp, 
  Award, 
  Store, 
  BarChart3, 
  Eye, 
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import type { Brand, Category, OmanRegion, Dealer, ModelDisplay } from '../types/intelligence';
import { calculateBrandShares, filterDisplays } from '../utils/analytics';
import { CATEGORIES } from '../data/mockDealers';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid 
} from 'recharts';

interface Props {
  theme?: 'light' | 'dark';
  selectedBrand: Brand;
  selectedCategory: Category | 'All Categories';
  setSelectedCategory: (c: Category | 'All Categories') => void;
  selectedRegion: OmanRegion | 'All Regions';
  selectedCity: string | 'All Cities';
  selectedMonth: string;
  dealers: Dealer[];
  displays: ModelDisplay[];
}

export const CategoryVisibility: React.FC<Props> = ({
  theme = 'light',
  selectedBrand,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  selectedCity,
  selectedMonth,
  dealers,
  displays,
}) => {
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState<Category>(
    selectedCategory === 'All Categories' ? 'Air Conditioners' : selectedCategory
  );

  const prevMonth = selectedMonth === '2026-10' ? '2026-09' : selectedMonth === '2026-09' ? '2026-08' : '2026-08';

  // Get data for the active category
  const activeDisplays = filterDisplays(displays, dealers, {
    category: activeCategory,
    region: selectedRegion,
    city: selectedCity,
    month: selectedMonth,
  });

  const prevActiveDisplays = filterDisplays(displays, dealers, {
    category: activeCategory,
    region: selectedRegion,
    city: selectedCity,
    month: prevMonth,
  });

  const brandShares = calculateBrandShares(activeDisplays, prevActiveDisplays);
  const clientMetric = brandShares.find(b => b.brand === selectedBrand) || {
    brand: selectedBrand,
    modelsDisplayed: 0,
    visibilityShare: 0,
    momChange: 0,
    rank: 99,
    primeSpotRatio: 0,
  };

  const topBrand = brandShares[0];

  // Compare all 6 categories at a glance for the client
  const allCategoryComparison = CATEGORIES.map((cat) => {
    const cur = filterDisplays(displays, dealers, {
      category: cat,
      region: selectedRegion,
      city: selectedCity,
      month: selectedMonth,
    });
    const prv = filterDisplays(displays, dealers, {
      category: cat,
      region: selectedRegion,
      city: selectedCity,
      month: prevMonth,
    });
    const shares = calculateBrandShares(cur, prv);
    const client = shares.find(s => s.brand === selectedBrand);
    const leader = shares[0];

    return {
      category: cat,
      clientShare: client ? client.visibilityShare : 0,
      clientModels: client ? client.modelsDisplayed : 0,
      clientRank: client ? client.rank : '-',
      totalDisplays: cur.length,
      leaderBrand: leader ? leader.brand : 'N/A',
      leaderShare: leader ? leader.visibilityShare : 0,
      gapToLeader: leader && client ? Number((leader.visibilityShare - client.visibilityShare).toFixed(1)) : 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Category Header */}
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
                Category Intelligence
              </span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>6 Core Electronics & Appliance Sectors</span>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <div className={`p-2 rounded-xl border shadow-md ${
                isLight ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                <Layers className="w-5 h-5" />
              </div>
              <span>Category-Wise Visibility Share</span>
            </h1>
            <p className={`text-xs mt-1.5 max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Compare {selectedBrand} display presence vs competitors in each of the six targeted product categories across the 230 Independent Retailers in Oman.
            </p>
          </div>
        </div>

        {/* 6 Category Switcher Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          {CATEGORIES.map((c) => {
            const isActive = activeCategory === c;
            const catStat = allCategoryComparison.find(item => item.category === c);

            return (
              <button
                key={c}
                onClick={() => {
                  setActiveCategory(c);
                  setSelectedCategory(c);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 transform hover:-translate-y-0.5 ${
                  isActive
                    ? isLight
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-md ring-1 ring-amber-400/50'
                      : 'bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 border-amber-500 text-amber-300 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                    : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/30'
                      : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className={`text-[11px] font-bold truncate ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{c}</div>
                <div className="flex items-baseline justify-between mt-2.5">
                  <span className={`text-xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {catStat?.clientShare}%
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    isLight ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-amber-500/10 text-amber-400/90 border-amber-500/20'
                  }`}>
                    Rank #{catStat?.clientRank}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Share Chart (2 cols) */}
        <div className={`border rounded-2xl p-5 shadow-xl ${
          isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80 text-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {activeCategory} — Brand Visibility Distribution
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Floor display share ranking across all inspected dealer stores in scope
              </p>
            </div>
            <div className={`text-xs px-3 py-1 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              Total <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">{activeDisplays.length}</span> units inspected
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={brandShares}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 35, bottom: 5 }}
              >
                <XAxis type="number" unit="%" stroke="#64748b" fontSize={11} domain={[0, 'dataMax + 5']} />
                <YAxis dataKey="brand" type="category" stroke={isLight ? '#334155' : '#cbd5e1'} fontSize={11} width={80} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 rounded-xl shadow-2xl text-xs space-y-1 border ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}>
                          <p className="font-bold">{data.brand}</p>
                          <p className="text-amber-600 dark:text-amber-300 font-mono">Visibility Share: {data.visibilityShare}%</p>
                          <p className="text-slate-600 dark:text-slate-300 font-mono">Display Count: {data.modelsDisplayed}</p>
                          <p className="text-slate-500 dark:text-slate-400">Prime Eye-Level: {data.primeSpotRatio}%</p>
                          <p className="text-slate-500 dark:text-slate-400 font-mono">MoM Shift: {data.momChange > 0 ? `+${data.momChange}` : data.momChange}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="visibilityShare" radius={[0, 6, 6, 0]}>
                  {brandShares.map((entry) => (
                    <Cell
                      key={entry.brand}
                      fill={entry.brand === selectedBrand ? '#f59e0b' : isLight ? '#cbd5e1' : '#334155'}
                      stroke={entry.brand === selectedBrand ? '#fbbf24' : 'none'}
                      strokeWidth={entry.brand === selectedBrand ? 1.5 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Specific Metric Summary */}
        <div className={`border rounded-2xl p-5 shadow-xl flex flex-col justify-between ${
          isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80 text-white'
        }`}>
          <div>
            <h2 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Category Intelligence Summary
            </h2>
            <p className={`text-xs mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Strategic positioning in {activeCategory}
            </p>

            <div className="space-y-3">
              <div className={`p-3.5 rounded-xl border shadow-inner ${
                isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 border-amber-500/30'
              }`}>
                <span className={`text-[11px] block font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{selectedBrand} Share in Category</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-2xl font-black font-mono ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
                    {clientMetric.visibilityShare}%
                  </span>
                  <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    ({clientMetric.modelsDisplayed} units)
                  </span>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'
              }`}>
                <span className={`text-[11px] block font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Category Leader</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {topBrand?.brand}
                  </span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {topBrand?.visibilityShare}%
                  </span>
                </div>
                <div className={`text-[11px] mt-1.5 pt-1 border-t ${
                  isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800/60 text-slate-400'
                }`}>
                  Competitive Gap: <strong className="text-amber-600 dark:text-amber-300 font-mono">{topBrand ? Number((topBrand.visibilityShare - clientMetric.visibilityShare).toFixed(1)) : 0}%</strong>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'
              }`}>
                <span className={`text-[11px] block font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Prime Placement Quality</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-lg font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {clientMetric.primeSpotRatio}%
                  </span>
                  <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>in eye-level / feature stands</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`text-[11px] pt-3 border-t ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800/80 text-slate-400'
          }`}>
            IBTSO Field Audit Cycle: <strong className={`font-mono ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{selectedMonth}</strong>
          </div>
        </div>
      </div>

      {/* Comparison Across All 6 Categories Table */}
      <div className={`border rounded-2xl p-5 shadow-xl ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80 text-white'
      }`}>
        <h2 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Full 6-Category Portfolio Overview ({selectedBrand})
        </h2>
        <p className={`text-xs mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Cross-category benchmarking to identify strongholds and growth opportunities in the Oman IR channel
        </p>

        <div className={`overflow-x-auto rounded-xl border ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
          <table className="w-full text-left text-xs">
            <thead className={`font-semibold border-b ${
              isLight ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-slate-950 text-slate-400 border-slate-800/80'
            }`}>
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">{selectedBrand} Share</th>
                <th className="py-3 px-4">Monitored Floor Units</th>
                <th className="py-3 px-4">Category Rank</th>
                <th className="py-3 px-4">Market Leader</th>
                <th className="py-3 px-4">Leader Share</th>
                <th className="py-3 px-4">Gap to Leader</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-100 text-slate-700' : 'divide-slate-800/60 text-slate-300'}`}>
              {allCategoryComparison.map((row) => (
                <tr 
                  key={row.category}
                  onClick={() => setActiveCategory(row.category)}
                  className={`cursor-pointer transition-all ${
                    activeCategory === row.category 
                      ? isLight ? 'bg-amber-50/80 font-medium' : 'bg-amber-500/10 font-medium'
                      : isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className={`py-3 px-4 font-semibold flex items-center gap-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {activeCategory === row.category ? (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-transparent"></span>
                    )}
                    <span>{row.category}</span>
                  </td>
                  <td className={`py-3 px-4 font-mono font-bold ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
                    {row.clientShare}%
                  </td>
                  <td className={`py-3 px-4 font-mono ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {row.clientModels} / {row.totalDisplays}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold border ${
                      isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      #{row.clientRank}
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {row.leaderBrand}
                  </td>
                  <td className={`py-3 px-4 font-mono ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {row.leaderShare}%
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={row.gapToLeader === 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : isLight ? 'text-slate-500' : 'text-slate-400'}>
                      {row.gapToLeader === 0 ? 'Leader' : `-${row.gapToLeader}%`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
