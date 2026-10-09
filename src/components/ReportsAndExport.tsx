import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  FileText,
  Check,
  Calendar,
  Layers,
  Globe2,
  Building2,
  Share2,
  Table,
  CheckCircle2
} from 'lucide-react';
import type { Brand, Category, OmanRegion, Dealer, ModelDisplay } from '../types/intelligence';
import { calculateBrandShares, filterDisplays } from '../utils/analytics';

interface Props {
  theme?: 'light' | 'dark';
  selectedBrand: Brand;
  selectedCategory: Category | 'All Categories';
  selectedRegion: OmanRegion | 'All Regions';
  selectedCity: string | 'All Cities';
  selectedMonth: string;
  dealers: Dealer[];
  displays: ModelDisplay[];
}

export const ReportsAndExport: React.FC<Props> = ({
  theme = 'light',
  selectedBrand,
  selectedCategory,
  selectedRegion,
  selectedCity,
  selectedMonth,
  dealers,
  displays,
}) => {
  const isLight = theme === 'light';
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const currentDisplays = filterDisplays(displays, dealers, {
    category: selectedCategory,
    region: selectedRegion,
    city: selectedCity,
    month: selectedMonth,
  });

  const shares = calculateBrandShares(currentDisplays);
  const clientMetric = shares.find(b => b.brand === selectedBrand);

  // Download CSV helper
  const handleExportCSV = (reportType: string) => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (reportType === 'dealers') {
      csvContent += 'Dealer Code,Dealer Name,Governorate,City,Tier,Capacity,Audit Date,Auditor\n';
      dealers.forEach(d => {
        csvContent += `"${d.code}","${d.name}","${d.region}","${d.city}","${d.tier}",${d.displayCapacity},"${d.auditDate}","${d.auditor}"\n`;
      });
    } else if (reportType === 'displays') {
      csvContent += 'Unit ID,Dealer ID,Category,Brand,Model Number,Placement,Signage,Promo Tag,Audit Month\n';
      currentDisplays.slice(0, 1000).forEach(u => {
        csvContent += `"${u.id}","${u.dealerId}","${u.category}","${u.brand}","${u.modelNumber}","${u.displayStatus}",${u.hasBrandSignage},${u.hasPromoTag},"${u.month}"\n`;
      });
    } else {
      csvContent += 'Rank,Brand,Models Displayed,Visibility Share (%),Prime Shelf (%),MoM Shift (%)\n';
      shares.forEach(s => {
        csvContent += `${s.rank},"${s.brand}",${s.modelsDisplayed},${s.visibilityShare},${s.primeSpotRatio},${s.momChange}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IBTSO_Retail_Intel_${reportType}_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(`Exported ${reportType.toUpperCase()} dataset successfully!`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className={`border rounded-2xl p-6 shadow-xl relative overflow-hidden transition-colors ${isLight
        ? 'bg-gradient-to-r from-white via-indigo-50/40 to-white border-slate-200 text-slate-900 shadow-slate-200/50'
        : 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800/80 text-white'
        }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold shadow-sm ${isLight ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}>
                Intelligence Deliverables
              </span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>CSV & Commercial Executive Briefs</span>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <div className={`p-2 rounded-xl border shadow-md ${isLight ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <span>Data Exports</span>
            </h1>
            <p className={`text-xs mt-1.5 max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Export verified retail visibility audit data for stakeholder presentations, trade marketing reviews, and commercial planning across the Oman IR dealer network.
            </p>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2.5 shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-semibold">{downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* Available Export Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Package 1 */}
        <div className={`border rounded-2xl p-6 shadow-xl flex flex-col justify-between ${isLight ? 'bg-white border-amber-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-amber-950/20 via-slate-900 to-slate-950 border-amber-500/30 text-white'
          }`}>
          <div>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 shadow-md ${isLight ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
              <Table className="w-6 h-6" />
            </div>
            <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Brand Visibility Benchmark Summary</h2>
            <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Complete brand ranking table with share percentages, unit counts, prime stand ratios, and MoM shifts for the selected filters.
            </p>
            <div className={`mt-4 text-xs space-y-1.5 p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/80 border-slate-800/80 text-slate-300'
              }`}>
              <div>• Total Brands: <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{shares.length}</strong></div>
              <div>• Current Filter Scope: <strong className={isLight ? 'text-amber-700 font-bold' : 'text-amber-300'}>{selectedRegion} / {selectedCategory}</strong></div>
              <div>• Audit Cycle: <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedMonth}</strong></div>
            </div>
          </div>

          <button
            onClick={() => handleExportCSV('benchmark_shares')}
            className="mt-6 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Benchmark CSV</span>
          </button>
        </div>

        {/* Package 2 */}
        <div className={`border rounded-2xl p-6 shadow-xl flex flex-col justify-between ${isLight ? 'bg-white border-indigo-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-indigo-950/20 via-slate-900 to-slate-950 border-indigo-500/30 text-white'
          }`}>
          <div>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 shadow-md ${isLight ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
              }`}>
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Oman IR 230 Dealer Master Census</h2>
            <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Full directory of all 230 independent retailers across the 10 governorates of Oman, including contact details, capacity, and auditor assignments.
            </p>
            <div className={`mt-4 text-xs space-y-1.5 p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/80 border-slate-800/80 text-slate-300'
              }`}>
              <div>• Stores Included: <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>230 Independent Dealers</strong></div>
              <div>• Geographic Reach: <strong className={isLight ? 'text-indigo-700 font-bold' : 'text-indigo-300'}>All Oman Governorates</strong></div>
              <div>• Dealer Classifications: <strong className={isLight ? 'text-slate-900' : 'text-white'}>Tier A / B / C</strong></div>
            </div>
          </div>

          <button
            onClick={() => handleExportCSV('dealers')}
            className={`mt-6 w-full font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 border transition-all shadow-md transform hover:-translate-y-0.5 ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
              }`}
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Export Dealer Census CSV</span>
          </button>
        </div>

        {/* Package 3 */}
        <div className={`border rounded-2xl p-6 shadow-xl flex flex-col justify-between ${isLight ? 'bg-white border-emerald-200 text-slate-900 shadow-slate-200/50' : 'bg-gradient-to-b from-emerald-950/20 via-slate-900 to-slate-950 border-emerald-500/30 text-white'
          }`}>
          <div>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 shadow-md ${isLight ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
              <Layers className="w-6 h-6" />
            </div>
            <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Audited Model Display Raw Records</h2>
            <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Granular record-level floor SKU observations with eye-level placement tags, promotional flags, and IBTSO branding verification.
            </p>
            <div className={`mt-4 text-xs space-y-1.5 p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/80 border-slate-800/80 text-slate-300'
              }`}>
              <div>• Records in Scope: <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{currentDisplays.length} items</strong></div>
              <div>• Placement Verification: <strong className={isLight ? 'text-emerald-700 font-bold' : 'text-emerald-300'}>Eye-level vs secondary</strong></div>
              <div>• Audit Validity: <strong className={isLight ? 'text-slate-900' : 'text-white'}>100% In-Store Verified</strong></div>
            </div>
          </div>

          <button
            onClick={() => handleExportCSV('displays')}
            className={`mt-6 w-full font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 border transition-all shadow-md transform hover:-translate-y-0.5 ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
              }`}
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Export Display Audit CSV</span>
          </button>
        </div>
      </div>

    </div>
  );
};
