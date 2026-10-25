/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Hardware Bench & Verification Rig (PRD Section 14 Testing Requirements)
 */

import React from 'react';
import { X, Cpu, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Laptop, ArrowRight } from 'lucide-react';

interface HardwareBenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile: (profile: {
    chipsetId: string;
    modelName: string;
    portName: string;
    shouldFail?: boolean;
    failReason?: string;
  }) => void;
  isSimulated: boolean;
  onSwitchToRealHardware: () => void;
}

export const HardwareBenchModal: React.FC<HardwareBenchModalProps> = ({
  isOpen,
  onClose,
  onSelectProfile,
  isSimulated,
  onSwitchToRealHardware,
}) => {
  if (!isOpen) return null;

  const scenarios = [
    {
      id: 'mt6261_nokia',
      chipsetId: 'MT6261',
      modelName: 'Nokia 105 (TA-1034) MT6261D',
      portName: 'COM5 (MediaTek USB VCOM)',
      badge: 'Test 4 & 7: Verified Supported',
      badgeColor: 'text-[#00D084] border-[#00D084]/30 bg-[#00D084]/10',
      description: 'Standard MT6261 keypad mobile. Verified NOR flash user data partition at 0x003C0000.',
      shouldFail: false,
    },
    {
      id: 'mt6260_itel',
      chipsetId: 'MT6260',
      modelName: 'Itel it5081 (MT6260A)',
      portName: 'COM3 (MediaTek USB VCOM)',
      badge: 'Test 4 & 7: Verified Supported',
      badgeColor: 'text-[#00D084] border-[#00D084]/30 bg-[#00D084]/10',
      description: 'MT6260 keypad phone with 512KB user-data FAT partition. Tested and verified.',
      shouldFail: false,
    },
    {
      id: 'mt6250_micromax',
      chipsetId: 'MT6250',
      modelName: 'Micromax X101 (MT6250)',
      portName: 'COM4 (MediaTek USB VCOM)',
      badge: 'Test 4 & 7: Verified Supported',
      badgeColor: 'text-[#00D084] border-[#00D084]/30 bg-[#00D084]/10',
      description: 'Legacy MT6250 ARM7EJ-S keypad phone with 256KB user-data storage.',
      shouldFail: false,
    },
    {
      id: 'mt6735_android_reject',
      chipsetId: 'MT6735',
      modelName: 'Android Smartphone (MT6735 64-bit)',
      portName: 'COM7 (MTK Preloader)',
      badge: 'Test 5: Rejection of Unsupported Devices',
      badgeColor: 'text-[#FF4757] border-[#FF4757]/30 bg-[#FF4757]/10',
      description: 'Connected device is a smartphone Android SoC. Tool must safely reject without formatting.',
      shouldFail: true,
      failReason: 'UNSUPPORTED_ANDROID',
    },
    {
      id: 'sc6531_unisoc_reject',
      chipsetId: 'SC6531',
      modelName: 'Unisoc / Spreadtrum SC6531 Keypad',
      portName: 'COM6 (SCI USB2Serial)',
      badge: 'Test 5: Rejection of Non-MTK Chipset',
      badgeColor: 'text-[#FF4757] border-[#FF4757]/30 bg-[#FF4757]/10',
      description: 'Spreadtrum feature phone detected instead of MediaTek. Tool rejects to prevent damage.',
      shouldFail: true,
      failReason: 'UNSUPPORTED_SPD',
    },
    {
      id: 'driver_missing_err',
      chipsetId: 'MT6261',
      modelName: 'Unknown MTK Device (Code 28)',
      portName: 'USB Device (Unassigned)',
      badge: 'Test 8: Missing Driver Diagnostics',
      badgeColor: 'text-[#FFB020] border-[#FFB020]/30 bg-[#FFB020]/10',
      description: 'Simulates missing MediaTek USB VCOM driver on Windows 10/11 with troubleshooting steps.',
      shouldFail: true,
      failReason: 'DRIVER_MISSING',
    },
    {
      id: 'port_busy_err',
      chipsetId: 'MT6261',
      modelName: 'Locked Port Device',
      portName: 'COM3 (In Use)',
      badge: 'Test 8: Port In Use Handling',
      badgeColor: 'text-[#FFB020] border-[#FFB020]/30 bg-[#FFB020]/10',
      description: 'Simulates another utility holding the COM port lock.',
      shouldFail: true,
      failReason: 'PORT_BUSY',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#172033] border border-white/10 rounded-xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-lg bg-[#00A8FF]/20 border border-[#00A8FF]/30 flex items-center justify-center text-[#00A8FF]">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Hardware Bench &amp; PRD Verification Rig
            </h3>
            <span className="text-xs text-slate-400">
              Future Repairing Institute · Lab Training &amp; Scenario Simulator
            </span>
          </div>
        </div>

        {/* Real Hardware vs Simulation Mode Selector */}
        <div className="bg-[#0B1220] border border-white/10 rounded-lg p-3.5 mb-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">Connection Mode:</span>
            <span className="text-[11px] text-slate-400">
              {isSimulated 
                ? 'Currently running Bench Simulator Mode (Ideal for training and testing PRD rules)'
                : 'Currently set to Physical COM Port / Web Serial API (For real hardware plugged into PC)'}
            </span>
          </div>

          <button
            onClick={() => {
              onSwitchToRealHardware();
              onClose();
            }}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[#00A8FF]/20 text-[#00A8FF] hover:bg-[#00A8FF]/30 border border-[#00A8FF]/40 transition-colors cursor-pointer"
          >
            Switch to Real Hardware Mode
          </button>
        </div>

        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Select Test Scenario (PRD Section 14 Testing Requirements):
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              onClick={() => {
                onSelectProfile({
                  chipsetId: sc.chipsetId,
                  modelName: sc.modelName,
                  portName: sc.portName,
                  shouldFail: sc.shouldFail,
                  failReason: sc.failReason,
                });
                onClose();
              }}
              className="bg-[#0B1220]/70 hover:bg-[#0B1220] border border-white/5 hover:border-[#00A8FF]/40 rounded-lg p-3 cursor-pointer transition-all hover:scale-[1.01] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-xs group-hover:text-[#00A8FF] transition-colors">
                    {sc.modelName}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${sc.badgeColor}`}>
                    {sc.chipsetId}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                  {sc.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/5 text-slate-400">
                <span className="font-mono">{sc.portName}</span>
                <span className="flex items-center gap-1 text-[#00A8FF] font-semibold group-hover:translate-x-0.5 transition-transform">
                  Load Profile <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PRD Invariants Reminder */}
        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-[11px] text-slate-300 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">PRD Section 11 Compliance:</strong> All test scenarios enforce zero modification of IMEI, zero overwriting of device firmware, and preservation of calibration &amp; NVRAM partitions.
          </div>
        </div>
      </div>
    </div>
  );
};
