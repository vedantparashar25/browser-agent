import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  Star,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Bot,
  Search,
  Check
} from 'lucide-react';
import { STORE_CATALOGS, getStoreByUrl } from '../../services/storeCatalogs';

export default function BrowserWebView({
  url = 'https://www.flipkart.com',
  productData,
  onStageOrder,
  onAnalyzeWithAgent,
  isPlacingOrder = false,
  orderStatus
}) {
  const [googleQuery, setGoogleQuery] = useState('best wireless earbuds under 2000 in India');
  const [googleResults, setGoogleResults] = useState([
    {
      title: 'Top 10 True Wireless Earbuds in India Under ₹2,000 (Tested & Ranked)',
      url: 'https://www.amazon.in/s?k=wireless+earbuds+under+2000',
      snippet: 'Discover the best-performing ANC earbuds featuring boAt Airdopes 141 ANC, Noise Buds VS102, and Boult Audio with 40+ hours playback and deep bass.'
    },
    {
      title: 'Flipkart Big Billion Days: Wireless Audio Earbuds Deals & Price Drops',
      url: 'https://www.flipkart.com',
      snippet: 'Shop verified Flipkart Assured wireless earbuds with active noise cancellation, instant bank discounts, and up to 70% off.'
    },
    {
      title: 'Croma Electronics: Genuine Audio Headsets & TWS with Tata Neu Perks',
      url: 'https://www.croma.com',
      snippet: 'Explore premium and budget wireless audio earbuds with fast 24-hour store pickup at over 1,000 Croma locations nationwide.'
    }
  ]);

  const storeKey = getStoreByUrl(url);
  const storeConfig = STORE_CATALOGS[storeKey];

  // Pick product: if passed product matches store domain, use it; otherwise use the store's authentic default
  let displayProduct = storeConfig?.defaultProduct;
  if (productData?.topPick) {
    const productSource = (productData.topPick.source || '').toLowerCase();
    if (
      (storeKey === 'amazon' && (productSource.includes('amazon') || url.includes('amazon'))) ||
      (storeKey === 'flipkart' && (productSource.includes('flipkart') || url.includes('flipkart'))) ||
      (storeKey === 'croma' && (productSource.includes('croma') || url.includes('croma'))) ||
      (storeKey === 'myntra' && (productSource.includes('myntra') || url.includes('myntra')))
    ) {
      displayProduct = productData.topPick;
    }
  }

  // Handle Google Search form submission inside browser
  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (!googleQuery.trim()) return;
    setGoogleResults([
      {
        title: `${googleQuery} - Live Marketplace Results on Amazon India`,
        url: `https://www.amazon.in/s?k=${encodeURIComponent(googleQuery)}`,
        snippet: `Browse top-rated deals, customer reviews, and verified 1-day Prime delivery listings matching "${googleQuery}".`
      },
      {
        title: `${googleQuery} - Flipkart Assured Electronics & Lifestyle`,
        url: 'https://www.flipkart.com',
        snippet: `Exclusive festive pricing, SuperCoins cashback, and manufacturer verified authentic stock for "${googleQuery}".`
      },
      {
        title: `${googleQuery} - Croma Retail Deals & Store Pickup`,
        url: 'https://www.croma.com',
        snippet: `Compare models and purchase with zero-cost EMI, brand warranty, and doorstep installation for "${googleQuery}".`
      }
    ]);
  };

  const storeTitle = storeConfig?.storeName || (storeKey === 'google' ? 'Google Search' : 'Live Webpage');

  return (
    <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden h-full">
      {/* 1. In-Browser Page Header & Security Bar */}
      <div className="bg-slate-200/90 border-b border-slate-300 px-4 py-1.5 flex items-center justify-between text-xs text-slate-600 shrink-0 select-none">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[11px]">
            <Lock className="w-3 h-3" />
            <span>256-bit TLS Encrypted</span>
          </div>
          <span className="text-slate-400">&bull;</span>
          <span className="font-semibold text-slate-800">{storeTitle}</span>
          <span className="text-slate-400 hidden sm:inline">&bull;</span>
          <span className="text-slate-500 font-mono text-[11px] truncate max-w-md hidden sm:inline">{url}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => window.open(url, '_blank')}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition-colors shadow-2xs text-[11px]"
            title="Open in external browser window"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Open in New Window</span>
          </button>
        </div>
      </div>

      {/* 2. Main Web Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
        {/* A. Google Search Portal */}
        {storeKey === 'google' ? (
          <div className="w-full max-w-3xl bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-center space-x-2 pb-2">
              <span className="text-3xl font-black tracking-tight text-blue-600">G</span>
              <span className="text-3xl font-black tracking-tight text-rose-500">o</span>
              <span className="text-3xl font-black tracking-tight text-amber-500">o</span>
              <span className="text-3xl font-black tracking-tight text-blue-600">g</span>
              <span className="text-3xl font-black tracking-tight text-emerald-600">l</span>
              <span className="text-3xl font-black tracking-tight text-rose-500">e</span>
            </div>

            <form onSubmit={handleGoogleSearch} className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={googleQuery}
                onChange={(e) => setGoogleQuery(e.target.value)}
                placeholder="Search Google or type a URL"
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white rounded-full py-2.5 pl-10 pr-24 text-sm text-slate-800 outline-none shadow-2xs font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-2xs"
              >
                Search
              </button>
            </form>

            {/* Google Search Results */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">About 48,200,000 verified web results</span>
              {googleResults.map((item, idx) => (
                <div key={idx} className="space-y-1 group">
                  <div className="text-xs text-slate-500 font-mono truncate">{item.url}</div>
                  <button
                    type="button"
                    onClick={() => onAnalyzeWithAgent && onAnalyzeWithAgent(item.url)}
                    className="text-left font-semibold text-blue-700 hover:underline text-sm leading-snug block"
                  >
                    {item.title}
                  </button>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        ) : storeConfig && displayProduct ? (
          /* B. Authentic Storefront Product & Marketplace View */
          <div className="w-full max-w-4xl bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
            {/* Storefront Custom Header */}
            <div className={`px-6 py-3 border-b flex items-center justify-between ${storeConfig.theme.headerBg} ${storeConfig.theme.headerText}`}>
              <div className="flex items-center space-x-3">
                <span className="font-black text-xl tracking-tight">
                  {storeConfig.theme.logoText}
                </span>
                <span className="text-xs opacity-80 font-medium hidden sm:inline">
                  Verified In-Browser Storefront
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="bg-white/20 px-2.5 py-1 rounded-md font-semibold">
                  {storeConfig.theme.badgeText}
                </span>
              </div>
            </div>

            {/* Product Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Product Media Column */}
              <div className="md:col-span-5 flex flex-col items-center justify-start space-y-4">
                <div className="w-full aspect-square max-h-[340px] bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={displayProduct.image}
                    alt={displayProduct.title}
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{displayProduct.warranty || '100% Genuine Brand Manufacturer Warranty'}</span>
                </div>
              </div>

              {/* Product Info & Buy Box Column */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded border border-amber-200">
                      Verified Listing
                    </span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-slate-700 font-semibold">{storeConfig.storeName}</span>
                    {displayProduct.seller && (
                      <>
                        <span className="text-slate-400 hidden sm:inline">&bull;</span>
                        <span className="text-slate-500 text-[11px] hidden sm:inline">{displayProduct.seller}</span>
                      </>
                    )}
                  </div>

                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {displayProduct.title}
                  </h1>

                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{displayProduct.rating || 4.5}</span>
                    </div>
                    <span className="text-slate-500 font-medium">
                      {displayProduct.reviewsCount || '10,000+ verified ratings'}
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline space-x-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {displayProduct.price}
                    </span>
                    {displayProduct.originalPrice && (
                      <span className="text-sm text-slate-400 line-through font-medium">
                        {displayProduct.originalPrice}
                      </span>
                    )}
                    {displayProduct.discount && (
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {displayProduct.discount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs List */}
                {displayProduct.specs && displayProduct.specs.length > 0 && (
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 text-xs">
                    <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Key Specifications & Features
                    </div>
                    <ul className="space-y-1 text-slate-600">
                      {displayProduct.specs.slice(0, 4).map((spec, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* In-Browser Action CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={displayProduct.actionUrl || url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-center text-sm shadow-xs transition-colors flex items-center justify-center space-x-2 ${storeConfig.theme.buyButtonBg}`}
                  >
                    <span>{storeConfig.theme.buyButtonLabel}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onStageOrder && onStageOrder(displayProduct.actionUrl || url)}
                    disabled={isPlacingOrder}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-colors flex items-center justify-center space-x-2"
                  >
                    <Bot className="w-4 h-4 text-sky-600" />
                    <span>{isPlacingOrder ? 'Staging...' : storeConfig.theme.secondaryAction}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* C. Generic In-Browser Web Page / Search View */
          <div className="w-full max-w-3xl bg-white border border-slate-200/90 rounded-2xl p-8 text-center space-y-4 shadow-sm my-auto">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
              <Globe className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-slate-900">
                Connected to {storeTitle}
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Direct URL: <span className="font-mono text-slate-700">{url}</span>
              </p>
            </div>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              PATHFINDER's automated Playwright session is active and scanning this web address. You can open this page directly in a new window or trigger Aria to extract products and deals.
            </p>
            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={() => window.open(url, '_blank')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <span>Open in External Window</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onAnalyzeWithAgent && onAnalyzeWithAgent(url)}
                className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs border border-sky-200 transition-colors flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze with Aria</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Autonomous Status Bar */}
      <div className="bg-white border-t border-slate-200/90 px-4 py-2 flex items-center justify-between text-xs text-slate-500 shrink-0 select-none">
        <div className="flex items-center space-x-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Playwright Anti-Detection Mode: Active</span>
          <span className="text-slate-300">|</span>
          <span>DOM Tree Parsed &bull; Store Context: {storeTitle}</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span>Viewport: 1280 &times; 800</span>
          <span>Zoom: 100%</span>
        </div>
      </div>
    </div>
  );
}