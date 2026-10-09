import React, { useState, useMemo } from 'react';
import { 
  Store, 
  MapPin, 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronRight, 
  Phone, 
  Calendar, 
  UserCheck, 
  Eye, 
  TrendingUp,
  Award
} from 'lucide-react';
import type { Brand, Category, OmanRegion, Dealer, ModelDisplay } from '../types/intelligence';
import { calculateBrandShares, filterDisplays } from '../utils/analytics';
import { REGIONS, CITIES_BY_REGION } from '../data/mockDealers';

interface Props {
  dealers: Dealer[];
  displays: ModelDisplay[];
  selectedBrand: Brand;
  selectedMonth: string;
  onSelectDealer: (dealerId: string) => void;
}

export const DealerNetwork: React.FC<Props> = ({
  dealers,
  displays,
  selectedBrand,
  selectedMonth,
  onSelectDealer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [presenceFilter, setPresenceFilter] = useState<'all' | 'present' | 'missing'>('all');

  // Filter displays for selected month
  const monthDisplays = useMemo(() => {
    return displays.filter((d) => d.month === selectedMonth);
  }, [displays, selectedMonth]);

  // Map dealer stats
  const dealerStats = useMemo(() => {
    const statsMap = new Map<string, { totalDisplays: number; clientDisplays: number; clientShare: number }>();

    dealers.forEach((dealer) => {
      const dDisplays = monthDisplays.filter((d) => d.dealerId === dealer.id);
      const clientDisplays = dDisplays.filter((d) => d.brand === selectedBrand).length;
      const total = dDisplays.length;
      const share = total > 0 ? Number(((clientDisplays / total) * 100).toFixed(1)) : 0;
      statsMap.set(dealer.id, { totalDisplays: total, clientDisplays, clientShare: share });
    });

    return statsMap;
  }, [dealers, monthDisplays, selectedBrand]);

  const filteredDealers = useMemo(() => {
    return dealers.filter((d) => {
      const matchesSearch = 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.arabicName.includes(searchTerm) ||
        d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion = regionFilter === 'All' || d.region === regionFilter;
      const matchesTier = tierFilter === 'All' || d.tier.includes(tierFilter);

      const stats = dealerStats.get(d.id);
      const isPresent = (stats?.clientDisplays || 0) > 0;
      const matchesPresence = 
        presenceFilter === 'all' || 
        (presenceFilter === 'present' && isPresent) ||
        (presenceFilter === 'missing' && !isPresent);

      return matchesSearch && matchesRegion && matchesTier && matchesPresence;
    });
  }, [dealers, searchTerm, regionFilter, tierFilter, presenceFilter, dealerStats]);

  // Aggregates
  const totalInScope = dealers.length;
  const presentCount = dealers.filter(d => (dealerStats.get(d.id)?.clientDisplays || 0) > 0).length;
  const missingCount = totalInScope - presentCount;

  return (
    <div className="space-y-6">
      {/* Network Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold shadow-sm">
                Oman Independent Retailers
              </span>
              <span className="text-xs text-slate-400">Total Census: 230 Certified Dealers</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span>Independent Dealer Directory</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Comprehensive registry of all 230 non-organized electronics & appliance dealerships across Oman governorates. IBTSO audits physical model presence across each location on a monthly recurring schedule.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-slate-950/80 backdrop-blur p-3.5 rounded-xl border border-slate-800/80 text-center shadow-inner">
            <div className="px-2">
              <span className="text-[11px] text-slate-400 block font-medium">Total IR</span>
              <span className="text-xl font-black text-white font-mono">230</span>
            </div>
            <div className="px-2 border-x border-slate-800/80">
              <span className="text-[11px] text-emerald-400 block font-medium">{selectedBrand} Active</span>
              <span className="text-xl font-black text-emerald-400 font-mono">{presentCount}</span>
            </div>
            <div className="px-2">
              <span className="text-[11px] text-rose-400 block font-medium">Zero Display</span>
              <span className="text-xl font-black text-rose-400 font-mono">{missingCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dealer by name, Arabic name, code, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
        </div>

        {/* Region */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Governorate:</span>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-slate-950/90 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 font-medium transition-all"
          >
            <option value="All">All Governorates ({dealers.length})</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Tier */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Tier:</span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-slate-950/90 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 font-medium transition-all"
          >
            <option value="All">All Tiers</option>
            <option value="Tier A">Tier A (High Volume)</option>
            <option value="Tier B">Tier B (Mid Volume)</option>
            <option value="Tier C">Tier C (Local)</option>
          </select>
        </div>

        {/* Presence */}
        <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-lg border border-slate-800/80">
          <button
            onClick={() => setPresenceFilter('all')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              presenceFilter === 'all' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({dealers.length})
          </button>
          <button
            onClick={() => setPresenceFilter('present')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              presenceFilter === 'present' 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold shadow-md shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Present ({presentCount})
          </button>
          <button
            onClick={() => setPresenceFilter('missing')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              presenceFilter === 'missing' 
                ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold shadow-md shadow-rose-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            White Space ({missingCount})
          </button>
        </div>
      </div>

      {/* Dealer Cards Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5">
        {filteredDealers.slice(0, 48).map((dealer) => {
          const stats = dealerStats.get(dealer.id) || { totalDisplays: 0, clientDisplays: 0, clientShare: 0 };
          const isPresent = stats.clientDisplays > 0;

          return (
            <div
              key={dealer.id}
              onClick={() => onSelectDealer(dealer.id)}
              className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl p-5 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between transform hover:-translate-y-0.5"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 font-bold shadow-sm">
                      {dealer.code}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mt-1.5 leading-snug">
                      {dealer.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-arabic text-right mt-0.5" dir="rtl">
                      {dealer.arabicName}
                    </p>
                  </div>

                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 shadow-sm ${
                    dealer.tier.includes('Tier A') 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : dealer.tier.includes('Tier B')
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-800/80 text-slate-400 border border-slate-700/80'
                  }`}>
                    {dealer.tier.split(' ')[0]} {dealer.tier.split(' ')[1]}
                  </span>
                </div>

                {/* Location and Info */}
                <div className="space-y-1.5 text-xs text-slate-400 my-3.5 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{dealer.city}, {dealer.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{dealer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Display Share Footer */}
              <div className="pt-3 border-t border-slate-800/80 mt-2">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    {selectedBrand} Floor Share:
                  </span>
                  <span className={`font-black font-mono text-base ${isPresent ? 'text-amber-400' : 'text-slate-500'}`}>
                    {stats.clientShare}%
                  </span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/60 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPresent 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 shadow-sm shadow-amber-500/50' 
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${Math.min(100, stats.clientShare * 2)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5">
                  <span className="font-mono">{stats.clientDisplays} of {stats.totalDisplays} total displays</span>
                  <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
                    View Store <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDealers.length > 48 && (
        <div className="text-center py-4 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-400 shadow-md">
          Showing 48 of {filteredDealers.length} matching dealers across Oman. Use filters above to drill down to specific governorates or cities.
        </div>
      )}
    </div>
  );
};
