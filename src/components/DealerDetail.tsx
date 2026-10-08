import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Calendar, 
  UserCheck, 
  Layers, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Tag, 
  Sparkles,
  BarChart2,
  ExternalLink
} from 'lucide-react';
import type { Dealer, ModelDisplay, Brand, Category } from '../types/intelligence';
import { calculateBrandShares } from '../utils/analytics';
import { CATEGORIES, BRANDS } from '../data/mockDealers';
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
  dealer: Dealer;
  displays: ModelDisplay[];
  selectedBrand: Brand;
  selectedMonth: string;
  onBack: () => void;
  onSelectCategory?: (category: Category) => void;
}

export const DealerDetail: React.FC<Props> = ({
  dealer,
  displays,
  selectedBrand,
  selectedMonth,
  onBack,
  onSelectCategory,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<Category | 'All'>('All');

  // Filter displays for this specific dealer and month
  const dealerDisplays = displays.filter(
    (d) => d.dealerId === dealer.id && d.month === selectedMonth
  );

  const prevMonth = selectedMonth === '2026-10' ? '2026-09' : selectedMonth === '2026-09' ? '2026-08' : '2026-08';
  const prevDisplays = displays.filter(
    (d) => d.dealerId === dealer.id && d.month === prevMonth
  );

  // Filtered by sub-tab category if chosen
  const filteredCategoryDisplays = activeCategoryTab === 'All'
    ? dealerDisplays
    : dealerDisplays.filter(d => d.category === activeCategoryTab);

  const prevFilteredCatDisplays = activeCategoryTab === 'All'
    ? prevDisplays
    : prevDisplays.filter(d => d.category === activeCategoryTab);

  const brandShares = calculateBrandShares(filteredCategoryDisplays, prevFilteredCatDisplays);

  const clientShare = brandShares.find(b => b.brand === selectedBrand) || {
    brand: selectedBrand,
    modelsDisplayed: 0,
    visibilityShare: 0,
    momChange: 0,
    rank: 99,
    primeSpotRatio: 0,
  };

  const topBrandInStore = brandShares[0];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dealer Directory</span>
        </button>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>Audit Month:</span>
          <span className="font-semibold text-amber-300 font-mono">{selectedMonth}</span>
        </div>
      </div>

      {/* Dealer Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
                {dealer.code}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {dealer.tier}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                Audited: {dealer.auditDate}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight">
              {dealer.name}
            </h1>
            <p className="text-base text-slate-400 font-arabic text-left mt-0.5" dir="rtl">
              {dealer.arabicName}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{dealer.area}, {dealer.city}, {dealer.region} Governorate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{dealer.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audited by: {dealer.auditor}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics in Dealer */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block">{selectedBrand} Share</span>
              <span className="text-2xl font-extrabold text-amber-400 font-mono">
                {clientShare.visibilityShare}%
              </span>
              <span className="text-[10px] text-slate-400">
                Rank #{clientShare.rank} in shop
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">{selectedBrand} Units</span>
              <span className="text-2xl font-extrabold text-white font-mono">
                {clientShare.modelsDisplayed}
              </span>
              <span className="text-[10px] text-slate-400">
                of {filteredCategoryDisplays.length} total units
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block">Leading Brand</span>
              <span className="text-base font-bold text-slate-200 truncate block">
                {topBrandInStore?.brand || 'None'}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {topBrandInStore?.visibilityShare}% share
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs for Dealer */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveCategoryTab('All')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeCategoryTab === 'All'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All Categories ({dealerDisplays.length} units)
        </button>
        {CATEGORIES.map((c) => {
          const count = dealerDisplays.filter(d => d.category === c).length;
          const isActive = activeCategoryTab === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategoryTab(c)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{c}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Brand Visibility Breakdown inside this Dealer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">
                Floor Visibility Share — {dealer.name}
              </h2>
              <p className="text-xs text-slate-400">
                {activeCategoryTab === 'All' ? 'Aggregate across all appliances' : activeCategoryTab}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Total {filteredCategoryDisplays.length} Display Models
            </span>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={brandShares}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 35, bottom: 5 }}
              >
                <XAxis type="number" unit="%" stroke="#64748b" fontSize={11} domain={[0, 'dataMax + 10']} />
                <YAxis dataKey="brand" type="category" stroke="#cbd5e1" fontSize={11} width={80} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded shadow-xl text-xs">
                          <p className="font-bold text-white">{data.brand}</p>
                          <p className="text-amber-300">Visibility Share: {data.visibilityShare}%</p>
                          <p className="text-slate-300">Floor Units: {data.modelsDisplayed}</p>
                          <p className="text-slate-400">Prime Shelving: {data.primeSpotRatio}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="visibilityShare" radius={[0, 4, 4, 0]}>
                  {brandShares.map((entry) => (
                    <Cell
                      key={entry.brand}
                      fill={entry.brand === selectedBrand ? '#f59e0b' : '#334155'}
                      stroke={entry.brand === selectedBrand ? '#fbbf24' : 'none'}
                      strokeWidth={entry.brand === selectedBrand ? 1.5 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Share Summary Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-1">Brand Breakdown (Dealer Table)</h2>
          <p className="text-xs text-slate-400 mb-3">Model counts and exact share</p>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {brandShares.map((m) => (
              <div
                key={m.brand}
                className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                  m.brand === selectedBrand
                    ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                    : 'bg-slate-950/60 border border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 text-center font-mono text-[10px] text-slate-500">#{m.rank}</span>
                  <span className="font-semibold">{m.brand}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400">{m.modelsDisplayed} units</span>
                  <span className="font-bold text-white">{m.visibilityShare}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Audited Floor Units Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white">Physical Audit Log (Audited SKU Inventory)</h2>
            <p className="text-xs text-slate-400">
              Each unit inspected in this dealership during the {selectedMonth} field audit
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {filteredCategoryDisplays.length} units inspected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Brand</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Model Number</th>
                <th className="py-2.5 px-3">Placement Quality</th>
                <th className="py-2.5 px-3">Branded POS</th>
                <th className="py-2.5 px-3">Promo Tag</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredCategoryDisplays.map((unit) => {
                const isClient = unit.brand === selectedBrand;
                return (
                  <tr key={unit.id} className={isClient ? 'bg-amber-500/5' : 'hover:bg-slate-800/40'}>
                    <td className="py-2 px-3 font-semibold">
                      <span className={isClient ? 'text-amber-400' : 'text-slate-200'}>
                        {unit.brand}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-400">{unit.category}</td>
                    <td className="py-2 px-3 font-mono text-slate-300">{unit.modelNumber}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        unit.displayStatus.includes('Prime')
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : unit.displayStatus.includes('Endcap')
                          ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {unit.displayStatus}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {unit.hasBrandSignage ? (
                        <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> IBTSO Stand
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Standard Shelf</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {unit.hasPromoTag ? (
                        <span className="flex items-center gap-1 text-amber-300 text-[11px]">
                          <Tag className="w-3 h-3" /> Active Promo
                        </span>
                      ) : (
                        <span className="text-slate-600 text-[11px]">-</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-emerald-400 font-mono text-[11px]">Verified</span>
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
