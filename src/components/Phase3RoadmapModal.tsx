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
  theme?: 'light' | 'dark';
  isOpen: boolean;
  onClose: () => void;
}

export const Phase3RoadmapModal: React.FC<Props> = ({ theme = 'light', isOpen, onClose }) => {
  if (!isOpen) return null;
  const isLight = theme === 'light';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn ${
      isLight ? 'bg-slate-900/40' : 'bg-slate-950/85'
    }`}>
      <div className={`border rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60' : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800/90 text-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 backdrop-blur-md border-b p-5 flex items-center justify-between z-10 ${
          isLight ? 'bg-white/95 border-slate-200' : 'bg-slate-900/95 border-slate-800/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>IBTSO Phase 3 Strategic Roadmap</h2>
                <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border shadow-sm ${
                  isLight ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                }`}>
                  Future Vision
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                From Physical Visibility Share to 360° Retail & Sell-Out Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Phase Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current MVP Phase 2 */}
            <div className={`border rounded-xl p-4 relative overflow-hidden ${
              isLight ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-950 border-amber-500/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>Phase 1 & 2 (Current MVP)</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                  isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>Active Live</span>
              </div>
              <h3 className={`text-base font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Physical Visibility Intelligence</h3>
              <p className={`text-xs mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Monthly physical audit across 230 Independent Retailers (IR) in Oman (~70% market sell-out).
              </p>
              <ul className={`text-xs space-y-1.5 font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Brand Visibility Share %
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  4-Level Hierarchy (Dealer → City → Region → National)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Prime Eye-level / Endcap Shelf Ratios
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  6 Focus Categories (AC, Fridge, Washer, Cooker, Dishwasher, TV)
                </li>
              </ul>
            </div>

            {/* Phase 3 ERP Integration */}
            <div className={`border rounded-xl p-4 relative overflow-hidden ${
              isLight ? 'bg-indigo-50/50 border-indigo-200' : 'bg-slate-950 border-indigo-500/40'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-indigo-800' : 'text-indigo-400'}`}>Phase 3 (Expansion Roadmap)</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                  isLight ? 'bg-indigo-100 text-indigo-900 border-indigo-300' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                }`}>In Planning</span>
              </div>
              <h3 className={`text-base font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Direct Dealer ERP Integration</h3>
              <p className={`text-xs mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Connecting directly with dealer ERP / POS software across Oman's 230 IR network.
              </p>
              <ul className={`text-xs space-y-1.5 font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Monthly Sell-Out Units & Volume
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Live Inventory & Stockout Alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Retail Street Pricing & Price Elasticity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Commercial Promotions & Discount Tracking
                </li>
              </ul>
            </div>
          </div>

          {/* Phase 3 Feature Modules Preview Grid */}
          <div className="space-y-3">
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span>Future Data Assets in Phase 3 Architecture</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className={`border p-3.5 rounded-xl ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Sell-Out Quantities</h4>
                <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Actual unit movement from dealer to end consumer.
                </p>
              </div>

              <div className={`border p-3.5 rounded-xl ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <Package className="w-4 h-4" />
                </div>
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Dealer Stock Levels</h4>
                <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Real-time inventory levels to prevent lost sales.
                </p>
              </div>

              <div className={`border p-3.5 rounded-xl ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Street Price Index</h4>
                <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Actual sell-out pricing & promotional discounting.
                </p>
              </div>

              <div className={`border p-3.5 rounded-xl ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Share vs Sales Correlation</h4>
                <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Correlation between floor display share and sell-out volume.
                </p>
              </div>
            </div>
          </div>

          {/* Note Box */}
          <div className={`border rounded-xl p-4 flex items-start gap-3 text-xs ${
            isLight ? 'bg-indigo-50/80 border-indigo-200' : 'bg-indigo-950/40 border-indigo-500/30'
          }`}>
            <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className={`font-semibold ${isLight ? 'text-indigo-900' : 'text-indigo-200'}`}>Commercial Roadmap Positioning</p>
              <p className={`mt-0.5 leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Phase 3 integration will unlock end-to-end commercial clarity for global electronics brands operating in Oman. Demonstrating this roadmap during client meetings highlights IBTSO's long-term technology vision beyond physical display execution.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
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
