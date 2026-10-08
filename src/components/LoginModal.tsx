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
  ChevronRight
} from 'lucide-react';
import type { Brand } from '../types/intelligence';

export interface BrandAccount {
  email: string;
  password: string;
  brand: Brand;
  companyName: string;
  executiveTitle: string;
}

export const BRAND_EXECUTIVE_ACCOUNTS: BrandAccount[] = [
  {
    email: 'lg@ibtso.com',
    password: 'lg2026',
    brand: 'LG',
    companyName: 'LG Electronics Gulf',
    executiveTitle: 'LG Retail Commercial Director'
  },
  {
    email: 'samsung@ibtso.com',
    password: 'samsung2026',
    brand: 'Samsung',
    companyName: 'Samsung Electronics MENA',
    executiveTitle: 'Samsung Retail Intelligence Lead'
  },
  {
    email: 'midea@ibtso.com',
    password: 'midea2026',
    brand: 'Midea',
    companyName: 'Midea Middle East Trading',
    executiveTitle: 'Midea Appliance Category Head'
  },
  {
    email: 'gree@ibtso.com',
    password: 'gree2026',
    brand: 'Gree',
    companyName: 'Gree Air Conditioning Oman',
    executiveTitle: 'Gree Regional Sales Director'
  },
  {
    email: 'toshiba@ibtso.com',
    password: 'toshiba2026',
    brand: 'Toshiba',
    companyName: 'Toshiba Consumer Products',
    executiveTitle: 'Toshiba Retail Lead'
  },
  {
    email: 'philips@ibtso.com',
    password: 'philips2026',
    brand: 'Philips',
    companyName: 'Philips Domestic Appliances',
    executiveTitle: 'Philips Commercial Manager'
  },
  {
    email: 'haier@ibtso.com',
    password: 'haier2026',
    brand: 'Haier',
    companyName: 'Haier Middle East',
    executiveTitle: 'Haier Market Intelligence Director'
  },
  {
    email: 'hitachi@ibtso.com',
    password: 'hitachi2026',
    brand: 'Hitachi',
    companyName: 'Hitachi Home Appliances',
    executiveTitle: 'Hitachi Oman Brand Lead'
  },
  {
    email: 'panasonic@ibtso.com',
    password: 'panasonic2026',
    brand: 'Panasonic',
    companyName: 'Panasonic Marketing Middle East',
    executiveTitle: 'Panasonic Channel Manager'
  },
  {
    email: 'admin@ibtso.com',
    password: 'ibtso2026',
    brand: 'LG',
    companyName: 'IBTSO Master Administration',
    executiveTitle: 'IBTSO Platform Administrator'
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
      setErrorMessage('Invalid credentials. Please enter a valid Brand Executive email and password.');
    }
  };

  const handleSelectQuickAccount = (acc: BrandAccount) => {
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
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl relative z-10">
        {/* IBTSO Brand Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 text-white font-black text-2xl shadow-xl shadow-amber-500/20 mb-3 ring-1 ring-white/20">
            IB
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>IBTSO</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              RETAIL INTEL SaaS
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Brand Executive Portal • Oman Independent Retailer Channel
          </p>
        </div>

        {/* Access Badge */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 mb-5 text-xs text-slate-300 space-y-1">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <span className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-4 h-4" /> Multi-Brand Enterprise Access
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
              230 IR Dealers
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Sign in with your corporate brand executive credentials to view your physical visibility share & regional benchmarks.
          </p>
        </div>

        {/* Validation Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Brand Executive Work Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. lg@ibtso.com, samsung@ibtso.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                required
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
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
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-mono"
                required
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 rounded-lg text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>Authenticate & Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
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
