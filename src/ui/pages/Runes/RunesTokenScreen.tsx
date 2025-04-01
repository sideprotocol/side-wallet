import { useEffect, useMemo, useState } from 'react';

import { runesUtils } from '@/shared/lib/runes-utils';
import { AddressRunesTokenSummary } from '@/shared/types';
import { Column, Content, Header, Icon, Layout, Row } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import InscriptionPreview from '@/ui/components/InscriptionPreview';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBlockstreamUrl, useOrdinalsWebsite, useUnisatWebsite } from '@/ui/state/settings/hooks';
import { fontSizes } from '@/ui/theme/font';
import { useLocationState, useWallet } from '@/ui/utils';
import { LoadingOutlined } from '@ant-design/icons';

import { useNavigate } from '../MainRoute';

interface LocationState {
  runeid: string;
}

export default function RunesTokenScreen() {
  const { runeid } = useLocationState<LocationState>();
  const [tokenSummary, setTokenSummary] = useState<AddressRunesTokenSummary>({
    runeBalance: {
      runeid: '',
      rune: '',
      spacedRune: '',
      amount: '',
      symbol: '',
      divisibility: 0
    },
    runeInfo: {
      rune: '',
      runeid: '',
      spacedRune: '',
      symbol: '',
      premine: '',
      mints: '',
      divisibility: 0,
      etching: '',
      terms: {
        amount: '',
        cap: '',
        heightStart: 0,
        heightEnd: 0,
        offsetStart: 0,
        offsetEnd: 0
      },
      number: 0,
      height: 0,
      txidx: 0,
      timestamp: 0,
      burned: '',
      holders: 0,
      transactions: 0,
      mintable: false,
      remaining: '',
      start: 0,
      end: 0,
      supply: '0',
      parent: ''
    }
  });

  const wallet = useWallet();

  const account = useCurrentAccount();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wallet.getAddressRunesTokenSummary(account.address, runeid).then((tokenSummary) => {
      setTokenSummary(tokenSummary);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const unisatWebsite = useUnisatWebsite();

  const enableMint = tokenSummary.runeInfo.mintable;

  const enableTransfer = useMemo(() => {
    let enable = false;
    if (tokenSummary.runeBalance.amount !== '0') {
      enable = true;
    }
    return enable;
  }, [tokenSummary]);

  const tools = useTools();

  const ordinalsWebsite = useOrdinalsWebsite();

  const mempoolWebsite = useBlockstreamUrl();
  if (loading) {
    return (
      <Layout>
        <Content itemsCenter justifyCenter>
          <Icon size={fontSizes.xxxl} color="primary">
            <LoadingOutlined />
          </Icon>
        </Content>
      </Layout>
    );
  }
  return (
    <Layout>
      <Header
        title={tokenSummary.runeInfo.spacedRune}
        onBack={() => {
          window.history.go(-1);
        }}
      />
      {tokenSummary && (
        <Content
          style={{
            padding: 0
            // marginBottom: '40px'
          }}>
          <Column
            style={{
              flex: 1,
              borderTop: '1px solid #404045',
              borderRadius: '10px',
              background: '#222',
              padding: '0 16px',
              paddingBottom: '44px',
              marginTop: '52px'
            }}>
            <Column
              style={{
                flex: '1',
                gap: '10px'
              }}>
              <Row
                justifyCenter
                style={{
                  marginTop: '-35px'
                }}>
                <Row
                  style={{
                    background: '#1E1E1F',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    alignItems: 'center'
                  }}
                  justifyCenter>
                  {/*<Image src={curToken.logo} size={62} />*/}
                  {tokenSummary.runeLogo ? (
                    <InscriptionPreview data={tokenSummary?.runeLogo} preset="small" asLogo />
                  ) : (
                    ''
                  )}
                </Row>
              </Row>

              <div className="text-[#F7771A] text-center mt-[16px] text-[16px]">
                {tokenSummary?.runeInfo?.spacedRune}
              </div>

              <div className="w-ull flex text-[12px] items-center justify-center gap-[6px]">
                <Icon icon={'wallet-icon'} size={14} color={'search_icon'}></Icon>
                {runesUtils.toDecimalAmount(tokenSummary.runeBalance.amount, tokenSummary.runeBalance.divisibility)}
              </div>

              <div className=" w-full px-[10px] h-[1px] py-[16px]">
                <div className="h-[1px] bg-[#fff]/10 w-full"></div>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>runeid</span> <span>{tokenSummary.runeInfo.runeid}</span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>mints</span> <span>{tokenSummary.runeInfo.mints}</span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>supply</span>
                <span>
                  {runesUtils.toDecimalAmount(tokenSummary.runeInfo.supply, tokenSummary.runeInfo.divisibility)}
                  {tokenSummary.runeInfo.symbol}
                </span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>premine</span>
                <span>
                  {runesUtils.toDecimalAmount(tokenSummary.runeInfo.premine, tokenSummary.runeInfo.divisibility)}
                  {tokenSummary.runeInfo.symbol}
                </span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>burned</span> <span>{tokenSummary.runeInfo.burned}</span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>divisibility</span> <span>{tokenSummary.runeInfo.divisibility}</span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>symbol</span> <span>{tokenSummary.runeInfo.symbol}</span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>holders</span> <span>{tokenSummary.runeInfo.holders}</span>
              </div>

              <div className="flex w-full justify-between text-[14px] px-[10px]">
                <span className={'text-[#828282]'}>transactions</span> <span>{tokenSummary.runeInfo.transactions}</span>
              </div>

              <div className="flex flex-col w-full justify-between text-[14px] px-[10px] overflow-hidden">
                <span className={'text-[#828282]'}>etching</span>
                <a
                  className={'text-[#F7771A] text-[12px] hover:underline hover:!text-[#F7771A]'}
                  href={`${mempoolWebsite}/tx/${tokenSummary.runeInfo.etching}`}
                  target={'_blank'}
                  rel="noreferrer">
                  {tokenSummary.runeInfo.etching}
                </a>
              </div>

              <div className="flex flex-col w-full justify-between text-[14px] px-[10px] overflow-hidden ">
                <span className={'text-[#828282]'}>parent</span>
                <a
                  className={'text-[#F7771A] text-[12px] hover:underline hover:!text-[#F7771A]'}
                  href={`${ordinalsWebsite}/inscription/${tokenSummary.runeInfo.parent}`}
                  target={'_blank'}
                  rel="noreferrer">
                  {tokenSummary.runeInfo.parent}
                </a>
              </div>
            </Column>
          </Column>
        </Content>
      )}
    </Layout>
  );
}
