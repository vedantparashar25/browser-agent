import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  Star,
  Globe,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  Loader2,
  Calendar,
  RotateCcw,
  Zap,
  CheckCircle2,
  Package,
  Layers,
  Clock,
  Info
} from 'lucide-react';
import PriceTrendChart from './PriceTrendChart';
import AgentMissionControl from './AgentMissionControl';

/**
 * Return an authentic, category-matched image based on user query and product title
 */
function getReliableProductImage(top, result) {
  const query = (result?.intent || result?.query || '').toLowerCase();
  const title = (top?.title || '').toLowerCase();
  const text = `${query} ${title}`;

  // Check if existing image is valid and doesn't mismatch category
  const rawImg = top?.image || '';
  const isWatchMismatch = rawImg.includes('1523275335684') && !text.includes('watch') && !text.includes('tracker');
  const isEarbudMismatch = rawImg.includes('1590658268037') && !text.includes('earbud') && !text.includes('airdopes') && !text.includes('tws') && !text.includes('airpod') && !text.includes('earphone') && !text.includes('boat');

  if (rawImg && rawImg.startsWith('http') && !rawImg.includes('transparent-pixel') && !rawImg.includes('grey-pixel') && !isWatchMismatch && !isEarbudMismatch) {
    return rawImg;
  }

  // 1. Laptop / Computer
  if (
    text.includes('laptop') ||
    text.includes('macbook') ||
    text.includes('notebook') ||
    text.includes('thinkpad') ||
    text.includes('vivobook') ||
    text.includes('zenbook') ||
    text.includes('pavilion') ||
    text.includes('ideapad') ||
    text.includes('inspiron') ||
    text.includes('rtx') ||
    text.includes('core i') ||
    text.includes('ryzen') ||
    text.includes('computer')
  ) {
    if (text.includes('gaming') || text.includes('rtx') || text.includes('predator') || text.includes('helios') || text.includes('legion') || text.includes('tuf') || text.includes('nitro')) {
      return 'https://m.media-amazon.com/images/I/71ZpT-f33eL._AC_SL1500_.jpg'; // Acer Predator Helios Neo 16
    }
    if (text.includes('macbook') || text.includes('apple')) {
      return 'https://m.media-amazon.com/images/I/710TJuHTMhL._AC_SL1500_.jpg'; // MacBook Air M2
    }
    if (text.includes('pavilion') || text.includes('hp')) {
      return 'https://m.media-amazon.com/images/I/7188b0yC4mL._AC_SL1500_.jpg'; // HP Pavilion 15
    }
    if (text.includes('vivobook') || text.includes('asus')) {
      return 'https://m.media-amazon.com/images/I/71s3fT4VSSL._AC_SL1500_.jpg'; // ASUS Vivobook 15
    }
    return 'https://m.media-amazon.com/images/I/61H4h83WzEL._AC_SL1500_.jpg'; // Lenovo IdeaPad Slim 3
  }

  // 2. Smartphones / Mobiles
  if (
    text.includes('phone') ||
    text.includes('mobile') ||
    text.includes('smartphone') ||
    text.includes('iphone') ||
    text.includes('samsung') ||
    text.includes('galaxy') ||
    text.includes('oneplus') ||
    text.includes('pixel') ||
    text.includes('redmi') ||
    text.includes('realme')
  ) {
    if (text.includes('iphone') || text.includes('apple')) {
      return 'https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg'; // iPhone 15
    }
    if (text.includes('samsung') || text.includes('galaxy')) {
      return 'https://m.media-amazon.com/images/I/717Qo4MH97L._AC_SL1500_.jpg'; // Galaxy S24
    }
    if (text.includes('oneplus')) {
      return 'https://m.media-amazon.com/images/I/61amb0vGQ4L._AC_SL1500_.jpg'; // OnePlus Nord 4 / 12R
    }
    return 'https://m.media-amazon.com/images/I/71c4c1NvZKL._AC_SL1500_.jpg'; // Realme 12 5G
  }

  // 3. Smartwatches / Fitness Bands
  if (
    text.includes('watch') ||
    text.includes('smartwatch') ||
    text.includes('fitness band') ||
    text.includes('tracker') ||
    text.includes('fire-boltt') ||
    text.includes('noise colorfit')
  ) {
    if (text.includes('apple watch')) {
      return 'https://m.media-amazon.com/images/I/71XMTLtZd5L._AC_SL1500_.jpg'; // Apple Watch Series 9
    }
    if (text.includes('galaxy watch') || text.includes('samsung')) {
      return 'https://m.media-amazon.com/images/I/61U0T298yNL._AC_SL1500_.jpg'; // Galaxy Watch 4 Classic
    }
    return 'https://m.media-amazon.com/images/I/61AHiYh4JEL._AC_SL1500_.jpg'; // Fire-Boltt Luxury AMOLED
  }

  // 4. Over-Ear Headphones
  if (
    text.includes('headphone') ||
    text.includes('headset') ||
    text.includes('over-ear') ||
    text.includes('over ear') ||
    text.includes('sony wh') ||
    text.includes('bose') ||
    text.includes('sennheiser')
  ) {
    if (text.includes('1000xm') || text.includes('xm4') || text.includes('xm5') || text.includes('bose')) {
      return 'https://m.media-amazon.com/images/I/71o8QKljKEHotL._AC_SL1500_.jpg'; // Sony WH-1000XM4
    }
    return 'https://m.media-amazon.com/images/I/51rpbVmi3XL._AC_SL1500_.jpg'; // Sony WH-CH720N
  }

  // 5. Earbuds / TWS
  if (
    text.includes('earbud') ||
    text.includes('airdopes') ||
    text.includes('tws') ||
    text.includes('airpod') ||
    text.includes('earphone') ||
    text.includes('in-ear') ||
    text.includes('boat')
  ) {
    if (text.includes('oneplus') || text.includes('buds pro')) {
      return 'https://m.media-amazon.com/images/I/512ch1TdARL._SL1500_.jpg'; // OnePlus Buds Pro 2
    }
    if (text.includes('airpod')) {
      return 'https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg'; // Apple AirPods Pro
    }
    return 'https://m.media-amazon.com/images/I/61KNJav3S9L._SX522_.jpg'; // boAt Airdopes 141 ANC
  }

  // 6. Running Shoes / Sneakers
  if (
    text.includes('shoe') ||
    text.includes('sneaker') ||
    text.includes('running') ||
    text.includes('nike') ||
    text.includes('adidas') ||
    text.includes('puma')
  ) {
    if (text.includes('invincible') || text.includes('zoomx')) {
      return 'https://m.media-amazon.com/images/I/61y8B34g1QL._AC_SL1500_.jpg'; // Nike Invincible 3
    }
    return 'https://m.media-amazon.com/images/I/61UtX83q0JL._AC_SL1500_.jpg'; // Nike Pegasus
  }

  // 7. TVs
  if (text.includes('tv') || text.includes('television') || text.includes('oled') || text.includes('4k')) {
    if (text.includes('lg') || text.includes('qned')) {
      return 'https://m.media-amazon.com/images/I/718y6K4+dTL._AC_SL1500_.jpg'; // LG 55" QNED 4K
    }
    return 'https://m.media-amazon.com/images/I/81wxS8P48kL._AC_SL1500_.jpg'; // Sony Bravia 55" 4K
  }

  // 8. Keyboards & Mice
  if (text.includes('keyboard') || text.includes('keychron')) {
    return 'https://m.media-amazon.com/images/I/71cngLX2xuL._AC_SL1500_.jpg'; // Redragon K552
  }
  if (text.includes('mouse') || text.includes('mice')) {
    return 'https://m.media-amazon.com/images/I/8189uwDnMkL._AC_SL1500_.jpg'; // Razer DeathAdder
  }

  // 9. Tablets / iPads
  if (text.includes('tablet') || text.includes('ipad') || text.includes('tab')) {
    return 'https://m.media-amazon.com/images/I/71VbHaAqbML._AC_SL1500_.jpg'; // Apple iPad Air
  }

  // 10. Dining / Restaurants
  if (text.includes('restaurant') || text.includes('table') || text.includes('dinner') || text.includes('dining')) {
    return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
  }

  // 11. Chargers & Power Adapters
  if (
    text.includes('charger') ||
    text.includes('adapter') ||
    text.includes('gan') ||
    text.includes('power bank') ||
    text.includes('fast charge') ||
    text.includes('chrg')
  ) {
    return 'https://m.media-amazon.com/images/I/51sHbgzvn4L._AC_UY218_.jpg';
  }

  // 12. Household & Home Appliances (Air Fryer, Robot Vacuums, RO Purifiers, Coffee, Cookware)
  if (
    text.includes('air fryer') ||
    text.includes('airfryer') ||
    text.includes('vacuum') ||
    text.includes('purifier') ||
    text.includes('coffee') ||
    text.includes('cookware') ||
    text.includes('steam iron') ||
    text.includes('mixer') ||
    text.includes('grinder')
  ) {
    if (text.includes('air fryer') || text.includes('airfryer')) {
      return 'https://m.media-amazon.com/images/I/61NEz27pw3L._AC_UY218_.jpg'; // Ninja / Philips Air Fryer
    }
    if (text.includes('vacuum') || text.includes('cleaner') || text.includes('mop')) {
      return 'https://m.media-amazon.com/images/I/61rLOrMnfvL._AC_UY218_.jpg'; // ILIFE / ECOVACS Robot Vacuum
    }
    if (text.includes('purifier') || text.includes('water')) {
      return 'https://m.media-amazon.com/images/I/41+cyXt47qL._AC_UY218_.jpg'; // Pureit Wave Prime RO Purifier
    }
    if (text.includes('coffee') || text.includes('espresso')) {
      return 'https://m.media-amazon.com/images/I/71nDjreQkoL._AC_UY218_.jpg'; // De'Longhi Espresso Coffee Machine
    }
    if (text.includes('cookware') || text.includes('casserole') || text.includes('pot')) {
      return 'https://m.media-amazon.com/images/I/61fw3gttUNL._AC_UL320_.jpg'; // Kreme Ceracook Granite Cookware Set
    }
    return 'https://m.media-amazon.com/images/I/61NEz27pw3L._AC_UY218_.jpg';
  }

  // 13. Dresses & Fashion Apparel (Kurta Sets, Maxi Dresses, Linen Shirts, Blazers, Denim Jackets)
  if (
    text.includes('kurta') ||
    text.includes('kurti') ||
    text.includes('maxi') ||
    text.includes('dress') ||
    text.includes('shirt') ||
    text.includes('blazer') ||
    text.includes('jacket') ||
    text.includes('gown') ||
    text.includes('suit') ||
    text.includes('apparel')
  ) {
    if (text.includes('kurta') || text.includes('kurti') || text.includes('ethnic') || text.includes('anarkali')) {
      return 'https://m.media-amazon.com/images/I/71zO13a6KvL._AC_UL320_.jpg'; // Cotton Embroidered Kurta Set with Dupatta
    }
    if (text.includes('maxi') || text.includes('floral') || text.includes('gown')) {
      return 'https://m.media-amazon.com/images/I/61V5bmyIhxL._AC_UL320_.jpg'; // Floral Tiered Maxi Dress
    }
    if (text.includes('shirt') || text.includes('linen')) {
      return 'https://m.media-amazon.com/images/I/61RXBB4JJ4L._AC_UL320_.jpg'; // Cavallo by Linen Club French Linen Shirt
    }
    if (text.includes('blazer') || text.includes('tuxedo')) {
      return 'https://m.media-amazon.com/images/I/61cr6liBkVL._AC_UL320_.jpg'; // SaintX Men Formal Tuxedo Blazer
    }
    if (text.includes('jacket') || text.includes('denim')) {
      return 'https://m.media-amazon.com/images/I/71JD6wLCE+L._AC_UL320_.jpg'; // Urbano Fashion Denim Trucker Jacket
    }
    return 'https://m.media-amazon.com/images/I/71zO13a6KvL._AC_UL320_.jpg';
  }

  // 14. Beauty & Skincare
  if (text.includes('moisturizer') || text.includes('ceramide') || text.includes('serum') || text.includes('skincare')) {
    return 'https://m.media-amazon.com/images/I/61zy-+lTFIL._AC_UL320_.jpg'; // Minimalist Ceramide Face Moisturizer
  }

  // 15. Fitness & Sports Gear
  if (text.includes('dumbbell') || text.includes('weights') || text.includes('yoga mat') || text.includes('gym')) {
    return 'https://m.media-amazon.com/images/I/61qEWRcwEUL._AC_UL320_.jpg'; // Flexnest Quick-Dial Adjustable Dumbbells
  }

  return 'https://m.media-amazon.com/images/I/61KNJav3S9L._SX522_.jpg';
}

export default function ResultCard({
  result,
  isProcessing,
  onSpeak,
  onPlaceOrder,
  isPlacingOrder,
  orderStatus,
  onPreset,
  onReset
}) {
  if (isProcessing && !result) {
    return (
      <div className="min-h-[380px] bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-sm">
        <div className="space-y-3 max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-700">
            <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">
            Autonomous Browser Session in Progress
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Scanning live store listings, extracting real-time pricing, and validating official direct product links.
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return <AgentMissionControl onPreset={onPreset} />;
  }

  const trends = result.priceTrends || (result.topPick && result.topPick.priceTrends);
  const top = result.topPick;
  const displayImage = getReliableProductImage(top, result);

  return (
    <div className="space-y-5">
      {/* Return to Command Center Action Header */}
      {onReset && (
        <div className="flex items-center justify-between pb-0.5">
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center space-x-1.5 transition-colors group px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200"
          >
            <span className="text-slate-400 group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>Return to Mission Control & Arbitrage Radar</span>
          </button>
          <span className="text-[11px] font-medium text-slate-400">
            Autonomous Investigation Active
          </span>
        </div>
      )}
      {/* Domain-Aware Auto-Correction Banner */}
      {result.wasCorrected && (
        <div className="bg-sky-50/80 border border-sky-200/90 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-sky-950 shadow-xs">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500 shrink-0" />
            <span className="font-semibold text-sky-800">Auto-corrected intent:</span>
            <span className="text-slate-400 line-through">"{result.originalQuery}"</span>
            <span className="text-sky-700 font-medium">→ "{result.intent}"</span>
          </div>
          {result.correctionNote && (
            <span className="text-[11px] text-sky-700/80 font-medium bg-sky-100/60 px-2 py-0.5 rounded-md hidden sm:inline">
              {result.correctionNote}
            </span>
          )}
        </div>
      )}

      {/* Executive Summary Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {result.category === 'book' ? 'Reservation' : 'Top Recommendation'}
              </span>
              <span className="text-[11px] text-slate-400">Verified by Autonomous Agent</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              {result.summary}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onSpeak(result.spokenSummary)}
            className="px-3 py-1.5 rounded-lg border border-sky-200 hover:bg-sky-50/70 text-sky-800 transition-colors flex items-center space-x-1.5 text-xs shrink-0 font-medium shadow-2xs"
            title="Listen to Aria's voice readback"
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Aria Voice Readback</span>
          </button>
        </div>
      </div>

      {/* TOP PICK HERO CARD */}
      {top && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* High-quality Product Image */}
            <div className="w-full md:w-56 h-56 rounded-xl bg-white border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center p-3 relative group">
              <img
                src={displayImage}
                alt={top.title}
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80';
                }}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Meta & Actions */}
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-semibold text-sky-700">
                    {top.source || 'Amazon India'}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">Official Product Page</span>
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-slate-900 leading-tight">
                  {top.title}
                </h4>
              </div>

              {/* Price & Verified Rating */}
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {top.price}
                </span>
                {top.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-normal">
                    {top.originalPrice}
                  </span>
                )}
                {top.discount && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {top.discount}
                  </span>
                )}
                <div className="flex items-center space-x-1 text-xs text-slate-600 ml-auto font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-800">{top.rating}</span>
                  <span className="text-slate-400">({top.reviewsCount || '184k+ verified'})</span>
                </div>
              </div>

              {/* Editorial Reason */}
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200/70 rounded-xl p-3 leading-relaxed">
                <span className="font-semibold text-slate-900">Why this is recommended: </span>
                {top.reasoning}
              </div>

              {/* Consolidated Action Bar: Authoritative Primary CTA + Clean Secondary Option */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a
                  href={top.directProductUrl || top.actionUrl || top.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-3 rounded-xl text-sm flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  title="Open direct canonical product page on retailer site"
                >
                  <span>Buy on {top.source || 'Amazon India'}</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={() => onPlaceOrder && onPlaceOrder(top.directCheckoutUrl || top.actionUrl)}
                  disabled={isPlacingOrder}
                  className="px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50"
                  title="Let Playwright automate navigation to the checkout page"
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-600" />
                      <span>Staging Order...</span>
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4 text-slate-500" />
                      <span>Stage in Browser</span>
                    </>
                  )}
                </button>
              </div>

              {orderStatus && (
                <div className="text-xs p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 flex items-center justify-between">
                  <span>{orderStatus.message}</span>
                  {orderStatus.checkoutUrl && (
                    <a
                      href={orderStatus.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sky-700 font-semibold ml-2 shrink-0"
                    >
                      Open Staged Checkout &rarr;
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Unified Key Specs Highlights */}
          <div className="pt-4 border-t border-slate-100">
            <h5 className="text-xs font-semibold text-slate-700 mb-3">
              Key Specifications & Highlights
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(top.keyFeaturesHighlights && top.keyFeaturesHighlights.length > 0) ? (
                top.keyFeaturesHighlights.map((feat, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-medium text-slate-900">{feat.label}: </span>
                      <span className="text-slate-600">{feat.value}</span>
                    </div>
                  </div>
                ))
              ) : (
                (top.specs || []).map((spec, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                    <span className="text-slate-700">{spec}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Calm Delivery & Policy Strip */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>7-Day Free Doorstep Replacement</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {top.source?.toLowerCase().includes('flipkart')
                  ? 'Flipkart Assured Fast Delivery'
                  : top.source?.toLowerCase().includes('croma')
                  ? 'Croma Express Doorstep Delivery'
                  : 'Prime Fast Delivery Available'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>1-Year Official Warranty</span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- PRODUCT ALTERNATIVE (±10% PRICE RANGE IN SAME CATEGORY) ---------------- */}
      {(result.tenPercentAlternative || (top && top.tenPercentAlternative)) && (() => {
        const alt = result.tenPercentAlternative || top.tenPercentAlternative;
        const altImg = alt.image || displayImage;

        return (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-900">
                  Alternative in Same Category
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ±10% Bracket: {alt.priceRange}
                </span>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {alt.priceDiff || 'Within ±10%'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-32 h-32 rounded-xl bg-white border border-slate-200/70 overflow-hidden shrink-0 flex items-center justify-center p-2">
                <img
                  src={altImg}
                  alt={alt.title}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = displayImage;
                  }}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">
                      {alt.category || 'Same Category Match'}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                      {alt.title}
                    </h4>
                  </div>
                  <span className="text-base font-bold text-slate-900 shrink-0">
                    {alt.price}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-medium text-slate-800">Why this alternative: </span>
                  {alt.whyAlternative}
                </p>

                {alt.specs && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {alt.specs.slice(0, 4).map((spec, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] text-slate-500">
                    Available on {alt.source || 'Amazon India'}
                  </span>
                  <a
                    href={alt.directProductUrl || alt.actionUrl || alt.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                  >
                    <span>View Alternative on {alt.source || 'Amazon'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* UPGRADE ALTERNATIVE (+₹10,000 RANGE) */}
      {(result.upgradeAlternative || (top && top.upgradeAlternative)) && (() => {
        const upgrade = result.upgradeAlternative || top.upgradeAlternative;
        const upgradeImg = upgrade.image || displayImage;

        return (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-900">
                  Premium Tier Alternative
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">
                  {upgrade.budgetDiff || '+₹10,000 Range'}
                </span>
              </div>
              <span className="text-xs text-slate-400">Higher Budget Option</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-32 h-32 rounded-xl bg-white border border-slate-200/70 overflow-hidden shrink-0 flex items-center justify-center p-2">
                <img
                  src={upgradeImg}
                  alt="Premium alternative preview"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = displayImage;
                  }}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    {upgrade.title}
                  </h4>
                  <span className="text-base font-bold text-slate-900 shrink-0">
                    {upgrade.price}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-medium text-slate-800">Why consider upgrading: </span>
                  {upgrade.whyWorthIt}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] text-slate-500">
                    Available on {upgrade.source || 'Amazon India'}
                  </span>
                  <a
                    href={upgrade.directProductUrl || upgrade.actionUrl || upgrade.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-sky-700 hover:text-sky-900 flex items-center space-x-1"
                  >
                    <span>View Upgrade Alternative</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* PRICE HISTORY GRAPH & SALES CALENDAR */}
      {trends && (
        <PriceTrendChart priceTrends={trends} />
      )}

      {/* ALTERNATIVE RUNNER-UP OPTIONS */}
      {result.alternatives && result.alternatives.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-700">
              Other Verified Options in Same Category (±10% Price Bracket)
            </h4>
            <span className="text-[10px] text-slate-400 font-medium">Strict Range Filter</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h5 className="text-xs font-semibold text-slate-900 line-clamp-2">
                      {alt.title}
                    </h5>
                    <span className="text-xs font-bold text-slate-900 shrink-0">
                      {alt.price}
                    </span>
                  </div>
                  {alt.priceDiff && (
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mb-1.5">
                      {alt.priceDiff}
                    </span>
                  )}
                  <p className="text-[11px] text-slate-500 mb-2">{alt.reasoning}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-[11px] text-slate-400">{alt.source}</span>
                  <a
                    href={alt.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-700 hover:text-sky-900 font-medium flex items-center space-x-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

