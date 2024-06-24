import { AddressType, RestoreWalletType } from '@/shared/types';

export enum TabType {
  STEP1 = '1',
  STEP2 = '2',
  STEP3 = '3'
}

export enum WordsType {
  WORDS_12,
  WORDS_24
}

export const WORDS_12_ITEM = {
  key: WordsType.WORDS_12,
  label: '12 words',
  count: 12
};

export const WORDS_24_ITEM = {
  key: WordsType.WORDS_24,
  label: '24 words',
  count: 24
};

export interface ContextData {
  mnemonics: string;
  hdPath: string;
  passphrase: string;
  addressType: AddressType;
  step1Completed: boolean;
  tabType: TabType;
  restoreWalletType: RestoreWalletType;
  isRestore: boolean;
  isCustom: boolean;
  customHdPath: string;
  addressTypeIndex: number;
  wordsType: WordsType;
  mnemonicsObj: {
    mnemonics12: string;
    mnemonics24: string;
  };
}

export interface UpdateContextDataParams {
  mnemonics?: string;
  hdPath?: string;
  passphrase?: string;
  addressType?: AddressType;
  step1Completed?: boolean;
  tabType?: TabType;
  restoreWalletType?: RestoreWalletType;
  isCustom?: boolean;
  customHdPath?: string;
  addressTypeIndex?: number;
  wordsType?: WordsType;
  mnemonicsObj?: {
    mnemonics12: string;
    mnemonics24: string;
  };
}
