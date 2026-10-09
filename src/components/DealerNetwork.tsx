import React, { useState, useMemo } from 'react';
import { 
  Store, 
  MapPin, 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft,
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
  theme?: 'light' | 'dark';
  dealers: Dealer[];
  displays: ModelDisplay[];
  selectedBrand: Brand;
  selectedMonth: string;
  onSelectDealer: (dealerId: string) => void;
}

export const DealerNetwork: React.FC<Props> = ({
  theme = 'light',
  dealers,
  displays,
  selectedBrand,
  selectedMonth,
  onSelectDealer,
}) => {
  const isLight = theme === 'light';
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [presenceFilter, setPresenceFilter] = useState<'all' | 'present' | 'missing'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const handleSearchChange = (val: string) => { setSearchTerm(val); setCurrentPage(1); };
  const handleRegionChange = (val: string) => { setRegionFilter(val); setCurrentPage(1); };
  const handleTierChange = (val: string) => { setTierFilter(val); setCurrentPage(1); };
  const handlePresenceChange = (val: 'all' | 'present' | 'missing') => { setPresenceFilter(val); setCurrentPage(1); };

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

  // Pagination calculation
  const totalItems = filteredDealers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedDealers = filteredDealers.slice(startIndex, endIndex);

  const getPageNumbers = (current: number, total: number) => {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (current < total - 2) pages.push('...');
      pages.push(total);
    }
    return pages;
  };

  // Aggregates
  const totalInScope = dealers.length;
  const presentCount = dealers.filter(d => (dealerStats.get(d.id)?.clientDisplays || 0) > 0).length;
  const missingCount = totalInScope - presentCount;

  return (
    <div className="space-y-6">
      {/* Network Header */}
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
                isLight 
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                  : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
              }`}>
                Oman Independent Retailers
              </span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Total Census: 230 Certified Dealers</span>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <div className={`p-2 rounded-xl border shadow-md ${
                isLight ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                <Store className="w-5 h-5" />
              </div>
              <span>Independent Dealer Directory</span>
            </h1>
            <p className={`text-xs mt-1.5 max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Comprehensive registry of all 230 non-organized electronics & appliance dealerships across Oman governorates. IBTSO audits physical model presence across each location on a monthly recurring schedule.
            </p>
          </div>

          <div className={`grid grid-cols-3 gap-3 p-3.5 rounded-xl border text-center shadow-inner ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'
          }`}>
            <div className="px-2">
              <span className={`text-[11px] block font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Total IR</span>
              <span className={`text-xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>230</span>
            </div>
            <div className={`px-2 border-x ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-medium">{selectedBrand} Active</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{presentCount}</span>
            </div>
            <div className="px-2">
              <span className="text-[11px] text-rose-600 dark:text-rose-400 block font-medium">Zero Display</span>
              <span className="text-xl font-black text-rose-600 dark:text-rose-400 font-mono">{missingCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`border rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md ${
        isLight ? 'bg-white border-slate-200' : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80'
      }`}>
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search dealer by name, Arabic name, code, or city..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={`w-full border rounded-lg pl-9 pr-3 py-2 text-xs transition-all ${
              isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-500' 
                : 'bg-slate-950/90 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-amber-500'
            }`}
          />
        </div>

        {/* Region */}
        <div className="flex items-center gap-1.5">
          <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Governorate:</span>
          <select
            value={regionFilter}
            onChange={(e) => handleRegionChange(e.target.value)}
            className={`border rounded-lg px-3 py-1.5 font-medium transition-all ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/90 border-slate-800 text-slate-200'
            }`}
          >
            <option value="All">All Governorates ({dealers.length})</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Tier */}
        <div className="flex items-center gap-1.5">
          <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Tier:</span>
          <select
            value={tierFilter}
            onChange={(e) => handleTierChange(e.target.value)}
            className={`border rounded-lg px-3 py-1.5 font-medium transition-all ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/90 border-slate-800 text-slate-200'
            }`}
          >
            <option value="All">All Tiers</option>
            <option value="Tier A">Tier A (High Volume)</option>
            <option value="Tier B">Tier B (Mid Volume)</option>
            <option value="Tier C">Tier C (Local)</option>
          </select>
        </div>

        {/* Presence */}
        <div className={`flex items-center gap-1 p-1 rounded-lg border ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/90 border-slate-800/80'
        }`}>
          <button
            onClick={() => handlePresenceChange('all')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              presenceFilter === 'all' 
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md' 
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({dealers.length})
          </button>
          <button
            onClick={() => handlePresenceChange('present')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              presenceFilter === 'present' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' 
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Present ({presentCount})
          </button>
          <button
            onClick={() => handlePresenceChange('missing')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              presenceFilter === 'missing' 
                ? 'bg-rose-500 text-white font-bold shadow-md' 
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            White Space ({missingCount})
          </button>
        </div>
      </div>

      {/* Dealer Cards Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5">
        {paginatedDealers.map((dealer) => {
          const stats = dealerStats.get(dealer.id) || { totalDisplays: 0, clientDisplays: 0, clientShare: 0 };
          const isPresent = stats.clientDisplays > 0;

          return (
            <div
              key={dealer.id}
              onClick={() => onSelectDealer(dealer.id)}
              className={`border rounded-2xl p-5 transition-all duration-300 cursor-pointer group flex flex-col justify-between transform hover:-translate-y-0.5 ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 text-slate-900 shadow-sm'
                  : 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-slate-800/80 hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-500/10 text-white shadow-md'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold shadow-sm ${
                      isLight
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {dealer.code}
                    </span>
                    <h3 className={`text-sm font-bold transition-colors mt-1.5 leading-snug ${
                      isLight ? 'text-slate-900 group-hover:text-amber-600' : 'text-white group-hover:text-amber-300'
                    }`}>
                      {dealer.name}
                    </h3>
                    <p className={`text-xs font-arabic text-right mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} dir="rtl">
                      {dealer.arabicName}
                    </p>
                  </div>

                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 shadow-sm ${
                    dealer.tier.includes('Tier A') 
                      ? isLight ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : dealer.tier.includes('Tier B')
                      ? isLight ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : isLight ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-slate-800/80 text-slate-400 border border-slate-700/80'
                  }`}>
                    {dealer.tier.split(' ')[0]} {dealer.tier.split(' ')[1]}
                  </span>
                </div>

                {/* Location and Info */}
                <div className={`space-y-1.5 text-xs my-3.5 p-2.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-slate-950/50 border-slate-800/50 text-slate-400'
                }`}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{dealer.city}, {dealer.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{dealer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Display Share Footer */}
              <div className={`pt-3 border-t mt-2 ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {selectedBrand} Floor Share:
                  </span>
                  <span className={`font-black font-mono text-base ${
                    isPresent ? (isLight ? 'text-amber-600' : 'text-amber-400') : 'text-slate-400'
                  }`}>
                    {stats.clientShare}%
                  </span>
                </div>

                <div className={`w-full rounded-full h-2 overflow-hidden border p-0.5 ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800/60'
                }`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPresent 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 shadow-sm' 
                        : isLight ? 'bg-slate-300' : 'bg-slate-700'
                    }`}
                    style={{ width: `${Math.min(100, stats.clientShare * 2)}%` }}
                  />
                </div>

                <div className={`flex items-center justify-between text-[11px] mt-2.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span className="font-mono">{stats.clientDisplays} of {stats.totalDisplays} total displays</span>
                  <span className={`group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold ${
                    isLight ? 'text-amber-600' : 'text-amber-400'
                  }`}>
                    View Store <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-2xl shadow-lg transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 text-slate-300'
        }`}>
          <div className="text-xs">
            Showing <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{totalItems > 0 ? startIndex + 1 : 0}</span> to{' '}
            <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{endIndex}</span> of{' '}
            <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{totalItems}</span> matching dealers
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 shadow-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers(currentPage, totalPages).map((page, idx) => {
                if (typeof page === 'string') {
                  return (
                    <span key={`ellipsis-${idx}`} className={`px-2 text-xs font-mono ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-400/40'
                        : isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 shadow-sm'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
