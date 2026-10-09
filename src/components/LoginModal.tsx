import React, { useState } from 'react';
import {
  ArrowRight,
  Lock,
  Mail,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Zap,
  Sparkles,
  CheckCircle2,
  Building2,
  Store,
  Layers,
  BarChart3,
  Globe2,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react';
import type { Brand } from '../types/intelligence';

export interface BrandAccount {
  email: string;
  password: string;
  brand: Brand;
  companyName: string;
  executiveTitle: string;
  badgeColor: string;
  accentBg: string;
  initials: string;
}

export const BRAND_EXECUTIVE_ACCOUNTS: BrandAccount[] = [
  {
    email: 'lg@ibtso.com',
    password: 'lg2026',
    brand: 'LG',
    companyName: 'LG Electronics Gulf',
    executiveTitle: 'Commercial Retail Director',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40 ring-rose-500/20',
    accentBg: 'from-rose-500/15 via-slate-900 to-slate-950',
    initials: 'LG'
  },
  {
    email: 'samsung@ibtso.com',
    password: 'samsung2026',
    brand: 'Samsung',
    companyName: 'Samsung Electronics MENA',
    executiveTitle: 'Retail Intelligence Lead',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40 ring-blue-500/20',
    accentBg: 'from-blue-500/15 via-slate-900 to-slate-950',
    initials: 'SS'
  },
  {
    email: 'midea@ibtso.com',
    password: 'midea2026',
    brand: 'Midea',
    companyName: 'Midea Middle East Trading',
    executiveTitle: 'Appliance Category Head',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 ring-cyan-500/20',
    accentBg: 'from-cyan-500/15 via-slate-900 to-slate-950',
    initials: 'MD'
  },
  {
    email: 'gree@ibtso.com',
    password: 'gree2026',
    brand: 'Gree',
    companyName: 'Gree Air Conditioning Oman',
    executiveTitle: 'Regional Sales Director',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-emerald-500/20',
    accentBg: 'from-emerald-500/15 via-slate-900 to-slate-950',
    initials: 'GR'
  },
  {
    email: 'toshiba@ibtso.com',
    password: 'toshiba2026',
    brand: 'Toshiba',
    companyName: 'Toshiba Consumer Products',
    executiveTitle: 'Regional Retail Lead',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-amber-500/20',
    accentBg: 'from-amber-500/15 via-slate-900 to-slate-950',
    initials: 'TS'
  },
  {
    email: 'philips@ibtso.com',
    password: 'philips2026',
    brand: 'Philips',
    companyName: 'Philips Domestic Appliances',
    executiveTitle: 'Commercial Lead',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40 ring-pink-500/20',
    accentBg: 'from-pink-500/15 via-slate-900 to-slate-950',
    initials: 'PH'
  },
  {
    email: 'haier@ibtso.com',
    password: 'haier2026',
    brand: 'Haier',
    companyName: 'Haier Middle East',
    executiveTitle: 'Market Intelligence Director',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40 ring-teal-500/20',
    accentBg: 'from-teal-500/15 via-slate-900 to-slate-950',
    initials: 'HR'
  },
  {
    email: 'hitachi@ibtso.com',
    password: 'hitachi2026',
    brand: 'Hitachi',
    companyName: 'Hitachi Home Appliances',
    executiveTitle: 'Oman Brand Lead',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40 ring-orange-500/20',
    accentBg: 'from-orange-500/15 via-slate-900 to-slate-950',
    initials: 'HT'
  },
  {
    email: 'panasonic@ibtso.com',
    password: 'panasonic2026',
    brand: 'Panasonic',
    companyName: 'Panasonic Marketing ME',
    executiveTitle: 'Channel Sales Manager',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 ring-indigo-500/20',
    accentBg: 'from-indigo-500/15 via-slate-900 to-slate-950',
    initials: 'PN'
  },
];

interface Props {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onLogin: (authenticatedBrand: Brand) => void;
}

export const LoginModal: React.FC<Props> = ({ theme = 'light', onToggleTheme, onLogin }) => {
  const isLight = theme === 'light';
  const [email, setEmail] = useState(BRAND_EXECUTIVE_ACCOUNTS[0].email);
  const [password, setPassword] = useState(BRAND_EXECUTIVE_ACCOUNTS[0].password);
  const [selectedExecutive, setSelectedExecutive] = useState<BrandAccount>(BRAND_EXECUTIVE_ACCOUNTS[0]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    if (!inputEmail || !inputPassword) {
      setErrorMessage('Please enter both work email and access password.');
      return;
    }

    // Authenticate against executive accounts directory
    const matchedAccount = BRAND_EXECUTIVE_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === inputEmail && acc.password === inputPassword
    );

    if (matchedAccount) {
      setErrorMessage(null);
      onLogin(matchedAccount.brand);
    } else {
      setErrorMessage('Invalid credentials. Select a 1-click executive account or check your login details.');
    }
  };

  const handleOneClickExecutiveLogin = (acc: BrandAccount) => {
    setSelectedExecutive(acc);
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage(null);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans select-none transition-colors ${
      isLight ? 'bg-slate-100/90 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Radiant Background Mesh Orbs */}
      <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none animate-pulse ${
        isLight ? 'bg-amber-400/20' : 'bg-amber-500/10'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
        isLight ? 'bg-indigo-300/30' : 'bg-indigo-600/15'
      }`} />

      {/* Theme Toggle Button in Header Corner */}
      {onToggleTheme && (
        <div className="absolute top-4 right-6 z-20">
          <button
            onClick={onToggleTheme}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${
              isLight
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            <span>{isLight ? '☀️ Light Theme' : '🌙 Dark Theme'}</span>
          </button>
        </div>
      )}

      {/* Main Glassmorphic Showcase Container */}
      <div className={`max-w-5xl w-full border rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 ${
        isLight ? 'bg-white/90 border-slate-200 text-slate-900 shadow-slate-300/50' : 'bg-slate-900/90 border-slate-800/90 text-white'
      }`}>

        {/* LEFT COLUMN (7 Cols): IBTSO Intelligence Showcase & 1-Click Executive Grid */}
        <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r ${
          isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-slate-800/80'
        }`}>
          <div className="space-y-6">
            {/* Logo & Headline */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-500/20 ring-1 ring-white/20">
                  IB
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-extrabold text-xl tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>IBTSO</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      Retail Intel SaaS
                    </span>
                  </div>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Oman Independent Appliance Retailer Channel</p>
                </div>
              </div>

              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Physical Visibility & Market Share Intelligence
              </h2>
              <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Direct monthly floor audit intelligence across Oman's 230 Independent Retailers driving ~70% of national sell-out volume.
              </p>
            </div>

            {/* Quick Stat Pill Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className={`p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800/80'
              }`}>
                <span className={`text-[10px] font-semibold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Monitored IR Network</span>
                <span className={`text-base font-black font-mono ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>230 Dealers</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800/80'
              }`}>
                <span className={`text-[10px] font-semibold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Oman IR Market Share</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">70% Sell-Out</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800/80'
              }`}>
                <span className={`text-[10px] font-semibold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Focus Categories</span>
                <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">6 Core Lines</span>
              </div>
            </div>

            {/* 1-CLICK EXECUTIVE ACCOUNT SELECTOR */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider ${
                  isLight ? 'text-amber-700' : 'text-amber-400'
                }`}>
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                  1-Click Corporate Executive Sign-In
                </span>
                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Click to fill credentials</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-400">
                {BRAND_EXECUTIVE_ACCOUNTS.map((acc) => {
                  const isSelected = selectedExecutive.email === acc.email;
                  return (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => handleOneClickExecutiveLogin(acc)}
                      className={`relative p-2.5 rounded-xl text-left transition-all duration-200 group flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-md bg-amber-50/80 text-slate-900'
                          : isLight
                            ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-900'
                            : `bg-gradient-to-r ${acc.accentBg} hover:bg-slate-800/90 border-slate-800 text-white`
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {/* Brand Avatar Badge */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 border ${
                          isLight ? 'bg-amber-100 text-amber-900 border-amber-200' : acc.badgeColor
                        } shadow-sm group-hover:scale-105 transition-transform`}>
                          {acc.initials}
                        </div>
                        <div className="truncate">
                          <div className={`text-xs font-bold transition-colors flex items-center gap-1 ${
                            isLight ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-300'
                          }`}>
                            <span className="truncate">{acc.brand}</span>
                            {acc.email === 'admin@ibtso.com' && (
                              <span className="text-[9px] bg-amber-500/30 text-amber-800 dark:text-amber-200 px-1 py-0.2 rounded font-mono shrink-0">Admin</span>
                            )}
                          </div>
                          <div className={`text-[10px] font-mono truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            {acc.email}
                          </div>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ml-1 ${
                        isLight ? 'bg-slate-100 group-hover:bg-amber-100 text-slate-500 group-hover:text-amber-700' : 'bg-slate-800/80 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-300'
                      }`}>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className={`pt-4 mt-6 border-t flex items-center justify-between text-[11px] ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800/80 text-slate-500'
          }`}>
            <span>IBTSO Retail Execution & Intelligence</span>
            <a href="https://ibtso.com/" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium">
              ibtso.com <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Clean Manual Sign-In Form */}
        <div className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
          isLight ? 'bg-white' : 'bg-slate-900/95'
        }`}>
          <div className="space-y-5">
            <div>
              <div className={`flex items-center gap-1.5 text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Enterprise Authentication</span>
              </div>
              <h3 className={`text-xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Corporate Sign In
              </h3>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Enter your work credentials to access your brand intelligence session.
              </p>
            </div>

            {/* Validation Error Alert */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Corporate Work Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. lg@ibtso.com, samsung@ibtso.com"
                    className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs transition-colors border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500'
                        : 'bg-slate-950 border-slate-700/80 text-white placeholder-slate-500 focus:border-amber-500'
                    }`}
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Access Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs transition-colors font-mono border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500'
                        : 'bg-slate-950 border-slate-700/80 text-white placeholder-slate-500 focus:border-amber-500'
                    }`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-extrabold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-amber-500/40 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Authenticate & Enter Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className={`p-3 rounded-xl border text-[11px] space-y-1 ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950/80 border-slate-800 text-slate-400'
          }`}>
            <div className={`font-semibold flex items-center gap-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Oman Market Security
            </div>
            <p className={`text-[10px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Confidential B2B market intelligence encrypted per corporate subscription tier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
