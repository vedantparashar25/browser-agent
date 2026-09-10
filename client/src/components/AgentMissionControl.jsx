import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Zap,
  Star,
  Compass,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Layers,
  Search
} from 'lucide-react';

const LIVE_RADAR_PRODUCTS = [
  {
    category: 'Category 1: Tech',
    categoryBadge: 'bg-sky-50 text-sky-700 border-sky-200/80',
    site: 'Amazon India',
    siteColor: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'boAt Airdopes 141 ANC TWS Earbuds',
    subtitle: '32dB Active Noise Cancellation • 42H Playback • Quad Mics',
    price: '₹1,299',
    originalPrice: '₹4,490',
    discount: '71% Off',
    rating: 4.4,
    reviews: '184k+ ratings',
    image: 'https://m.media-amazon.com/images/I/61KNJav3S9L._SX522_.jpg',
    query: 'boAt Airdopes 141 ANC earbuds under 2000',
    verdict: 'Near All-Time Low • Save ₹3,191'
  },
  {
    category: 'Category 2: Household',
    categoryBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    site: 'Flipkart',
    siteColor: 'bg-blue-500/10 text-blue-700 border-blue-200/80',
    title: 'Ninja Air Fryer MAX PRO 6.2L (6-in-1)',
    subtitle: '6.2L Family Capacity • Air Fry, Roast, Crisp • 90% Less Oil',
    price: '₹8,999',
    originalPrice: '₹13,999',
    discount: '35% Off',
    rating: 4.6,
    reviews: '22k+ ratings',
    image: 'https://m.media-amazon.com/images/I/61NEz27pw3L._AC_UY218_.jpg',
    query: 'air fryer digital under 10000',
    verdict: 'Best Kitchen Mover • Deal Active'
  },
  {
    category: 'Category 3: Dresses',
    categoryBadge: 'bg-purple-50 text-purple-700 border-purple-200/80',
    site: 'Myntra',
    siteColor: 'bg-pink-500/10 text-pink-700 border-pink-200/80',
    title: 'Pure Cotton Embroidered Kurta Set with Dupatta',
    subtitle: '100% Breathable Slub Cotton • Handcrafted Zari Work • 3-Piece',
    price: '₹1,394',
    originalPrice: '₹4,399',
    discount: '68% Off',
    rating: 4.3,
    reviews: '54k+ ratings',
    image: 'https://m.media-amazon.com/images/I/71zO13a6KvL._AC_UL320_.jpg',
    query: 'women cotton kurta set under 1500',
    verdict: 'Festive Bestseller • Direct Return'
  },
  {
    category: 'Category 4: Beauty',
    categoryBadge: 'bg-rose-50 text-rose-700 border-rose-200/80',
    site: 'Nykaa',
    siteColor: 'bg-rose-500/10 text-rose-700 border-rose-200/80',
    title: 'Minimalist 0.3% Ceramide Barrier Moisturizer',
    subtitle: 'Ceramides + Madecassoside • Fragrance Free • Sensitive Skin',
    price: '₹569',
    originalPrice: '₹599',
    discount: 'Verified Price',
    rating: 4.5,
    reviews: '76k+ ratings',
    image: 'https://m.media-amazon.com/images/I/61zy-+lTFIL._AC_UL320_.jpg',
    query: 'minimalist ceramide moisturizer',
    verdict: 'Top Barrier Pick • Official Store'
  }
];

const AUTONOMOUS_MISSIONS = [
  {
    title: 'Find Air Fryer under ₹10,000 with ±10% Alternatives',
    query: 'air fryer digital under 10000'
  },
  {
    title: 'Compare 5G Phones under ₹25,000 for Photography',
    query: '5G smartphone under 25000'
  },
  {
    title: 'Women Cotton Kurta Sets under ₹1,500 with Dupatta',
    query: 'women cotton kurta set under 1500'
  },
  {
    title: 'GaN 65W Fast Chargers under ₹2,500 for Laptops & Phones',
    query: 'fast charger under 2500'
  }
];

export default function AgentMissionControl({ onPreset }) {
  return (
    <div className="space-y-5">
      {/* 1. Hero Command Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Autonomous Commerce Engine Active
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200/60">
              Playwright DOM Ready
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span>Anti-Bot Shield Active</span>
            <span className="text-slate-300">•</span>
            <span>Zero Sponsored Ads</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Autonomous Shopping & Live Market Arbitrage
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
            Unlike regular search engines that bombard you with sponsored ad placements and deceptive affiliate redirects,
            this browser agent launches an autonomous headless session directly into store DOM trees to extract authentic live prices,
            compute mathematical <span className="font-semibold text-slate-900">±10% same-category alternatives</span>, and forecast upcoming festival price drops.
          </p>
        </div>

        {/* Live Multi-Store Connected Status */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Verified Stores:</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/70 text-[11px] font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Amazon India (Canonical /dp/ 200 OK)</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/70 text-[11px] font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Flipkart (Price Tracker Active)</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-pink-50 text-pink-800 border border-pink-200/70 text-[11px] font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Myntra (Apparel Index)</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[11px] font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Croma (Stock Inventory)</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200/70 text-[11px] font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Nykaa (Beauty Sync)</span>
          </span>
        </div>
      </div>

      {/* 2. Four Differentiating Superpowers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-1.5 shadow-2xs hover:border-slate-300 transition-all">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-1">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-semibold text-slate-900">Direct Canonical Links Only</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Eliminates intermediate tracking cookies and ad redirections. Navigates straight to the genuine product page for 1-click checkout.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-1.5 shadow-2xs hover:border-slate-300 transition-all">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1">
            <TrendingDown className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-semibold text-slate-900">Mathematical ±10% Price Corridor</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Automatically calculates same-category alternatives within [0.9×, 1.1×] price bounds so you know if you are overpaying.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-1.5 shadow-2xs hover:border-slate-300 transition-all">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-semibold text-slate-900">90-Day Historical Price Radar</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Scans price history curves, detects artificial inflation before sales, and tells you whether to BUY NOW or WAIT FOR UPCOMING SALES.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-1.5 shadow-2xs hover:border-slate-300 transition-all">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-1">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-semibold text-slate-900">Phonetic & Typo Correction</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Type quickly with abbreviations (e.g. "chrg under 2500" or "airfryr"). The agent intelligently corrects spelling without confusing departments.
          </p>
        </div>
      </div>

      {/* 3. Live Cross-Category Deal Arbitrage Radar (Interactive Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Today's Live E-Commerce Arbitrage Radar
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Multi-Store Verified
            </span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any card to launch autonomous investigation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LIVE_RADAR_PRODUCTS.map((prod, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 hover:border-sky-300 rounded-xl p-3.5 flex flex-col justify-between transition-all hover:shadow-xs group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${prod.siteColor}`}>
                    {prod.site}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${prod.categoryBadge}`}>
                    {prod.category}
                  </span>
                </div>

                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 group-hover:text-sky-700">
                      {prod.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {prod.subtitle}
                    </p>
                    <div className="flex items-center space-x-2 mt-1.5">
                      <span className="text-xs font-bold text-slate-900">{prod.price}</span>
                      <span className="text-[10px] text-slate-400 line-through">{prod.originalPrice}</span>
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1 rounded">
                        {prod.discount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-500">
                  {prod.verdict}
                </span>
                <button
                  type="button"
                  onClick={() => onPreset(prod.query)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium flex items-center space-x-1 transition-colors shadow-2xs"
                >
                  <span>Investigate</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Instant Autonomous Missions */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
        <div className="flex items-center space-x-2">
          <Compass className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-xs font-semibold text-slate-800">
            Or launch a complex autonomous research mission:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {AUTONOMOUS_MISSIONS.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onPreset(m.query)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-700 hover:text-sky-900 transition-colors text-xs font-medium flex items-center space-x-1.5 shadow-2xs group"
            >
              <span>{m.title}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
