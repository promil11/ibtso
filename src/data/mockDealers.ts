import type { Dealer, ModelDisplay, Category, Brand, OmanRegion } from '../types/intelligence';

export const BRANDS: Brand[] = [
  'LG',
  'Samsung',
  'Midea',
  'Toshiba',
  'Philips',
  'Haier',
  'Hitachi',
  'Gree',
  'Panasonic',
  'Super General',
  'Beko',
  'Siemens',
];

export const CATEGORIES: Category[] = [
  'Air Conditioners',
  'Refrigerators',
  'Washing Machines',
  'Cooking Ranges',
  'Dishwashers',
  'TV / Built-ins',
];

export const REGIONS: OmanRegion[] = [
  'Muscat',
  'Al Batinah North',
  'Al Batinah South',
  'Dhofar',
  'Al Dakhiliyah',
  'Al Sharqiyah North',
  'Al Sharqiyah South',
  'Al Dhahirah',
  'Al Buraimi',
  'Musandam',
];

export const CITIES_BY_REGION: Record<OmanRegion, string[]> = {
  'Muscat': ['Ruwi', 'Seeb', 'Bawshar', 'Muttrah', 'Al Amerat', 'Al Khoudh', 'Al Ghubrah', 'Azaiba', 'Al Maabilah'],
  'Al Batinah North': ['Sohar', 'Saham', 'Al Khaburah', 'Liwa', 'Shinas', 'Al Suwaiq'],
  'Al Batinah South': ['Barka', 'Al Rustaq', 'Al Musanaah', 'Nakhal'],
  'Dhofar': ['Salalah', 'Taqah', 'Mirbat', 'Thumrait'],
  'Al Dakhiliyah': ['Nizwa', 'Bahla', 'Samail', 'Izki', 'Bidbid', 'Adam'],
  'Al Sharqiyah North': ['Ibra', 'Al Mudhaibi', 'Bidiya', 'Dema Wa Thaieen'],
  'Al Sharqiyah South': ['Sur', 'Jalan Bani Bu Ali', 'Jalan Bani Bu Hassan', 'Al Kamil Wal Wafi'],
  'Al Dhahirah': ['Ibri', 'Yanqul', 'Dhank'],
  'Al Buraimi': ['Al Buraimi City', 'Mahdah'],
  'Musandam': ['Khasab', 'Bukha', 'Dibba'],
};

// Brand Brand Strengths weight simulation to create ultra-realistic data
const BRAND_CATEGORY_WEIGHTS: Record<Category, Record<Brand, number>> = {
  'Air Conditioners': {
    'Gree': 0.28,
    'Midea': 0.24,
    'LG': 0.18,
    'Super General': 0.12,
    'Samsung': 0.08,
    'Panasonic': 0.04,
    'Haier': 0.03,
    'Toshiba': 0.01,
    'Hitachi': 0.01,
    'Philips': 0.00,
    'Beko': 0.005,
    'Siemens': 0.005,
  },
  'Refrigerators': {
    'LG': 0.24,
    'Samsung': 0.22,
    'Hitachi': 0.16,
    'Midea': 0.12,
    'Super General': 0.09,
    'Toshiba': 0.07,
    'Haier': 0.05,
    'Panasonic': 0.03,
    'Beko': 0.01,
    'Gree': 0.00,
    'Philips': 0.00,
    'Siemens': 0.01,
  },
  'Washing Machines': {
    'LG': 0.26,
    'Samsung': 0.22,
    'Midea': 0.14,
    'Super General': 0.11,
    'Panasonic': 0.09,
    'Toshiba': 0.07,
    'Hitachi': 0.05,
    'Haier': 0.03,
    'Beko': 0.02,
    'Siemens': 0.01,
    'Gree': 0.00,
    'Philips': 0.00,
  },
  'Cooking Ranges': {
    'Midea': 0.24,
    'Super General': 0.20,
    'Beko': 0.16,
    'LG': 0.12,
    'Siemens': 0.08,
    'Toshiba': 0.06,
    'Samsung': 0.05,
    'Haier': 0.04,
    'Philips': 0.02,
    'Panasonic': 0.02,
    'Hitachi': 0.01,
    'Gree': 0.00,
  },
  'Dishwashers': {
    'Siemens': 0.25,
    'LG': 0.22,
    'Beko': 0.18,
    'Samsung': 0.14,
    'Midea': 0.11,
    'Toshiba': 0.05,
    'Haier': 0.03,
    'Panasonic': 0.01,
    'Hitachi': 0.01,
    'Super General': 0.00,
    'Gree': 0.00,
    'Philips': 0.00,
  },
  'TV / Built-ins': {
    'Samsung': 0.32,
    'LG': 0.28,
    'Philips': 0.12,
    'Haier': 0.09,
    'Toshiba': 0.08,
    'Midea': 0.04,
    'Panasonic': 0.04,
    'Siemens': 0.01,
    'Hitachi': 0.01,
    'Super General': 0.01,
    'Gree': 0.00,
    'Beko': 0.00,
  },
};

// Seeded pseudo-random generator for consistent data across reloads
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate the exact 230 Independent Retailer (IR) dealers across Oman
export function generateDealers(): Dealer[] {
  const dealers: Dealer[] = [];
  
  // Real Oman commercial shop prefixes and names typical for IR dealers
  const dealerPrefixes = [
    'Al Zahra Electronics', 'Al Nahda Home Appliances', 'Al Baraka Trading',
    'Modern Oasis Appliances', 'Al Hilal Electronics Center', 'Al Mazoon Trading & Stores',
    'Oman Star Home Appliances', 'Al Anwar Digital & Electronics', 'Golden Falcon Trading',
    'Al Khaleej Appliance Gallery', 'Al Safa Electronics', 'Al Waha Home Needs',
    'Sultanate Pioneer Stores', 'Al Batinah Electronics Co.', 'Arabian Breeze Appliances',
    'Capital Electronics', 'Al Maha Trading Store', 'Al Shurooq Home Equipment',
    'Al Fajar Cooling & Appliances', 'Muscat Pearl Electronics', 'Al Taqwa General Trading',
    'Al Dhia Appliance Hub', 'National Corner Appliances', 'Al Rawabi Electronics'
  ];

  const arabicPrefixes = [
    'إلكترونيات الزهراء', 'أجهزة النهضة المنزلية', 'مؤسسة البركة للتجارة',
    'واحة الأجهزة الحديثة', 'مركز الهلال للإلكترونيات', 'المزن للتجارة والأجهزة',
    'أجهزة نجمة عمان', 'الأنوار للأجهزة الإلكترونية', 'الصقر الذهبي للتجارة',
    'معرض الخليج للأجهزة', 'إلكترونيات الصفا', 'مستلزمات الواحة المنزلية',
    'متاجر رواد السلطنة', 'شركة إلكترونيات الباطنة', 'نسيم الأجهزة العربية',
    'إلكترونيات العاصمة', 'محل المها للتجارة', 'معدات الشروق المنزلية',
    'الفجر للتبريد والأجهزة', 'لؤلؤة مسقط للإلكترونيات', 'التقوى للتجارة العامة',
    'أجهزة الضياء المركزية', 'أجهزة الركن الوطني', 'إلكترونيات الروابي'
  ];

  // Distribution weights across governorates reflecting commercial IR density in Oman:
  // Muscat: ~75 dealers (33%)
  // Al Batinah North & South: ~60 dealers (26%)
  // Al Dakhiliyah: ~32 dealers (14%)
  // Dhofar: ~30 dealers (13%)
  // Al Sharqiyah: ~18 dealers (8%)
  // Al Dhahirah & Buraimi & Musandam: ~15 dealers (6%)
  
  const regionDistribution: { region: OmanRegion; targetCount: number; baseLat: number; baseLng: number }[] = [
    { region: 'Muscat', targetCount: 75, baseLat: 23.5880, baseLng: 58.3829 },
    { region: 'Al Batinah North', targetCount: 38, baseLat: 24.3461, baseLng: 56.7075 },
    { region: 'Al Batinah South', targetCount: 24, baseLat: 23.6828, baseLng: 57.8864 },
    { region: 'Dhofar', targetCount: 30, baseLat: 17.0151, baseLng: 54.0924 },
    { region: 'Al Dakhiliyah', targetCount: 28, baseLat: 22.9333, baseLng: 57.5333 },
    { region: 'Al Sharqiyah North', targetCount: 11, baseLat: 22.6906, baseLng: 58.5334 },
    { region: 'Al Sharqiyah South', targetCount: 10, baseLat: 22.5667, baseLng: 59.5289 },
    { region: 'Al Dhahirah', targetCount: 6, baseLat: 23.2307, baseLng: 56.5161 },
    { region: 'Al Buraimi', targetCount: 5, baseLat: 24.2509, baseLng: 55.7931 },
    { region: 'Musandam', targetCount: 3, baseLat: 26.1833, baseLng: 56.2500 },
  ];

  let idCounter = 1;
  const auditors = ['Salim Al-Harthy (IBTSO Field Agent 1)', 'Rashid Al-Balushi (IBTSO Field Agent 2)', 'Ahmed Al-Maamari (IBTSO Field Agent 3)', 'Khamis Al-Saadi (IBTSO Field Agent 4)'];

  regionDistribution.forEach((regInfo) => {
    const cities = CITIES_BY_REGION[regInfo.region];
    for (let i = 0; i < regInfo.targetCount; i++) {
      const city = cities[i % cities.length];
      const prefixIndex = (idCounter - 1) % dealerPrefixes.length;
      const branchNum = Math.floor((idCounter - 1) / dealerPrefixes.length) + 1;
      const dealerName = branchNum === 1 ? `${dealerPrefixes[prefixIndex]} - ${city}` : `${dealerPrefixes[prefixIndex]} (${city} Branch ${branchNum})`;
      const arabicName = branchNum === 1 ? `${arabicPrefixes[prefixIndex]} - ${city}` : `${arabicPrefixes[prefixIndex]} (فرع ${city} ${branchNum})`;

      const rand = pseudoRandom(idCounter * 17);
      const tier: Dealer['tier'] = rand > 0.65 ? 'Tier A (High Volume)' : rand > 0.25 ? 'Tier B (Mid Volume)' : 'Tier C (Local)';
      const capacity = tier === 'Tier A (High Volume)' ? 45 + Math.floor(rand * 25) : tier === 'Tier B (Mid Volume)' ? 25 + Math.floor(rand * 15) : 12 + Math.floor(rand * 10);

      // Lat lng small jitter
      const latOffset = (pseudoRandom(idCounter * 31) - 0.5) * 0.12;
      const lngOffset = (pseudoRandom(idCounter * 47) - 0.5) * 0.12;

      dealers.push({
        id: `ir-${String(idCounter).padStart(3, '0')}`,
        code: `OM-IR-${String(idCounter).padStart(3, '0')}`,
        name: dealerName,
        arabicName,
        region: regInfo.region,
        city,
        area: `${city} Central Commercial St.`,
        phone: `+968 9${Math.floor(1000000 + pseudoRandom(idCounter * 91) * 8999999)}`,
        tier,
        categoryFootprint: CATEGORIES,
        displayCapacity: capacity,
        auditDate: '2026-10-02',
        auditor: auditors[idCounter % auditors.length],
        coordinates: {
          lat: Number((regInfo.baseLat + latOffset).toFixed(4)),
          lng: Number((regInfo.baseLng + lngOffset).toFixed(4)),
        },
      });

      idCounter++;
    }
  });

  return dealers; // Exactly 230 dealers
}

export const DEALERS = generateDealers();

// Generate Display audit items for the 230 dealers across current and previous months
export function generateAuditDisplays(dealers: Dealer[]): ModelDisplay[] {
  const displays: ModelDisplay[] = [];
  let displayCounter = 1;

  const months = ['2026-08', '2026-09', '2026-10'];

  dealers.forEach((dealer) => {
    // Generate displays per category for this dealer
    CATEGORIES.forEach((cat) => {
      // Number of displays for this category in this shop (varies from 4 to 12 based on tier)
      const baseUnits = dealer.tier === 'Tier A (High Volume)' ? 10 : dealer.tier === 'Tier B (Mid Volume)' ? 6 : 4;
      const weights = BRAND_CATEGORY_WEIGHTS[cat];

      months.forEach((m, mIdx) => {
        // Minor monthly variation
        const unitsCount = Math.max(3, baseUnits + ((mIdx % 2 === 0) ? 1 : 0));
        
        let cumulative = 0;
        const brandThresholds: { brand: Brand; threshold: number }[] = [];
        Object.entries(weights).forEach(([bName, weight]) => {
          cumulative += weight;
          brandThresholds.push({ brand: bName as Brand, threshold: cumulative });
        });

        for (let u = 0; u < unitsCount; u++) {
          const rand = pseudoRandom(dealer.coordinates.lat * 1000 + u * 13 + mIdx * 53 + cat.length);
          const selectedBrand = brandThresholds.find(bt => rand <= bt.threshold)?.brand || 'LG';

          const spotRand = pseudoRandom(u * 7 + rand * 100);
          const displayStatus: ModelDisplay['displayStatus'] = 
            spotRand > 0.75 ? 'Prime Display (Eye-level)' :
            spotRand > 0.5 ? 'Endcap / Feature Stand' :
            spotRand > 0.2 ? 'Standard Floor' : 'Stack/Secondary';

          displays.push({
            id: `dsp-${displayCounter++}`,
            dealerId: dealer.id,
            category: cat,
            brand: selectedBrand,
            modelNumber: `${selectedBrand.substring(0, 2).toUpperCase()}-${cat.substring(0, 2).toUpperCase()}-${100 + ((displayCounter * 7) % 900)}`,
            series: `${selectedBrand} NeoSeries ${(displayCounter % 4) + 1}`,
            displayStatus,
            hasBrandSignage: spotRand > 0.4,
            hasPromoTag: spotRand > 0.6,
            energyStarRating: 3 + (displayCounter % 3),
            month: m,
          });
        }
      });
    });
  });

  return displays;
}

export const ALL_DISPLAYS = generateAuditDisplays(DEALERS);
