import { useCallback, useEffect, useRef } from 'react';
import { HashRouter, Route, Routes, useNavigate as useNavigateOrigin } from 'react-router-dom';

// import IdleTimer, { useIdleTimer } from 'react-idle-timer';
import { LoadingOutlined } from '@ant-design/icons';

import { Content, Icon } from '../components';
import { accountActions } from '../state/accounts/reducer';
import { useIsReady, useIsUnlocked } from '../state/global/hooks';
import { globalActions } from '../state/global/reducer';
import { useAppDispatch } from '../state/hooks';
import { settingsActions } from '../state/settings/reducer';
import { useWallet } from '../utils';
import AddKeyringScreen from './Account/AddKeyringScreen';
import CreateAccountScreen from './Account/CreateAccountScreen';
import CreateHDWalletScreen from './Account/CreateHDWalletScreen';
import CreateKeystoneWalletScreen from './Account/CreateKeystoneWalletScreen';
import CreatePasswordScreen from './Account/CreatePasswordScreen';
import CreateSimpleWalletScreen from './Account/CreateSimpleWalletScreen';
import ForgetPasswordScreen from './Account/ForgetPasswordScreen';
import KeyringSettingScreen from './Account/KeyringSettingScreen';
import SwitchAccountScreen from './Account/SwitchAccountScreen';
import SwitchKeyringScreen from './Account/SwitchKeyringScreen';
import UnlockScreen from './Account/UnlockScreen';
import ApprovalScreen from './Approval/ApprovalScreen';
import ConnectedSitesScreen from './Approval/ConnectedSitesScreen';
import { InscribeTransferScreen } from './Approval/components/InscribeTransfer';
import AtomicalsNFTScreen from './Atomicals/AtomicalsNFTScreen';
import SendArc20Screen from './Atomicals/SendArc20Screen';
import SendAtomicalsInscriptionScreen from './Atomicals/SendAtomicalsNFTScreen';
import BridgeConfirmTabScreen from './Bridge/BridgeConfirmTabScreen';
import AppTabScrren from './Main/AppTabScreen';
import ApproveSuccessScreen from './Main/ApproveSuccessScreen';
import BoostScreen from './Main/BoostScreen';
import BridgeTabScreen from './Main/BridgeTabScreen';
import DiscoverTabScreen from './Main/DiscoverTabScreen';
import EarnTabScreen from './Main/EarnTabScreen';
import ExploreTabScreen from './Main/ExploreTabScreen';
import LendingTabScreen from './Main/LendingTabScreen';
import LoanAuthorizeScreen from './Main/LoanAuthorizeScreen';
import LoanDepositScreen from './Main/LoanDepositScreen';
import LoansTabScreen from './Main/LoansTabScreen';
import SettingsTabScreen from './Main/SettingsTabScreen';
import SwapTabScreen from './Main/SwapTabScreen';
import WalletTabScreen from './Main/WalletTabScreen';
import WelcomeScreen from './Main/WelcomeScreen';
import OrdinalsInscriptionScreen from './Ordinals/OrdinalsInscriptionScreen';
import SendOrdinalsInscriptionScreen from './Ordinals/SendOrdinalsInscriptionScreen';
import SignOrdinalsTransactionScreen from './Ordinals/SignOrdinalsTransactionScreen';
import SplitOrdinalsInscriptionScreen from './Ordinals/SplitOrdinalsInscriptionScreen';
import RunesTokenScreen from './Runes/RunesTokenScreen';
import SendRunesScreen from './Runes/SendRunesScreen';
import AboutScreen from './Settings/AboutScreen';
import AddressTypeScreen from './Settings/AddressTypeScreen';
import AdvancedTabScreen from './Settings/AdvancedTabScreen';
import AutoLockScreen from './Settings/AutoLockScreen';
import ChangeEndpointsScreen from './Settings/ChangeEndpointsScreen';
import ChangePasswordScreen from './Settings/ChangePasswordScreen';
import CurrencyTypeScreen from './Settings/CurrencyTypeScreen';
import DeleteWalletScreen from './Settings/DeleteWalletScreen';
import EditAccountNameScreen from './Settings/EditAccountNameScreen';
import EditWalletNameScreen from './Settings/EditWalletNameScreen';
import ExportMnemonicsScreen from './Settings/ExportMnemonicsScreen';
import ExportPrivateKeyScreen from './Settings/ExportPrivateKeyScreen';
import GeneralTabScreen from './Settings/GeneralTabScreen';
import LanguageTypeScreen from './Settings/LangurageTypeScreen';
import NetworkTypeScreen from './Settings/NetworkTypeScreen';
import ProtectionScreen from './Settings/ProtectionScreen';
import SecurityTabScreen from './Settings/SecurityTabScreen';
import ThemeTypeScreen from './Settings/ThemeTypeScreen';
import UpgradeNoticeScreen from './Settings/UpgradeNoticeScreen';
import TestScreen from './Test/TestScreen';
import HistoryScreen from './Wallet/HistoryScreen';
import ReceiveScreen from './Wallet/ReceiveScreen';
import SelectAddressScreen from './Wallet/SelectAddressScreen';
import SelectCryptoScreen from './Wallet/SelectCryptoScreen';
import SelectNetworkScreen from './Wallet/SelectNetworkScreen';
import TxConfirmScreen from './Wallet/TxConfirmScreen';
import TxCreateScreen from './Wallet/TxCreateScreen';
import TxFailScreen from './Wallet/TxFailScreen';
import TxSuccessScreen from './Wallet/TxSuccessScreen';
import UnavailableUtxoScreen from './Wallet/UnavailableUtxoScreen';
import './index.module.less';

export const routes = {
  BoostScreen: {
    path: '/',
    element: <BoostScreen />
  },
  WelcomeScreen: {
    path: '/welcome',
    element: <WelcomeScreen />
  },
  MainScreen: {
    path: '/main',
    element: <WalletTabScreen />
  },
  DiscoverTabScreen: {
    path: '/discover',
    element: <DiscoverTabScreen />
  },
  AppTabScrren: {
    path: '/app',
    element: <AppTabScrren />
  },
  SettingsTabScreen: {
    path: '/settings',
    element: <SettingsTabScreen />
  },
  ExploreTabScreen: {
    path: '/explore',
    element: <ExploreTabScreen />
  },
  LoansTabScreen: {
    path: '/loans',
    element: <LoansTabScreen />
  },

  EarnTabScreen: {
    path: '/earn',
    element: <EarnTabScreen />
  },

  LendingTabScreen: {
    path: '/lending',
    element: <LendingTabScreen />
  },

  LoanDepositScreen: {
    path: '/loan-deposit',
    element: <LoanDepositScreen />
  },

  LoanAuthorizeScreen: {
    path: '/loan-authorize',
    element: <LoanAuthorizeScreen />
  },

  ApproveSuccessScreen: {
    path: '/approve-success',
    element: <ApproveSuccessScreen />
  },

  BridgeTabScreen: {
    path: '/bridge',
    element: <BridgeTabScreen />
  },

  BridgeConfirmTabScreen: {
    path: '/bridge-confirm',
    element: <BridgeConfirmTabScreen />
  },

  SwapTabScreen: {
    path: '/swap',
    element: <SwapTabScreen />
  },
  CreateHDWalletScreen: {
    path: '/account/create-hd-wallet',
    element: <CreateHDWalletScreen />
  },
  CreateAccountScreen: {
    path: '/account/create',
    element: <CreateAccountScreen />
  },
  CreatePasswordScreen: {
    path: '/account/create-password',
    element: <CreatePasswordScreen />
  },
  UnlockScreen: {
    path: '/account/unlock',
    element: <UnlockScreen />
  },
  ForgetPasswordScreen: {
    path: '/account/forget-password',
    element: <ForgetPasswordScreen />
  },

  SelectNetworkScreen: {
    path: '/wallet/select-network',
    element: <SelectNetworkScreen />
  },

  SelectCryptoScreen: {
    path: '/wallet/select-crypto',
    element: <SelectCryptoScreen />
  },

  SelectAddressScreen: {
    path: '/wallet/select-address',
    element: <SelectAddressScreen />
  },

  SwitchAccountScreen: {
    path: '/account/switch-account',
    element: <SwitchAccountScreen />
  },
  ReceiveScreen: {
    path: '/wallet/receive',
    element: <ReceiveScreen />
  },

  TxCreateScreen: {
    path: '/wallet/tx/create',
    element: <TxCreateScreen />
  },
  TxConfirmScreen: {
    path: '/wallet/tx/confirm',
    element: <TxConfirmScreen />
  },
  TxSuccessScreen: {
    path: '/wallet/tx/success',
    element: <TxSuccessScreen />
  },
  TxFailScreen: {
    path: '/wallet/tx/fail',
    element: <TxFailScreen />
  },

  OrdinalsInscriptionScreen: {
    path: '/ordinals/inscription-detail',
    element: <OrdinalsInscriptionScreen />
  },

  SendOrdinalsInscriptionScreen: {
    path: '/wallet/ordinals-tx/create',
    element: <SendOrdinalsInscriptionScreen />
  },

  SignOrdinalsTransactionScreen: {
    path: '/wallet/ordinals-tx/confirm',
    element: <SignOrdinalsTransactionScreen />
  },

  AtomicalsInscriptionScreen: {
    path: '/atomicals/inscription-detail',
    element: <AtomicalsNFTScreen />
  },

  SendAtomicalsInscriptionScreen: {
    path: '/atomicals/send-inscription',
    element: <SendAtomicalsInscriptionScreen />
  },

  SendArc20Screen: {
    path: '/atomicals/send-arc20',
    element: <SendArc20Screen />
  },

  NetworkTypeScreen: {
    path: '/settings/network-type',
    element: <NetworkTypeScreen />
  },
  ChangePasswordScreen: {
    path: '/settings/password',
    element: <ChangePasswordScreen />
  },
  ExportMnemonicsScreen: {
    path: '/settings/export-mnemonics',
    element: <ExportMnemonicsScreen />
  },
  ExportPrivateKeyScreen: {
    path: '/settings/export-privatekey',
    element: <ExportPrivateKeyScreen />
  },
  ProtectionScreen: {
    path: '/settings/protection',
    element: <ProtectionScreen />
  },

  ChangeEndpointsScreen: {
    path: '/settings/change-endpoints',
    element: <ChangeEndpointsScreen />
  },

  AdvancedTabScreen: {
    path: '/settings/advanced',
    element: <AdvancedTabScreen />
  },

  LanguageTypeScreen: {
    path: '/settings/language',
    element: <LanguageTypeScreen />
  },

  ThemeTypeScreen: {
    path: '/settings/theme',
    element: <ThemeTypeScreen />
  },

  CurrencyTypeScreen: {
    path: '/settings/currency',
    element: <CurrencyTypeScreen />
  },

  GeneralTabScreen: {
    path: '/settings/general',
    element: <GeneralTabScreen />
  },

  SecurityTabScreen: {
    path: '/settings/security',
    element: <SecurityTabScreen />
  },

  AboutScreen: {
    path: '/settings/about',
    element: <AboutScreen />
  },

  AutoLockScreen: {
    path: '/settings/auto-lock',
    element: <AutoLockScreen />
  },

  HistoryScreen: {
    path: '/wallet/history',
    element: <HistoryScreen />
  },
  ApprovalScreen: {
    path: '/approval',
    element: <ApprovalScreen />
  },
  ConnectedSitesScreen: {
    path: '/connected-sites',
    element: <ConnectedSitesScreen />
  },
  SwitchKeyringScreen: {
    path: '/account/switch-keyring',
    element: <SwitchKeyringScreen />
  },
  AddKeyringScreen: {
    path: '/account/add-keyring',
    element: <AddKeyringScreen />
  },
  EditWalletNameScreen: {
    path: '/settings/edit-wallet-name',
    element: <EditWalletNameScreen />
  },
  CreateSimpleWalletScreen: {
    path: '/account/create-simple-wallet',
    element: <CreateSimpleWalletScreen />
  },
  CreateKeystoneWalletScreen: {
    path: '/account/create-keystone-wallet',
    element: <CreateKeystoneWalletScreen />
  },
  UpgradeNoticeScreen: {
    path: '/settings/upgrade-notice',
    element: <UpgradeNoticeScreen />
  },
  AddressTypeScreen: {
    path: '/settings/address-type',
    element: <AddressTypeScreen />
  },
  EditAccountNameScreen: {
    path: '/settings/edit-account-name',
    element: <EditAccountNameScreen />
  },
  InscribeTransferScreen: {
    path: '/inscribe/transfer',
    element: <InscribeTransferScreen />
  },
  // BRC20SendScreen: {
  //   path: '/brc20/send',
  //   element: <BRC20SendScreen />
  // },
  // BRC20TokenScreen: {
  //   path: '/brc20/token',
  //   element: <BRC20TokenScreen />
  // },
  TestScreen: {
    path: '/test',
    element: <TestScreen />
  },
  SplitOrdinalsInscriptionScreen: {
    path: '/wallet/split-tx/create',
    element: <SplitOrdinalsInscriptionScreen />
  },
  UnavailableUtxoScreen: {
    path: '/wallet/unavailable-utxo',
    element: <UnavailableUtxoScreen />
  },

  SendRunesScreen: {
    path: '/runes/send-runes',
    element: <SendRunesScreen />
  },
  RunesTokenScreen: {
    path: '/runes/token',
    element: <RunesTokenScreen />
  },
  KeyringSettingScreen: {
    path: '/keyring/setting',
    element: <KeyringSettingScreen />
  },
  DeleteWalletScreen: {
    path: '/keyring/delete',
    element: <DeleteWalletScreen />
  }
};

type RouteTypes = keyof typeof routes;

export function useNavigate() {
  const navigate = useNavigateOrigin();
  return useCallback(
    (routKey: RouteTypes, state?: any) => {
      navigate(routes[routKey].path, { state });
    },
    [useNavigateOrigin]
  );
}

const Main = () => {
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const isReady = useIsReady();
  const isUnlocked = useIsUnlocked();

  const selfRef = useRef({
    settingsLoaded: false,
    summaryLoaded: false,
    accountLoaded: false,
    configLoaded: false
  });
  const self = selfRef.current;
  const init = useCallback(async () => {
    try {
      if (!self.accountLoaded) {
        const currentAccount = await wallet.getCurrentAccount();
        if (currentAccount) {
          dispatch(accountActions.setCurrent(currentAccount));

          const accounts = await wallet.getAccounts();
          dispatch(accountActions.setAccounts(accounts));

          if (accounts.length > 0) {
            self.accountLoaded = true;
          }
        }
      }

      if (!self.settingsLoaded) {
        const networkType = await wallet.getNetworkType();
        dispatch(
          settingsActions.updateSettings({
            networkType
          })
        );

        const _locale = await wallet.getLocale();
        dispatch(settingsActions.updateSettings({ locale: _locale }));
        self.settingsLoaded = true;
      }

      if (!self.summaryLoaded) {
        wallet.getInscriptionSummary().then((data) => {
          dispatch(accountActions.setInscriptionSummary(data));
        });

        wallet.getAppSummary().then((data) => {
          dispatch(accountActions.setAppSummary(data));
        });
        self.summaryLoaded = true;
      }

      if (!self.configLoaded) {
        wallet.getWalletConfig().then((data) => {
          dispatch(settingsActions.updateSettings({ walletConfig: data }));
        });
        wallet.getSkippedVersion().then((data) => {
          dispatch(settingsActions.updateSettings({ skippedVersion: data }));
        });

        wallet.getAutoLockTime().then((data) => {
          dispatch(settingsActions.updateSettings({ autoLockTime: data }));
        });
      }

      dispatch(globalActions.update({ isReady: true }));
    } catch (e) {
      console.log('init error', e);
    }
  }, [wallet, dispatch, isReady, isUnlocked]);

  useEffect(() => {
    wallet.hasVault().then((val) => {
      if (val) {
        dispatch(globalActions.update({ isBooted: true }));
        wallet.isUnlocked().then((isUnlocked) => {
          dispatch(globalActions.update({ isUnlocked }));
        });
      }
    });
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  if (!isReady) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
        <Content justifyCenter itemsCenter>
          <Icon color={'primary'}>
            <LoadingOutlined />
          </Icon>
        </Content>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        {Object.keys(routes)
          .map((v) => routes[v])
          .map((v) => (
            <Route key={v.path} path={v.path} element={v.element} />
          ))}
      </Routes>
    </HashRouter>
  );
};

export default Main;
