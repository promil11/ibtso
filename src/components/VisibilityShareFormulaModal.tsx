import React from 'react';
import { X, Calculator, Info, CheckCircle, Percent } from 'lucide-react';
import type { Brand, Category } from '../types/intelligence';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand;
  category: Category | 'All Categories';
}

export const VisibilityShareFormulaModal: React.FC<Props> = ({
  isOpen,
  onClose,
  brand,
  category,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800/90 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="bg-slate-900/95 border-b border-slate-800/80 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Brand Visibility Share Formula</h2>
              <p className="text-xs text-slate-400 mt-0.5">IBTSO Standard Methodology for Oman IR Market</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Formula Callout */}
          <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Formula Standard</span>
            <div className="my-3 py-3 px-4 bg-slate-900 rounded-lg border border-slate-800 font-mono text-amber-300 text-sm sm:text-base font-bold">
              Visibility Share % = <span className="text-emerald-400">( Brand Models Displayed )</span> ÷ <span className="text-indigo-400">( Total Models Displayed )</span> × 100
            </div>
            <p className="text-xs text-slate-400">
              Calculated across audited Independent Retailer (IR) shop floors.
            </p>
          </div>

          {/* Example Table from Brief */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Example Store Audit (Dealer A — AC Category)
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 font-semibold">
                  <tr>
                    <th className="py-2 px-3">Brand</th>
                    <th className="py-2 px-3 text-right">Models Displayed</th>
                    <th className="py-2 px-3 text-right">Visibility Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-semibold text-cyan-400 font-sans">Midea</td>
                    <td className="py-2 px-3 text-right">2</td>
                    <td className="py-2 px-3 text-right text-cyan-400 font-bold">20.0%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50 bg-amber-500/5">
                    <td className="py-2 px-3 font-semibold text-rose-400 font-sans">LG</td>
                    <td className="py-2 px-3 text-right">4</td>
                    <td className="py-2 px-3 text-right text-rose-400 font-bold">40.0%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-semibold text-blue-400 font-sans">Samsung</td>
                    <td className="py-2 px-3 text-right">1</td>
                    <td className="py-2 px-3 text-right text-blue-400 font-bold">10.0%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-semibold text-emerald-400 font-sans">Gree</td>
                    <td className="py-2 px-3 text-right">2</td>
                    <td className="py-2 px-3 text-right text-emerald-400 font-bold">20.0%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-semibold text-indigo-400 font-sans">Panasonic</td>
                    <td className="py-2 px-3 text-right">1</td>
                    <td className="py-2 px-3 text-right text-indigo-400 font-bold">10.0%</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-900 text-white font-bold border-t border-slate-800 font-mono">
                  <tr>
                    <td className="py-2 px-3 font-sans">Total Store Display</td>
                    <td className="py-2 px-3 text-right">10 models</td>
                    <td className="py-2 px-3 text-right text-amber-400">100.0%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              This benchmark is aggregated hierarchically up from <strong>Dealer Level → City Level → Governorate Level → National Oman Benchmark (230 IR Dealers)</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
