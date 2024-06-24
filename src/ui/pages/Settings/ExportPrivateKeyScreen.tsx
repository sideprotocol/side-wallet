import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Account } from '@/shared/types';
import { Button, Column, Header, Image, Input, Layout, LongPress, Mask, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { copyToClipboard, useWallet } from '@/ui/utils';

type Status = '' | 'error' | 'warning' | undefined;

export default function ExportPrivateKeyScreen() {
  const { t } = useTranslation();

  const { state } = useLocation();
  const { account } = state as {
    account: Account;
  };

  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [privateKey, setPrivateKey] = useState({ hex: '', wif: '' });
  const [status, setStatus] = useState<Status>('');
  const [error, setError] = useState('');
  const wallet = useWallet();
  const tools = useTools();

  const btnClick = async () => {
    try {
      const _res = await wallet.getPrivateKey(password, account);
      setPrivateKey(_res);
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
    if (password) {
      setDisabled(false);
      setStatus('');
      setError('');
    }
  }, [password]);

  function copy(str: string) {
    copyToClipboard(str);
    tools.toastSuccess('Copied');
  }

  return (
    <Layout>
      <Column
        fullX
        fullY
        style={{
          gap: '0',
          padding: '0 16px 24px'
        }}>
        <Header
          onBack={() => {
            window.history.go(-1);
          }}
          title="Show Private Key"
        />
        {privateKey.wif == '' ? (
          <>
            <Column
              style={{
                flex: 1,
                gap: '16px'
              }}>
              <LongPress />
            </Column>
            <Text
              text="Password"
              color="white_muted"
              style={{
                fontSize: '14px',
                lineHeight: '24px'
              }}
            />
            <Input
              preset="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={(e) => handleOnKeyUp(e)}
              autoFocus={true}
            />
            {error && <Text text={error} preset="regular" color="error" />}

            <Button
              text="Confirm"
              preset="primary"
              disabled={disabled}
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
              }}>
              <Mask>
                <div
                  style={{
                    background: '#222222',
                    border: '1px solid #404045',
                    boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset',
                    borderRadius: '14px',
                    padding: '16px'
                  }}>
                  <span
                    style={{
                      color: '#fff',
                      fontSize: '12px',
                      lineHeight: '20px',
                      opacity: 0.5,
                      wordBreak: 'break-word',
                      marginRight: '4px'
                    }}>
                    {privateKey.wif}
                  </span>
                  <span
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      copy(privateKey.wif);
                    }}>
                    <Image src="/images/icons/copy-03.svg" size={16} />
                  </span>
                </div>
              </Mask>
              <Column
                style={{
                  marginTop: '24px',
                  backgroundColor: 'rgb(240 182 34 / 10%)',
                  borderRadius: '14px',
                  padding: '10px',
                  gap: '4px'
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                  <Image src="/images/icons/alert-triangle.svg" size={24} />
                  <Text
                    text="No Recovery Options:"
                    style={{
                      color: '#F0B622',
                      lineHeight: '20px',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  />
                </Row>
                <Text
                  text="If you lose your recovery phrase, you will not be able to recover your wallet."
                  style={{
                    color: '#fff',
                    lineHeight: '18px',
                    fontSize: '12px',
                    fontWeight: 400
                  }}
                />
              </Column>

              <Column
                style={{
                  marginTop: '10px',
                  backgroundColor: 'rgb(240 182 34 / 10%)',
                  borderRadius: '14px',
                  padding: '10px',
                  gap: '4px'
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                  <Image src="/images/icons/alert-triangle.svg" size={24} />
                  <Text
                    text="Store Securely:"
                    style={{
                      color: '#F0B622',
                      lineHeight: '20px',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  />
                </Row>
                <Text
                  text="Write down your recovery phrase and store it in a safe place."
                  style={{
                    color: '#fff',
                    lineHeight: '18px',
                    fontSize: '12px',
                    fontWeight: 400
                  }}
                />
              </Column>

              {/* <Text text="Hex Private Key:" preset="sub" size="sm" textCenter mt="lg" />

              <Card
                onClick={(e) => {
                  copy(privateKey.hex);
                }}>
                <Row>
                  <Text
                    text={privateKey.hex}
                    color="textDim"
                    style={{
                      overflowWrap: 'anywhere'
                    }}
                  />
                  <Icon icon="copy" color="textDim" />
                </Row>
              </Card> */}
            </Column>
            <Button text="Close" preset="primary" onClick={() => window.history.go(-1)} />
          </>
        )}
      </Column>
    </Layout>
  );
}
