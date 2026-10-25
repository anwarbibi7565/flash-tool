/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Professional Reset Operation Log Panel (PRD Section 6)
 */

import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types/mtk';
import { 
  Terminal, 
  Copy, 
  Trash2, 
  Download, 
  Check, 
  Filter, 
  ChevronDown
} from 'lucide-react';

interface LogViewerProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs, onClearLogs }) => {
  const [copied, setCopied] = useState(false);
  const [filterLevel, setFilterLevel] = useState<'all' | 'info' | 'success' | 'warn' | 'error' | 'hex'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new log entry
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCopy = async () => {
    const text = logs.map(l => `[${l.timestamp}] ${l.message}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  const handleSaveTxt = () => {
    const text = [
      '====================================================',
      'FUTURE REPAIRING INSTITUTE - MTK KEYPAD RESET TOOL',
      'Operation Diagnostic Log Export',
      `Exported at: ${new Date().toLocaleString()}`,
      '====================================================',
      '',
      ...logs.map(l => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.message}${l.details ? ' -> ' + l.details : ''}`),
      '',
      '====================================================',
      'End of Session Log',
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MTK_Reset_Log_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredLogs = logs.filter(l => {
    if (filterLevel === 'all') return true;
    return l.level === filterLevel;
  });

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return 'text-[#00D084] font-semibold';
      case 'error':
        return 'text-[#FF4757] font-semibold';
      case 'warn':
        return 'text-[#FFB020]';
      case 'hex':
        return 'text-slate-400 font-mono text-[11px]';
      default:
        return 'text-slate-200';
    }
  };

  return (
    <div id="log-panel" className="bg-[#172033] border border-white/10 rounded-lg p-3 shadow-xl flex flex-col h-[320px]">
      {/* Log Header with Controls */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00A8FF]" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-200">
            Reset Operation Log
          </h3>
          <span className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/5 font-mono">
            {filteredLogs.length} events
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {/* Level Filter */}
          <div className="relative">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as any)}
              className="bg-[#0B1220] text-slate-300 text-[11px] border border-white/10 rounded px-2 py-1 outline-none cursor-pointer hover:border-[#00A8FF]/50"
            >
              <option value="all">All Logs</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warn">Warnings</option>
              <option value="error">Errors</option>
              <option value="hex">Hex Protocols</option>
            </select>
          </div>

          {/* Copy Logs */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors text-[11px] cursor-pointer"
            title="Copy entire log to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#00D084]" />
                <span className="text-[#00D084]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Save Log as TXT */}
          <button
            onClick={handleSaveTxt}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors text-[11px] cursor-pointer"
            title="Download log file (.TXT)"
          >
            <Download className="w-3 h-3 text-[#00A8FF]" />
            <span>Save TXT</span>
          </button>

          {/* Clear Log View */}
          <button
            onClick={onClearLogs}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 text-slate-400 hover:text-[#FF4757] hover:bg-white/10 border border-white/10 transition-colors text-[11px] cursor-pointer"
            title="Clear the current log window"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="flex-1 bg-[#090E18] rounded border border-black/50 p-2.5 font-mono text-[12px] leading-relaxed overflow-y-auto select-text"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-slate-600 italic py-8 text-center text-xs">
            No log entries recorded for current filter.
          </div>
        ) : (
          filteredLogs.map((entry) => (
            <div key={entry.id} className="py-0.5 hover:bg-white/[0.02] flex items-start gap-2">
              <span className="text-slate-500 shrink-0 font-mono select-none">
                [{entry.timestamp}]
              </span>
              <div className="flex-1 break-words">
                <span className={getLogColor(entry.level)}>
                  {entry.message}
                </span>
                {entry.details && (
                  <div className="text-[11px] text-slate-400 mt-0.5 ml-2 border-l border-white/10 pl-2">
                    {entry.details}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
