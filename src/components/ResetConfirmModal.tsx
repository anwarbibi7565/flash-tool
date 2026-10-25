/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Reset Confirmation Dialog (PRD Section 5)
 */

import React, { useState } from 'react';
import { DeviceInfo } from '../types/mtk';
import { AlertTriangle, ShieldAlert, CheckSquare, X, Check } from 'lucide-react';

interface ResetConfirmModalProps {
  device: DeviceInfo;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  device,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [authorized, setAuthorized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#172033] border border-[#FF4757]/40 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#FF4757]/20 border border-[#FF4757]/40 flex items-center justify-center text-[#FF4757]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide uppercase">
              WARNING — FACTORY RESET
            </h3>
            <span className="text-xs text-slate-400">
              Future Repairing Institute · Safe Reset Protocol
            </span>
          </div>
        </div>

        {/* Device Snapshot */}
        <div className="bg-[#0B1220] border border-white/10 rounded-lg p-3 mb-4 text-xs">
          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Target Chipset:</span>
              <strong className="text-white">{device.chipset || 'MT6261'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Port:</span>
              <strong className="text-[#00A8FF] font-mono">{device.port || 'COM Port'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Target Area:</span>
              <span className="text-[#00D084]">User Data / FAT Partition Only</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">NVRAM / Firmware:</span>
              <span className="text-[#00D084] font-semibold">100% Protected (Read-Only)</span>
            </div>
          </div>
        </div>

        {/* PRD Specified Warning Body */}
        <div className="text-slate-200 text-sm leading-relaxed mb-4 p-3 bg-[#FF4757]/10 rounded-lg border border-[#FF4757]/20">
          <p className="font-medium text-slate-100 mb-2">
            This operation may permanently erase personal data stored on the mobile phone, including contacts, messages, settings and other user information.
          </p>
          <p className="text-xs text-slate-300">
            Make sure the device owner has authorized the reset and important data has been backed up.
          </p>
        </div>

        {/* Technician Checklist confirmation */}
        <label className="flex items-start gap-2.5 mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(e) => setAuthorized(e.target.checked)}
            className="mt-0.5 rounded border-white/20 text-[#00A8FF] focus:ring-0 bg-[#0B1220] w-4 h-4"
          />
          <span className="text-xs text-slate-300 leading-snug">
            I confirm that the mobile phone owner has explicitly authorized this factory reset and acknowledges all personal user data will be wiped.
          </span>
        </label>

        {/* Action Buttons: CANCEL | CONFIRM RESET */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={!authorized}
            className={`px-6 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              authorized
                ? 'bg-[#FF4757] hover:bg-[#ff3042] text-white shadow-[0_0_15px_rgba(255,71,87,0.4)]'
                : 'bg-white/10 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>CONFIRM RESET</span>
          </button>
        </div>
      </div>
    </div>
  );
};
