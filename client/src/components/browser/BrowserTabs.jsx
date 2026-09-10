import React from 'react';
import { Plus, X, Globe, Compass, Layout, Laptop, Shirt, ShoppingBag } from 'lucide-react';

export default function BrowserTabs({
  tabs = [],
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab
}) {
  const getTabIcon = (tab) => {
    if (tab.type === 'copilot') {
      return <Compass className="w-3.5 h-3.5 text-sky-600 shrink-0" />;
    }
    if (tab.type === 'split') {
      return <Layout className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
    }
    const url = (tab.url || '').toLowerCase();
    if (url.includes('amazon')) {
      return <span className="text-[11px] font-black text-amber-700 shrink-0 leading-none">a</span>;
    }
    if (url.includes('flipkart')) {
      return <span className="text-[11px] font-black text-blue-700 shrink-0 leading-none">fk</span>;
    }
    if (url.includes('croma')) {
      return <span className="text-[11px] font-black text-emerald-700 shrink-0 leading-none">cr</span>;
    }
    if (url.includes('myntra')) {
      return <span className="text-[11px] font-black text-rose-600 shrink-0 leading-none">m</span>;
    }
    if (url.includes('nykaa')) {
      return <span className="text-[11px] font-black text-pink-600 shrink-0 leading-none">ny</span>;
    }
    if (url.includes('google')) {
      return <span className="text-[11px] font-black text-blue-600 shrink-0 leading-none">G</span>;
    }
    return <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
  };

  return (
    <div className="bg-slate-200/90 border-b border-slate-300/80 px-2 pt-2 flex items-center justify-between select-none">
      {/* Left: Window Control Dots & Tab List */}
      <div className="flex items-center space-x-2 min-w-0 flex-1 overflow-x-auto scrollbar-none">
        {/* Window Control Dots */}
        <div className="flex items-center space-x-1.5 px-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-rose-400/90 border border-rose-500/80 hover:brightness-90 transition-all cursor-pointer" title="Close Window" />
          <div className="w-3 h-3 rounded-full bg-amber-400/90 border border-amber-500/80 hover:brightness-90 transition-all cursor-pointer" title="Minimize Window" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/90 border border-emerald-500/80 hover:brightness-90 transition-all cursor-pointer" title="Maximize Window" />
        </div>

        <div className="h-4 w-px bg-slate-300/80 mx-1 shrink-0" />

        {/* Tab Items */}
        <div className="flex items-center space-x-1 min-w-0">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center space-x-2 px-3 py-1.5 rounded-t-xl text-xs font-medium cursor-pointer transition-all max-w-[210px] min-w-[120px] ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border-t border-x border-slate-300/60 z-10'
                    : 'text-slate-600 hover:bg-slate-300/60 hover:text-slate-900'
                }`}
                title={tab.title}
              >
                {/* Tab Icon */}
                <div className="flex items-center justify-center w-4 h-4 shrink-0">
                  {tab.isLoading ? (
                    <div className="w-3 h-3 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    getTabIcon(tab)
                  )}
                </div>

                {/* Tab Title */}
                <span className="truncate flex-1">
                  {tab.title || 'New Tab'}
                </span>

                {/* Tab Close Button */}
                {tabs.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                    className={`p-0.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    title="Close tab"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* New Tab Button */}
        <button
          type="button"
          onClick={onNewTab}
          className="p-1 rounded-lg hover:bg-slate-300/80 text-slate-600 hover:text-slate-900 transition-colors shrink-0 ml-1"
          title="Open new tab"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Browser Engine Badge */}
      <div className="flex items-center space-x-2 px-2 shrink-0 text-[11px] font-semibold text-slate-600">
        <div className="flex items-center space-x-1.5 bg-white/70 px-2 py-0.5 rounded-md border border-slate-300/60 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-700 tracking-wide uppercase font-bold text-[10px]">Chromium v124</span>
        </div>
      </div>
    </div>
  );
}