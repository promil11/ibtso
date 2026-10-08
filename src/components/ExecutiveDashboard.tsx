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
  selectedBrand,
  selectedCategory,
  selectedRegion,
  selectedCity,
  selectedMonth,
  dealers,
  displays,
  onNavigateToTab,
}) => {
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                National IR Benchmark (Oman)
              </span>
              <span className="text-xs text-slate-400">
                {selectedMonth} Audit Cycle • 230 Independent Retailers
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{selectedBrand} Intelligence Overview</span>
              <span className="text-sm font-normal px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Rank #{clientMetric.rank} Overall
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time competitive visibility intelligence captured directly from physical floor inspections across Oman's independent appliance retail network (~70% of national sell-out volume).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateToTab('competitor')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <span>Compare Competitors</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('benchmarks')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-lg text-sm transition-all"
            >
              Multi-Level Benchmark
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Visibility Share */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Visibility Share</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {clientMetric.visibilityShare}%
            </span>
            <span className={`text-xs font-semibold flex items-center ${
              (clientMetric.momChange || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {(clientMetric.momChange || 0) >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline" />
              )}
              {clientMetric.momChange && clientMetric.momChange > 0 ? `+${clientMetric.momChange}` : clientMetric.momChange}% MoM
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Share of total physical displays monitored in selected scope
          </p>
        </div>

        {/* Display Units */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Monitored Displays</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {clientMetric.modelsDisplayed.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">
              / {totalDisplays.toLocaleString()} units
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Floor units spotted across {scopedDealerIds.size} dealer stores
          </p>
        </div>

        {/* Store Penetration */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Store Penetration</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {dealerPenetrationPct}%
            </span>
            <span className="text-xs text-slate-400">
              ({dealersWithPresence.size} / {scopedDealerIds.size} IRs)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Percentage of independent shops displaying at least 1 unit
          </p>
        </div>

        {/* Prime Shelf Quality */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Prime Shelf Ratio</span>
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {clientMetric.primeSpotRatio}%
            </span>
            <span className="text-xs text-amber-400 font-medium">Eye-level / Feature</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Floor placement quality (Prime stands vs standard/secondary)
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor Visibility Share Leaderboard (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Brand Visibility Share Benchmark</h2>
              <p className="text-xs text-slate-400">
                Top brands ranked by physical display presence in {selectedRegion === 'All Regions' ? 'Oman IR Market' : selectedRegion}
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('competitor')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
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
                <XAxis type="number" unit="%" stroke="#64748b" fontSize={11} domain={[0, 'dataMax + 5']} />
                <YAxis dataKey="brand" type="category" stroke="#cbd5e1" fontSize={12} width={75} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded shadow-xl text-xs">
                          <p className="font-bold text-white">{data.brand}</p>
                          <p className="text-amber-300">Visibility Share: {data.visibilityShare}%</p>
                          <p className="text-slate-400">Units Displayed: {data.modelsDisplayed}</p>
                          <p className="text-slate-400">MoM Shift: {data.momChange > 0 ? `+${data.momChange}` : data.momChange}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="visibilityShare" radius={[0, 4, 4, 0]}>
                  {topCompetitors.map((entry) => (
                    <Cell
                      key={entry.brand}
                      fill={entry.brand === selectedBrand ? '#f59e0b' : '#334155'}
                      stroke={entry.brand === selectedBrand ? '#fbbf24' : 'none'}
                      strokeWidth={entry.brand === selectedBrand ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
                <span className="text-white font-medium">{selectedBrand} (Active Brand)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-700 rounded-sm"></span>
                <span>Competitors</span>
              </span>
            </div>
            <span>National Leader: <strong className="text-slate-200">{topBrand?.brand} ({topBrand?.visibilityShare}%)</strong></span>
          </div>
        </div>

        {/* Share Distribution Pie (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Market Share Breakdown</h2>
            <p className="text-xs text-slate-400">
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
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded text-xs">
                          <p className="font-bold text-white">{data.brand}</p>
                          <p className="text-amber-400">{data.visibilityShare}% Share</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400">Your Share</span>
              <span className="text-lg font-black text-white">{clientMetric.visibilityShare}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-3 border-t border-slate-800">
            {topCompetitors.slice(0, 4).map((c) => (
              <div key={c.brand} className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: BRAND_COLORS[c.brand] || '#64748b' }}></span>
                <span className="text-slate-300 truncate">{c.brand}</span>
                <span className="ml-auto text-slate-400 font-mono">{c.visibilityShare}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Performance Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Performance Across 6 Focus Categories</h2>
            <p className="text-xs text-slate-400">
              Audit visibility metrics for {selectedBrand} across the six core MVP product categories
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('category')}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
          >
            Deep Dive <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryBreakdown.map((item) => (
            <div 
              key={item.category}
              onClick={() => onNavigateToTab('category', { category: item.category })}
              className="bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/50 rounded-xl p-4 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-300 transition-colors">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Rank #{item.rank}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <div>
                  <span className="text-2xl font-bold text-white">
                    {item.share}%
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5">share</span>
                </div>
                <span className={`text-xs font-medium ${(item.momChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {(item.momChange ?? 0) > 0 ? `+${item.momChange}` : (item.momChange ?? 0)}% MoM
                </span>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div 
                  className="bg-amber-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${Math.min(100, item.share * 2.5)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
                <span>Category Leader:</span>
                <span className="text-slate-300 font-medium">{item.leaderBrand} ({item.leaderShare}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IBTSO Strategic Business Value Note */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-amber-200">
            Why IR Market Visibility Is Decisive for Oman Sell-Out
          </p>
          <p className="text-slate-300 leading-relaxed">
            While organized retail (Lulu, Carrefour, Nesto) accounts for ~30% of sell-out, independent retailers drive ~70% of total volume across the Sultanate. Lack of visibility in IR dealer stores directly undermines brand sell-out velocity. IBTSO monthly audits convert this blindspot into structured commercial advantage.
          </p>
        </div>
      </div>
    </div>
  );
};
