/**
 * MTK Keypad Reset Tool - Future Repairing Institute
 * Chipset Knowledgebase & Verified Compatibility Database
 */

import { SupportedChipset } from '../types/mtk';

export const VERIFIED_MTK_CHIPSETS: Record<string, SupportedChipset> = {
  'MT6261': {
    id: 'MT6261',
    name: 'MediaTek MT6261 (ARM7EJ-S)',
    family: 'MT626x Keypad Series',
    targetDevices: 'Keypad Feature Phones',
    hardwareCode: 0x6261,
    hwSubCode: 0x8A00,
    hwVersion: 0xCB00,
    swVersion: 0x0001,
    verified: true,
    userStorageType: 'NOR_FLASH',
    userDataPartitionOffset: '0x003C0000',
    userDataSize: '256 KB (FAT/User Storage)',
    supportedProtocols: ['BROM_FAT_FORMAT', 'MODEM_AT_RESET'],
    bootKeyInstructions: 'Hold Center key or [0] key, re-insert battery, connect micro-USB cable.',
    typicalModels: [
      'Nokia 105 (TA-1034 / TA-1174)',
      'Nokia 106 (TA-1114)',
      'Itel it2160 / it2163',
      'Micromax X412 / X512',
      'Lava A1 / Captain N1',
      'Generic Chinese MT6261 Feature Phones'
    ]
  },
  'MT6260': {
    id: 'MT6260',
    name: 'MediaTek MT6260 (ARM7EJ-S)',
    family: 'MT626x Keypad Series',
    targetDevices: 'Keypad Feature Phones',
    hardwareCode: 0x6260,
    hwSubCode: 0x8A00,
    hwVersion: 0xCA00,
    swVersion: 0x0001,
    verified: true,
    userStorageType: 'NOR_FLASH',
    userDataPartitionOffset: '0x00780000',
    userDataSize: '512 KB (FAT/User Storage)',
    supportedProtocols: ['BROM_FAT_FORMAT', 'MODEM_AT_RESET'],
    bootKeyInstructions: 'Hold Call (Green) key or [*] key, plug USB with battery inserted.',
    typicalModels: [
      'Nokia 215 / 220 / 222 (RM-1110 / RM-969)',
      'Itel it5081',
      'Micromax X2814',
      'Kechaoda K115',
      'Spice M-5365'
    ]
  },
  'MT6250': {
    id: 'MT6250',
    name: 'MediaTek MT6250 (ARM7EJ-S)',
    family: 'MT625x Keypad Series',
    targetDevices: 'Keypad Feature Phones',
    hardwareCode: 0x6250,
    hwSubCode: 0x8A00,
    hwVersion: 0xC900,
    swVersion: 0x0001,
    verified: true,
    userStorageType: 'NOR_FLASH',
    userDataPartitionOffset: '0x003A0000',
    userDataSize: '256 KB (FAT/User Storage)',
    supportedProtocols: ['BROM_FAT_FORMAT', 'MODEM_AT_RESET'],
    bootKeyInstructions: 'Hold Center OK button while plugging USB cable with battery charged.',
    typicalModels: [
      'Micromax X101 / X267',
      'Intex Eco 105',
      'Karbonn K9',
      'G-Five Feature Phones'
    ]
  },
  'MT6252': {
    id: 'MT6252',
    name: 'MediaTek MT6252 (ARM7EJ-S)',
    family: 'MT625x Keypad Series',
    targetDevices: 'Keypad Feature Phones',
    hardwareCode: 0x6252,
    hwSubCode: 0x8A00,
    hwVersion: 0xC800,
    swVersion: 0x0001,
    verified: true,
    userStorageType: 'NOR_FLASH',
    userDataPartitionOffset: '0x00380000',
    userDataSize: '256 KB (FAT/User Storage)',
    supportedProtocols: ['BROM_FAT_FORMAT', 'MODEM_AT_RESET'],
    bootKeyInstructions: 'Hold [5] or [#] key, connect USB.',
    typicalModels: [
      'Zen M25',
      'Fly DS105',
      'Micromax X225'
    ]
  },
  'MT6235': {
    id: 'MT6235',
    name: 'MediaTek MT6235 (ARM926EJ-S)',
    family: 'MT623x Legacy Keypad Series',
    targetDevices: 'Older Feature Phones',
    hardwareCode: 0x6235,
    hwSubCode: 0x8A00,
    hwVersion: 0xC500,
    swVersion: 0x0001,
    verified: true,
    userStorageType: 'NAND_FLASH',
    userDataPartitionOffset: '0x02000000',
    userDataSize: '2 MB (FAT Block)',
    supportedProtocols: ['BROM_FAT_FORMAT'],
    bootKeyInstructions: 'Power off, hold Power/End key lightly while connecting USB.',
    typicalModels: [
      'Alcatel OT-800 / OT-808 Tribe',
      'Micromax Q5 / Q7',
      'Fly E130'
    ]
  },
  'MT6236': {
    id: 'MT6236',
    name: 'MediaTek MT6236 (ARM926EJ-S)',
    family: 'MT623x Legacy Keypad Series',
    targetDevices: 'Older Feature Phones',
    hardwareCode: 0x6236,
    hwSubCode: 0x8A00,
    hwVersion: 0xC600,
    swVersion: 0x0001,
    verified: true,
    userStorageType: 'NAND_FLASH',
    userDataPartitionOffset: '0x02400000',
    userDataSize: '2 MB (FAT Block)',
    supportedProtocols: ['BROM_FAT_FORMAT'],
    bootKeyInstructions: 'Hold Volume Down / Left Soft Key while connecting USB.',
    typicalModels: [
      'Alcatel One Touch 818',
      'Fly E145 TV',
      'Spice QT-68'
    ]
  }
};

/**
 * Known unsupported chipsets that must be rejected safely
 */
export const UNSUPPORTED_CHIPSETS: Record<string, { reason: string; advice: string }> = {
  'MT6735': {
    reason: 'Smartphone Android 64-bit SoC detected. Not a keypad feature phone.',
    advice: 'This tool is exclusively designed for MTK Keypad Feature Phones. Android devices are rejected to prevent bricking or partition damage.'
  },
  'MT6580': {
    reason: 'Smartphone Android 32-bit SoC detected.',
    advice: 'Android smartphones have complex emmc/ufs partition tables. Use official smartphone flash tools.'
  },
  'MT6739': {
    reason: 'Modern LTE Android platform detected.',
    advice: 'Operation rejected for safety.'
  },
  'SC6531': {
    reason: 'Unisoc / Spreadtrum (SPD) chipset detected, not MediaTek.',
    advice: 'This mobile uses a Spreadtrum SC6531 CPU. Use an SPD-compatible research tool.'
  },
  'UNKNOWN_MTK': {
    reason: 'Unverified or unrecognized MTK hardware ID.',
    advice: 'The reset engine refuses to erase memory on unverified chipsets without a validated safety profile.'
  }
};

/**
 * Identify MTK chipset from BROM HW code or AT response string
 */
export function identifyChipset(identifier: string | number): SupportedChipset | null {
  if (typeof identifier === 'number') {
    for (const chipset of Object.values(VERIFIED_MTK_CHIPSETS)) {
      if (chipset.hardwareCode === identifier) {
        return chipset;
      }
    }
  } else {
    const upper = identifier.toUpperCase();
    for (const [key, chipset] of Object.entries(VERIFIED_MTK_CHIPSETS)) {
      if (upper.includes(key)) {
        return chipset;
      }
    }
  }
  return null;
}
