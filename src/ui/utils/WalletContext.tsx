import { createContext, ReactNode, useContext } from 'react';

import { AccountAsset } from '@/background/controller/wallet';
import { ContactBookItem, ContactBookStore } from '@/background/service/contactBook';
import { ToSignInput } from '@/background/service/keyring';
import { ConnectedSite } from '@/background/service/permission';
import { AddressFlagType, ChainType } from '@/shared/constant';
import {
  Account,
  AddressRunesTokenSummary,
  AddressSummary,
  AddressTokenSummary,
  AppSummary,
  Arc20Balance,
  BalanceItem,
  BitcoinBalance,
  DecodedPsbt,
  FeeSummary,
  InscribeOrder,
  Inscription,
  InscriptionSummary,
  NetworkType,
  RuneBalance,
  SignPsbtOptions,
  TickPriceItem,
  TokenBalance,
  TokenTransfer,
  TxHistoryItem,
  UTXO,
  UTXO_Detail,
  VersionDetail,
  WalletConfig,
  WalletKeyring
} from '@/shared/types';
import { AddressType, UnspentOutput } from '@unisat/wallet-sdk';
import { bitcoin } from '@unisat/wallet-sdk/lib/bitcoin-core';

export interface WalletController {
  openapi: {
    [key: string]: () => Promise<any>;
  };

  boot(): Promise<void>;
  isBooted(): Promise<boolean>;

  getApproval(): Promise<void>;
  resolveApproval(data?: any): Promise<void>;
  rejectApproval(data?: any, data2?: any, data3?: any): Promise<void>;

  hasVault(): Promise<boolean>;

  verifyPassword(password: string): Promise<void>;
  changePassword: (password: string, newPassword: string) => Promise<void>;

  unlock(password: string): Promise<void>;
  isUnlocked(): Promise<boolean>;

  lockWallet(): Promise<void>;
  setPopupOpen(isOpen: boolean): void;
  isReady(): Promise<boolean>;

  getAddressBalance(address: string): Promise<BitcoinBalance>;
  getAddressCacheBalance(address: string): Promise<BitcoinBalance>;
  getMultiAddressAssets(addresses: string): Promise<AddressSummary[]>;
  findGroupAssets(
    groups: { type: number; address_arr: string[]; pubkey_arr: string[] }[]
  ): Promise<{ type: number; address_arr: string[]; pubkey_arr: string[]; satoshis_arr: number[] }[]>;

  getAddressInscriptions(
    address: string,
    cursor: number,
    size: number
  ): Promise<{ list: Inscription[]; total: number }>;

  getAddressHistory: (address: string) => Promise<TxHistoryItem[]>;
  getAddressCacheHistory: (address: string) => Promise<TxHistoryItem[]>;

  listChainAssets: (address: string) => Promise<AccountAsset[]>;

  getLocale(): Promise<string>;
  setLocale(locale: string): Promise<void>;

  getCurrency(): Promise<string>;
  setCurrency(currency: string): Promise<void>;

  clearKeyrings(): Promise<void>;
  getPrivateKey(password: string, account: { address: string; type: string }): Promise<{ hex: string; wif: string }>;
  getMnemonics(
    password: string,
    keyring: WalletKeyring
  ): Promise<{
    hdPath: string;
    mnemonic: string;
    passphrase: string;
  }>;
  createKeyringWithPrivateKey(data: string, addressType: AddressType, alianName?: string): Promise<Account[]>;
  getPreMnemonics(): Promise<{ mnemonics12: any; mnemonics24: any }>;
  generatePreMnemonic(): Promise<{ mnemonics12: any; mnemonics24: any }>;
  removePreMnemonics(): void;
  createKeyringWithMnemonics(
    mnemonic: string,
    hdPath: string,
    passphrase: string,
    addressType: AddressType,
    accountCount: number,
    walletName?: string
  ): Promise<{ address: string; type: string }[]>;
  createKeyringWithKeystone(
    urType: string,
    urCbor: string,
    addressType: AddressType,
    hdPath: string,
    accountCount: number,
    filterPubkey?: string[]
  ): Promise<{ address: string; type: string }[]>;
  createTmpKeyringWithPrivateKey(privateKey: string, addressType: AddressType): Promise<WalletKeyring>;
  createTmpKeyringWithKeystone(
    urType: string,
    urCbor: string,
    addressType: AddressType,
    hdPath: string,
    accountCount?: number
  ): Promise<WalletKeyring>;

  createTmpKeyringWithMnemonics(
    mnemonic: string,
    hdPath: string,
    passphrase: string,
    addressType: AddressType,
    accountCount?: number
  ): Promise<WalletKeyring>;
  removeKeyring(keyring: WalletKeyring): Promise<WalletKeyring>;
  deriveNewAccountFromMnemonic(keyring: WalletKeyring, alianName?: string): Promise<string[]>;
  getAccountsCount(): Promise<number>;
  getAllAlianName: () => (ContactBookItem | undefined)[];
  getContactsByMap: () => ContactBookStore;
  updateAlianName: (pubkey: string, name: string) => Promise<void>;

  getCurrentAccount(): Promise<Account>;
  getAccounts(): Promise<Account[]>;
  getNextAlianName: (keyring: WalletKeyring) => Promise<string>;

  getCurrentKeyringAccounts(): Promise<Account[]>;

  signTransaction(psbt: bitcoin.Psbt, inputs: ToSignInput[]): Promise<bitcoin.Psbt>;
  signPsbtWithHex(psbtHex: string, toSignInputs: ToSignInput[], autoFinalized: boolean): Promise<string>;
  signMessage(message: string): Promise<string>;

  signAdaptor(message: string, adaptorPoint: string): Promise<string>;

  signSnorr(message: string): Promise<string>;

  signAdaptorAndMessage(
    message: string,
    sigHash: string,
    adaptorPoint: string,
    defaultAdaptorPoint: string,
    repaymentSigHashHex: string
  ): Promise<{
    liquidation_adaptor_signature: string;
    default_adaptor_signature: string;
    repayment_signature: string;
    message_signature: string;
  }>;

  sendBTC(data: {
    to: string;
    amount: number;
    btcUtxos: UnspentOutput[];
    feeRate: number;
    enableRBF: boolean;
    memo?: string;
    memos?: string[];
  }): Promise<string>;

  sendAllBTC(data: { to: string; btcUtxos: UnspentOutput[]; feeRate: number; enableRBF: boolean }): Promise<string>;

  sendOrdinalsInscription(data: {
    to: string;
    inscriptionId: string;
    feeRate: number;
    outputValue?: number;
    enableRBF: boolean;
    btcUtxos: UnspentOutput[];
  }): Promise<string>;

  sendOrdinalsInscriptions(data: {
    to: string;
    inscriptionIds: string[];
    feeRate: number;
    enableRBF: boolean;
    btcUtxos: UnspentOutput[];
  }): Promise<string>;

  splitOrdinalsInscription(data: {
    inscriptionId: string;
    feeRate: number;
    outputValue: number;
    enableRBF: boolean;
    btcUtxos: UnspentOutput[];
  }): Promise<{ psbtHex: string; splitedCount: number }>;

  pushTx(rawtx: string): Promise<string>;

  queryDomainInfo(domain: string): Promise<Inscription>;

  getInscriptionSummary(): Promise<InscriptionSummary>;
  getAppSummary(): Promise<AppSummary>;
  getBTCUtxos(): Promise<UnspentOutput[]>;
  getUnavailableUtxos(): Promise<UnspentOutput[]>;
  getAssetUtxosAtomicalsFT(ticker: string): Promise<UnspentOutput[]>;
  getAssetUtxosAtomicalsNFT(atomicalId: string): Promise<UnspentOutput[]>;
  getAssetUtxosInscriptions(inscriptionId: string): Promise<UnspentOutput[]>;

  getNetworkType(): Promise<NetworkType>;
  setNetworkType(type: NetworkType): Promise<void>;

  getChainType(): Promise<ChainType>;
  setChainType(type: ChainType): Promise<void>;

  getConnectedSites(): Promise<ConnectedSite[]>;
  removeConnectedSite(origin: string): Promise<void>;
  getCurrentConnectedSite(id: string): Promise<ConnectedSite>;

  getCurrentKeyring(): Promise<WalletKeyring>;
  getKeyrings(): Promise<WalletKeyring[]>;
  changeKeyring(keyring: WalletKeyring, accountIndex?: number): Promise<void>;
  getAllAddresses(keyring: WalletKeyring, index: number): Promise<string[]>;

  setKeyringAlianName(keyring: WalletKeyring, name: string): Promise<WalletKeyring>;
  changeAddressType(addressType: AddressType): Promise<void>;

  setAccountAlianName(account: Account, name: string): Promise<Account>;
  getFeeSummary(): Promise<FeeSummary>;
  getBtcPrice(): Promise<number>;
  getBrc20sPrice(ticks: string[]): Promise<{ [tick: string]: TickPriceItem }>;
  getRunesPrice(ticks: string[]): Promise<{ [tick: string]: TickPriceItem }>;

  setEditingKeyring(keyringIndex: number): Promise<void>;
  getEditingKeyring(): Promise<WalletKeyring>;

  setEditingAccount(account: Account): Promise<void>;
  getEditingAccount(): Promise<Account>;

  inscribeBRC20Transfer(
    address: string,
    tick: string,
    amount: string,
    feeRate: number,
    outputValue: number
  ): Promise<InscribeOrder>;
  getInscribeResult(orderId: string): Promise<TokenTransfer>;

  decodePsbt(psbtHex: string, website: string): Promise<DecodedPsbt>;

  getAllInscriptionList(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: Inscription[] }>;

  getBRC20List(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: TokenBalance[] }>;

  getBRC20List5Byte(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: TokenBalance[] }>;

  getBRC20TransferableList(
    address: string,
    ticker: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: TokenTransfer[] }>;

  getOrdinalsInscriptions(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: Inscription[] }>;

  getAtomicalsNFTs(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: Inscription[] }>;

  getBRC20Summary(address: string, ticker: string): Promise<AddressTokenSummary>;

  expireUICachedData(address: string): Promise<void>;

  createPaymentUrl(address: string, channel: string): Promise<string>;

  getWalletConfig(): Promise<WalletConfig>;

  getSkippedVersion(): Promise<string>;
  setSkippedVersion(version: string): Promise<void>;

  getInscriptionUtxoDetail(inscriptionId: string): Promise<UTXO_Detail>;
  getUtxoByInscriptionId(inscriptionId: string): Promise<UTXO>;
  getInscriptionInfo(inscriptionId: string): Promise<Inscription>;

  checkWebsite(website: string): Promise<{ isScammer: boolean; warning: string }>;

  readTab(tabName: string): Promise<void>;
  readApp(appid: number): Promise<void>;

  formatOptionsToSignInputs(psbtHex: string, options: SignPsbtOptions): Promise<ToSignInput[]>;

  getArc20BalanceList(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: Arc20Balance[] }>;

  sendAtomicalsNFT(data: {
    to: string;
    atomicalId: string;
    feeRate: number;
    enableRBF: boolean;
    btcUtxos: UnspentOutput[];
  }): Promise<string>;

  sendAtomicalsFT(data: {
    to: string;
    ticker: string;
    amount: number;
    feeRate: number;
    enableRBF: boolean;
    btcUtxos: UnspentOutput[];
    assetUtxos: UnspentOutput[];
  }): Promise<string>;

  getAddressSummary(address: string): Promise<AddressSummary>;

  getShowSafeNotice(): Promise<boolean>;
  setShowSafeNotice(show: boolean): Promise<void>;

  // address flag
  addAddressFlag(account: Account, flag: AddressFlagType): Promise<Account>;
  removeAddressFlag(account: Account, flag: AddressFlagType): Promise<Account>;

  getVersionDetail(version: string): Promise<VersionDetail>;

  genSignPsbtUr(psbtHex: string): Promise<{ type: string; cbor: string }>;
  parseSignPsbtUr(
    type: string,
    cbor: string,
    isFinalize?: boolean
  ): Promise<{
    psbtHex: string;
    rawTx: string;
  }>;
  genSignMsgUr(text: string, msgType?: string): Promise<{ type: string; cbor: string; requestId: string }>;
  parseSignMsgUr(
    type: string,
    cbor: string,
    msgType?: string
  ): Promise<{ requestId: string; publicKey: string; signature: string }>;

  getEnableSignData(): Promise<boolean>;
  setEnableSignData(enable: boolean): Promise<void>;

  getRunesList(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: RuneBalance[] }>;

  getAssetUtxosRunes(rune: string): Promise<UnspentOutput[]>;

  getAddressRunesTokenSummary(address: string, runeid: string): Promise<AddressRunesTokenSummary>;

  sendRunes(data: {
    to: string;
    runeid: string;
    runeAmount: string;
    feeRate: number;
    enableRBF: boolean;
    btcUtxos?: UnspentOutput[];
    assetUtxos?: UnspentOutput[];
    outputValue: number;
  }): Promise<string>;

  getBuyBtcChannelList(): Promise<{ channel: string }[]>;

  setBtcBalanceList(data: BalanceItem[]): Promise<void>;
  setSideBalanceList(data: BalanceItem[]): Promise<void>;

  getSideBalanceList(): Promise<BalanceItem[]>;
  getBtcBalanceList(): Promise<BalanceItem[]>;

  reset(): Promise<void>;

  setAutoLockTime(minutes: number): Promise<void>;
  getAutoLockTime(): Promise<number>;

  setLastActiveTime(): Promise<void>;
}

const WalletContext = createContext<{
  wallet: WalletController;
} | null>(null);

const WalletProvider = ({ children, wallet }: { children?: ReactNode; wallet: WalletController }) => (
  <WalletContext.Provider value={{ wallet }}>{children}</WalletContext.Provider>
);

const useWallet = () => {
  const { wallet } = useContext(WalletContext) as {
    wallet: WalletController;
  };

  return wallet;
};

export { useWallet, WalletProvider };
