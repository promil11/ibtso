import React, { useState } from 'react';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  AlertCircle,
  ShieldCheck,
  KeyRound,
  UserCheck,
  Building2,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import type { Brand } from '../types/intelligence';

export interface BrandAccount {
  email: string;
  password: string;
  brand: Brand;
  companyName: string;
  executiveTitle: string;
  color: string;
}

export const BRAND_EXECUTIVE_ACCOUNTS: BrandAccount[] = [
  { 
    email: 'lg@ibtso.com', 
    password: 'lg2026', 
    brand: 'LG', 
    companyName: 'LG Electronics Gulf', 
    executiveTitle: 'LG Commercial Retail Director',
    color: 'from-rose-500/20 to-red-600/20 border-rose-500/30 text-rose-300'
  },
  { 
    email: 'samsung@ibtso.com', 
    password: 'samsung2026', 
    brand: 'Samsung', 
    companyName: 'Samsung Electronics MENA', 
    executiveTitle: 'Samsung Retail Intelligence Lead',
    color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/30 text-blue-300'
  },
  { 
    email: 'midea@ibtso.com', 
    password: 'midea2026', 
    brand: 'Midea', 
    companyName: 'Midea Middle East Trading', 
    executiveTitle: 'Midea Appliance Category Head',
    color: 'from-cyan-500/20 to-teal-600/20 border-cyan-500/30 text-cyan-300'
  },
  { 
    email: 'gree@ibtso.com', 
    password: 'gree2026', 
    brand: 'Gree', 
    companyName: 'Gree Air Conditioning Oman', 
    executiveTitle: 'Gree Regional Sales Director',
    color: 'from-emerald-500/20 to-green-600/20 border-emerald-500/30 text-emerald-300'
  },
  { 
    email: 'toshiba@ibtso.com', 
    password: 'toshiba2026', 
    brand: 'Toshiba', 
    companyName: 'Toshiba Consumer Products', 
    executiveTitle: 'Toshiba Retail Lead',
    color: 'from-amber-500/20 to-yellow-600/20 border-amber-500/30 text-amber-300'
  },
  { 
    email: 'philips@ibtso.com', 
    password: 'philips2026', 
    brand: 'Philips', 
    companyName: 'Philips Domestic Appliances', 
    executiveTitle: 'Philips Commercial Manager',
    color: 'from-pink-500/20 to-rose-600/20 border-pink-500/30 text-pink-300'
  },
  { 
    email: 'haier@ibtso.com', 
    password: 'haier2026', 
    brand: 'Haier', 
    companyName: 'Haier Middle East', 
    executiveTitle: 'Haier Market Intelligence Director',
    color: 'from-teal-500/20 to-cyan-600/20 border-teal-500/30 text-teal-300'
  },
  { 
    email: 'hitachi@ibtso.com', 
    password: 'hitachi2026', 
    brand: 'Hitachi', 
    companyName: 'Hitachi Home Appliances', 
    executiveTitle: 'Hitachi Oman Brand Lead',
    color: 'from-orange-500/20 to-red-600/20 border-orange-500/30 text-orange-300'
  },
  { 
    email: 'panasonic@ibtso.com', 
    password: 'panasonic2026', 
    brand: 'Panasonic', 
    companyName: 'Panasonic Marketing Middle East', 
    executiveTitle: 'Panasonic Channel Manager',
    color: 'from-indigo-500/20 to-purple-600/20 border-indigo-500/30 text-indigo-300'
  },
  { 
    email: 'admin@ibtso.com', 
    password: 'ibtso2026', 
    brand: 'LG', 
    companyName: 'IBTSO Master Administration', 
    executiveTitle: 'IBTSO Platform Administrator',
    color: 'from-amber-500/20 to-indigo-600/20 border-amber-500/40 text-amber-300'
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
      setErrorMessage('Invalid credentials. Please select a 1-click executive account below or enter valid login details.');
    }
  };

  const handleOneClickExecutiveLogin = (acc: BrandAccount) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage(null);
    onLogin(acc.brand);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl relative z-10 space-y-5">
        {/* IBTSO Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 text-white font-black text-2xl shadow-xl shadow-amber-500/20 mb-2 ring-1 ring-white/20">
            IB
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>IBTSO</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              RETAIL INTEL SaaS
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Executive Portal • Oman Independent Retailer Channel (230 IR Dealers)
          </p>
        </div>

        {/* 1-CLICK BRAND EXECUTIVE QUICK LOGIN GRID */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              1-Click Executive Access Buttons
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Select Brand to Log In</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {BRAND_EXECUTIVE_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleOneClickExecutiveLogin(acc)}
                className={`bg-gradient-to-r ${acc.color} hover:brightness-125 border p-2 rounded-lg text-left transition-all shadow-sm flex items-center justify-between group cursor-pointer`}
              >
                <div>
                  <div className="text-xs font-extrabold text-white group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>{acc.brand}</span>
                    {acc.email === 'admin@ibtso.com' && (
                      <span className="text-[9px] bg-amber-500/30 text-amber-200 px-1 rounded">Admin</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate max-w-[100px]">
                    {acc.email}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Validation Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Manual Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
            <span className="h-px bg-slate-800 flex-1"></span>
            <span>Or Sign In Manually</span>
            <span className="h-px bg-slate-800 flex-1"></span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Corporate Work Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. lg@ibtso.com, samsung@ibtso.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Access Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-mono"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 rounded-lg text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>Authenticate & Enter Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            IBTSO Retail Execution & Intelligence • Oman •{' '}
            <a href="https://ibtso.com/" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
              ibtso.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
