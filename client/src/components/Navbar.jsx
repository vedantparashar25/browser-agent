import React from 'react';
import { Sparkles, Volume2, VolumeX, Activity } from 'lucide-react';

export default function Navbar({ voiceEnabled, setVoiceEnabled, isConnected, onOpenStudio }) {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-400" />
        </div>
        <div className="flex items-center space-x-2.5">
          <h1 className="font-bold text-lg tracking-tight text-slate-900 uppercase">
            PATHFINDER
          </h1>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline italic">
            &mdash; "Your Destination, Our Path"
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        {/* Agent Studio & Telemetry Inspector Trigger */}
        <button
          type="button"
          onClick={onOpenStudio}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          title="Open Agent Studio, Traffic Inspector & MCP Controls"
        >
          <Activity className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden md:inline">Studio & Inspector</span>
        </button>

        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            voiceEnabled
              ? 'bg-slate-100/80 border-slate-200 text-slate-700 hover:bg-slate-200/70'
              : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
          }`}
          title={voiceEnabled ? 'Mute voice audio output' : 'Enable voice audio output'}
        >
          {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-sky-600" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{voiceEnabled ? 'Aria Voice: On' : 'Aria Voice: Off'}</span>
        </button>

        <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isConnected ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'
            }`}
          />
          <span className="text-slate-600 text-[11px] font-medium">
            {isConnected ? 'Aria Ready' : 'Connecting'}
          </span>
        </div>
      </div>
    </header>
  );
}


