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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                Direct Head-to-Head
              </span>
              <span className="text-xs text-slate-400">Competitive Share Analysis</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Swords className="w-6 h-6 text-amber-400" />
              <span>Brand vs. Competitor Visibility</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Benchmark {selectedBrand} side-by-side against key market rivals across floor presence, prime positioning, and product category domination in the 230 Oman IR stores.
            </p>
          </div>

          {/* Competitor selectors */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Benchmark Against:</span>
            <select
              value={competitorA}
              onChange={(e) => setCompetitorA(e.target.value as Brand)}
              className="bg-slate-800 text-white rounded px-2.5 py-1 font-semibold focus:outline-none border border-slate-700"
            >
              {BRANDS.filter(b => b !== selectedBrand && b !== competitorB).map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <span className="text-slate-500">vs</span>
            <select
              value={competitorB}
              onChange={(e) => setCompetitorB(e.target.value as Brand)}
              className="bg-slate-800 text-white rounded px-2.5 py-1 font-semibold focus:outline-none border border-slate-700"
            >
              {BRANDS.filter(b => b !== selectedBrand && b !== competitorA).map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Head-to-head 3-Way Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Client Brand Card */}
        <div className="bg-slate-900 border-2 border-amber-500/70 rounded-xl p-5 relative shadow-lg shadow-amber-500/5">
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase">
            Your Brand
          </div>
          <span className="text-xs text-slate-400 uppercase font-semibold">Client Target</span>
          <h2 className="text-xl font-black text-white mt-0.5">{selectedBrand}</h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Visibility Share:</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {myStat.visibilityShare}%
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">National IR Rank:</span>
              <span className="font-bold text-white font-mono">#{myStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">Total Display SKUs:</span>
              <span className="font-bold text-slate-200 font-mono">{myStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">Prime Eye-Level Share:</span>
              <span className="font-bold text-emerald-400 font-mono">{myStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">MoM Momentum:</span>
              <span className={`font-mono font-bold ${(myStat.momChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {(myStat.momChange ?? 0) > 0 ? `+${myStat.momChange}` : (myStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Competitor A Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
            Competitor 1
          </div>
          <span className="text-xs text-slate-400 uppercase font-semibold">Benchmarked Rival</span>
          <h2 className="text-xl font-black text-white mt-0.5">{competitorA}</h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Visibility Share:</span>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono">
                  {compAStat.visibilityShare}%
                </span>
                <span className={`text-[10px] ml-1.5 font-bold ${
                  myStat.visibilityShare >= compAStat.visibilityShare ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  ({myStat.visibilityShare >= compAStat.visibilityShare ? '+' : ''}{(myStat.visibilityShare - compAStat.visibilityShare).toFixed(1)}% vs you)
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">National IR Rank:</span>
              <span className="font-bold text-white font-mono">#{compAStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">Total Display SKUs:</span>
              <span className="font-bold text-slate-200 font-mono">{compAStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">Prime Eye-Level Share:</span>
              <span className="font-bold text-slate-300 font-mono">{compAStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">MoM Momentum:</span>
              <span className={`font-mono font-bold ${(compAStat.momChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {(compAStat.momChange ?? 0) > 0 ? `+${compAStat.momChange}` : (compAStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Competitor B Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
            Competitor 2
          </div>
          <span className="text-xs text-slate-400 uppercase font-semibold">Benchmarked Rival</span>
          <h2 className="text-xl font-black text-white mt-0.5">{competitorB}</h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Visibility Share:</span>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono">
                  {compBStat.visibilityShare}%
                </span>
                <span className={`text-[10px] ml-1.5 font-bold ${
                  myStat.visibilityShare >= compBStat.visibilityShare ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  ({myStat.visibilityShare >= compBStat.visibilityShare ? '+' : ''}{(myStat.visibilityShare - compBStat.visibilityShare).toFixed(1)}% vs you)
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">National IR Rank:</span>
              <span className="font-bold text-white font-mono">#{compBStat.rank}</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">Total Display SKUs:</span>
              <span className="font-bold text-slate-200 font-mono">{compBStat.modelsDisplayed} units</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">Prime Eye-Level Share:</span>
              <span className="font-bold text-slate-300 font-mono">{compBStat.primeSpotRatio}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">MoM Momentum:</span>
              <span className={`font-mono font-bold ${(compBStat.momChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {(compBStat.momChange ?? 0) > 0 ? `+${compBStat.momChange}` : (compBStat.momChange ?? 0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Multi-Bar Comparison Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
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
                      <div className="bg-slate-950 border border-slate-800 p-2.5 rounded shadow-xl text-xs">
                        <p className="font-bold text-white mb-1.5">{label}</p>
                        {payload.map((entry: any) => (
                          <div key={entry.name} className="flex items-center justify-between gap-4 py-0.5">
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
              <Bar dataKey={selectedBrand} fill="#f59e0b" name={`${selectedBrand} (Client)`} radius={[4, 4, 0, 0]} />
              <Bar dataKey={competitorA} fill="#3b82f6" name={competitorA} radius={[4, 4, 0, 0]} />
              <Bar dataKey={competitorB} fill="#06b6d4" name={competitorB} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
