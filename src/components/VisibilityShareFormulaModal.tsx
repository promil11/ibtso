import React from 'react';
import { X, Calculator, Info, CheckCircle, Percent } from 'lucide-react';
import type { Brand, Category } from '../types/intelligence';

interface Props {
  theme?: 'light' | 'dark';
  isOpen: boolean;
  onClose: () => void;
  brand: Brand;
  category: Category | 'All Categories';
}

export const VisibilityShareFormulaModal: React.FC<Props> = ({
  theme = 'light',
  isOpen,
  onClose,
  brand,
  category,
}) => {
  if (!isOpen) return null;
  const isLight = theme === 'light';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn ${
      isLight ? 'bg-slate-900/40' : 'bg-slate-950/85'
    }`}>
      <div className={`border rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60' : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800/90 text-white'
      }`}>
        {/* Header */}
        <div className={`border-b p-5 flex items-center justify-between ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900/95 border-slate-800/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow-md ${
              isLight ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Brand Visibility Share Formula</h2>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>IBTSO Standard Methodology for Oman IR Market</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Formula Callout */}
          <div className={`border rounded-xl p-4 text-center ${
            isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-slate-950 border-amber-500/30'
          }`}>
            <span className={`text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-amber-800' : 'text-slate-400'}`}>Formula Standard</span>
            <div className={`my-3 py-3 px-4 rounded-lg border font-mono text-sm sm:text-base font-bold ${
              isLight ? 'bg-white border-slate-200 text-amber-700' : 'bg-slate-900 border-slate-800 text-amber-300'
            }`}>
              Visibility Share % = <span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>( Brand Models Displayed )</span> ÷ <span className={isLight ? 'text-indigo-700' : 'text-indigo-400'}>( Total Models Displayed )</span> × 100
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Calculated across audited Independent Retailer (IR) shop floors.
            </p>
          </div>

          {/* Example Table from Brief */}
          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Example Store Audit (Dealer A — AC Category)
            </h3>
            <div className={`border rounded-xl overflow-hidden ${isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <table className="w-full text-left text-xs">
                <thead className={`border-b font-semibold ${
                  isLight ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}>
                  <tr>
                    <th className="py-2 px-3">Brand</th>
                    <th className="py-2 px-3 text-right">Models Displayed</th>
                    <th className="py-2 px-3 text-right">Visibility Share</th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-mono ${
                  isLight ? 'divide-slate-100 text-slate-700' : 'divide-slate-800/60 text-slate-300'
                }`}>
                  <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/50'}>
                    <td className="py-2 px-3 font-semibold text-cyan-600 dark:text-cyan-400 font-sans">Midea</td>
                    <td className="py-2 px-3 text-right">2</td>
                    <td className="py-2 px-3 text-right text-cyan-600 dark:text-cyan-400 font-bold">20.0%</td>
                  </tr>
                  <tr className={isLight ? 'bg-amber-50/70 font-semibold' : 'bg-amber-500/5'}>
                    <td className="py-2 px-3 font-semibold text-rose-600 dark:text-rose-400 font-sans">LG</td>
                    <td className="py-2 px-3 text-right">4</td>
                    <td className="py-2 px-3 text-right text-rose-600 dark:text-rose-400 font-bold">40.0%</td>
                  </tr>
                  <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/50'}>
                    <td className="py-2 px-3 font-semibold text-blue-600 dark:text-blue-400 font-sans">Samsung</td>
                    <td className="py-2 px-3 text-right">1</td>
                    <td className="py-2 px-3 text-right text-blue-600 dark:text-blue-400 font-bold">10.0%</td>
                  </tr>
                  <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/50'}>
                    <td className="py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400 font-sans">Gree</td>
                    <td className="py-2 px-3 text-right">2</td>
                    <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">20.0%</td>
                  </tr>
                  <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/50'}>
                    <td className="py-2 px-3 font-semibold text-indigo-600 dark:text-indigo-400 font-sans">Panasonic</td>
                    <td className="py-2 px-3 text-right">1</td>
                    <td className="py-2 px-3 text-right text-indigo-600 dark:text-indigo-400 font-bold">10.0%</td>
                  </tr>
                </tbody>
                <tfoot className={`font-bold border-t font-mono ${
                  isLight ? 'bg-slate-50 text-slate-900 border-slate-200' : 'bg-slate-900 text-white border-slate-800'
                }`}>
                  <tr>
                    <td className="py-2 px-3 font-sans">Total Store Display</td>
                    <td className="py-2 px-3 text-right">10 models</td>
                    <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400">100.0%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              This benchmark is aggregated hierarchically up from <strong>Dealer Level → City Level → Governorate Level → National Oman Benchmark (230 IR Dealers)</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
