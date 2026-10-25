/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Device Information Panel (PRD Section 3)
 */

import React from 'react';
import { DeviceInfo } from '../types/mtk';
import { 
  Cable, 
  Cpu, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Radio, 
  ShieldCheck, 
  Lock
} from 'lucide-react';

interface DevicePanelProps {
  device: DeviceInfo;
  isProcessing: boolean;
}

export const DevicePanel: React.FC<DevicePanelProps> = ({ device, isProcessing }) => {
  // Status color mappings based on PRD color specs
  const getStatusColor = () => {
    switch (device.status) {
      case 'supported':
        return 'text-[#00D084] border-[#00D084]/30 bg-[#00D084]/10';
      case 'unsupported':
      case 'error':
        return 'text-[#FF4757] border-[#FF4757]/30 bg-[#FF4757]/10';
      case 'detecting':
      case 'checking_compatibility':
      case 'waiting':
        return 'text-[#FFB020] border-[#FFB020]/30 bg-[#FFB020]/10';
      default:
        return 'text-slate-400 border-white/10 bg-white/5';
    }
  };

  const getStatusBadge = () => {
    if (device.status === 'supported') {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#00D084]">
          <CheckCircle2 className="w-4 h-4" />
          <span>Supported Device Detected</span>
        </span>
      );
    }
    if (device.status === 'unsupported') {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#FF4757]">
          <XCircle className="w-4 h-4" />
          <span>Unsupported Device</span>
        </span>
      );
    }
    if (device.status === 'error') {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#FF4757]">
          <AlertTriangle className="w-4 h-4" />
          <span>{device.statusMessage || 'Connection Failed'}</span>
        </span>
      );
    }
    if (device.status === 'detecting' || device.status === 'checking_compatibility') {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#FFB020]">
          <Radio className="w-4 h-4 animate-spin text-[#FFB020]" />
          <span>{device.statusMessage || 'Detecting MTK Chipset...'}</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <Radio className="w-3.5 h-3.5 text-slate-500" />
        <span>Waiting for Device...</span>
      </span>
    );
  };

  return (
    <div className="bg-[#172033] border border-white/10 rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#00A8FF]" />
          <h2 className="text-xs font-bold tracking-wider uppercase text-slate-200">
            Device Information Panel
          </h2>
        </div>
        <div className={`px-2.5 py-1 rounded-md border ${getStatusColor()} flex items-center`}>
          {getStatusBadge()}
        </div>
      </div>

      {/* 6 Core Information Fields from PRD */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* 1. Connection Status */}
        <div className="bg-[#0B1220]/70 p-2.5 rounded-md border border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
            Connection Status
          </span>
          <div className="flex items-center gap-1.5 font-medium text-xs">
            {device.usbConnection === 'Connected' ? (
              <span className="text-[#00D084] font-semibold">Connected</span>
            ) : device.status === 'detecting' ? (
              <span className="text-[#FFB020] font-semibold">Detecting...</span>
            ) : (
              <span className="text-slate-400">Disconnected</span>
            )}
          </div>
        </div>

        {/* 2. Device Port */}
        <div className="bg-[#0B1220]/70 p-2.5 rounded-md border border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
            Device Port
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Cable className="w-3.5 h-3.5 text-[#00A8FF]" />
            <span className="text-white truncate" title={device.port || 'No Port Selected'}>
              {device.port || 'Not Detected'}
            </span>
          </div>
        </div>

        {/* 3. Chipset */}
        <div className="bg-[#0B1220]/70 p-2.5 rounded-md border border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
            Chipset (Detected CPU)
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-[#00A8FF]" />
            <span className={device.chipset ? 'text-white' : 'text-slate-500'}>
              {device.chipset || 'Pending Scan'}
            </span>
          </div>
        </div>

        {/* 4. Device Model */}
        <div className="bg-[#0B1220]/70 p-2.5 rounded-md border border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
            Device Model
          </span>
          <div className="text-xs text-white truncate font-medium" title={device.deviceModel || 'N/A'}>
            {device.deviceModel || 'Waiting for Handshake'}
          </div>
        </div>

        {/* 5. USB Connection */}
        <div className="bg-[#0B1220]/70 p-2.5 rounded-md border border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
            USB Connection
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                device.usbConnection === 'Connected' ? 'bg-[#00D084]' : 'bg-slate-600'
              }`}
            />
            <span className={device.usbConnection === 'Connected' ? 'text-white font-medium' : 'text-slate-400'}>
              {device.usbConnection}
            </span>
          </div>
        </div>

        {/* 6. Protocol Support */}
        <div className="bg-[#0B1220]/70 p-2.5 rounded-md border border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
            Protocol Support
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {device.protocolSupport === 'Supported' ? (
              <span className="text-[#00D084]">Verified Protocol</span>
            ) : device.protocolSupport === 'Unsupported' ? (
              <span className="text-[#FF4757]">Unsupported Protocol</span>
            ) : device.protocolSupport === 'Checking' ? (
              <span className="text-[#FFB020]">Verifying...</span>
            ) : (
              <span className="text-slate-500">Unverified</span>
            )}
          </div>
        </div>
      </div>

      {/* Hardware Safety Interlocks Banner (PRD Section 11) */}
      <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" />
          <span className="font-medium text-slate-300">Safety Invariants:</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <Lock className="w-3 h-3 text-[#00A8FF]" /> NVRAM Calibration: <strong className="text-[#00D084]">Safe</strong>
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <Lock className="w-3 h-3 text-[#00A8FF]" /> IMEI SecZone: <strong className="text-[#00D084]">Locked</strong>
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <Lock className="w-3 h-3 text-[#00A8FF]" /> Firmware Partition: <strong className="text-[#00D084]">Protected</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
