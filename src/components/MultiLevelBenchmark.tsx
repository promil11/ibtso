import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Store, 
  Layers, 
  ChevronRight, 
  Building2, 
  Compass, 
  Award, 
  ArrowRight
} from 'lucide-react';
import type { Brand, Category, OmanRegion, Dealer, ModelDisplay } from '../types/intelligence';
import { calculateBrandShares, filterDisplays } from '../utils/analytics';
import { REGIONS, CITIES_BY_REGION, DEALERS } from '../data/mockDealers';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface Props {
  selectedBrand: Brand;
  selectedCategory: Category | 'All Categories';
  selectedMonth: string;
  dealers: Dealer[];
  displays: ModelDisplay[];
  onSelectDealer: (id: string) => void;
}

type BenchmarkLevel = 'national' | 'regional' | 'city' | 'dealer';

export const MultiLevelBenchmark: React.FC<Props> = ({
  selectedBrand,
  selectedCategory,
  selectedMonth,
  dealers,
  displays,
  onSelectDealer,
}) => {
  const [activeLevel, setActiveLevel] = useState<BenchmarkLevel>('national');
  const [selectedRegionTab, setSelectedRegionTab] = useState<OmanRegion>('Muscat');
  const [selectedCityTab, setSelectedCityTab] = useState<string>('Ruwi');

  const prevMonth = selectedMonth === '2026-10' ? '2026-09' : selectedMonth === '2026-09' ? '2026-08' : '2026-08';

  // Level 1: National Benchmark (Across all 230 IR Dealers in Oman)
  const nationalDisplays = filterDisplays(displays, dealers, {
    category: selectedCategory,
    month: selectedMonth,
  });
  const nationalShares = calculateBrandShares(nationalDisplays);
  const nationalClient = nationalShares.find(b => b.brand === selectedBrand);

  // Level 2: Regional Benchmark (Breakdown per governorate)
  const regionalData = REGIONS.map((region) => {
    const regDisplays = filterDisplays(displays, dealers, {
      category: selectedCategory,
      region,
      month: selectedMonth,
    });
    const regDealers = dealers.filter(d => d.region === region);
    const shares = calculateBrandShares(regDisplays);
    const client = shares.find(b => b.brand === selectedBrand);
    const top = shares[0];

    return {
      region,
      dealerCount: regDealers.length,
      totalDisplays: regDisplays.length,
      clientShare: client ? client.visibilityShare : 0,
      clientRank: client ? client.rank : '-',
      clientDisplays: client ? client.modelsDisplayed : 0,
      topBrand: top ? top.brand : 'N/A',
      topBrandShare: top ? top.visibilityShare : 0,
      shares,
    };
  });

  // Level 3: City Benchmark (within selectedRegionTab)
  const citiesInRegion = CITIES_BY_REGION[selectedRegionTab] || [];
  const cityData = citiesInRegion.map((city) => {
    const cityDisplays = filterDisplays(displays, dealers, {
      category: selectedCategory,
      region: selectedRegionTab,
      city,
      month: selectedMonth,
    });
    const cityDealers = dealers.filter(d => d.city === city);
    const shares = calculateBrandShares(cityDisplays);
    const client = shares.find(b => b.brand === selectedBrand);
    const top = shares[0];

    return {
      city,
      dealerCount: cityDealers.length,
      totalDisplays: cityDisplays.length,
      clientShare: client ? client.visibilityShare : 0,
      clientRank: client ? client.rank : '-',
      clientDisplays: client ? client.modelsDisplayed : 0,
      topBrand: top ? top.brand : 'N/A',
      topBrandShare: top ? top.visibilityShare : 0,
    };
  });

  // Level 4: Dealer Benchmark (within selectedCityTab)
  const dealersInCity = dealers.filter(d => d.city === selectedCityTab);
  const dealerBenchmarkData = dealersInCity.map((dealer) => {
    const dDisplays = filterDisplays(displays, dealers, {
      category: selectedCategory,
      dealerId: dealer.id,
      month: selectedMonth,
    });
    const shares = calculateBrandShares(dDisplays);
    const client = shares.find(b => b.brand === selectedBrand);
    const top = shares[0];

    return {
      dealer,
      totalDisplays: dDisplays.length,
      clientShare: client ? client.visibilityShare : 0,
      clientDisplays: client ? client.modelsDisplayed : 0,
      clientRank: client ? client.rank : '-',
      topBrand: top ? top.brand : 'N/A',
      topBrandShare: top ? top.visibilityShare : 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Benchmark Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shadow-sm">
                Hierarchical Architecture
              </span>
              <span className="text-xs text-slate-400">4-Tier Aggregation Pipeline</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-md">
                <Globe2 className="w-5 h-5" />
              </div>
              <span>Multi-Level Market Benchmark</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Inspect visibility share at the four required levels: <strong>Dealer Level → City Level → Regional Level → National Benchmark</strong> across Oman's independent appliance retail network.
            </p>
          </div>

          {/* Level Switcher Pipeline Tabs */}
          <div className="flex items-center p-1.5 bg-slate-950/90 rounded-2xl border border-slate-800/80 text-xs font-semibold shadow-inner">
            <button
              onClick={() => setActiveLevel('national')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeLevel === 'national' 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>1. National</span>
            </button>
            <span className="text-slate-600 font-bold px-1">→</span>
            <button
              onClick={() => setActiveLevel('regional')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeLevel === 'regional' 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>2. Regional</span>
            </button>
            <span className="text-slate-600 font-bold px-1">→</span>
            <button
              onClick={() => setActiveLevel('city')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeLevel === 'city' 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>3. City</span>
            </button>
            <span className="text-slate-600 font-bold px-1">→</span>
            <button
              onClick={() => setActiveLevel('dealer')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeLevel === 'dealer' 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>4. Dealer</span>
            </button>
          </div>
        </div>
      </div>

      {/* LEVEL 1: NATIONAL BENCHMARK */}
      {activeLevel === 'national' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-4.5 shadow-lg">
              <span className="text-xs text-slate-400 font-medium">Total National IR Network</span>
              <p className="text-2xl font-black text-white mt-1">230 Dealers</p>
              <p className="text-[11px] text-slate-500 mt-0.5">100% of tracked IR footprint in Oman</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-950/20 via-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-4.5 shadow-lg">
              <span className="text-xs text-slate-400 font-medium">Total Monitored Floor Units</span>
              <p className="text-2xl font-black text-white mt-1 font-mono">{nationalDisplays.length.toLocaleString()}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Physical SKU audits ({selectedMonth})</p>
            </div>
            <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-4.5 shadow-lg">
              <span className="text-xs text-slate-400 font-medium">{selectedBrand} National Share</span>
              <p className="text-2xl font-black text-amber-400 font-mono mt-1">
                {nationalClient?.visibilityShare}%
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Rank #{nationalClient?.rank} nationally</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-4.5 shadow-lg">
              <span className="text-xs text-slate-400 font-medium">National Leader</span>
              <p className="text-2xl font-black text-slate-200 mt-1">{nationalShares[0]?.brand}</p>
              <p className="text-[11px] text-emerald-400 font-mono font-bold mt-0.5">{nationalShares[0]?.visibilityShare}% visibility share</p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-white mb-1">
              National Brand Visibility Benchmark (All 230 IR Dealers)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Sultanate-wide baseline share of shelf across independent retailers
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nationalShares.slice(0, 8)} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <XAxis dataKey="brand" stroke="#64748b" fontSize={11} />
                  <YAxis unit="%" stroke="#64748b" fontSize={11} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                            <p className="font-bold text-white">{d.brand}</p>
                            <p className="text-amber-400 font-mono">National Share: {d.visibilityShare}%</p>
                            <p className="text-slate-300 font-mono">Audited Displays: {d.modelsDisplayed}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="visibilityShare" radius={[6, 6, 0, 0]}>
                    {nationalShares.slice(0, 8).map((entry) => (
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
          </div>
        </div>
      )}

      {/* LEVEL 2: REGIONAL BENCHMARK */}
      {activeLevel === 'regional' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-white mb-1">
              Regional Visibility Share Benchmark (10 Governorates)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              {selectedBrand} share compared against the leading brand in each governorate
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <XAxis dataKey="region" stroke="#64748b" fontSize={10} angle={-25} textAnchor="end" interval={0} />
                  <YAxis unit="%" stroke="#64748b" fontSize={11} domain={[0, 'dataMax + 5']} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                            <p className="font-bold text-white">{d.region} Governorate</p>
                            <p className="text-amber-400 font-mono">{selectedBrand} Share: {d.clientShare}%</p>
                            <p className="text-slate-300 font-mono">Rank: #{d.clientRank} in region</p>
                            <p className="text-slate-400">Regional Leader: {d.topBrand} ({d.topBrandShare}%)</p>
                            <p className="text-slate-500">Dealers: {d.dealerCount} IRs</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="clientShare" name={`${selectedBrand} Share`} fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="topBrandShare" name="Governorate Leader Share" fill="#334155" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Table */}
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800/80">
                <tr>
                  <th className="py-3 px-4">Governorate</th>
                  <th className="py-3 px-4">IR Dealers</th>
                  <th className="py-3 px-4">{selectedBrand} Share</th>
                  <th className="py-3 px-4">{selectedBrand} Rank</th>
                  <th className="py-3 px-4">Top Brand in Region</th>
                  <th className="py-3 px-4">Leader Share</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {regionalData.map((reg) => (
                  <tr key={reg.region} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{reg.region}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{reg.dealerCount} stores</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">{reg.clientShare}%</td>
                    <td className="py-3 px-4 font-mono text-slate-300">#{reg.clientRank}</td>
                    <td className="py-3 px-4 font-medium text-slate-200">{reg.topBrand}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{reg.topBrandShare}%</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedRegionTab(reg.region);
                          setActiveLevel('city');
                        }}
                        className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        Drill to Cities <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEVEL 3: CITY BENCHMARK */}
      {activeLevel === 'city' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/80 p-4 rounded-2xl text-xs shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-400 font-medium">Select Governorate for City Benchmark:</span>
              <select
                value={selectedRegionTab}
                onChange={(e) => {
                  const reg = e.target.value as OmanRegion;
                  setSelectedRegionTab(reg);
                  const cities = CITIES_BY_REGION[reg];
                  if (cities && cities.length > 0) setSelectedCityTab(cities[0]);
                }}
                className="bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-1.5 font-bold shadow-sm"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <span className="text-slate-400 font-mono">
              {citiesInRegion.length} cities tracked in {selectedRegionTab}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
            {cityData.map((c) => (
              <div 
                key={c.city}
                className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl p-4.5 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">{c.city}</h3>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {c.dealerCount} IR Dealers
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-3">
                  <div>
                    <span className="text-2xl font-black text-amber-400 font-mono">{c.clientShare}%</span>
                    <span className="text-xs text-slate-400 ml-1.5">{selectedBrand}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Rank #{c.clientRank}</span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 mt-3 overflow-hidden border border-slate-800/60 p-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full shadow-sm shadow-amber-500/50"
                    style={{ width: `${Math.min(100, c.clientShare * 2)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3.5 pt-2.5 border-t border-slate-800/80">
                  <span>Leader: <strong className="text-slate-200">{c.topBrand} ({c.topBrandShare}%)</strong></span>
                  <button
                    onClick={() => {
                      setSelectedCityTab(c.city);
                      setActiveLevel('dealer');
                    }}
                    className="text-amber-400 hover:underline flex items-center gap-0.5 font-semibold"
                  >
                    View Dealers <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 4: DEALER LEVEL BENCHMARK */}
      {activeLevel === 'dealer' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/80 p-4 rounded-2xl text-xs shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-400 font-medium">City Scope:</span>
              <select
                value={selectedCityTab}
                onChange={(e) => setSelectedCityTab(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-1.5 font-bold shadow-sm"
              >
                {citiesInRegion.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <span className="text-slate-400 font-mono">
              {dealerBenchmarkData.length} Independent Retailers in {selectedCityTab}
            </span>
          </div>

          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800/80">
                <tr>
                  <th className="py-3 px-4">Dealer Name</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">{selectedBrand} Share</th>
                  <th className="py-3 px-4">Units Audited</th>
                  <th className="py-3 px-4">Store Leader</th>
                  <th className="py-3 px-4">Leader Share</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {dealerBenchmarkData.map((row) => (
                  <tr key={row.dealer.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{row.dealer.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{row.dealer.code}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                        {row.dealer.tier.split(' ')[0]} {row.dealer.tier.split(' ')[1]}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-400 text-sm">
                      {row.clientShare}%
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {row.clientDisplays} of {row.totalDisplays}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-200">
                      {row.topBrand}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {row.topBrandShare}%
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onSelectDealer(row.dealer.id)}
                        className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        Inspect Store <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
