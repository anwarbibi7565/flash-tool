/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Type definitions for MTK chipset management, serial communication, and reset protocols
 */

export type ConnectionState = 
  | 'disconnected'
  | 'waiting'
  | 'connected'
  | 'detecting'
  | 'checking_compatibility'
  | 'supported'
  | 'unsupported'
  | 'error';

export type ProtocolType = 
  | 'BROM_FAT_FORMAT'
  | 'MODEM_AT_RESET'
  | 'META_USERDATA_WIPE'
  | 'UNSUPPORTED';

export interface SupportedChipset {
  id: string;
  name: string; // e.g. "MT6261", "MT6260"
  family: string; // e.g. "MT626x Keypad Series"
  targetDevices: string; // "Keypad Feature Phones"
  hardwareCode: number; // e.g. 0x6261
  hwSubCode?: number;
  hwVersion?: number;
  swVersion?: number;
  verified: boolean;
  userStorageType: 'NOR_FLASH' | 'NAND_FLASH' | 'SPI_FLASH';
  userDataPartitionOffset: string; // e.g. "0x003C0000"
  userDataSize: string; // e.g. "256 KB"
  supportedProtocols: ProtocolType[];
  bootKeyInstructions: string;
  typicalModels: string[];
}

export interface DeviceInfo {
  status: ConnectionState;
  statusMessage: string;
  port: string | null; // e.g. "COM3 (USB VCOM Port)"
  chipset: string | null; // e.g. "MediaTek MT6261D"
  chipsetId?: string;
  deviceModel: string | null; // e.g. "Nokia 105 (TA-1034)" or "Generic MTK Feature Phone"
  usbConnection: 'Connected' | 'Disconnected' | 'Connecting';
  protocolSupport: 'Supported' | 'Unsupported' | 'Checking' | 'Unknown';
  hardwareCode?: string;
  flashId?: string;
  nvramProtected: boolean;
  imeiProtected: boolean;
  firmwareProtected: boolean;
}

export type ResetStage = 
  | 'IDLE'
  | 'STAGE_1_CONNECTING'
  | 'STAGE_2_IDENTIFYING_CHIPSET'
  | 'STAGE_3_CHECKING_COMPATIBILITY'
  | 'STAGE_4_PREPARING_RESET'
  | 'STAGE_5_RESETTING_USERDATA'
  | 'STAGE_6_VERIFYING_RESULT'
  | 'STAGE_7_COMPLETED'
  | 'FAILED'
  | 'ABORTED';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'success' | 'warn' | 'error' | 'hex';
  details?: string;
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  chipset: string;
  model: string;
  port: string;
  isSupported: boolean;
  failAtStage?: number;
  errorMessage?: string;
  troubleshooting?: string;
}
