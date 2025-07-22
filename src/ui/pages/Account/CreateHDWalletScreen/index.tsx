import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AddressType, RestoreWalletType } from '@/shared/types';
import { Column, Header, Layout, StepBar } from '@/ui/components';
import { useExtensionIsInTab } from '@/ui/features/browser/tabs';

import { useNavigate } from '../../MainRoute';
import Step1_Create from './Step1_Create';
import Step1_Import from './Step1_Import';
import Step2_SetName from './Step2_SetName';
import Step2_Verify from './Step2_Verify';
import { ContextData, TabType, UpdateContextDataParams, WordsType } from './type';

export default function CreateHDWalletScreen() {
  const navigate = useNavigate();
  const isInTab = useExtensionIsInTab();

  const { state } = useLocation();
  const { isImport, fromUnlock } = state as {
    isImport: boolean;
    fromUnlock: boolean;
  };

  const [contextData, setContextData] = useState<ContextData>({
    mnemonics: '',
    hdPath: '',
    passphrase: '',
    addressType: AddressType.P2WPKH,
    step1Completed: false,
    tabType: TabType.STEP1,
    restoreWalletType: RestoreWalletType.UNISAT,
    isRestore: isImport,
    isCustom: false,
    customHdPath: '',
    addressTypeIndex: 0,
    wordsType: WordsType.WORDS_12,
    mnemonicsObj: {
      mnemonics12: '',
      mnemonics24: ''
    }
  });

  const updateContextData = useCallback(
    (params: UpdateContextDataParams) => {
      setContextData(Object.assign({}, contextData, params));
    },
    [contextData, setContextData]
  );

  const items = useMemo(() => {
    if (contextData.isRestore) {
      // 1) import an existing enmonics
      // 2) contextData.restoreWalletType === RestoreWalletType.UNISAT
      return [
        {
          key: TabType.STEP1,
          label: 'Step 1',
          children: <Step1_Import contextData={contextData} updateContextData={updateContextData} />
        },
        {
          key: TabType.STEP2,
          label: 'Step 2',
          children: <Step2_SetName contextData={contextData} updateContextData={updateContextData} />
        }
      ];
    } else {
      // 1) create a new wallet
      return [
        {
          key: TabType.STEP1,
          label: 'Step 1',
          children: <Step1_Create contextData={contextData} updateContextData={updateContextData} />
        },
        {
          key: TabType.STEP2,
          label: 'Step 2',
          children: <Step2_Verify contextData={contextData} updateContextData={updateContextData} />
        },
        {
          key: TabType.STEP3,
          label: 'Step 3',
          children: <Step2_SetName contextData={contextData} updateContextData={updateContextData} />
        }
      ];
    }
  }, [contextData, updateContextData]);

  const currentChildren = useMemo(() => {
    const item = items.find((v) => v.key === contextData.tabType);
    return item?.children;
  }, [items, contextData.tabType]);

  return (
    <Layout
      style={{
        minHeight: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px',
        height: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px'
      }}>
      <Header
        onBack={() => {
          if (fromUnlock) {
            navigate('WelcomeScreen');
          } else {
            window.history.go(-1);
          }
        }}
        title={contextData.isRestore ? 'Import an existing wallet' : 'Create a new wallet'}
      />
      <Column
        style={{
          padding: '0 16px 0',
          marginTop: '10px',
          marginBottom: '10px'
        }}>
        <StepBar
          activeKey={contextData.tabType}
          items={items.map((v) => ({
            key: v.key,
            label: v.label
          }))}
        />
      </Column>
      {currentChildren}
    </Layout>
  );
}
