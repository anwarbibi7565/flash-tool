/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Reset Action Area - Main Factory Reset Button, 7-Stage Progress, & Secondary Buttons
 */

import React from 'react';
import { DeviceInfo, ResetStage } from '../types/mtk';
import { 
  Play, 
  Square, 
  RotateCw, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface ResetActionAreaProps {
  device: DeviceInfo;
  isProcessing: boolean;
  currentStage: ResetStage;
  stageProgress: number;
  stageLabel: string;
  onDetectDevice: () => void;
  onRefreshPorts: () => void;
  onStartReset: () => void;
  onStopOperation: () => void;
  onViewLogs: () => void;
}

export const ResetActionArea: React.FC<ResetActionAreaProps> = ({
  device,
  isProcessing,
  currentStage,
  stageProgress,
  stageLabel,
  onDetectDevice,
  onRefreshPorts,
  onStartReset,
  onStopOperation,
  onViewLogs,
}) => {
  // Check if Factory Reset button can be enabled
  const isResetAllowed = 
    device.status === 'supported' && 
    device.protocolSupport === 'Supported' && 
    !isProcessing;

  const getReasonDisabled = () => {
    if (isProcessing) return 'Reset operation currently in progress.';
    if (device.status === 'disconnected') return 'Please connect an MTK keypad phone and click Detect Device.';
    if (device.status === 'unsupported') return 'This chipset is unsupported. Cannot perform reset.';
    if (device.status === 'error') return 'Resolve device connection error before proceeding.';
    if (device.protocolSupport !== 'Supported') return 'Safety checks not completed.';
    return '';
  };

  const stagesList = [
    { id: 'STAGE_1_CONNECTING', name: '1. Connecting' },
    { id: 'STAGE_2_IDENTIFYING_CHIPSET', name: '2. Chipset ID' },
    { id: 'STAGE_3_CHECKING_COMPATIBILITY', name: '3. Compatibility' },
    { id: 'STAGE_4_PREPARING_RESET', name: '4. Preparing' },
    { id: 'STAGE_5_RESETTING_USERDATA', name: '5. Resetting' },
    { id: 'STAGE_6_VERIFYING_RESULT', name: '6. Verifying' },
    { id: 'STAGE_7_COMPLETED', name: '7. Completed' },
  ];

  const getStageIndex = (stage: ResetStage): number => {
    switch (stage) {
      case 'STAGE_1_CONNECTING': return 0;
      case 'STAGE_2_IDENTIFYING_CHIPSET': return 1;
      case 'STAGE_3_CHECKING_COMPATIBILITY': return 2;
      case 'STAGE_4_PREPARING_RESET': return 3;
      case 'STAGE_5_RESETTING_USERDATA': return 4;
      case 'STAGE_6_VERIFYING_RESULT': return 5;
      case 'STAGE_7_COMPLETED': return 6;
      default: return -1;
    }
  };

  const currentIdx = getStageIndex(currentStage);

  return (
    <div className="bg-[#172033] border border-white/10 rounded-lg p-5 shadow-xl flex flex-col justify-between">
      {/* 7-Stage Visual Progress Bar when active or completed */}
      {(isProcessing || currentStage === 'STAGE_7_COMPLETED' || currentStage === 'FAILED' || currentStage === 'ABORTED') && (
        <div className="mb-5 bg-[#0B1220] p-3 rounded-lg border border-white/10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              {currentStage === 'STAGE_7_COMPLETED' ? (
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
              ) : currentStage === 'FAILED' || currentStage === 'ABORTED' ? (
                <AlertCircle className="w-4 h-4 text-[#FF4757]" />
              ) : (
                <Clock className="w-4 h-4 text-[#00A8FF] animate-spin" />
              )}
              <span>{stageLabel}</span>
            </span>
            <span className="font-mono text-[11px] text-[#00A8FF]">
              {stageProgress}%
            </span>
          </div>

          {/* Continuous progress track */}
          <div className="w-full bg-[#172033] h-2 rounded-full overflow-hidden border border-white/5 mb-3">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                currentStage === 'STAGE_7_COMPLETED'
                  ? 'bg-[#00D084]'
                  : currentStage === 'FAILED' || currentStage === 'ABORTED'
                  ? 'bg-[#FF4757]'
                  : 'bg-gradient-to-r from-[#00A8FF] to-[#00D084]'
              }`}
              style={{ width: `${stageProgress}%` }}
            />
          </div>

          {/* Individual stage nodes */}
          <div className="grid grid-cols-7 gap-1 text-[10px]">
            {stagesList.map((st, i) => {
              const isPast = currentIdx > i || currentStage === 'STAGE_7_COMPLETED';
              const isCurrent = currentIdx === i;
              return (
                <div
                  key={st.id}
                  className={`text-center py-1 px-0.5 rounded truncate transition-colors ${
                    isCurrent
                      ? 'bg-[#00A8FF]/20 text-[#00A8FF] font-bold border border-[#00A8FF]/40'
                      : isPast
                      ? 'bg-[#00D084]/15 text-[#00D084] font-medium'
                      : 'text-slate-500 bg-white/5'
                  }`}
                  title={st.name}
                >
                  {st.name}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Center Action Button */}
      <div className="flex flex-col items-center justify-center py-4 my-auto">
        <button
          onClick={onStartReset}
          disabled={!isResetAllowed}
          className={`relative group px-10 py-4 rounded-xl font-bold text-base tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 select-none ${
            isResetAllowed
              ? 'bg-[#00A8FF] hover:bg-[#0092dd] text-white shadow-[0_0_25px_rgba(0,168,255,0.4)] hover:shadow-[0_0_35px_rgba(0,168,255,0.6)] cursor-pointer active:scale-[0.98]'
              : isProcessing
              ? 'bg-[#1a2b47] text-slate-400 border border-white/10 cursor-not-allowed opacity-90'
              : 'bg-[#1e2a3d] text-slate-500 border border-white/5 cursor-not-allowed opacity-60'
          }`}
          title={isResetAllowed ? 'Start validated factory reset' : getReasonDisabled()}
        >
          {isProcessing ? (
            <>
              <RotateCw className="w-5 h-5 animate-spin text-[#00A8FF]" />
              <span>Resetting User Data...</span>
            </>
          ) : (
            <>
              <Play className={`w-5 h-5 ${isResetAllowed ? 'fill-current' : 'text-slate-500'}`} />
              <span>FACTORY RESET</span>
            </>
          )}
        </button>

        {/* Status tooltip under button */}
        <div className="mt-2.5 text-xs text-center">
          {isResetAllowed ? (
            <span className="text-[#00D084] font-medium flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Safety checks passed. Ready to format user data.</span>
            </span>
          ) : isProcessing ? (
            <span className="text-[#00A8FF] font-medium">
              Communicating with target phone flash memory...
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">
              {getReasonDisabled()}
            </span>
          )}
        </div>
      </div>

      {/* Secondary Buttons (PRD Section 3) */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Detect Device */}
          <button
            onClick={onDetectDevice}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#00A8FF]/15 text-[#00A8FF] hover:bg-[#00A8FF]/25 border border-[#00A8FF]/30 transition-colors disabled:opacity-50 cursor-pointer"
            title="Scan USB and Serial interfaces for MTK phones"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Detect Device</span>
          </button>

          {/* Refresh Ports */}
          <button
            onClick={onRefreshPorts}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50 cursor-pointer"
            title="Refresh Windows COM port enumerator"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh Ports</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Stop Operation */}
          <button
            onClick={onStopOperation}
            disabled={!isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#FF4757]/15 text-[#FF4757] hover:bg-[#FF4757]/25 border border-[#FF4757]/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Safely abort ongoing reset operation"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop Operation</span>
          </button>

          {/* View Logs */}
          <button
            onClick={onViewLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title="Scroll to operation log window"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>View Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
