import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Calendar,
  Sparkles,
  Clock,
  ShieldAlert,
  AlertCircle,
  Tag,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function PriceTrendChart({ priceTrends }) {
  const [activePoint, setActivePoint] = useState(null);

  if (!priceTrends) return null;

  const {
    verdict,
    verdictBadge,
    verdictColor,
    verdictReason,
    currentPrice,
    allTimeLow,
    allTimeHigh,
    averagePrice,
    expectedLowestUpcoming,
    savingsIfWait,
    history = [],
    forecast = [],
    upcomingSales = []
  } = priceTrends;

  // Combine history and future points for the SVG coordinate system
  const allPoints = [
    ...history.map((h, i) => ({ ...h, type: 'history', index: i })),
    ...forecast.filter(f => !f.isCurrent).map((f, i) => ({ ...f, type: 'forecast', index: history.length + i }))
  ];

  const prices = allPoints.map(p => p.price);
  const minPrice = Math.min(...prices, allTimeLow * 0.95);
  const maxPrice = Math.max(...prices, allTimeHigh * 1.05);
  const priceRange = maxPrice - minPrice || 1;

  // Chart dimensions
  const width = 600;
  const height = 200;
  const padX = 40;
  const padY = 30;

  const getX = (index) => padX + (index / (allPoints.length - 1)) * (width - padX * 2);
  const getY = (price) => height - padY - ((price - minPrice) / priceRange) * (height - padY * 2);

  // Separate history path and forecast path
  const historyCoords = history.map((h, i) => ({ x: getX(i), y: getY(h.price) }));
  const todayIndex = history.length - 1;
  const todayCoord = historyCoords[todayIndex];

  const forecastCoords = [
    todayCoord,
    ...forecast.filter(f => !f.isCurrent).map((f, i) => ({
      x: getX(history.length + i),
      y: getY(f.price)
    }))
  ];

  const makePath = (coords) => {
    if (coords.length === 0) return '';
    return coords.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`), '');
  };

  const historySvgPath = makePath(historyCoords);
  const forecastSvgPath = makePath(forecastCoords);

  // Area under history curve
  const historyAreaPath = historyCoords.length > 0
    ? `${historySvgPath} L ${historyCoords[historyCoords.length - 1].x},${height - padY} L ${historyCoords[0].x},${height - padY} Z`
    : '';

  const isBuyNow = verdict === 'BUY NOW';

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
      {/* ---------------- 1. VERDICT & BEST TIME TO BUY HEADER ---------------- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide border flex items-center space-x-1.5 ${
                isBuyNow
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isBuyNow ? 'bg-emerald-600' : 'bg-amber-500'}`} />
              <span>Verdict: {verdict}</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">{verdictBadge}</span>
          </div>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed mt-1">
            {verdictReason}
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <Clock className="w-4 h-4 text-slate-500" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400 font-medium">Recommended Timing</div>
            <div className="text-xs font-semibold text-slate-900">
              {isBuyNow ? 'Immediate Purchase' : 'Wait for 8-12 Days'}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- 2. PRICE STATS BENCHMARKS ---------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5">
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>All-Time Low</span>
            <TrendingDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-base font-semibold text-slate-900 mt-1">
            ₹{allTimeLow?.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Past 90 days dip</div>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5">
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Average Market</span>
            <span className="text-slate-400 text-xs">~</span>
          </div>
          <div className="text-base font-semibold text-slate-900 mt-1">
            ₹{averagePrice?.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Typical market price</div>
        </div>

        <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-3.5">
          <div className="text-[11px] text-sky-800 flex items-center justify-between font-medium">
            <span>Current Deal</span>
            <Tag className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-base font-bold text-sky-900 mt-1">
            ₹{currentPrice?.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-sky-700 mt-0.5">Today's live price</div>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5">
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Upcoming Sale Low</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-base font-semibold text-slate-900 mt-1">
            ₹{expectedLowestUpcoming?.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {savingsIfWait > 0 ? `Save ~₹${savingsIfWait.toLocaleString('en-IN')}` : 'Best Available'}
          </div>
        </div>
      </div>

      {/* ---------------- 3. INTERACTIVE SVG PRICE GRAPH ---------------- */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-slate-600" />
            90-Day Price Radar & Forecast
          </span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-0.5 bg-sky-600 inline-block rounded" />
              <span className="text-slate-600">Past 90 Days</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-0.5 border-b-2 border-dashed border-amber-500 inline-block" />
              <span className="text-slate-600">Sale Forecast</span>
            </span>
          </div>
        </div>

        <div className="relative bg-slate-50/50 rounded-xl border border-slate-200 p-3 sm:p-4 overflow-hidden">
          {/* Active tooltip on hover */}
          {activePoint && (
            <div className="absolute top-2 left-4 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-md z-10 font-mono flex items-center space-x-2">
              <span className="font-medium text-slate-300">{activePoint.date}:</span>
              <span className="text-sky-300 font-bold">₹{activePoint.price?.toLocaleString('en-IN')}</span>
              {activePoint.event && <span className="text-slate-400">({activePoint.event})</span>}
            </div>
          )}

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="historyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1={padX} y1={height / 2} x2={width - padX} y2={height / 2} stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#cbd5e1" />

            {/* Today vertical divider line */}
            <line
              x1={todayCoord.x}
              y1={padY - 8}
              x2={todayCoord.x}
              y2={height - padY}
              stroke="#94a3b8"
              strokeDasharray="2 2"
            />
            <text
              x={todayCoord.x}
              y={padY - 12}
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="600"
            >
              TODAY
            </text>

            {/* Shaded Area under history curve */}
            {historyAreaPath && (
              <path d={historyAreaPath} fill="url(#historyGradient)" />
            )}

            {/* Solid History Path */}
            <path
              d={historySvgPath}
              fill="none"
              stroke="#0284c7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dotted Future Forecast Path */}
            <path
              d={forecastSvgPath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Points */}
            {allPoints.map((pt, i) => {
              const x = getX(i);
              const y = getY(pt.price);
              const isToday = pt.isCurrent;
              const isForecast = pt.type === 'forecast';

              return (
                <g
                  key={i}
                  className="cursor-pointer group"
                  onMouseEnter={() => setActivePoint(pt)}
                  onMouseLeave={() => setActivePoint(null)}
                >
                  {isToday && (
                    <circle cx={x} cy={y} r="7" fill="#0284c7" fillOpacity="0.2" className="animate-ping" />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isToday ? 5 : 3.5}
                    fill={isToday ? '#0284c7' : isForecast ? '#f59e0b' : '#38bdf8'}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-125"
                  />
                  {/* Label under point */}
                  <text
                    x={x}
                    y={height - padY + 14}
                    textAnchor="middle"
                    fill={isToday ? '#0284c7' : isForecast ? '#b45309' : '#64748b'}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight={isToday ? '600' : 'normal'}
                  >
                    {pt.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ---------------- 4. UPCOMING SALES INTELLIGENCE ---------------- */}
      {upcomingSales && upcomingSales.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-slate-700 mb-3 flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Upcoming E-Commerce Sales & Projected Price Drops</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {upcomingSales.map((sale, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-900">{sale.platform}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {sale.likelihood} Prob
                    </span>
                  </div>

                  <h5 className="text-xs font-semibold text-sky-800 mb-1 leading-snug">
                    {sale.saleName}
                  </h5>

                  <div className="text-[11px] text-slate-500 mb-2">
                    {sale.timeline}
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2 text-xs space-y-0.5 border border-slate-100">
                    <div className="flex justify-between text-slate-700">
                      <span>Target Price:</span>
                      <strong className="text-slate-900 font-mono">{sale.targetPrice}</strong>
                    </div>
                    <div className="text-[10px] text-slate-400">{sale.discountRange}</div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>{sale.bankOffers}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

