import React, { useRef, useEffect } from 'react';
import {
  Terminal,
  Clock,
  CheckCircle2,
  Loader2,
  Monitor,
  Globe,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Cpu,
  Zap,
  ShoppingBag,
  ArrowRight,
  Compass,
  Search,
  Laptop,
  Smartphone,
  Headphones,
  Footprints
} from 'lucide-react';

export default function Timeline({
  steps = [],
  isProcessing = false,
  screenshot,
  logs = [],
  showLogs,
  setShowLogs,
  onPreset
}) {
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current && showLogs) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, showLogs]);

  const quickPrompts = [
    {
      label: 'Laptops under ₹75k',
      icon: Laptop,
      query: 'Find the best gaming or professional laptop under 75000 rupees with good ratings'
    },
    {
      label: '5G Phones under ₹25k',
      icon: Smartphone,
      query: 'Find top 5G smartphones under 25000 rupees with great camera and battery'
    },
    {
      label: 'ANC Earbuds under ₹2k',
      icon: Headphones,
      query: 'Find me the cheapest wireless earbuds under 2000 rupees with active noise cancellation'
    },
    {
      label: 'Running Shoes under ₹4k',
      icon: Footprints,
      query: 'Find top-rated running shoes for men under 4000 rupees with good cushioning'
    }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col h-full shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-slate-700" />
          <h2 className="font-semibold text-sm text-slate-900">
            Agent Execution
          </h2>
        </div>

        {isProcessing ? (
          <span className="flex items-center space-x-1.5 text-xs font-medium text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200/80 animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
            <span>Browsing Live</span>
          </span>
        ) : (
          <span className="flex items-center space-x-1.5 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Ready</span>
          </span>
        )}
      </div>

      {/* Steps List / Enriched Idle Station */}
      <div className="space-y-2.5">
        {steps.length === 0 && !isProcessing && (
          <div className="space-y-3.5 py-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Playwright Autonomous Engine: </span>
              Navigates live DOM listings, checks authentic pricing across Amazon, Flipkart & Croma, and bypasses search ads to give you direct canonical product links.
            </div>

            {/* Quick-Start Inspiration Hub */}
            {onPreset && (
              <div className="pt-1">
                <div className="text-[11px] font-medium text-slate-400 mb-2">
                  Quick Explorer:
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((p, i) => {
                    const IconComp = p.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onPreset(p.query)}
                        className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-800 transition-colors group flex items-center space-x-2.5"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <IconComp className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium truncate text-slate-800">
                            {p.label}
                          </p>
                          <span className="text-[10px] text-slate-400 group-hover:text-slate-600 flex items-center space-x-0.5">
                            <span>Browse</span>
                            <ArrowRight className="w-2.5 h-2.5 inline opacity-70 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Execution Steps */}
        {steps.map((step) => {
          const isDone = step.status === 'completed';
          const isRunning = step.status === 'running';

          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border transition-all ${
                isRunning
                  ? 'bg-sky-50/70 border-sky-300 shadow-sm'
                  : isDone
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-50/60 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-2.5">
                <div className="mt-0.5 shrink-0">
                  {isRunning && <Loader2 className="w-3.5 h-3.5 text-sky-600 animate-spin" />}
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-xs font-semibold ${
                      isRunning ? 'text-sky-900' : isDone ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{step.description}</p>
                  {step.summary && (
                    <p className="text-[11px] text-slate-700 font-mono mt-1 bg-slate-100 px-2 py-0.5 rounded inline-block">
                      {step.summary}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Playwright Live Browser Stream */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 text-xs text-slate-700 font-medium">
            <Monitor className="w-3.5 h-3.5 text-slate-500" />
            <span>Autonomous Viewport</span>
          </div>
          {isProcessing ? (
            <span className="flex items-center space-x-1.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Streaming Live</span>
            </span>
          ) : (
            <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
              Standby
            </span>
          )}
        </div>

        {/* Realistic Browser Window Mockup */}
        <div className="w-full rounded-xl border border-slate-200/90 bg-slate-900 shadow-sm overflow-hidden flex flex-col">
          {/* Browser Chrome Header Bar */}
          <div className="px-3 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2">
            {/* Window Traffic Lights */}
            <div className="flex items-center space-x-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Faux Address Bar */}
            <div className="flex-1 max-w-[210px] bg-slate-900 border border-slate-800 rounded-md px-2 py-0.5 flex items-center justify-center space-x-1 text-[10px] text-slate-400 font-mono truncate">
              <span className="text-slate-500">🔒</span>
              <span className="truncate">
                {isProcessing ? 'amazon.in/live-navigation' : 'playwright://headless-session'}
              </span>
            </div>

            {/* Resolution Tag */}
            <div className="text-[9px] text-slate-500 font-mono shrink-0 hidden sm:block">
              1440×900
            </div>
          </div>

          {/* Viewport Canvas */}
          <div className="relative w-full aspect-video bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden flex items-center justify-center">
            {screenshot ? (
              <img
                src={screenshot}
                alt="Live Browser Session"
                className="w-full h-full object-contain bg-black transition-opacity duration-300"
              />
            ) : (
              <div className="text-center p-5 text-slate-400 flex flex-col items-center justify-center space-y-2 select-none">
                <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/70 flex items-center justify-center text-slate-300 shadow-inner">
                  <Globe className="w-4 h-4 text-sky-400" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-slate-200">
                    Autonomous Browser Standby
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-[220px] leading-relaxed">
                    Live DOM page snapshots stream here during autonomous price and stock validation.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1 text-[9px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">Anti-Bot Active</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">Verified DOM</span>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur border border-slate-700 text-white px-2 py-0.5 rounded text-[10px] font-mono flex items-center space-x-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>INSPECTION ACTIVE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible Action Logs */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowLogs(!showLogs)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-xs text-slate-600 transition-colors font-medium"
        >
          <span className="flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>Agent Telemetry Log</span>
            <span className="text-[10px] bg-slate-200/70 text-slate-600 px-1.5 py-0.2 rounded-full font-mono">
              {logs.length}
            </span>
          </span>
          {showLogs ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {showLogs && (
          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-48 overflow-y-auto text-[11px] font-mono space-y-1.5 shadow-inner">
            {logs.length === 0 ? (
              <div className="py-4 text-center text-slate-400 space-y-1">
                <p className="text-xs font-medium text-slate-400">No telemetry events recorded yet</p>
                <p className="text-[10px] text-slate-400">
                  Search for a product or click an explorer category to view real-time engine traces.
                </p>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed flex items-start space-x-1.5 ${
                    log.level === 'error'
                      ? 'text-rose-400'
                      : log.message.includes('SAFETY')
                      ? 'text-amber-300'
                      : log.message.includes('DOM') || log.message.includes('Found')
                      ? 'text-emerald-300'
                      : 'text-slate-300'
                  }`}
                >
                  <span className="text-slate-500 shrink-0 select-none">
                    [{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
                  </span>
                  <span className="break-words flex-1">{log.message}</span>
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}

