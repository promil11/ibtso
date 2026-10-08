import React from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Calendar, 
  Filter, 
  RefreshCw, 
  Download,
  Search
} from 'lucide-react';
import type { Brand, Category, OmanRegion, Dealer } from '../types/intelligence';
import { BRANDS, CATEGORIES, REGIONS, CITIES_BY_REGION, DEALERS } from '../data/mockDealers';

interface Props {
  selectedBrand: Brand;
  setSelectedBrand: (b: Brand) => void;
  selectedCategory: Category | 'All Categories';
  setSelectedCategory: (c: Category | 'All Categories') => void;
  selectedRegion: OmanRegion | 'All Regions';
  setSelectedRegion: (r: OmanRegion | 'All Regions') => void;
  selectedCity: string | 'All Cities';
  setSelectedCity: (city: string | 'All Cities') => void;
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;
  selectedDealerId: string | 'All Dealers';
  setSelectedDealerId: (id: string | 'All Dealers') => void;
  onExportClick?: () => void;
  onOpenRoadmap?: () => void;
  onOpenFormula?: () => void;
}

export const TopFilterBar: React.FC<Props> = ({
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
  selectedMonth,
  setSelectedMonth,
  selectedDealerId,
  setSelectedDealerId,
  onExportClick,
  onOpenRoadmap,
  onOpenFormula,
}) => {
  const availableCities = selectedRegion === 'All Regions' 
    ? Array.from(new Set(DEALERS.map(d => d.city))).sort()
    : CITIES_BY_REGION[selectedRegion] || [];

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-slate-400 font-medium mr-1">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>Filters:</span>
        </div>

        {/* Active Authenticated Brand Badge */}
        <div className="flex items-center bg-amber-500/10 border border-amber-500/30 rounded-md px-2.5 py-1 gap-1.5 text-xs">
          <span className="text-slate-400 font-medium">Client:</span>
          <span className="text-amber-300 font-bold font-mono">{selectedBrand}</span>
        </div>

        {/* Category */}
        <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 gap-1.5">
          <Layers className="w-3 h-3 text-slate-400" />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="bg-transparent text-white focus:outline-none cursor-pointer"
          >
            <option value="All Categories" className="bg-slate-900 text-slate-200">All Categories (6)</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c} className="bg-slate-900 text-slate-200">{c}</option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 gap-1.5">
          <MapPin className="w-3 h-3 text-slate-400" />
          <select 
            value={selectedRegion} 
            onChange={(e) => {
              setSelectedRegion(e.target.value as any);
              setSelectedCity('All Cities');
            }}
            className="bg-transparent text-white focus:outline-none cursor-pointer"
          >
            <option value="All Regions" className="bg-slate-900 text-slate-200">All Regions (Oman)</option>
            {REGIONS.map(r => (
              <option key={r} value={r} className="bg-slate-900 text-slate-200">{r}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 gap-1.5">
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent text-white focus:outline-none cursor-pointer"
          >
            <option value="All Cities" className="bg-slate-900 text-slate-200">All Cities</option>
            {availableCities.map(c => (
              <option key={c} value={c} className="bg-slate-900 text-slate-200">{c}</option>
            ))}
          </select>
        </div>

        {/* Dealer */}
        <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 gap-1.5 max-w-[220px]">
          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
          <select 
            value={selectedDealerId} 
            onChange={(e) => setSelectedDealerId(e.target.value)}
            className="bg-transparent text-white focus:outline-none truncate cursor-pointer w-full"
          >
            <option value="All Dealers" className="bg-slate-900 text-slate-200">All 230 IR Dealers</option>
            {DEALERS.map(d => (
              <option key={d.id} value={d.id} className="bg-slate-900 text-slate-200">{d.name}</option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 gap-1.5">
          <Calendar className="w-3 h-3 text-amber-400" />
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent text-amber-300 font-medium focus:outline-none cursor-pointer"
          >
            <option value="2026-10" className="bg-slate-900 text-slate-200">Oct 2026</option>
            <option value="2026-09" className="bg-slate-900 text-slate-200">Sep 2026</option>
            <option value="2026-08" className="bg-slate-900 text-slate-200">Aug 2026</option>
          </select>
        </div>

        {/* Reset filter button */}
        <button 
          onClick={() => {
            setSelectedCategory('All Categories');
            setSelectedRegion('All Regions');
            setSelectedCity('All Cities');
            setSelectedDealerId('All Dealers');
          }}
          title="Reset non-brand filters"
          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {onOpenFormula && (
          <button
            onClick={onOpenFormula}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-md font-medium transition-all"
          >
            <span>Formula Math</span>
          </button>
        )}
        {onOpenRoadmap && (
          <button
            onClick={onOpenRoadmap}
            className="flex items-center gap-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 px-2.5 py-1.5 rounded-md font-medium transition-all"
          >
            <span>Phase 3 Roadmap</span>
          </button>
        )}
        {onExportClick && (
          <button 
            onClick={onExportClick}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-md transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Intel</span>
          </button>
        )}
      </div>
    </div>
  );
};
