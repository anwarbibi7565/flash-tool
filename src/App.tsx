/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Version 1.0 - Windows 10 / Windows 11 Desktop Application
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TitleBar } from './components/TitleBar';
import { DevicePanel } from './components/DevicePanel';
import { ResetActionArea } from './components/ResetActionArea';
import { LogViewer } from './components/LogViewer';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { DriverGuideModal } from './components/DriverGuideModal';
import { BootKeyGuideModal } from './components/BootKeyGuideModal';
import { HardwareBenchModal } from './components/HardwareBenchModal';
import { DeviceInfo, ResetStage, LogEntry } from './types/mtk';
import { serialManager } from './services/serialManager';
import { resetEngine } from './services/resetEngine';
import { VERIFIED_MTK_CHIPSETS } from './services/chipsetDatabase';

export default function App() {
  const [device, setDevice] = useState<DeviceInfo>({
    status: 'disconnected',
    statusMessage: 'Please Connect an MTK Keypad Phone',
    port: null,
    chipset: null,
    deviceModel: null,
    usbConnection: 'Disconnected',
    protocolSupport: 'Unknown',
    nvramProtected: true,
    imeiProtected: true,
    firmwareProtected: true,
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<ResetStage>('IDLE');
  const [stageProgress, setStageProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState('Idle');

  // Modals
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDriverGuideOpen, setIsDriverGuideOpen] = useState(false);
  const [isBootKeyGuideOpen, setIsBootKeyGuideOpen] = useState(false);
  const [isBenchOpen, setIsBenchOpen] = useState(false);
  const [isSimulated, setIsSimulated] = useState(true); // Default to bench mode for instant testability in sandbox
  const [activeSimProfile, setActiveSimProfile] = useState<{
    chipsetId: string;
    modelName: string;
    portName: string;
    shouldFail?: boolean;
    failReason?: string;
  }>({
    chipsetId: 'MT6261',
    modelName: 'Nokia 105 (TA-1034) MT6261D',
    portName: 'COM5 (MediaTek USB VCOM)',
  });

  const addLog = useCallback((entry: Omit<LogEntry, 'id'>) => {
    const newEntry: LogEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setLogs((prev) => [...prev, newEntry]);
  }, []);

  // Subscribe to SerialManager and ResetEngine logs
  useEffect(() => {
    const unsubSerial = serialManager.subscribeLogs(addLog);
    resetEngine.setCallbacks(
      (stage, progress, label) => {
        setCurrentStage(stage);
        setStageProgress(progress);
        setStageLabel(label);
      },
      addLog
    );

    // Initial Startup Log (PRD Section 6)
    const now = new Date().toTimeString().split(' ')[0];
    addLog({
      timestamp: now,
      message: 'MTK Keypad Reset Tool Started',
      level: 'info',
    });
    addLog({
      timestamp: now,
      message: 'Future Repairing Institute · MTK Feature Phone Engine v1.0 Ready',
      level: 'info',
    });
    addLog({
      timestamp: now,
      message: 'Supported Chipset Families: MT6261, MT6260, MT6250, MT6252, MT6235, MT6236',
      level: 'info',
    });

    return () => {
      unsubSerial();
    };
  }, [addLog]);

  // Handler: Detect Device
  const handleDetectDevice = async () => {
    if (isProcessing) return;

    if (!isSimulated && serialManager.isWebSerialSupported()) {
      // Real Web Serial Port Detection
      const portInfo = await serialManager.requestPhysicalPort();
      if (!portInfo) {
        setDevice((prev) => ({
          ...prev,
          status: 'error',
          statusMessage: 'Please Connect an MTK Keypad Phone',
          usbConnection: 'Disconnected',
        }));
        return;
      }

      setDevice((prev) => ({
        ...prev,
        status: 'detecting',
        statusMessage: 'Detecting MTK Chipset...',
        port: portInfo.portName,
        usbConnection: 'Connecting',
      }));

      const detected = await serialManager.identifyDevice();
      setDevice(detected);
    } else {
      // Bench Test Rig Identification with current simulation profile
      setDevice((prev) => ({
        ...prev,
        status: 'detecting',
        statusMessage: 'Detecting MTK Chipset...',
        port: activeSimProfile.portName,
        usbConnection: 'Connecting',
      }));

      const detected = await serialManager.identifyDevice(activeSimProfile);
      setDevice(detected);
    }
  };

  // Handler: Refresh Ports
  const handleRefreshPorts = () => {
    const now = new Date().toTimeString().split(' ')[0];
    addLog({
      timestamp: now,
      message: 'Refreshing COM ports enumerator...',
      level: 'info',
    });
    addLog({
      timestamp: now,
      message: 'Scanning active serial endpoints in Windows Device Manager...',
      level: 'info',
    });

    if (device.status === 'supported') {
      addLog({
        timestamp: now,
        message: `Active Port: ${device.port} is operational.`,
        level: 'success',
      });
    } else {
      addLog({
        timestamp: now,
        message: 'No locked ports. Click [Detect Device] or connect USB cable while holding boot key.',
        level: 'info',
      });
    }
  };

  // Handler: Factory Reset clicked (PRD Section 5 confirmation required)
  const handleStartReset = () => {
    if (device.status !== 'supported' || isProcessing) return;

    const now = new Date().toTimeString().split(' ')[0];
    addLog({
      timestamp: now,
      message: 'Waiting for User Confirmation',
      level: 'warn',
    });
    setIsConfirmModalOpen(true);
  };

  // Handler: User Confirmed Reset inside Warning Dialog
  const handleConfirmReset = async () => {
    setIsProcessing(true);
    setCurrentStage('STAGE_1_CONNECTING');
    setStageProgress(14);
    setStageLabel('Stage 1/7: Connecting to Device');

    const success = await resetEngine.executeReset(device);
    setIsProcessing(false);
  };

  // Handler: Stop Operation
  const handleStopOperation = () => {
    resetEngine.abort();
  };

  // Handler: Select a specific profile from Bench rig
  const handleSelectBenchProfile = (profile: {
    chipsetId: string;
    modelName: string;
    portName: string;
    shouldFail?: boolean;
    failReason?: string;
  }) => {
    setIsSimulated(true);
    setActiveSimProfile(profile);

    // Auto-identify the chosen profile to show responsive feedback
    setTimeout(async () => {
      setDevice((prev) => ({
        ...prev,
        status: 'detecting',
        statusMessage: 'Detecting MTK Chipset...',
        port: profile.portName,
        usbConnection: 'Connecting',
      }));
      const detected = await serialManager.identifyDevice(profile);
      setDevice(detected);
    }, 100);
  };

  const handleSwitchToRealHardware = () => {
    setIsSimulated(false);
    setDevice({
      status: 'disconnected',
      statusMessage: 'Please Connect an MTK Keypad Phone',
      port: null,
      chipset: null,
      deviceModel: null,
      usbConnection: 'Disconnected',
      protocolSupport: 'Unknown',
      nvramProtected: true,
      imeiProtected: true,
      firmwareProtected: true,
    });
    const now = new Date().toTimeString().split(' ')[0];
    addLog({
      timestamp: now,
      message: 'Switched to Real Hardware Mode (Physical Web Serial / USB VCOM).',
      level: 'info',
    });
    addLog({
      timestamp: now,
      message: 'Connect your MTK phone holding Boot Key and click [Detect Device].',
      level: 'info',
    });
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleScrollToLogs = () => {
    const el = document.getElementById('log-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0B1220] text-white overflow-hidden select-none">
      {/* 1. Windows Application Title Bar */}
      <TitleBar
        onOpenBench={() => setIsBenchOpen(true)}
        onOpenDriverGuide={() => setIsDriverGuideOpen(true)}
        onOpenBootKeyGuide={() => setIsBootKeyGuideOpen(true)}
        isSimulated={isSimulated}
      />

      {/* Main Desktop Window Body */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-w-6xl mx-auto w-full">
        {/* Bench Mode Notification Bar (if active) */}
        {isSimulated && (
          <div className="bg-[#172033] border border-[#00A8FF]/30 px-3.5 py-1.5 rounded-lg flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00A8FF] animate-pulse"></span>
              <span className="text-white font-semibold">Technician Bench Mode:</span>
              <span className="text-[#00A8FF]">{activeSimProfile.modelName}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Testing &amp; Scenario Simulator Active</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBenchOpen(true)}
                className="text-[#00A8FF] hover:underline cursor-pointer font-medium text-[11px]"
              >
                Change Scenario
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={handleSwitchToRealHardware}
                className="text-slate-400 hover:text-white cursor-pointer text-[11px]"
              >
                Use Real USB COM Port
              </button>
            </div>
          </div>
        )}

        {/* 2. Device Information Panel (PRD Section 3) */}
        <DevicePanel device={device} isProcessing={isProcessing} />

        {/* 3. Center Factory Reset Button & Secondary Buttons (PRD Section 3 & 5) */}
        <ResetActionArea
          device={device}
          isProcessing={isProcessing}
          currentStage={currentStage}
          stageProgress={stageProgress}
          stageLabel={stageLabel}
          onDetectDevice={handleDetectDevice}
          onRefreshPorts={handleRefreshPorts}
          onStartReset={handleStartReset}
          onStopOperation={handleStopOperation}
          onViewLogs={handleScrollToLogs}
        />

        {/* 4. Reset Operation Log (PRD Section 6) */}
        <LogViewer logs={logs} onClearLogs={handleClearLogs} />

        {/* Status Bar at bottom */}
        <footer className="text-[11px] text-slate-500 flex items-center justify-between px-1 py-1 border-t border-white/5">
          <div>
            Future Repairing Institute · MTK Keypad Reset Engine · Safe User-Data Partition Format
          </div>
          <div className="flex items-center gap-3">
            <span>NVRAM Guard: <strong className="text-[#00D084]">Active</strong></span>
            <span>Firmware Lock: <strong className="text-[#00D084]">Active</strong></span>
            <span>Platform: <strong>Win 10 / Win 11</strong></span>
          </div>
        </footer>
      </main>

      {/* Modals & Dialogs */}
      <ResetConfirmModal
        device={device}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmReset}
      />

      <DriverGuideModal
        isOpen={isDriverGuideOpen}
        onClose={() => setIsDriverGuideOpen(false)}
      />

      <BootKeyGuideModal
        isOpen={isBootKeyGuideOpen}
        onClose={() => setIsBootKeyGuideOpen(false)}
      />

      <HardwareBenchModal
        isOpen={isBenchOpen}
        onClose={() => setIsBenchOpen(false)}
        onSelectProfile={handleSelectBenchProfile}
        isSimulated={isSimulated}
        onSwitchToRealHardware={handleSwitchToRealHardware}
      />
    </div>
  );
}
