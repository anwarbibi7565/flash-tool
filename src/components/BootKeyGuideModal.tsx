/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Keypad Boot Key Guide & Connection Method Reference
 */

import React from 'react';
import { X, Wrench, Smartphone, BatteryCharging, Cable, Info } from 'lucide-react';
import { VERIFIED_MTK_CHIPSETS } from '../services/chipsetDatabase';

interface BootKeyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BootKeyGuideModal: React.FC<BootKeyGuideModalProps> = ({ isOpen, onClose }) => {
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
        <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-lg bg-[#FFB020]/20 border border-[#FFB020]/30 flex items-center justify-center text-[#FFB020]">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Keypad Mobile Boot Key Guide
            </h3>
            <span className="text-xs text-slate-400">
              Future Repairing Institute · Standard Bench Connection Procedure
            </span>
          </div>
        </div>

        {/* Universal Procedure */}
        <div className="p-3 bg-[#0B1220] rounded-lg border border-white/10 mb-4 text-xs">
          <div className="font-bold text-[#00A8FF] text-xs uppercase mb-2 flex items-center gap-1.5">
            <Info className="w-4 h-4" /> Universal MTK BROM Connection Sequence:
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
            <li>Power off the mobile phone completely.</li>
            <li>Remove the battery for 5 seconds, then re-insert it (do <strong>NOT</strong> press Power button yet).</li>
            <li>Press and hold the designated <strong>Boot Key</strong> (see table below).</li>
            <li>While holding the boot key, plug in the micro-USB cable connected to the PC.</li>
            <li>Release the boot key once you hear the Windows USB connection chime and tool detects COM port.</li>
          </ol>
        </div>

        {/* Chipset Specific Boot Keys Table */}
        <div className="space-y-3 mb-5">
          {Object.values(VERIFIED_MTK_CHIPSETS).map((chipset) => (
            <div key={chipset.id} className="bg-[#0B1220]/70 p-3 rounded-lg border border-white/5 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white text-sm">{chipset.name}</span>
                <span className="text-[10px] text-[#00D084] font-medium bg-[#00D084]/10 px-2 py-0.5 rounded border border-[#00D084]/20">
                  {chipset.userStorageType} ({chipset.userDataSize})
                </span>
              </div>
              <p className="text-[#FFB020] font-medium mb-1 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span>Boot Key: {chipset.bootKeyInstructions}</span>
              </p>
              <div className="text-[11px] text-slate-400 mt-1">
                <strong>Tested models:</strong> {chipset.typicalModels.join(', ')}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-white/10 text-xs">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#00A8FF] hover:bg-[#0092dd] text-white font-semibold transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
