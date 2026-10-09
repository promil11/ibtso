import React, { useState } from 'react';
import { 
  BarChart3, 
  Swords, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Store, 
  Award, 
  Check, 
  Plus
} from 'lucide-react';
import type { Brand, Category, OmanRegion, Dealer, ModelDisplay } from '../types/intelligence';
import { calculateBrandShares, filterDisplays } from '../utils/analytics';
import { BRANDS, CATEGORIES } from '../data/mockDealers';
import { 
  BarChart, 
  Bar, 
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
  selectedMonth: string;
  dealers: Dealer[];
  displays: ModelDisplay[];
}

export const BrandVsCompetitor: React.FC<Props> = ({
  theme = 'light',
  selectedBrand,
  selectedCategory,
  selectedRegion,
  selectedCity,
  selectedMonth,
  dealers,
  displays,
}) => {
  const isLight = theme === 'light';
  // Let user pick up to 3 primary competitor brands to benchmark side-by-side
  const defaultCompetitors = BRANDS.filter(b => b !== selectedBrand).slice(0, 3);
  const [competitorA, setCompetitorA] = useState<Brand>(defaultCompetitors[0] || 'Samsung');
  const [competitorB, setCompetitorB] = useState<Brand>(defaultCompetitors[1] || 'Midea');

  const prevMonth = selectedMonth === '2026-10' ? '2026-09' : selectedMonth === '2026-09' ? '2026-08' : '2026-08';

  // Current scope
  const currentFiltered = filterDisplays(displays, dealers, {
    category: selectedCategory,
    region: selectedRegion,
    city: selectedCity,
    month: selectedMonth,
  });

  const prevFiltered = filterDisplays(displays, dealers, {
    category: selectedCategory,
    region: selectedRegion,
    city: selectedCity,
    month: prevMonth,
  });

  const allBrandShares = calculateBrandShares(currentFiltered, prevFiltered);

  const getBrandStat = (brand: Brand) => {
    return allBrandShares.find(b => b.brand === brand) || {
      brand,
      modelsDisplayed: 0,
      visibilityShare: 0,
      momChange: 0,
      rank: 99,
      primeSpotRatio: 0,
    };
  };

  const myStat = getBrandStat(selectedBrand);
  const compAStat = getBrandStat(competitorA);
  const compBStat = getBrandStat(competitorB);

  // Category side-by-side comparison
  const categoryComparisonData = CATEGORIES.map((cat) => {
    const catCurrent = filterDisplays(displays, dealers, {
      category: cat,
      region: selectedRegion,
      city: selectedCity,
      month: selectedMonth,
    });
    const shares = calculateBrandShares(catCurrent);

    const myCatShare = shares.find(s => s.brand === selectedBrand)?.visibilityShare || 0;
    const compACatShare = shares.find(s => s.brand === competitorA)?.visibilityShare || 0;
    const compBCatShare = shares.find(s => s.brand === competitorB)?.visibilityShare || 0;

    return {
      category: cat,
      [selectedBrand]: myCatShare,
      [competitorA]: compACatShare,
      [competitorB]: compBCatShare,
    };
  });

  return (
    <div className="space-y-6">
      {/* Competitor Header */}
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
                Direct Head-to-Head
              </span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Competitive Share Analysis</span>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <div className={`p-2 rounded-xl border shadow-md ${
                isLight ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                <Swords className="w-5 h-5" />
              </div>
              <span>Brand vs. Competitor Visibility</span>
            </h1>
            <p className={`text-xs mt-1.5 max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Benchmark {selectedBrand} side-by-side against key market rivals across floor presence, prime positioning, and product category domination in the 230 Oman IR stores.
            </p>
          </div>

          {/* Competitor selectors */}
          <div className={`flex flex-wrap items-center gap-2.5 p-3 rounded-2xl border text-xs shadow-inner ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'
          }`}>
            <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Benchmark Against:</span>
            <select
              value={competitorA}
              onChange={(e) => setCompetitorA(e.target.value as Brand)}
              className={`rounded-lg px-3 py-1.5 font-bold focus:outline-none border shadow-sm ${
                isLight ? 'bg-white text-slate-800 border-slate-300' : 'bg-slate-900 text-white border-slate-700'
              }`}
            >
              {BRANDS.filter(b => b !== selectedBrand && b !== competitorB).map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <span className={`font-bold ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>vs</span>
            <select
              value={competitorB}
              onChange={(e) => setCompetitorB(e.target.value as Brand)}
              className={`rounded-lg px-3 py-1.5 font-bold focus:outline-none border shadow-sm ${
                isLight ? 'bg-white text-slate-800 border-slate-300' : 'bg-slate-900 text-white border-slate-700'
              }`}
            >
              {BRANDS.filter(b => b !== selectedBrand && b !== competitorA).map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Head-to-head 3-Way Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Active Client Brand Card */}
        <div className={`border-2 rounded-2xl p-5 relative shadow-xl ${
          isLight 
            ? 'bg-amber-50/70 border-amber-400 text-slate-900 shadow-amber-500/10'
            : 'bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border-amber-500/80 text-white shadow-amber-500/10'
        }`}>
          <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wide shadow-md">
            Your Brand
          </div>
          <span className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-amber-800' : 'text-slate-400'}`}>Client Target</span>
          <h2 className={`text-2xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedBrand}</h2>

          <div className={`mt-4 space-y-3 pt-3 border-t ${isLight ? 'border-amber-200' : 'border-amber-500/20'}`}>
            <div className="flex items-baseline justify-between">
              <span className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Visibility Share:</span>
              <span className={`text-3xl font-black font-mono ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
                {myStat.visibilityShare}%
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>National IR Rank:</span>
              <span className={`font-extrabold font-mono px-2 py-0.5 rounded border ${
                isLight ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-950 text-white border-slate-800'
              }`}>#{myStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Total Display SKUs:</span>
              <span className={`font-bold font-mono ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{myStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Prime Eye-Level Share:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{myStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>MoM Momentum:</span>
              <span className={`font-mono font-bold ${(myStat.momChange ?? 0) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {(myStat.momChange ?? 0) > 0 ? `+${myStat.momChange}` : (myStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Competitor A Card */}
        <div className={`border rounded-2xl p-5 relative shadow-lg ${
          isLight
            ? 'bg-white border-blue-200 text-slate-900'
            : 'bg-gradient-to-br from-blue-950/30 via-slate-900 to-slate-950 border-blue-500/30 text-white'
        }`}>
          <div className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
            isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
          }`}>
            Competitor 1
          </div>
          <span className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Benchmarked Rival</span>
          <h2 className={`text-2xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{competitorA}</h2>

          <div className={`mt-4 space-y-3 pt-3 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
            <div className="flex items-baseline justify-between">
              <span className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Visibility Share:</span>
              <div className="text-right">
                <span className={`text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {compAStat.visibilityShare}%
                </span>
                <span className={`text-[10px] block font-bold mt-0.5 ${
                  myStat.visibilityShare >= compAStat.visibilityShare ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  ({myStat.visibilityShare >= compAStat.visibilityShare ? '+' : ''}{(myStat.visibilityShare - compAStat.visibilityShare).toFixed(1)}% vs you)
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>National IR Rank:</span>
              <span className={`font-bold font-mono px-2 py-0.5 rounded border ${
                isLight ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-slate-950 text-white border-slate-800'
              }`}>#{compAStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Total Display SKUs:</span>
              <span className={`font-bold font-mono ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{compAStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Prime Eye-Level Share:</span>
              <span className={`font-bold font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{compAStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>MoM Momentum:</span>
              <span className={`font-mono font-bold ${(compAStat.momChange ?? 0) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {(compAStat.momChange ?? 0) > 0 ? `+${compAStat.momChange}` : (compAStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Competitor B Card */}
        <div className={`border rounded-2xl p-5 relative shadow-lg ${
          isLight
            ? 'bg-white border-cyan-200 text-slate-900'
            : 'bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 border-cyan-500/30 text-white'
        }`}>
          <div className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
            isLight ? 'bg-cyan-50 text-cyan-700 border-cyan-200' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
          }`}>
            Competitor 2
          </div>
          <span className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Benchmarked Rival</span>
          <h2 className={`text-2xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{competitorB}</h2>

          <div className={`mt-4 space-y-3 pt-3 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
            <div className="flex items-baseline justify-between">
              <span className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Visibility Share:</span>
              <div className="text-right">
                <span className={`text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {compBStat.visibilityShare}%
                </span>
                <span className={`text-[10px] block font-bold mt-0.5 ${
                  myStat.visibilityShare >= compBStat.visibilityShare ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  ({myStat.visibilityShare >= compBStat.visibilityShare ? '+' : ''}{(myStat.visibilityShare - compBStat.visibilityShare).toFixed(1)}% vs you)
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>National IR Rank:</span>
              <span className={`font-bold font-mono px-2 py-0.5 rounded border ${
                isLight ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-slate-950 text-white border-slate-800'
              }`}>#{compBStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Total Display SKUs:</span>
              <span className={`font-bold font-mono ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{compBStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Prime Eye-Level Share:</span>
              <span className={`font-bold font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{compBStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>MoM Momentum:</span>
              <span className={`font-mono font-bold ${(compBStat.momChange ?? 0) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {(compBStat.momChange ?? 0) > 0 ? `+${compBStat.momChange}` : (compBStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Multi-Bar Comparison Chart */}
      <div className={`border rounded-2xl p-5 shadow-xl ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80 text-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Category Share Comparison: {selectedBrand} vs {competitorA} vs {competitorB}
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Visibility share % breakdown across each product category
            </p>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryComparisonData}
              margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#e2e8f0' : '#1e293b'} />
              <XAxis dataKey="category" stroke="#64748b" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis unit="%" stroke="#64748b" fontSize={11} domain={[0, 'dataMax + 10']} />
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
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
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
              <Bar dataKey={selectedBrand} fill="#f59e0b" name={`${selectedBrand} (Client)`} radius={[6, 6, 0, 0]} />
              <Bar dataKey={competitorA} fill="#3b82f6" name={competitorA} radius={[6, 6, 0, 0]} />
              <Bar dataKey={competitorB} fill="#06b6d4" name={competitorB} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
