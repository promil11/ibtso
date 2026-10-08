import React, { useState } from 'react';
import type { Brand, Category, OmanRegion } from './types/intelligence';
import { DEALERS, ALL_DISPLAYS } from './data/mockDealers';
import { Navigation } from './components/Navigation';
import type { ActiveTab } from './components/Navigation';
import { TopFilterBar } from './components/TopFilterBar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { DealerNetwork } from './components/DealerNetwork';
import { DealerDetail } from './components/DealerDetail';
import { CategoryVisibility } from './components/CategoryVisibility';
import { BrandVsCompetitor } from './components/BrandVsCompetitor';
import { MultiLevelBenchmark } from './components/MultiLevelBenchmark';
import { MonthlyVisibilityTrend } from './components/MonthlyVisibilityTrend';
import { ReportsAndExport } from './components/ReportsAndExport';
import { LoginModal } from './components/LoginModal';
import { Phase3RoadmapModal } from './components/Phase3RoadmapModal';
import { VisibilityShareFormulaModal } from './components/VisibilityShareFormulaModal';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ibtso_authenticated') === 'true';
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('executive');

  // Modal states
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);

  // Global filters
  const [selectedBrand, setSelectedBrand] = useState<Brand>(() => {
    return (localStorage.getItem('ibtso_selected_brand') as Brand) || 'LG';
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All Categories'>('All Categories');
  const [selectedRegion, setSelectedRegion] = useState<OmanRegion | 'All Regions'>('All Regions');
  const [selectedCity, setSelectedCity] = useState<string | 'All Cities'>('All Cities');
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-10');
  const [selectedDealerId, setSelectedDealerId] = useState<string | 'All Dealers'>('All Dealers');

  // Currently inspected dealer for detail view
  const [inspectedDealerId, setInspectedDealerId] = useState<string>(DEALERS[0].id);

  const handleSelectDealerFromList = (dealerId: string) => {
    setInspectedDealerId(dealerId);
    setSelectedDealerId(dealerId);
    setActiveTab('dealer-detail');
  };

  const handleNavigateWithParams = (tab: ActiveTab, params?: any) => {
    setActiveTab(tab);
    if (params?.category) {
      setSelectedCategory(params.category);
    }
  };

  const handleLoginSuccess = (brand?: Brand) => {
    if (brand) {
      setSelectedBrand(brand);
      localStorage.setItem('ibtso_selected_brand', brand);
    }
    setIsLoggedIn(true);
    localStorage.setItem('ibtso_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('ibtso_authenticated');
  };

  if (!isLoggedIn) {
    return (
      <LoginModal
        onLogin={(brand) => handleLoginSuccess(brand)}
      />
    );
  }

  const inspectedDealer = DEALERS.find(d => d.id === inspectedDealerId) || DEALERS[0];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-72 shrink-0 h-full">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDealerId={selectedDealerId}
          setSelectedDealerId={setSelectedDealerId}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onOpenRoadmap={() => setIsRoadmapOpen(true)}
          onOpenFormula={() => setIsFormulaOpen(true)}
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Filter Bar */}
        <header className="shrink-0">
          <TopFilterBar
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDealerId={selectedDealerId}
            setSelectedDealerId={(id) => {
              setSelectedDealerId(id);
              if (id !== 'All Dealers') {
                setInspectedDealerId(id);
              }
            }}
            onExportClick={() => setActiveTab('reports')}
            onOpenRoadmap={() => setIsRoadmapOpen(true)}
            onOpenFormula={() => setIsFormulaOpen(true)}
          />
        </header>

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'executive' && (
              <ExecutiveDashboard
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                selectedCity={selectedCity}
                selectedMonth={selectedMonth}
                dealers={DEALERS}
                displays={ALL_DISPLAYS}
                onNavigateToTab={handleNavigateWithParams}
              />
            )}

            {activeTab === 'network' && (
              <DealerNetwork
                dealers={DEALERS}
                displays={ALL_DISPLAYS}
                selectedBrand={selectedBrand}
                selectedMonth={selectedMonth}
                onSelectDealer={handleSelectDealerFromList}
              />
            )}

            {activeTab === 'dealer-detail' && (
              <DealerDetail
                dealer={inspectedDealer}
                displays={ALL_DISPLAYS}
                selectedBrand={selectedBrand}
                selectedMonth={selectedMonth}
                onBack={() => setActiveTab('network')}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTab('category');
                }}
              />
            )}

            {activeTab === 'category' && (
              <CategoryVisibility
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedRegion={selectedRegion}
                selectedCity={selectedCity}
                selectedMonth={selectedMonth}
                dealers={DEALERS}
                displays={ALL_DISPLAYS}
              />
            )}

            {activeTab === 'competitor' && (
              <BrandVsCompetitor
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                selectedCity={selectedCity}
                selectedMonth={selectedMonth}
                dealers={DEALERS}
                displays={ALL_DISPLAYS}
              />
            )}

            {activeTab === 'benchmarks' && (
              <MultiLevelBenchmark
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                selectedMonth={selectedMonth}
                dealers={DEALERS}
                displays={ALL_DISPLAYS}
                onSelectDealer={handleSelectDealerFromList}
              />
            )}

            {activeTab === 'trends' && (
              <MonthlyVisibilityTrend
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                selectedCity={selectedCity}
                dealers={DEALERS}
                displays={ALL_DISPLAYS}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsAndExport
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                selectedCity={selectedCity}
                selectedMonth={selectedMonth}
                dealers={DEALERS}
                displays={ALL_DISPLAYS}
              />
            )}
          </div>
        </main>
      </div>

      {/* Interactive Modals */}
      <Phase3RoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
      />

      <VisibilityShareFormulaModal
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
        brand={selectedBrand}
        category={selectedCategory}
      />
    </div>
  );
}

export default App;

