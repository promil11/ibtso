import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Store, 
  Layers, 
  Award, 
  Percent, 
  Eye, 
  Target,
  ArrowUpRight,
  ShieldCheck,
  Info,
  ChevronRight
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
  PieChart,
  Pie,
  Legend
} from 'recharts';

interface Props {
  theme?: 'light' | 'dark';
  selectedBrand: Brand;
  selectedCategory: Category | 'All Categories';
  selectedRegion: OmanRegion | 'All Regions';
  selectedCity: string | 'All Cities';
  selectedMonth: string;
  dealers: Dealer[];
  displays: ModelDisplay[];
  onNavigateToTab: (tab: any, params?: any) => void;
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

export const ExecutiveDashboard: React.FC<Props> = ({
  theme = 'light',
  selectedBrand,
  selectedCategory,
  selectedRegion,
  selectedCity,
  selectedMonth,
  dealers,
  displays,
  onNavigateToTab,
}) => {
  const isLight = theme === 'light';

  // Current displays filtered by category, region, city, month
  const currentFiltered = filterDisplays(displays, dealers, {
    category: selectedCategory,
    region: selectedRegion,
    city: selectedCity,
    month: selectedMonth,
  });

  const prevMonth = selectedMonth === '2026-10' ? '2026-09' : selectedMonth === '2026-09' ? '2026-08' : '2026-08';
  const prevFiltered = filterDisplays(displays, dealers, {
    category: selectedCategory,
    region: selectedRegion,
    city: selectedCity,
    month: prevMonth,
  });

  const brandShares = calculateBrandShares(currentFiltered, prevFiltered);
  const clientMetric = brandShares.find((b) => b.brand === selectedBrand) || {
    brand: selectedBrand,
    modelsDisplayed: 0,
    visibilityShare: 0,
    momChange: 0,
    rank: 99,
    primeSpotRatio: 0,
  };

  const topBrand = brandShares[0];
  const totalDisplays = currentFiltered.length;

  // Active dealers in this scope
  const scopedDealerIds = new Set(currentFiltered.map((d) => d.dealerId));
  const dealersWithPresence = new Set(currentFiltered.filter(d => d.brand === selectedBrand).map(d => d.dealerId));
  const dealerPenetrationPct = scopedDealerIds.size > 0 
    ? Number(((dealersWithPresence.size / scopedDealerIds.size) * 100).toFixed(1))
    : 0;

  // Category-wise performance breakdown for client brand
  const categoryBreakdown = CATEGORIES.map((cat) => {
    const catCurrent = filterDisplays(displays, dealers, {
      category: cat,
      region: selectedRegion,
      city: selectedCity,
      month: selectedMonth,
    });
    const catPrev = filterDisplays(displays, dealers, {
      category: cat,
      region: selectedRegion,
      city: selectedCity,
      month: prevMonth,
    });
    const shares = calculateBrandShares(catCurrent, catPrev);
    const catMetric = shares.find((s) => s.brand === selectedBrand);
    const leader = shares[0];

    return {
      category: cat,
      share: catMetric ? catMetric.visibilityShare : 0,
      models: catMetric ? catMetric.modelsDisplayed : 0,
      rank: catMetric ? catMetric.rank : '-',
      momChange: catMetric ? catMetric.momChange : 0,
      leaderBrand: leader ? leader.brand : 'N/A',
      leaderShare: leader ? leader.visibilityShare : 0,
    };
  });

  // Top 5 brands data for bar chart
  const topCompetitors = brandShares.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Brand Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl transition-all duration-300 ${
        isLight 
          ? 'bg-gradient-to-r from-amber-500/10 via-white to-indigo-500/10 border-slate-200 text-slate-900' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border-slate-800 text-white'
      }`}>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-bold shadow-sm ${
                isLight ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                National IR Benchmark (Oman)
              </span>
              <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {selectedMonth} Audit Cycle • 230 Independent Retailers
              </span>
            </div>
            <h1 className={`text-2xl lg:text-3xl font-extrabold tracking-tight flex items-center gap-3 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <span>{selectedBrand} Intelligence Overview</span>
              <span className={`text-sm font-bold px-3 py-1 rounded-lg border shadow-sm ${
                isLight ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                Rank #{clientMetric.rank} Overall
              </span>
            </h1>
            <p className={`text-sm mt-1 max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Real-time competitive visibility intelligence captured directly from physical floor inspections across Oman's independent appliance retail network (~70% of national sell-out volume).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateToTab('competitor')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-4.5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Compare Competitors</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('benchmarks')}
              className={`border font-bold px-4.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer shadow-sm ${
                isLight 
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              Multi-Level Benchmark
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {/* Visibility Share */}
        <div className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-0.5 ${
          isLight 
            ? 'bg-gradient-to-br from-amber-50/80 via-white to-white border-amber-200 hover:border-amber-400 hover:shadow-amber-500/10' 
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border-slate-800 hover:border-amber-500/50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-300">Visibility Share</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-md">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {clientMetric.visibilityShare}%
            </span>
            <span className={`text-xs font-extrabold flex items-center px-2 py-0.5 rounded-md ${
              (clientMetric.momChange || 0) >= 0 
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30'
            }`}>
              {(clientMetric.momChange || 0) >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline" />
              )}
              {clientMetric.momChange && clientMetric.momChange > 0 ? `+${clientMetric.momChange}` : clientMetric.momChange}% MoM
            </span>
          </div>
          <p className={`text-xs mt-2 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Share of total physical displays monitored in selected scope
          </p>
        </div>

        {/* Display Units */}
        <div className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-0.5 ${
          isLight 
            ? 'bg-gradient-to-br from-indigo-50/80 via-white to-white border-indigo-200 hover:border-indigo-400' 
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-slate-800 hover:border-indigo-500/50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-300">Monitored Displays</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-md">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {clientMetric.modelsDisplayed.toLocaleString()}
            </span>
            <span className={`text-xs font-mono font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              / {totalDisplays.toLocaleString()} units
            </span>
          </div>
          <p className={`text-xs mt-2 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Floor units spotted across {scopedDealerIds.size} dealer stores
          </p>
        </div>

        {/* Store Penetration */}
        <div className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-0.5 ${
          isLight 
            ? 'bg-gradient-to-br from-emerald-50/80 via-white to-white border-emerald-200 hover:border-emerald-400' 
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border-slate-800 hover:border-emerald-500/50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-300">Store Penetration</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-md">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {dealerPenetrationPct}%
            </span>
            <span className={`text-xs font-mono font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              ({dealersWithPresence.size} / {scopedDealerIds.size} IRs)
            </span>
          </div>
          <p className={`text-xs mt-2 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Percentage of independent shops displaying at least 1 unit
          </p>
        </div>

        {/* Prime Shelf Quality */}
        <div className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-0.5 ${
          isLight 
            ? 'bg-gradient-to-br from-purple-50/80 via-white to-white border-purple-200 hover:border-purple-400' 
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 border-slate-800 hover:border-purple-500/50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-300">Prime Shelf Ratio</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {clientMetric.primeSpotRatio}%
            </span>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">Eye-level / Feature</span>
          </div>
          <p className={`text-xs mt-2 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Floor placement quality (Prime stands vs standard/secondary)
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor Visibility Share Leaderboard (2 cols) */}
        <div className={`lg:col-span-2 border rounded-2xl p-5 shadow-xl transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Brand Visibility Share Benchmark</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Top brands ranked by physical display presence in {selectedRegion === 'All Regions' ? 'Oman IR Market' : selectedRegion}
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('competitor')}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              Full Comparison <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topCompetitors}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" unit="%" stroke={isLight ? '#64748b' : '#64748b'} fontSize={11} domain={[0, 'dataMax + 5']} />
                <YAxis dataKey="brand" type="category" stroke={isLight ? '#334155' : '#cbd5e1'} fontSize={12} width={75} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 rounded-xl border shadow-2xl text-xs space-y-1 ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}>
                          <p className="font-bold">{data.brand}</p>
                          <p className="text-amber-600 dark:text-amber-300 font-mono">Visibility Share: {data.visibilityShare}%</p>
                          <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Units Displayed: {data.modelsDisplayed}</p>
                          <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>MoM Shift: {data.momChange > 0 ? `+${data.momChange}` : data.momChange}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="visibilityShare" radius={[0, 6, 6, 0]}>
                  {topCompetitors.map((entry) => (
                    <Cell
                      key={entry.brand}
                      fill={entry.brand === selectedBrand ? '#f59e0b' : isLight ? '#cbd5e1' : '#334155'}
                      stroke={entry.brand === selectedBrand ? '#fbbf24' : 'none'}
                      strokeWidth={entry.brand === selectedBrand ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`flex flex-wrap items-center justify-between text-xs pt-3 border-t ${
            isLight ? 'text-slate-500 border-slate-200' : 'text-slate-400 border-slate-800'
          }`}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
                <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>{selectedBrand} (Active Brand)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm ${isLight ? 'bg-slate-300' : 'bg-slate-700'}`}></span>
                <span>Competitors</span>
              </span>
            </div>
            <span>National Leader: <strong className={isLight ? 'text-slate-900' : 'text-slate-200'}>{topBrand?.brand} ({topBrand?.visibilityShare}%)</strong></span>
          </div>
        </div>

        {/* Share Distribution Pie (1 col) */}
        <div className={`border rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div>
            <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Market Share Breakdown</h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Proportion of physical floor space among top contenders
            </p>
          </div>

          <div className="h-56 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topCompetitors}
                  dataKey="visibilityShare"
                  nameKey="brand"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {topCompetitors.map((entry) => (
                    <Cell
                      key={`cell-${entry.brand}`}
                      fill={BRAND_COLORS[entry.brand] || '#64748b'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className={`p-2 rounded-xl border text-xs shadow-lg ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}>
                          <p className="font-bold">{data.brand}</p>
                          <p className="text-amber-600 font-mono font-bold">{data.visibilityShare}% Share</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Your Share</span>
              <span className={`text-lg font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{clientMetric.visibilityShare}%</span>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-1.5 text-[11px] pt-3 border-t ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            {topCompetitors.slice(0, 4).map((c) => (
              <div key={c.brand} className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: BRAND_COLORS[c.brand] || '#64748b' }}></span>
                <span className={`truncate font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{c.brand}</span>
                <span className={`ml-auto font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{c.visibilityShare}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Performance Matrix */}
      <div className={`border rounded-2xl p-5 shadow-xl transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Performance Across 6 Focus Categories</h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Audit visibility metrics for {selectedBrand} across the six core MVP product categories
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('category')}
            className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            Deep Dive <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryBreakdown.map((item) => (
            <div 
              key={item.category}
              onClick={() => onNavigateToTab('category', { category: item.category })}
              className={`border rounded-2xl p-4 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                isLight 
                  ? 'bg-slate-50/80 border-slate-200 hover:border-amber-400 hover:bg-amber-50/20' 
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold group-hover:text-amber-600 transition-colors ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}>
                  {item.category}
                </span>
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                  isLight ? 'bg-white text-slate-700 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  Rank #{item.rank}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <div>
                  <span className={`text-2xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {item.share}%
                  </span>
                  <span className={`text-xs ml-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>share</span>
                </div>
                <span className={`text-xs font-bold ${(item.momChange ?? 0) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {(item.momChange ?? 0) > 0 ? `+${item.momChange}` : (item.momChange ?? 0)}% MoM
                </span>
              </div>

              {/* Progress visual */}
              <div className={`w-full rounded-full h-2 mt-3 overflow-hidden border ${
                isLight ? 'bg-slate-200 border-slate-200' : 'bg-slate-800 border-slate-700'
              }`}>
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, item.share * 2.5)}%` }}
                />
              </div>

              <div className={`flex items-center justify-between text-[11px] mt-3 pt-2.5 border-t ${
                isLight ? 'text-slate-500 border-slate-200' : 'text-slate-400 border-slate-800/60'
              }`}>
                <span>Category Leader:</span>
                <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{item.leaderBrand} ({item.leaderShare}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IBTSO Strategic Business Value Note */}
      <div className={`border rounded-2xl p-4.5 flex items-start gap-3 shadow-md ${
        isLight 
          ? 'bg-gradient-to-r from-amber-50 via-white to-indigo-50 border-amber-300 text-slate-800' 
          : 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border-amber-500/30 text-white'
      }`}>
        <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-extrabold text-amber-900 dark:text-amber-200">
            Why IR Market Visibility Is Decisive for Oman Sell-Out
          </p>
          <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            While organized retail (Lulu, Carrefour, Nesto) accounts for ~30% of sell-out, independent retailers drive ~70% of total volume across the Sultanate. Lack of visibility in IR dealer stores directly undermines brand sell-out velocity. IBTSO monthly audits convert this blindspot into structured commercial advantage.
          </p>
        </div>
      </div>
    </div>
  );
};
