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
  selectedBrand: Brand;
  selectedCategory: Category | 'All Categories';
  selectedRegion: OmanRegion | 'All Regions';
  selectedCity: string | 'All Cities';
  selectedMonth: string;
  dealers: Dealer[];
  displays: ModelDisplay[];
}

export const BrandVsCompetitor: React.FC<Props> = ({
  selectedBrand,
  selectedCategory,
  selectedRegion,
  selectedCity,
  selectedMonth,
  dealers,
  displays,
}) => {
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
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold shadow-sm">
                Direct Head-to-Head
              </span>
              <span className="text-xs text-slate-400">Competitive Share Analysis</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-md">
                <Swords className="w-5 h-5" />
              </div>
              <span>Brand vs. Competitor Visibility</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Benchmark {selectedBrand} side-by-side against key market rivals across floor presence, prime positioning, and product category domination in the 230 Oman IR stores.
            </p>
          </div>

          {/* Competitor selectors */}
          <div className="flex flex-wrap items-center gap-2.5 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 text-xs shadow-inner">
            <span className="text-slate-400 font-medium">Benchmark Against:</span>
            <select
              value={competitorA}
              onChange={(e) => setCompetitorA(e.target.value as Brand)}
              className="bg-slate-900 text-white rounded-lg px-3 py-1.5 font-bold focus:outline-none border border-slate-700 shadow-sm"
            >
              {BRANDS.filter(b => b !== selectedBrand && b !== competitorB).map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <span className="text-slate-500 font-bold">vs</span>
            <select
              value={competitorB}
              onChange={(e) => setCompetitorB(e.target.value as Brand)}
              className="bg-slate-900 text-white rounded-lg px-3 py-1.5 font-bold focus:outline-none border border-slate-700 shadow-sm"
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
        <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border-2 border-amber-500/80 rounded-2xl p-5 relative shadow-xl shadow-amber-500/10">
          <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wide shadow-md">
            Your Brand
          </div>
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Client Target</span>
          <h2 className="text-2xl font-black text-white mt-1">{selectedBrand}</h2>

          <div className="mt-4 space-y-3 pt-3 border-t border-amber-500/20">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Visibility Share:</span>
              <span className="text-3xl font-black text-amber-400 font-mono">
                {myStat.visibilityShare}%
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">National IR Rank:</span>
              <span className="font-extrabold text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">#{myStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">Total Display SKUs:</span>
              <span className="font-bold text-slate-200 font-mono">{myStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">Prime Eye-Level Share:</span>
              <span className="font-bold text-emerald-400 font-mono">{myStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">MoM Momentum:</span>
              <span className={`font-mono font-bold ${(myStat.momChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {(myStat.momChange ?? 0) > 0 ? `+${myStat.momChange}` : (myStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Competitor A Card */}
        <div className="bg-gradient-to-br from-blue-950/30 via-slate-900 to-slate-950 border border-blue-500/30 rounded-2xl p-5 relative shadow-lg">
          <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Competitor 1
          </div>
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Benchmarked Rival</span>
          <h2 className="text-2xl font-black text-white mt-1">{competitorA}</h2>

          <div className="mt-4 space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Visibility Share:</span>
              <div className="text-right">
                <span className="text-3xl font-black text-white font-mono">
                  {compAStat.visibilityShare}%
                </span>
                <span className={`text-[10px] block font-bold mt-0.5 ${
                  myStat.visibilityShare >= compAStat.visibilityShare ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  ({myStat.visibilityShare >= compAStat.visibilityShare ? '+' : ''}{(myStat.visibilityShare - compAStat.visibilityShare).toFixed(1)}% vs you)
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">National IR Rank:</span>
              <span className="font-bold text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">#{compAStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">Total Display SKUs:</span>
              <span className="font-bold text-slate-200 font-mono">{compAStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">Prime Eye-Level Share:</span>
              <span className="font-bold text-slate-300 font-mono">{compAStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">MoM Momentum:</span>
              <span className={`font-mono font-bold ${(compAStat.momChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {(compAStat.momChange ?? 0) > 0 ? `+${compAStat.momChange}` : (compAStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Competitor B Card */}
        <div className="bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 relative shadow-lg">
          <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Competitor 2
          </div>
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Benchmarked Rival</span>
          <h2 className="text-2xl font-black text-white mt-1">{competitorB}</h2>

          <div className="mt-4 space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Visibility Share:</span>
              <div className="text-right">
                <span className="text-3xl font-black text-white font-mono">
                  {compBStat.visibilityShare}%
                </span>
                <span className={`text-[10px] block font-bold mt-0.5 ${
                  myStat.visibilityShare >= compBStat.visibilityShare ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  ({myStat.visibilityShare >= compBStat.visibilityShare ? '+' : ''}{(myStat.visibilityShare - compBStat.visibilityShare).toFixed(1)}% vs you)
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">National IR Rank:</span>
              <span className="font-bold text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">#{compBStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">Total Display SKUs:</span>
              <span className="font-bold text-slate-200 font-mono">{compBStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">Prime Eye-Level Share:</span>
              <span className="font-bold text-slate-300 font-mono">{compBStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400 font-medium">MoM Momentum:</span>
              <span className={`font-mono font-bold ${(compBStat.momChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {(compBStat.momChange ?? 0) > 0 ? `+${compBStat.momChange}` : (compBStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Multi-Bar Comparison Chart */}
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white">
              Category Share Comparison: {selectedBrand} vs {competitorA} vs {competitorB}
            </h2>
            <p className="text-xs text-slate-400">
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
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="category" stroke="#64748b" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis unit="%" stroke="#64748b" fontSize={11} domain={[0, 'dataMax + 10']} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl text-xs space-y-1.5">
                        <p className="font-bold text-white border-b border-slate-800 pb-1 mb-1">{label}</p>
                        {payload.map((entry: any) => (
                          <div key={entry.name} className="flex items-center justify-between gap-6 py-0.5">
                            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
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
