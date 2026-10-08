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
  Building2
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
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    accentBg: 'from-rose-500/10 to-red-950/30',
    initials: 'LG'
  },
  { 
    email: 'samsung@ibtso.com', 
    password: 'samsung2026', 
    brand: 'Samsung', 
    companyName: 'Samsung Electronics MENA', 
    executiveTitle: 'Retail Intelligence Lead',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    accentBg: 'from-blue-500/10 to-indigo-950/30',
    initials: 'SS'
  },
  { 
    email: 'midea@ibtso.com', 
    password: 'midea2026', 
    brand: 'Midea', 
    companyName: 'Midea Middle East Trading', 
    executiveTitle: 'Appliance Category Head',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    accentBg: 'from-cyan-500/10 to-teal-950/30',
    initials: 'MD'
  },
  { 
    email: 'gree@ibtso.com', 
    password: 'gree2026', 
    brand: 'Gree', 
    companyName: 'Gree Air Conditioning Oman', 
    executiveTitle: 'Regional Sales Director',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accentBg: 'from-emerald-500/10 to-green-950/30',
    initials: 'GR'
  },
  { 
    email: 'toshiba@ibtso.com', 
    password: 'toshiba2026', 
    brand: 'Toshiba', 
    companyName: 'Toshiba Consumer Products', 
    executiveTitle: 'Regional Retail Lead',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentBg: 'from-amber-500/10 to-yellow-950/30',
    initials: 'TS'
  },
  { 
    email: 'philips@ibtso.com', 
    password: 'philips2026', 
    brand: 'Philips', 
    companyName: 'Philips Domestic Appliances', 
    executiveTitle: 'Commercial Lead',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    accentBg: 'from-pink-500/10 to-rose-950/30',
    initials: 'PH'
  },
  { 
    email: 'haier@ibtso.com', 
    password: 'haier2026', 
    brand: 'Haier', 
    companyName: 'Haier Middle East', 
    executiveTitle: 'Market Intelligence Director',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    accentBg: 'from-teal-500/10 to-cyan-950/30',
    initials: 'HR'
  },
  { 
    email: 'hitachi@ibtso.com', 
    password: 'hitachi2026', 
    brand: 'Hitachi', 
    companyName: 'Hitachi Home Appliances', 
    executiveTitle: 'Oman Brand Lead',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    accentBg: 'from-orange-500/10 to-red-950/30',
    initials: 'HT'
  },
  { 
    email: 'panasonic@ibtso.com', 
    password: 'panasonic2026', 
    brand: 'Panasonic', 
    companyName: 'Panasonic Marketing ME', 
    executiveTitle: 'Channel Sales Manager',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    accentBg: 'from-indigo-500/10 to-purple-950/30',
    initials: 'PN'
  },
  { 
    email: 'admin@ibtso.com', 
    password: 'ibtso2026', 
    brand: 'LG', 
    companyName: 'IBTSO Master Administration', 
    executiveTitle: 'Platform Administrator',
    badgeColor: 'bg-amber-400 text-slate-950 border-amber-400 font-bold',
    accentBg: 'from-amber-500/20 via-indigo-600/10 to-slate-900',
    initials: 'AD'
  },
];

interface Props {
  onLogin: (authenticatedBrand: Brand) => void;
}

export const LoginModal: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setErrorMessage('Invalid credentials. Select a 1-click executive account below or check your login details.');
    }
  };

  const handleOneClickExecutiveLogin = (acc: BrandAccount) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage(null);
    onLogin(acc.brand);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      {/* Dynamic Ambient Backlight Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Container Card */}
      <div className="max-w-xl w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* IBTSO Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 text-white font-black text-2xl shadow-xl shadow-amber-500/25 ring-2 ring-white/20">
            IB
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <span>IBTSO</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-normal">
                RETAIL INTEL SaaS
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Executive Portal • Oman Independent Retailer Channel (230 IR Dealers)
            </p>
          </div>
        </div>

        {/* 1-CLICK BRAND EXECUTIVE QUICK LOGIN SECTION */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 space-y-3 shadow-inner">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              1-Click Executive Access
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Click any brand to sign in</span>
          </div>

          {/* Clean 2-Column Responsive Grid */}
          <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {BRAND_EXECUTIVE_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleOneClickExecutiveLogin(acc)}
                className={`bg-gradient-to-r ${acc.accentBg} hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/60 p-2.5 rounded-xl text-left transition-all duration-200 group flex items-center justify-between shadow-sm hover:shadow-md hover:shadow-amber-500/10 cursor-pointer`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {/* Brand Badge Initials */}
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

                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Validation Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Manual Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span className="h-px bg-slate-800 flex-1"></span>
            <span className="text-[11px] text-slate-500">Or Enter Work Email</span>
            <span className="h-px bg-slate-800 flex-1"></span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. lg@ibtso.com, samsung@ibtso.com"
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
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
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors font-mono"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-extrabold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Authenticate & Enter Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="pt-2 text-center border-t border-slate-800/60">
          <p className="text-[11px] text-slate-500">
            IBTSO Retail Execution & Intelligence • Oman •{' '}
            <a href="https://ibtso.com/" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline font-medium">
              ibtso.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
