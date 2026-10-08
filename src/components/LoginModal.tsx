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
  onLogin: (authenticatedBrand: Brand) => void;
}

export const LoginModal: React.FC<Props> = ({ onLogin }) => {
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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans select-none">
      {/* Radiant Background Mesh Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glassmorphic Showcase Container */}
      <div className="max-w-5xl w-full bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">

        {/* LEFT COLUMN (7 Cols): IBTSO Intelligence Showcase & 1-Click Executive Grid */}
        <div className="lg:col-span-7 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div className="space-y-6">
            {/* Logo & Headline */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-500/20 ring-1 ring-white/20">
                  IB
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xl text-white tracking-tight">IBTSO</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                      Retail Intel SaaS
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Oman Independent Appliance Retailer Channel</p>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                Physical Visibility & Market Share Intelligence
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Direct monthly floor audit intelligence across Oman's 230 Independent Retailers driving ~70% of national sell-out volume.
              </p>
            </div>

            {/* Quick Stat Pill Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold block">Monitored IR Network</span>
                <span className="text-base font-black text-amber-400 font-mono">230 Dealers</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold block">Oman IR Market Share</span>
                <span className="text-base font-black text-emerald-400 font-mono">70% Sell-Out</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold block">Focus Categories</span>
                <span className="text-base font-black text-indigo-400 font-mono">6 Core Lines</span>
              </div>
            </div>

            {/* 1-CLICK EXECUTIVE ACCOUNT SELECTOR */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                  1-Click Corporate Executive Sign-In
                </span>
                <span className="text-[11px] text-slate-400">Click to instantly launch session</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {BRAND_EXECUTIVE_ACCOUNTS.map((acc) => {
                  const isSelected = selectedExecutive.email === acc.email;
                  return (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => handleOneClickExecutiveLogin(acc)}
                      className={`relative bg-gradient-to-r ${acc.accentBg} hover:bg-slate-800/90 border ${isSelected ? 'border-amber-400 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10' : 'border-slate-800 hover:border-slate-700'
                        } p-2.5 rounded-xl text-left transition-all duration-200 group flex items-center justify-between cursor-pointer`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {/* Brand Avatar Badge */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 border ${acc.badgeColor} shadow-sm group-hover:scale-105 transition-transform`}>
                          {acc.initials}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1">
                            <span className="truncate">{acc.brand}</span>
                            {acc.email === 'admin@ibtso.com' && (
                              <span className="text-[9px] bg-amber-500/30 text-amber-200 px-1 py-0.2 rounded font-mono shrink-0">Admin</span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">
                            {acc.email}
                          </div>
                        </div>
                      </div>

                      <div className="w-6 h-6 rounded-full bg-slate-800/80 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-300 flex items-center justify-center transition-all shrink-0 ml-1">
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>IBTSO Retail Execution & Intelligence</span>
            <a href="https://ibtso.com/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium">
              ibtso.com <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Clean Manual Sign-In Form */}
        <div className="lg:col-span-5 bg-slate-900/95 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Authentication</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Corporate Sign In
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your work credentials to access your brand intelligence session.
              </p>
            </div>

            {/* Validation Error Alert */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Corporate Work Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. lg@ibtso.com, samsung@ibtso.com"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Access Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors font-mono"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-extrabold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Authenticate & Enter Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Oman Market Security
            </div>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Confidential B2B market intelligence encrypted per corporate subscription tier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
