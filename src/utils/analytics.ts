import type { Brand, Category, ModelDisplay, BrandShareMetric, OmanRegion, Dealer } from '../types/intelligence';
import { BRANDS } from '../data/mockDealers';

export function calculateBrandShares(
  displays: ModelDisplay[],
  previousDisplays: ModelDisplay[] = []
): BrandShareMetric[] {
  const total = displays.length;
  if (total === 0) return [];

  const prevTotal = previousDisplays.length;

  // Count per brand
  const counts: Record<Brand, { count: number; primeCount: number }> = {} as any;
  const prevCounts: Record<Brand, number> = {} as any;

  BRANDS.forEach((b) => {
    counts[b] = { count: 0, primeCount: 0 };
    prevCounts[b] = 0;
  });

  displays.forEach((d) => {
    if (!counts[d.brand]) {
      counts[d.brand] = { count: 0, primeCount: 0 };
    }
    counts[d.brand].count++;
    if (d.displayStatus === 'Prime Display (Eye-level)' || d.displayStatus === 'Endcap / Feature Stand') {
      counts[d.brand].primeCount++;
    }
  });

  previousDisplays.forEach((d) => {
    if (!prevCounts[d.brand]) {
      prevCounts[d.brand] = 0;
    }
    prevCounts[d.brand]++;
  });

  const metrics: BrandShareMetric[] = Object.entries(counts)
    .filter(([_, data]) => data.count > 0)
    .map(([brandStr, data]) => {
      const brand = brandStr as Brand;
      const share = Number(((data.count / total) * 100).toFixed(1));
      const prevShare = prevTotal > 0 ? Number(((prevCounts[brand] / prevTotal) * 100).toFixed(1)) : share;
      const momChange = Number((share - prevShare).toFixed(1));
      const primeRatio = data.count > 0 ? Number(((data.primeCount / data.count) * 100).toFixed(1)) : 0;

      return {
        brand,
        modelsDisplayed: data.count,
        visibilityShare: share,
        previousShare: prevShare,
        momChange,
        rank: 0,
        primeSpotRatio: primeRatio,
      };
    });

  // Sort descending by share and assign ranks
  metrics.sort((a, b) => b.modelsDisplayed - a.modelsDisplayed);
  metrics.forEach((m, idx) => {
    m.rank = idx + 1;
  });

  return metrics;
}

export function filterDisplays(
  allDisplays: ModelDisplay[],
  allDealers: Dealer[],
  filters: {
    category?: Category | 'All Categories';
    brand?: Brand | 'All Brands';
    region?: OmanRegion | 'All Regions';
    city?: string | 'All Cities';
    dealerId?: string | 'All Dealers';
    month?: string;
  }
): ModelDisplay[] {
  // First map dealer filters
  const dealerMap = new Map(allDealers.map((d) => [d.id, d]));

  return allDisplays.filter((d) => {
    if (filters.month && d.month !== filters.month) return false;
    if (filters.category && filters.category !== 'All Categories' && d.category !== filters.category) return false;
    if (filters.brand && filters.brand !== 'All Brands' && d.brand !== filters.brand) return false;

    const dealer = dealerMap.get(d.dealerId);
    if (!dealer) return false;

    if (filters.dealerId && filters.dealerId !== 'All Dealers' && d.dealerId !== filters.dealerId) return false;
    if (filters.region && filters.region !== 'All Regions' && dealer.region !== filters.region) return false;
    if (filters.city && filters.city !== 'All Cities' && dealer.city !== filters.city) return false;

    return true;
  });
}
