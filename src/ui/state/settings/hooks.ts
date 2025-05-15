import compareVersions from 'compare-versions';
import { useCallback } from 'react';

import { BITCOIN_CHAINS_MAP, CHAINS_ENUM, ChainType, VERSION } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { useWallet } from '@/ui/utils';
import i18n, { addResourceBundle } from '@/ui/utils/i18n';

import { AppState } from '..';
import { useEnvironment } from '../environment/hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import { settingsActions } from './reducer';

export function useSettingsState(): AppState['settings'] {
  return useAppSelector((state) => state.settings);
}

export function useLocale() {
  const settings = useSettingsState();
  return settings.locale;
}

export function useChangeLocaleCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  return useCallback(
    async (locale: string) => {
      await wallet.setLocale(locale);
      await addResourceBundle(locale);
      i18n.changeLanguage(locale);
      dispatch(
        settingsActions.updateSettings({
          locale
        })
      );

      window.location.reload();
    },
    [dispatch, wallet]
  );
}

export function useAddressType() {
  const accountsState = useSettingsState();
  return accountsState.addressType;
}

export function useNetworkType() {
  const accountsState = useSettingsState();
  return accountsState.networkType;
}

export function useChangeNetworkTypeCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  return useCallback(
    async (type: NetworkType) => {
      if (type === NetworkType.MAINNET) {
        await wallet.setChainType(ChainType.BITCOIN_MAINNET);
        dispatch(
          settingsActions.updateSettings({
            networkType: type,
            chainType: ChainType.BITCOIN_MAINNET
          })
        );
      } else if (type === NetworkType.TESTNET) {
        await wallet.setChainType(ChainType.BITCOIN_TESTNET);
        dispatch(
          settingsActions.updateSettings({
            networkType: type,
            chainType: ChainType.BITCOIN_TESTNET
          })
        );
      }
    },
    [dispatch]
  );
}

export function useBlockstreamUrl(chain?: CHAINS_ENUM) {
  const networkType = useNetworkType();
  const { sideChain } = useEnvironment();
  if (chain === CHAINS_ENUM.SIDE) {
    return sideChain.explorerUrl;
  }

  if (networkType === NetworkType.MAINNET) {
    return 'https://mempool.space';
  } else {
    return 'https://mempool.space/testnet';
  }
}

export function useTxIdUrl(txid: string) {
  const networkType = useNetworkType();
  if (networkType === NetworkType.MAINNET) {
    return `https://mempool.space/tx/${txid}`;
  } else {
    return `https://mempool.space/testnet/tx/${txid}`;
  }
}

export function useUnisatWebsite() {
  const networkType = useNetworkType();
  if (networkType === NetworkType.MAINNET) {
    return 'https://side.one';
  } else {
    return 'https://testnet.side.one';
  }
}

export function useOrdinalsWebsite() {
  const networkType = useNetworkType();
  if (networkType === NetworkType.MAINNET) {
    return 'https://ordinals.com';
  } else {
    return 'https://testnet.ordinals.com';
  }
}

export function useWalletConfig() {
  const accountsState = useSettingsState();
  return accountsState.walletConfig;
}

export function useVersionInfo() {
  const accountsState = useSettingsState();
  const walletConfig = accountsState.walletConfig;
  const newVersion = walletConfig.version;
  const skippedVersion = accountsState.skippedVersion;
  const currentVesion = VERSION;
  let skipped = false;
  let latestVersion = '';
  // skip if new version is empty
  if (!newVersion) {
    skipped = true;
  }

  // skip if skipped
  if (newVersion == skippedVersion) {
    skipped = true;
  }

  // skip if current version is greater or equal to new version
  if (newVersion) {
    if (compareVersions(currentVesion, newVersion) >= 0) {
      skipped = true;
    } else {
      latestVersion = newVersion;
    }
  }

  // skip if current version is 0.0.0
  if (currentVesion === '0.0.0') {
    skipped = true;
  }
  return {
    currentVesion,
    newVersion,
    latestVersion,
    skipped
  };
}

export function useSkipVersionCallback() {
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  return useCallback((version: string) => {
    wallet.setSkippedVersion(version).then((v) => {
      dispatch(settingsActions.updateSettings({ skippedVersion: version }));
    });
  }, []);
}

export function useChainType() {
  const accountsState = useSettingsState();
  return accountsState.chainType;
}

export function useChain() {
  const accountsState = useSettingsState();
  return BITCOIN_CHAINS_MAP[accountsState?.chainType];
}

export function useBTCUnit() {
  const chainType = useChainType();
  return BITCOIN_CHAINS_MAP[chainType]?.unit;
}

export function useChangeChainTypeCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  return useCallback(
    async (type: ChainType) => {
      await wallet.setChainType(type);
      dispatch(
        settingsActions.updateSettings({
          chainType: type
        })
      );
    },
    [dispatch]
  );
}

export function useAutoLockTime() {
  const state = useSettingsState();
  return state.autoLockTime;
}
