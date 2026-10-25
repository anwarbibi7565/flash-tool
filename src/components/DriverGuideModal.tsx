/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * USB Driver Management & Installation Guide (PRD Section 8)
 */

import React from 'react';
import { X, ShieldCheck, Download, AlertCircle, HardDrive, CheckCircle2 } from 'lucide-react';

interface DriverGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriverGuideModal: React.FC<DriverGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#172033] border border-white/10 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-lg bg-[#00D084]/20 border border-[#00D084]/30 flex items-center justify-center text-[#00D084]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Windows USB Driver Management
            </h3>
            <span className="text-xs text-slate-400">
              MediaTek MTK USB VCOM Driver Guide for Windows 10 & 11
            </span>
          </div>
        </div>

        {/* Diagnostic Status Box */}
        <div className="bg-[#0B1220] border border-white/10 rounded-lg p-3.5 mb-5 text-xs">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
            <span className="font-semibold text-slate-200">Driver Compatibility Checklist:</span>
            <span className="text-[#00D084] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Windows 10/11 64-bit Ready
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Required Driver:</span>
              <strong className="text-white">MediaTek DA USB VCOM (Android/CDC)</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Target Hardware VID:</span>
              <span className="font-mono text-[#00A8FF]">VID_0E8D &amp; PID_0003 / PID_2000</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Device Manager Category:</span>
              <span>Ports (COM &amp; LPT)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Driver Signing:</span>
              <span>WHQL Signed or Test Mode</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4 text-xs text-slate-300 mb-6">
          <div className="p-3 bg-[#0B1220]/60 rounded-lg border border-white/5">
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#00A8FF]/20 text-[#00A8FF] flex items-center justify-center text-xs">1</span>
              Checking Windows Device Manager
            </h4>
            <p className="leading-relaxed">
              Press <kbd className="px-1.5 py-0.5 bg-black/40 rounded border border-white/10 font-mono text-slate-200">Win + X</kbd> and select <strong>Device Manager</strong>. Expand <strong>Ports (COM &amp; LPT)</strong>. When an MTK phone is plugged while holding its boot key, you should see <em>"MediaTek USB VCOM Port (COMx)"</em> appear for 3–5 seconds or persist.
            </p>
          </div>

          <div className="p-3 bg-[#0B1220]/60 rounded-lg border border-white/5">
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#00A8FF]/20 text-[#00A8FF] flex items-center justify-center text-xs">2</span>
              Fixing "Code 28: Driver Missing" or Yellow Exclamation Mark
            </h4>
            <p className="leading-relaxed mb-2">
              If Windows displays an unknown device under <em>Other Devices</em> with a yellow exclamation mark:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
              <li>Right-click the unknown device → <strong>Update driver</strong>.</li>
              <li>Select <em>"Browse my computer for drivers"</em> → <em>"Let me pick from a list"</em>.</li>
              <li>Choose <strong>Ports (COM &amp; LPT)</strong> → Have Disk... → select the official <code className="text-slate-200">cdc-acm.inf</code> or MTK VCOM inf.</li>
            </ol>
          </div>

          <div className="p-3 bg-[#0B1220]/60 rounded-lg border border-white/5">
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FFB020]/20 text-[#FFB020] flex items-center justify-center text-xs">3</span>
              Windows 11 Driver Signature Enforcement
            </h4>
            <p className="leading-relaxed">
              Legacy MT6250/MT6260 INF files may require temporarily disabling Driver Signature Enforcement via: 
              <span className="block mt-1 text-slate-200 font-mono text-[11px] bg-black/30 p-1.5 rounded">
                Settings → Recovery → Advanced Startup → Troubleshoot → Startup Settings → Restart → Option 7 (Disable driver signature enforcement)
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <span className="text-slate-400">
            Future Repairing Institute · Hardware Diagnostics Lab
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#00A8FF] hover:bg-[#0092dd] text-white font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
