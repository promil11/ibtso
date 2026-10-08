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
  LogOut
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
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200 select-none">
      {/* Top Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/10 ring-1 ring-white/20">
            <span className="font-black text-white text-lg tracking-wider">IB</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white tracking-tight">IBTSO</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                SaaS MVP
              </span>
            </div>
            <p className="text-xs text-slate-400">Retail Intelligence • Oman IR</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Sign Out of Single-User Session"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700/80 hover:border-rose-500/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Authenticated Client Account Badge */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 px-1">
          <span className="font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authenticated Account
          </span>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live Session
          </span>
        </div>
        <div className="bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-2 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 justify-between">
              <span>{selectedBrand}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.5 rounded">Client</span>
            </div>
            <p className="text-[10px] text-slate-400">Subscribed Enterprise View</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="px-2 pb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Intelligence Modules
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                ? 'bg-gradient-to-r from-amber-500/20 to-indigo-500/10 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold ${isActive ? 'bg-amber-400/30 text-amber-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Global Filter Bar Controls inside sidebar for quick access */}
        <div className="pt-4 mt-4 border-t border-slate-800/80 px-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Global Filter Stack
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedRegion('All Regions');
                setSelectedCity('All Cities');
                setSelectedDealerId('All Dealers');
              }}
              className="text-[11px] text-amber-400 hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Month Selector */}
          <div>
            <label className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-slate-400" /> Audit Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="2026-10">October 2026 (Latest Audit)</option>
              <option value="2026-09">September 2026</option>
              <option value="2026-08">August 2026</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
              <Layers className="w-3 h-3 text-slate-400" /> Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All Categories">All 6 Focus Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3 text-slate-400" /> Oman Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value as any);
                setSelectedCity('All Cities');
              }}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All Regions">All 10 Governorates</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
              <Globe2 className="w-3 h-3 text-slate-400" /> City / Wilayat
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
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
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 space-y-2">
        {onOpenRoadmap && (
          <button
            onClick={onOpenRoadmap}
            className="w-full bg-gradient-to-r from-indigo-900/60 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 p-2 rounded-lg text-left transition-all group"
          >
            <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Phase 3 Roadmap
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">ERP Sell-Out & Stock Vision</p>
          </button>
        )}

        <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800/80 text-xs">
          <div className="flex items-center justify-between text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Oman IR Channel
            </span>
            <span className="text-amber-400 font-mono text-[11px]">70% Sell-Out</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            230 Independent Retailers monitored monthly across all governorates.
          </p>
          <a
            href="https://ibtso.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Visit ibtso.com <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
