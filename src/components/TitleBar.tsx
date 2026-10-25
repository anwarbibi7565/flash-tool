/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Windows 10 / 11 Desktop Title Bar
 */

import React from 'react';
import { Cpu, Minus, Square, X, ShieldCheck, Wrench } from 'lucide-react';

interface TitleBarProps {
  onOpenBench: () => void;
  onOpenDriverGuide: () => void;
  onOpenBootKeyGuide: () => void;
  isSimulated: boolean;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  onOpenBench,
  onOpenDriverGuide,
  onOpenBootKeyGuide,
  isSimulated,
}) => {
  return (
    <div className="flex items-center justify-between h-10 bg-[#0E1626] border-b border-white/10 px-3 select-none text-xs text-slate-300">
      {/* Brand & Window Title */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-6 h-6 rounded bg-[#00A8FF]/20 text-[#00A8FF] border border-[#00A8FF]/30">
          <Cpu className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-[#00A8FF] font-bold tracking-wider text-[11px] uppercase">
            Future Repairing Institute
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-white font-semibold tracking-wide">
            MTK KEYPAD RESET TOOL
          </span>
          <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
            v1.0 (Win 10/11)
          </span>
        </div>
      </div>

      {/* Right controls: Quick Tools & Desktop Window Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Quick Guide links */}
        <button
          onClick={onOpenBootKeyGuide}
          className="flex items-center gap-1 px-2 py-1 text-[11px] rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          title="Boot key combinations for MTK Keypad phones"
        >
          <Wrench className="w-3 h-3 text-[#FFB020]" />
          <span>Boot Keys</span>
        </button>

        <button
          onClick={onOpenDriverGuide}
          className="flex items-center gap-1 px-2 py-1 text-[11px] rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          title="MediaTek USB VCOM Driver Guide"
        >
          <ShieldCheck className="w-3 h-3 text-[#00D084]" />
          <span>USB Drivers</span>
        </button>

        <button
          onClick={onOpenBench}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] rounded font-medium transition-all ${
            isSimulated
              ? 'bg-[#00A8FF]/20 text-[#00A8FF] border border-[#00A8FF]/40'
              : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
          }`}
          title="Open Technician Bench / Test Scenarios"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A8FF] animate-pulse"></span>
          <span>Bench & Test Rig</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10 mx-1" />

        {/* Windows standard min/max/close mock controls */}
        <div className="flex items-center">
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white"
            title="Maximize / Restore"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-[#FF4757] rounded transition-colors text-slate-400 hover:text-white"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
