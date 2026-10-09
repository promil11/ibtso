import React from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Calendar, 
  Filter, 
  RefreshCw, 
  Download,
  Calculator,
  Sparkles
} from 'lucide-react';
import type { Brand, Category, OmanRegion } from '../types/intelligence';
import { BRANDS, CATEGORIES, REGIONS, CITIES_BY_REGION, DEALERS } from '../data/mockDealers';

interface Props {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
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
  theme = 'light',
  onToggleTheme,
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
  const isLight = theme === 'light';
  const availableCities = selectedRegion === 'All Regions' 
    ? Array.from(new Set(DEALERS.map(d => d.city))).sort()
    : CITIES_BY_REGION[selectedRegion] || [];

  return (
    <div className={`px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md border-b transition-colors duration-300 ${
      isLight 
        ? 'bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md' 
        : 'bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border-slate-800/90 text-slate-200'
    }`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <div className={`flex items-center gap-1.5 font-bold mr-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          <Filter className="w-3.5 h-3.5 text-amber-500" />
          <span>Filters:</span>
        </div>

        {/* Active Authenticated Brand Badge */}
        <div className={`flex items-center border rounded-lg px-3 py-1 gap-1.5 text-xs shadow-sm font-semibold ${
          isLight 
            ? 'bg-amber-50 border-amber-300 text-amber-900' 
            : 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 border-amber-500/40 text-amber-300'
        }`}>
          <span className={isLight ? 'text-amber-700 font-medium' : 'text-slate-400 font-medium'}>Client:</span>
          <span className="font-extrabold font-mono tracking-tight">{selectedBrand}</span>
        </div>

        {/* Category */}
        <div className={`flex items-center border rounded-lg px-2.5 py-1 gap-1.5 ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/90 border-slate-800 text-slate-200'
        }`}>
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="bg-transparent font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All Categories" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>All Categories (6)</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>{c}</option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div className={`flex items-center border rounded-lg px-2.5 py-1 gap-1.5 ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/90 border-slate-800 text-slate-200'
        }`}>
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <select 
            value={selectedRegion} 
            onChange={(e) => {
              setSelectedRegion(e.target.value as any);
              setSelectedCity('All Cities');
            }}
            className="bg-transparent font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All Regions" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>All Regions (Oman)</option>
            {REGIONS.map(r => (
              <option key={r} value={r} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>{r}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className={`flex items-center border rounded-lg px-2.5 py-1 gap-1.5 ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/90 border-slate-800 text-slate-200'
        }`}>
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All Cities" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>All Cities</option>
            {availableCities.map(c => (
              <option key={c} value={c} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>{c}</option>
            ))}
          </select>
        </div>

        {/* Dealer */}
        <div className={`flex items-center border rounded-lg px-2.5 py-1 gap-1.5 max-w-[220px] ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/90 border-slate-800 text-slate-200'
        }`}>
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select 
            value={selectedDealerId} 
            onChange={(e) => setSelectedDealerId(e.target.value)}
            className="bg-transparent font-semibold focus:outline-none truncate cursor-pointer w-full"
          >
            <option value="All Dealers" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>All 230 IR Dealers</option>
            {DEALERS.map(d => (
              <option key={d.id} value={d.id} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div className={`flex items-center border rounded-lg px-2.5 py-1 gap-1.5 ${
          isLight ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-950/90 border-slate-800 text-amber-300'
        }`}>
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent font-bold focus:outline-none cursor-pointer"
          >
            <option value="2026-10" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>Oct 2026</option>
            <option value="2026-09" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>Sep 2026</option>
            <option value="2026-08" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}>Aug 2026</option>
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
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border shadow-sm ${
              isLight 
                ? 'bg-amber-500/10 text-amber-700 border-amber-300 hover:bg-amber-500/20' 
                : 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span className="text-sm">{isLight ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
          </button>
        )}
        {onOpenFormula && (
          <button
            onClick={onOpenFormula}
            className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer shadow-sm ${
              isLight 
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' 
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-500" />
            <span>Formula Math</span>
          </button>
        )}
        {onOpenRoadmap && (
          <button
            onClick={onOpenRoadmap}
            className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer shadow-sm ${
              isLight 
                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200' 
                : 'bg-gradient-to-r from-indigo-950/80 to-slate-900 hover:bg-indigo-900/60 text-indigo-300 border-indigo-500/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Phase 3 Roadmap</span>
          </button>
        )}
        {onExportClick && (
          <button 
            onClick={onExportClick}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Intel</span>
          </button>
        )}
      </div>
    </div>
  );
};
