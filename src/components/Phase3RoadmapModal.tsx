import React from 'react';
import { 
  X, 
  Sparkles, 
  Database, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  Package, 
  ArrowRight, 
  ShieldAlert, 
  Layers,
  Cpu
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Phase3RoadmapModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">IBTSO Phase 3 Strategic Roadmap</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Future Vision
                </span>
              </div>
              <p className="text-xs text-slate-400">
                From Physical Visibility Share to 360° Retail & Sell-Out Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Phase Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current MVP Phase 2 */}
            <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Phase 1 & 2 (Current MVP)</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Active Live</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Physical Visibility Intelligence</h3>
              <p className="text-xs text-slate-400 mb-3">
                Monthly physical audit across 230 Independent Retailers (IR) in Oman (~70% market sell-out).
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Brand Visibility Share %
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  4-Level Hierarchy (Dealer → City → Region → National)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Prime Eye-level / Endcap Shelf Ratios
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  6 Focus Categories (AC, Fridge, Washer, Cooker, Dishwasher, TV)
                </li>
              </ul>
            </div>

            {/* Phase 3 ERP Integration */}
            <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Phase 3 (Expansion Roadmap)</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">In Planning</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Direct Dealer ERP Integration</h3>
              <p className="text-xs text-slate-400 mb-3">
                Connecting directly with dealer ERP / POS software across Oman's 230 IR network.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Monthly Sell-Out Units & Volume
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Live Inventory & Stockout Alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Retail Street Pricing & Price Elasticity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Commercial Promotions & Discount Tracking
                </li>
              </ul>
            </div>
          </div>

          {/* Phase 3 Feature Modules Preview Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Future Data Assets in Phase 3 Architecture</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Sell-Out Quantities</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Actual unit movement from dealer to end consumer.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                  <Package className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Dealer Stock Levels</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Real-time inventory levels to prevent lost sales.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Street Price Index</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Actual sell-out pricing & promotional discounting.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Share vs Sales Correlation</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Correlation between floor display share and sell-out volume.
                </p>
              </div>
            </div>
          </div>

          {/* Note Box */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 flex items-start gap-3 text-xs">
            <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-indigo-200">Commercial Roadmap Positioning</p>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                Phase 3 integration will unlock end-to-end commercial clarity for global electronics brands operating in Oman. Demonstrating this roadmap during client meetings highlights IBTSO's long-term technology vision beyond physical display execution.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            IBTSO Retail Execution & Intelligence • Muscat, Sultanate of Oman
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
          >
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
