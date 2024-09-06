import { useEffect, useState } from 'react';

import { Account, WebsiteState } from '@/shared/types';
import { Button, Card, Column, Content, Footer, Header, Icon, Layout, Row, Text } from '@/ui/components';
import WebsiteBar from '@/ui/components/WebsiteBar';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring, useKeyrings } from '@/ui/state/keyrings/hooks';
import { keyringsActions } from '@/ui/state/keyrings/reducer';
import { fontSizes } from '@/ui/theme/font';
import { shortAddress, useApproval, useWallet } from '@/ui/utils';
import { LoadingOutlined } from '@ant-design/icons';

interface MyItemProps {
  account?: Account;
  selected?: boolean;
  onClick?: () => void;
}

export function MyItem({ account, selected, onClick }: MyItemProps, ref) {
  if (!account) {
    return <div />;
  }

  return (
    <Card
      justifyBetween
      mt="sm"
      style={{
        border: '1px solid #2D2D2D',
        backgroundColor: '#2E2E2F',
        borderRadius: '10px'
      }}
      onClick={onClick}
    >
      <Row
        justifyBetween
        style={{
          width: '100%'
        }}
      >
        <Column gap={'sm'}>
          <Text text={account.alianName} />
          <Text text={`${shortAddress(account.address)}`} preset="sub" />
        </Column>
        <Column selfItemsCenter>
          {selected && (
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <g filter="url(#filter0_i_863_3849)">
                <rect x="0.171875" width="20" height="20" rx="10" fill="#0DD4C3" />
              </g>
              <path
                d="M5.17188 10.5L8.44308 13.3623C8.84931 13.7178 9.46433 13.6867 9.83264 13.292L16.1719 6.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <filter
                  id="filter0_i_863_3849"
                  x="0.171875"
                  y="0"
                  width="20"
                  height="20"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_863_3849" />
                </filter>
              </defs>
            </svg>
          )}
        </Column>
      </Row>
    </Card>
  );
}

interface Props {
  params: {
    session: {
      origin: string;
      icon: string;
      name: string;
    };
  };
}

export default function Connect({ params: { session } }: Props) {
  const [getApproval, resolveApproval, rejectApproval] = useApproval();

  const handleCancel = () => {
    rejectApproval('User rejected the request.');
  };

  const handleConnect = async () => {
    resolveApproval();
  };

  const keyrings = useKeyrings();
  const wallet = useWallet();

  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();

  const dispatch = useAppDispatch();

  const [checkState, setCheckState] = useState(WebsiteState.CHECKING);
  const [warning, setWarning] = useState('');
  useEffect(() => {
    wallet.checkWebsite(session.origin).then((v) => {
      if (v.isScammer) {
        setCheckState(WebsiteState.SCAMMER);
      } else {
        setCheckState(WebsiteState.SAFE);
      }
      if (v.warning) {
        setWarning(v.warning);
      }
    });
  }, []);

  if (checkState === WebsiteState.CHECKING) {
    return (
      <Layout
        style={{
          minHeight: '560px',
          height: '560px'
        }}
      >
        <Content itemsCenter justifyCenter>
          <Icon size={fontSizes.xxxl} color="gold">
            <LoadingOutlined />
          </Icon>
        </Content>
      </Layout>
    );
  }

  if (checkState === WebsiteState.SCAMMER) {
    return (
      <Layout
        style={{
          minHeight: '560px',
          height: '560px'
        }}
      >
        <Header>
          <WebsiteBar session={session} />
        </Header>
        <Content>
          <Column>
            <Text text="Phishing Detection" preset="title-bold" textCenter mt="xxl" />
            <Text text="Malicious behavior and suspicious activity have been detected." mt="md" />
            <Text text="Your access to this page has been restricted by Side Wallet as it might be unsafe." mt="md" />
          </Column>
        </Content>

        <Footer>
          <Row full>
            <Button text="Reject (blocked by Side Wallet)" preset="danger" onClick={handleCancel} full />
          </Row>
        </Footer>
      </Layout>
    );
  }

  if (warning) {
    return (
      <Layout
        style={{
          minHeight: '560px',
          height: '560px'
        }}
      >
        <Header>
          <WebsiteBar session={session} />
        </Header>
        <Content>
          <Column>
            <Text text="Warning" preset="title-bold" textCenter mt="xxl" />
            <Text text={warning} mt="md" />
          </Column>
        </Content>

        <Footer>
          <Row full>
            <Button
              text="I am aware of the risks"
              preset="danger"
              onClick={() => {
                setWarning('');
              }}
              full
            />
          </Row>
        </Footer>
      </Layout>
    );
  }
  return (
    <Layout
      style={{
        minHeight: '560px',
        height: '560px'
      }}
    >
      <Header
        style={{
          borderBottom: '1px solid transparent'
        }}
      >
        <WebsiteBar
          session={{
            origin: 'Connect with Side Wallet'
          }}
        />
      </Header>
      <Content>
        <Column>
          <Row full justifyCenter>
            <Column
              style={{
                background: '#1E1E1F',
                maxWidth: 'max-content'

                // padding: '8px 0 18px'
              }}
              gap="zero"
              rounded
            >
              <Text
                style={{
                  color: '#828282'
                }}
                text={session?.origin}
                textCenter
                preset="sub"
                mt="md"
                mb="md"
                px="xxl"
              />
            </Column>
          </Row>

          <Column
            style={{
              marginTop: '5px',
              background: '#1E1E1F',
              padding: '0 0 10px'
            }}
            gap="zero"
            rounded
          >
            {/*<Text text="Connect with Side Wallet" preset="title-bold" textCenter mt="lg" />*/}
            <Text text="Select the account to use on this site." textCenter preset="sub" mt="md" />
            <Text text="Only connect with sites you trust." preset="sub" textCenter />
          </Column>

          {keyrings.map((keyring) => (
            <Column mt="lg" key={keyring.key}>
              <Text text={keyring.alianName} preset="sub" />
              {keyring.accounts.map((account) => (
                <MyItem
                  key={account.key}
                  account={account}
                  selected={currentKeyring.key === keyring.key && currentAccount.address === account.address}
                  onClick={async () => {
                    const accountIndex = account.index || 0;
                    await wallet.changeKeyring(keyring, accountIndex);
                    dispatch(keyringsActions.setCurrent(keyring));
                    const _currentAccount = await wallet.getCurrentAccount();
                    dispatch(accountActions.setCurrent(_currentAccount));
                  }}
                />
              ))}
            </Column>
          ))}
        </Column>
      </Content>

      <Footer>
        <Row full>
          <Button text="Cancel" preset="default" onClick={handleCancel} full />
          <Button text="Connect" preset="primary" onClick={handleConnect} full />
        </Row>
      </Footer>
    </Layout>
  );
}
