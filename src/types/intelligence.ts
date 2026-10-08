export type Category = 
  | 'Air Conditioners'
  | 'Refrigerators'
  | 'Washing Machines'
  | 'Cooking Ranges'
  | 'Dishwashers'
  | 'TV / Built-ins';

export type Brand = 
  | 'LG'
  | 'Samsung'
  | 'Midea'
  | 'Toshiba'
  | 'Philips'
  | 'Haier'
  | 'Hitachi'
  | 'Gree'
  | 'Panasonic'
  | 'Super General'
  | 'Beko'
  | 'Siemens';

export type OmanRegion = 
  | 'Muscat'
  | 'Dhofar'
  | 'Al Batinah North'
  | 'Al Batinah South'
  | 'Al Dakhiliyah'
  | 'Al Sharqiyah North'
  | 'Al Sharqiyah South'
  | 'Al Dhahirah'
  | 'Al Buraimi'
  | 'Musandam';

export interface Dealer {
  id: string;
  code: string;
  name: string;
  arabicName: string;
  region: OmanRegion;
  city: string;
  area: string;
  phone: string;
  tier: 'Tier A (High Volume)' | 'Tier B (Mid Volume)' | 'Tier C (Local)';
  categoryFootprint: Category[];
  displayCapacity: number; // total display unit capacity
  auditDate: string;
  auditor: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ModelDisplay {
  id: string;
  dealerId: string;
  category: Category;
  brand: Brand;
  modelNumber: string;
  series: string;
  displayStatus: 'Prime Display (Eye-level)' | 'Standard Floor' | 'Endcap / Feature Stand' | 'Stack/Secondary';
  hasBrandSignage: boolean;
  hasPromoTag: boolean;
  energyStarRating?: number;
  month: string; // e.g. "2026-09", "2026-10"
}

export interface BrandShareMetric {
  brand: Brand;
  modelsDisplayed: number;
  visibilityShare: number; // percentage 0 - 100
  previousShare?: number;  // for MoM calculation
  momChange?: number;      // delta in % points
  rank: number;
  primeSpotRatio: number;  // % of displays in prime eye-level/feature
}

export interface CategorySummary {
  category: Category;
  totalDisplays: number;
  brandsRepresented: number;
  leadingBrand: Brand;
  leadingBrandShare: number;
  clientBrandShare: number;
  clientBrandRank: number;
}

export interface RegionSummary {
  region: OmanRegion;
  dealerCount: number;
  totalDisplays: number;
  clientBrandShare: number;
  topBrand: Brand;
  topBrandShare: number;
}

export interface MonthlyTrendPoint {
  month: string;
  monthLabel: string;
  [key: string]: string | number; // dynamic brand share values
}
