import React from 'react';
import {
  LayoutDashboard,
  Store,
  Layers,
  BarChart3,
  Globe2,
  MapPin,
  TrendingUp,
  FileSpreadsheet,
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import type { Brand, Category, OmanRegion } from '../types/intelligence';
import { BRANDS, CATEGORIES, REGIONS, CITIES_BY_REGION, DEALERS } from '../data/mockDealers';

export type ActiveTab =
  | 'executive'
  | 'network'
  | 'dealer-detail'
  | 'category'
  | 'competitor'
  | 'benchmarks'
  | 'trends'
  | 'reports';

interface Props {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
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
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenRoadmap?: () => void;
  onOpenFormula?: () => void;
}

export const Navigation: React.FC<Props> = ({
  theme = 'light',
  onToggleTheme,
  activeTab,
  setActiveTab,
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
  isLoggedIn,
  onLogout,
  onOpenRoadmap,
  onOpenFormula,
}) => {
  const isLight = theme === 'light';
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'executive', label: 'Executive Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'network', label: 'Dealer Network (230 IR)', icon: <Store className="w-4 h-4" />, badge: '230' },
    { id: 'dealer-detail', label: 'Dealer Drilldown', icon: <Building2 className="w-4 h-4" /> },
    { id: 'category', label: 'Category Visibility', icon: <Layers className="w-4 h-4" /> },
    { id: 'competitor', label: 'Brand vs Competitor', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'benchmarks', label: 'Multi-Level Benchmark', icon: <Globe2 className="w-4 h-4" />, badge: '4 Levels' },
    { id: 'trends', label: 'Monthly MoM Trends', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'reports', label: 'Exports & Reports', icon: <FileSpreadsheet className="w-4 h-4" /> },
  ];

  const availableCities = selectedRegion === 'All Regions'
    ? Array.from(new Set(DEALERS.map(d => d.city))).sort()
    : CITIES_BY_REGION[selectedRegion] || [];

  return (
    <div className={`flex flex-col h-full border-r select-none shadow-xl transition-colors duration-300 ${isLight
        ? 'bg-white border-slate-200 text-slate-800'
        : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800 text-slate-200'
      }`}>
      {/* Top Brand Header */}
      <div className={`p-4 border-b flex items-center justify-between transition-colors ${isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-900/60 border-slate-800/90'
        }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-500/20 ring-1 ring-white/20">
            IB
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-extrabold text-base tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>IBTSO</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                SaaS MVP
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Retail Intelligence • Oman IR</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Sign Out of Session"
          className={`p-2 rounded-xl border transition-all shadow-sm cursor-pointer ${isLight
              ? 'bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border-slate-200'
              : 'bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border-slate-700/80'
            }`}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Authenticated Client Account Badge */}
      <div className={`p-3 border-b ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-gradient-to-r from-slate-950/90 via-indigo-950/30 to-slate-950 border-slate-800/80'
        }`}>
        <div className="flex items-center justify-between text-xs mb-1.5 px-1">
          <span className={`font-bold flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Authenticated Account
          </span>
          <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
          </span>
        </div>
        <div className={`border rounded-xl p-2.5 flex items-center justify-between shadow-sm ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}>
          <div>
            <div className={`text-sm font-extrabold tracking-tight flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <span>{selectedBrand}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-mono px-1.5 py-0.2 rounded-md font-bold">Client</span>
            </div>
            <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Subscribed Enterprise Intelligence</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className={`px-2 pb-1.5 text-[11px] font-extrabold tracking-wider uppercase flex items-center justify-between ${isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
          <span>Intelligence Modules</span>
          <Sparkles className="w-3 h-3 text-amber-500" />
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive
                  ? isLight
                    ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-indigo-500/10 text-amber-900 border-l-4 border-amber-500 font-extrabold shadow-sm'
                    : 'bg-gradient-to-r from-amber-500/25 via-amber-500/10 to-indigo-500/20 text-amber-300 border-l-4 border-amber-400 shadow-md shadow-amber-500/5'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-amber-500 font-bold' : isLight ? 'text-slate-500' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive
                    ? isLight ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-400/30 text-amber-200 border border-amber-400/40'
                    : isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800/90 text-slate-400'
                  }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Global Filter Stack */}
        <div className={`pt-4 mt-4 border-t px-1 space-y-3 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
              <SlidersHorizontal className="w-3 h-3 text-amber-500" /> Filter Stack
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedRegion('All Regions');
                setSelectedCity('All Cities');
                setSelectedDealerId('All Dealers');
              }}
              className="text-[11px] text-amber-600 hover:text-amber-700 hover:underline font-bold cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Month Selector */}
          <div>
            <label className={`text-[11px] flex items-center gap-1 mb-1 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <Calendar className="w-3 h-3 text-amber-500" /> Audit Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={`w-full text-xs border rounded-lg px-2.5 py-1.5 font-bold transition-colors cursor-pointer ${isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
            >
              <option value="2026-10">October 2026 (Latest Audit)</option>
              <option value="2026-09">September 2026</option>
              <option value="2026-08">August 2026</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className={`text-[11px] flex items-center gap-1 mb-1 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <Layers className="w-3 h-3" /> Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className={`w-full text-xs border rounded-lg px-2.5 py-1.5 font-medium transition-colors cursor-pointer ${isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
            >
              <option value="All Categories">All 6 Focus Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className={`text-[11px] flex items-center gap-1 mb-1 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <MapPin className="w-3 h-3" /> Oman Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value as any);
                setSelectedCity('All Cities');
              }}
              className={`w-full text-xs border rounded-lg px-2.5 py-1.5 font-medium transition-colors cursor-pointer ${isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
            >
              <option value="All Regions">All 10 Governorates</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className={`text-[11px] flex items-center gap-1 mb-1 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <Globe2 className="w-3 h-3" /> City / Wilayat
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`w-full text-xs border rounded-lg px-2.5 py-1.5 font-medium transition-colors cursor-pointer ${isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
            >
              <option value="All Cities">All Cities ({availableCities.length})</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Footer & Company Credentials */}
      <div className={`p-3 border-t space-y-2 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-950/90'}`}>
        {onOpenRoadmap && (
          <button
            onClick={onOpenRoadmap}
            className={`w-full border p-2.5 rounded-xl text-left transition-all group cursor-pointer shadow-sm ${isLight
                ? 'bg-indigo-50/80 border-indigo-200 hover:border-indigo-400'
                : 'bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border-indigo-500/40 hover:border-indigo-400'
              }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Phase 3 Roadmap
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>ERP Sell-Out & Stock Vision</p>
          </button>
        )}

        <div className={`rounded-xl p-2.5 border text-xs shadow-inner ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}>
          <div className="flex items-center justify-between font-bold">
            <span className={`flex items-center gap-1 ${isLight ? 'text-slate-800' : 'text-amber-300'}`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Oman IR Channel
            </span>
            <span className="text-amber-600 font-mono text-[11px] font-bold">70% Sell-Out</span>
          </div>
          <p className={`text-[11px] mt-1 leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            230 Independent Retailers monitored monthly across all governorates.
          </p>
          <a
            href="https://ibtso.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-[11px] text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-bold"
          >
            Visit ibtso.com <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
