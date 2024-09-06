import { useMemo } from 'react';
import { useLocation, useNavigate as useNavigateRouter } from 'react-router-dom';

import { KEYRING_TYPE } from '@/shared/constant';
import { Button, Column, Header, Image, Layout, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useKeyrings } from '@/ui/state/keyrings/hooks';

import { useNavigate } from '../../MainRoute';
import './index.less';

export default function () {
  const navigate = useNavigate();
  const navigateRouter = useNavigateRouter();
  const tools = useTools();
  const keyrings = useKeyrings();
  const { state } = useLocation();
  const { index } = state as {
    index: number;
  };
  const keyring = useMemo(() => {
    return keyrings.find((item) => item.index === index);
  }, [keyrings]);
  return (
    <Layout>
      <Header title={keyring?.alianName} onBack={() => navigateRouter(-1)} />
      <Column
        style={{
          flex: 1,
          padding: '0 16px 24px'
        }}
      >
        <Column
          style={{
            flex: 1,
            gap: '10px',
            marginTop: '16px'
          }}
        >
          <div
            style={{
              height: '50px',
              borderRadius: '10px',
              padding: '0 10px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            className="walletSettingItem"
            onClick={() => {
              navigate('EditWalletNameScreen', { keyring });
            }}
          >
            <Text
              text="Edit Wallet Name"
              color="text"
              style={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px'
              }}
            />
            <Image src="./images/icons/chevron-down.svg" size={24} />
          </div>

          {keyring?.type === KEYRING_TYPE.HdKeyring && (
            <div
              style={{
                height: '50px',
                borderRadius: '10px',
                padding: '0 10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              className="walletSettingItem"
              onClick={() => {
                navigate('ExportMnemonicsScreen', { keyring });
              }}
            >
              <Text
                text="View Recovery Phrase"
                color="text"
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '19px'
                }}
              />
              <Image src="./images/icons/chevron-down.svg" size={24} />
            </div>
          )}
        </Column>
        <Button
          preset="ghostDanger"
          text={`Delete ${keyring?.alianName}`}
          onClick={() => {
            navigate('DeleteWalletScreen', { index: keyring?.index });
          }}
        />
      </Column>
    </Layout>
  );
}
