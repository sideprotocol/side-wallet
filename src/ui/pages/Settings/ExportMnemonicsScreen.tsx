import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ADDRESS_TYPES } from '@/shared/constant';
import { WalletKeyring } from '@/shared/types';
import { Button, Column, Grid, Header, Icon, Input, Layout, LongPress, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { copyToClipboard, useLocationState, useWallet } from '@/ui/utils';

type Status = '' | 'error' | 'warning' | undefined;

export default function ExportMnemonicsScreen() {
  const { keyring } = useLocationState<{ keyring: WalletKeyring }>();

  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [mnemonic, setMnemonic] = useState('');
  const [status, setStatus] = useState<Status>('');
  const [error, setError] = useState('');
  const wallet = useWallet();
  const tools = useTools();

  const [passphrase, setPassphrase] = useState('');
  const [isClickCopy, setIsClickCopy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const btnClick = async () => {
    try {
      const { mnemonic, hdPath, passphrase } = await wallet.getMnemonics(password, keyring);
      setMnemonic(mnemonic);
      setPassphrase(passphrase);
    } catch (e) {
      setStatus('error');
      setError((e as any).message);
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      btnClick();
    }
  };

  useEffect(() => {
    setDisabled(true);
    if (password?.length > 4) {
      setDisabled(false);
      setStatus('');
      setError('');
    }
  }, [password]);

  function copy(str: string) {
    copyToClipboard(str);
    // tools.toastSuccess('Copied');
  }
  const words = mnemonic.split(' ');

  const pathName = ADDRESS_TYPES.find((v) => v.hdPath === keyring.hdPath)?.name || 'custom';
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="View Recovery Phrase"
      />
      <Column
        style={{
          flex: 1,
          padding: '0 16px 24px'
        }}
      >
        {mnemonic == '' ? (
          <>
            <Column
              style={{
                flex: 1,
                gap: '16px'
              }}
            >
              <LongPress />
            </Column>
            <Text
              text="Password"
              color="search_icon"
              style={{
                fontSize: '14px',
                lineHeight: '24px'
              }}
            />
            <Input
              containerStyle={{
                borderColor: error ? '#ff0000' : error ? 'white' : ''
              }}
              preset="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={(e) => handleOnKeyUp(e)}
              autoFocus={true}
            />
            {error && <Text text={error} preset="regular" color="error" />}

            <Button
              disabled={disabled}
              text="View"
              preset="primary"
              onClick={btnClick}
              style={{
                marginTop: '24px'
              }}
            />
          </>
        ) : (
          <>
            <Column
              style={{
                flex: 1
              }}
            >
              <Column
                justifyCenter
                style={{
                  marginTop: '16px',
                  border: '1px solid #404045',
                  boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset',
                  backgroundColor: '#222222',
                  borderRadius: '14px',
                  padding: '16px',
                  gap: '8px'
                }}
              >
                <Grid columns={2}>
                  {words.map((v, index) => {
                    return (
                      <Row
                        key={index}
                        style={{
                          gap: '8px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid #FFFFFF33',
                          backgroundColor: '#121212'
                        }}
                      >
                        <Text
                          text={`${index + 1}. `}
                          style={{ width: 25, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                          textEnd
                          color="textDim"
                        />
                        <Input
                          containerStyle={{
                            minHeight: '30px',
                            padding: '0 10px',
                            flex: 1,
                            border: 'none',
                            backgroundColor: 'transparent'
                          }}
                          style={{ width: '100%', color: '#fff' }}
                          value={v}
                          disabled
                          placeholder=""
                        />
                      </Row>
                    );
                  })}
                </Grid>
                {/*<Text*/}
                {/*  text="Copy to clipboard"*/}
                {/*  style={{*/}
                {/*    textAlign: 'center'*/}
                {/*  }}*/}
                {/*  onClick={() => copy(mnemonic)}*/}
                {/*/>*/}

                <Row
                  full
                  itemsCenter
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                  justifyCenter
                  onClick={(e) => {
                    copy(mnemonic);
                    setIsClickCopy(true);
                  }}
                  style={{
                    marginTop: '8px'
                  }}
                >
                  <Icon
                    icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
                    color={isClickCopy ? 'primary' : isHovered ? 'white' : 'search_icon'}
                    size={20}
                  />
                  <Text
                    text={isClickCopy ? 'Copied' : 'Copy to clipboard'}
                    color={isClickCopy ? 'primary' : isHovered ? 'white' : 'search_icon'}
                  />
                </Row>
              </Column>
            </Column>
            <Button text="Close" preset="primary" onClick={() => window.history.go(-1)} />
          </>
        )}
      </Column>
    </Layout>
  );
}
