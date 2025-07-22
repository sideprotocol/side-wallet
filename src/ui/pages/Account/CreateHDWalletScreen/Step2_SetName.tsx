import { useMemo, useState } from 'react';

import { ADDRESS_TYPES, RESTORE_WALLETS } from '@/shared/constant';
import { Button, Column, Image, Input, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useReloadAccounts } from '@/ui/state/accounts/hooks';
import { useCreateAccountCallback } from '@/ui/state/global/hooks';
import { useChangeNetworkTypeCallback } from '@/ui/state/settings/hooks';
import { useWallet } from '@/ui/utils';
import { AddressType } from '@unisat/wallet-sdk';

import { useNavigate } from '../../MainRoute';
import { ContextData, UpdateContextDataParams } from './type';

export default function Step2_SetName({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const changeNetworkType = useChangeNetworkTypeCallback();
  const reloadAccounts = useReloadAccounts();
  const createAccount = useCreateAccountCallback();
  const navigate = useNavigate();
  const tools = useTools();
  const [alianName, setAlianName] = useState('');
  const wallet = useWallet();

  const hdPathOptions = useMemo(() => {
    const restoreWallet = RESTORE_WALLETS[contextData.restoreWalletType];
    return ADDRESS_TYPES.filter((v) => {
      if (v.displayIndex < 0) {
        return false;
      }
      if (!restoreWallet.addressTypes.includes(v.value)) {
        return false;
      }

      if (!contextData.isRestore && v.isUnisatLegacy) {
        return false;
      }

      if (contextData.customHdPath && v.isUnisatLegacy) {
        return false;
      }

      return true;
    })
      .sort((a, b) => a.displayIndex - b.displayIndex)
      .map((v) => {
        return {
          label: v.name,
          hdPath: v.hdPath,
          addressType: v.value,
          isUnisatLegacy: v.isUnisatLegacy
        };
      });
  }, [contextData]);

  const onNext = async () => {
    try {
      const option = hdPathOptions[contextData.addressTypeIndex];
      const hdPath = contextData.customHdPath || option.hdPath;
      await createAccount(contextData.mnemonics, hdPath, contextData.passphrase, contextData.addressType, 1, alianName);
      await wallet.changeAddressType(AddressType.P2TR);
      reloadAccounts();
      navigate('MainScreen');
    } catch (e) {
      tools.toastError((e as any).message);
    }
  };
  return (
    <Column
      style={{
        flex: 1,
        overflow: 'hidden',
        padding: '0 16px 24px'
      }}>
      <Column
        style={{
          flex: 1,
          alignItems: 'center',
          overflow: 'auto'
        }}>
        <Column
          style={{
            borderRadius: '14px',
            padding: '32px 16px 24px',
            width: '100%'
          }}>
          <Row justifyCenter my="xl">
            <Image src="/images/icons/wallet.svg" size={78} />
          </Row>
          <Text
            text="Wallet Name"
            style={{
              color: 'white',
              fontSize: '14px',
              lineHeight: '24px'
            }}
          />
          <Input
            containerStyle={{
              padding: '0 10px',
              flex: 1,
              borderRadius: '8px',
              backgroundColor: '#121212'
            }}
            style={{ width: '100%', color: '#fff' }}
            value={alianName}
            onChange={(e) => {
              setAlianName(e.target.value);
            }}
            placeholder="Set up an account name for this wallet"
          />
        </Column>
      </Column>
      <Button text="Finish" preset="primary" onClick={onNext} />
    </Column>
  );
}
