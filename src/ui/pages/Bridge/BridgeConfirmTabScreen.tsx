import Typography from 'antd/lib/typography/Typography';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { KEYRING_TYPE } from '@/shared/constant';
import { Button, Column, Content, Footer, Header, Image, Layout, Row } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { SIDE_BTC_EXPLORER } from '@/ui/constants';
import { useGetSideBalanceList } from '@/ui/hooks/useGetBalance';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { queryAddressUtxo, useBridge, useRuneListV2 } from '@/ui/state/bridge/hook';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { fontSizes } from '@/ui/theme/font';
import { parseUnitAmount, useWallet } from '@/ui/utils';
import { formatAddress } from '@/ui/utils/format';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { estimateNetworkFeeHelper as estimateNetworkFee } from '@/ui/wallet-sdk/utils';
import { Input } from '@mui/material';
import services from '@/ui/services';

import { useNavigate } from '../MainRoute';

interface DetailRowItem {
  text: string | JSX.Element;
  value: string | JSX.Element;
  id?: string;
}

function DetailRow({ text, value }: DetailRowItem) {
  return (
    <div className="flex text-sm items-center justify-between">
      <span className="flex  flex-shrink-0 items-center gap-2 text-[#7D7D7D]">{text}</span>
      <span className={`flex  w-full justify-end items-center ${'text-white'}  gap-2`}>{value}</span>
    </div>
  );
}

export interface CacheUTXO {
  txid: string;
  vout: number;
  satoshis: number;
  scriptPk: string;
  pubkey: string;
  inscriptions: any[];
  atomicals: any[];
  addressType: number;
}

export default function BridgeTabScreen() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const currentKeyring = useCurrentKeyring();
  const wallet = useWallet();

  const { bridge, bridgeRune } = useBridge();

  const { bridgeAmount, from, to, loading, selectTokenModalShow, base, accountUtxo, fee, feeSummary } = useBridgeStore();

  const [networkFee, setNetworkFee] = useState<number>(0);

  const [tx, setTx] = useState<CacheUTXO[]>([]);

  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, 8)).toNumber();

  const currentAccount = useCurrentAccount();
  let { balanceList } = useGetSideBalanceList(currentAccount?.address);
  let { tokens } = useRuneListV2();
  const isDeposit = (from?.name || '').includes('Bitcoin');
  balanceList = balanceList?.filter((item) => {
    return item?.denom.includes('rune') || item?.denom.includes('sat');
  });
  const isBtcBridge = bridgeStore?.base === 'sat';
  // console.log(`balanceList: `, balanceList);
  // console.log(`tokens: `, tokens);
  let runeInfo = isDeposit
    ? balanceList?.find((item) => item?.denom === bridgeStore?.base)?.asset?.runeData
    : tokens?.find((item) => item?.runeid === bridgeStore?.base?.split('/')[1]);

  const yourReceive = toReadableAmount(
    BigNumber(toUnitAmount(bridgeAmount || '0', 8))
      .minus((from?.name || '').includes('Bitcoin') ? networkFee : '0')
      .toFixed(),
    8
  );

  useEffect(() => {
    // console.log(`currentAccount: `, currentAccount);
    const getFee = async () => {
      const networkFee = await estimateNetworkFee({ amount: unitAmount, fee }, currentAccount);
      setTx(networkFee?.walletInputs || []);    
    };
    getFee();

    services.unisat.getFeeSummary().then(res => {
      const rcFee = res.list[2].feeRate;
      setNetworkFee(rcFee || 20);
      bridgeStore.fee = Number(rcFee);
      bridgeStore.feeSummary = res.list;
    });
  }, [fee]);

  const isDisabled = BigNumber(toUnitAmount(bridgeAmount || '0', 8)).lt(networkFee) || loading || Number(fee) === 0;

  const [openEditId, setOpenEditId] = useState('');

  useEffect(() => {
    queryAddressUtxo(currentAccount.address);
  }, [currentAccount.address]);

  return (
    <Layout>
      <Header
        LeftComponent={
          <>
            <Image
              onClick={() => {
                navigate('/settings');
              }}
              src="/images/icons/main/menu-icon.svg"
              size={fontSizes.xxl}
            />
          </>
        }
        title={
          currentKeyring.type === KEYRING_TYPE.HdKeyring || currentKeyring.type === KEYRING_TYPE.KeystoneKeyring ? (
            <AccountSelect />
          ) : (
            ''
          )
        }
        RightComponent={''}
      />
      <Content classname={'hide-scrollbar'}>
        <Row full relative rounded={true}>
          <Column
            full
            relative
            style={{
              gap: '12px'
            }}>
            <Column
              relative
              rounded
              style={{
                fontSize: '14px',
                padding: '8px',
                background: '#2C3138',
                border: '1px solid #6DE5DA',
                display: isDeposit ? 'flex' : 'none'
              }}>
              <Row relative full justifyBetween color={'grey'}>
                <Typography className="w-1/3 text-left">Tx</Typography>

                <Typography className="w-1/3">Index</Typography>
                <Typography className="text-right">Amount</Typography>
              </Row>

              {tx.map((item) => {
                return (
                  <Row key={item.txid} relative full justifyBetween color={'white'}>
                    <a
                      target="_blank"
                      className="underline text-white w-1/3 text-left hover:text-white"
                      href={`${SIDE_BTC_EXPLORER}/tx/${item?.txid}`}
                      rel="noreferrer">
                      {formatAddress(item.txid || '-', 6)}
                    </a>

                    <Typography className="w-1/3 text-center">{item.vout}</Typography>
                    <Typography className="w-1/3 text-right">
                      {' '}
                      {toReadableAmount(item.satoshis.toString() || '0', 8)}
                    </Typography>
                  </Row>
                );
              })}
            </Column>

            <Column relative classname="bg-[#F0B622] p-3 px-2 bg-opacity-30 " rounded>
              <div className="flex items-start gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.9978 8.99632V12.9963M11.9978 16.9963H12.0078M10.6131 3.88805L2.38823 18.0947C1.93203 18.8827 1.70393 19.2767 1.73764 19.6C1.76705 19.8821 1.91482 20.1384 2.14417 20.3051C2.40713 20.4963 2.86239 20.4963 3.77292 20.4963H20.2227C21.1332 20.4963 21.5885 20.4963 21.8514 20.3051C22.0808 20.1384 22.2286 19.8821 22.258 19.6C22.2917 19.2767 22.0636 18.8827 21.6074 18.0947L13.3825 3.88804C12.9279 3.10288 12.7006 2.7103 12.4041 2.57845C12.1454 2.46343 11.8502 2.46343 11.5915 2.57845C11.295 2.7103 11.0677 3.10288 10.6131 3.88805Z"
                    stroke="#F0B622"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="font-semibold text-sm text-[#F0B622]">
                  {!isDeposit
                    ? ' Your BTC tokens on the Side Chain will be burnt'
                    : 'Make sure above UTXO carries no inscripted assets'}
                </div>
              </div>

              <div className="text-white text-xs font-normal pl-6">
                {!isDeposit
                  ? 'In return, you will receive native BTC on the Bitcoin network. Ensure you have noted this change and take any necessary actions to secure your assets.'
                  : 'This transaction will use the above Inputs. Please double check and confirm that these Inputs do not carry other assets including Ordinals and Runes.'}
              </div>
            </Column>

            <Column relative rounded classname="bg-[#2C3138] p-2 py-3">
              {isDeposit ? (
                <>
                  <DetailRow
                    text={'Fee Rate'}
                    value={
                      <>
                        {networkFee ? networkFee : fee } sats/vB
                        <div
                          className="cursor-pointer "
                          onClick={() => {
                            if (openEditId) {
                              setOpenEditId('');
                            } else {
                              setOpenEditId('edit_sat');
                            }
                          }}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="&#231;&#188;&#150;&#232;&#190;&#145; 1">
                              <path
                                id="Vector"
                                d="M16.7421 2.16228L16.7371 2.16742L7.90556 10.9985L8.01162 11.1046L7.90556 10.9985C7.76021 11.1439 7.67855 11.341 7.67855 11.5466C7.67855 11.7522 7.76021 11.9493 7.90556 12.0946C8.05091 12.24 8.24804 12.3216 8.4536 12.3216C8.65916 12.3216 8.8563 12.24 9.00165 12.0946L17.8389 3.25715C17.9125 3.18586 17.9712 3.10069 18.0116 3.00657C18.0522 2.91202 18.0736 2.81032 18.0745 2.70742C18.0754 2.60451 18.0558 2.50246 18.0168 2.40722C17.9778 2.31197 17.9203 2.22544 17.8475 2.15268C17.7747 2.07991 17.6882 2.02236 17.593 1.9834C17.4977 1.94443 17.3957 1.92482 17.2928 1.92571C17.1899 1.92661 17.0882 1.94799 16.9936 1.9886C16.8991 2.02922 16.8136 2.08826 16.7421 2.16228ZM16.7438 8.20202C16.5985 8.34736 16.5168 8.54449 16.5168 8.75003V15.625C16.5168 15.8615 16.4229 16.0883 16.2557 16.2555C16.0884 16.4228 15.8616 16.5167 15.6252 16.5167H4.37516C4.13868 16.5167 3.91188 16.4228 3.74466 16.2555C3.57744 16.0883 3.4835 15.8615 3.4835 15.625V4.37503C3.4835 4.13855 3.57744 3.91175 3.74466 3.74453C3.91188 3.57731 4.13868 3.48336 4.37516 3.48336H11.0418C11.2474 3.48336 11.4445 3.40171 11.5898 3.25637C11.7352 3.11103 11.8168 2.91391 11.8168 2.70836C11.8168 2.50282 11.7352 2.3057 11.5898 2.16036C11.4445 2.01502 11.2474 1.93336 11.0418 1.93336H4.37516C3.0267 1.93336 1.9335 3.02656 1.9335 4.37503V15.625C1.9335 16.9735 3.0267 18.0667 4.37516 18.0667H15.6252C16.9736 18.0667 18.0668 16.9735 18.0668 15.625V8.75003C18.0668 8.54449 17.9852 8.34736 17.8398 8.20202C17.6945 8.05668 17.4974 7.97503 17.2918 7.97503C17.0863 7.97503 16.8892 8.05668 16.7438 8.20202Z"
                                fill={'white'}
                                stroke={'white'}
                                strokeWidth="0.3"
                              />
                            </g>
                          </svg>
                        </div>
                      </>
                    }></DetailRow>

                  {openEditId === 'edit_sat' && (
                    <DetailRow
                      text={''}
                      value={
                        openEditId !== 'edit_sat' ? (
                          <></>
                        ) : (
                          <div className={`w-full rounded-lg border ${'border-[#0DD4C3] '} px-3 py-1 h-[42px]`}>
                            <Input
                              onChange={(e) => {
                                const targetValue = e.target.value;
                                if (targetValue.startsWith('.')) {
                                  return;
                                }
                                if (targetValue !== '' && !targetValue.match(/^\d*(\.\d*)?$/)) {
                                  return;
                                }
                                const amount = targetValue.replace(/^0+/, '0'); // remove prefix zeros

                                bridgeStore.fee = Number(amount);
                              }}
                              sx={{
                                padding: 0,
                                height: '30px',
                                background: 'transparent',
                                width: '100%',
                                fontSize: '15px',
                                color: 'white'
                              }}
                              disableUnderline
                              placeholder="sats/vB"
                              onBlur={() => setOpenEditId('')}></Input>
                          </div>
                        )
                      }
                      id="edit_sat"></DetailRow>
                  )}

                  <DetailRow text={'Est. Bridge Time'} value={feeSummary?.find(item => item.feeRate === fee)?.desc || "-"}></DetailRow>

                  <DetailRow text={'Bridge Fee'} value={isDeposit ? '0.0001 BTC' : '0.00002 BTC'}></DetailRow>

                  <DetailRow
                    text={'You will receive'}
                    value={
                      <div className="flex items-center text-right">
                        {isBtcBridge ? yourReceive : bridgeStore?.bridgeAmount}{' '}
                        {isBtcBridge ? 'BTC' : runeInfo?.spacedRune}{' '}
                        <img
                          className="ml-1"
                          src={
                            !isBtcBridge
                              ? `https://api-t2.unisat.io/icon-v1/icon/runes/${runeInfo?.spacedRune}`
                              : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxOSAoNjQtQml0KSAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKdmlld0JveD0iMCAwIDQwOTEuMjcgNDA5MS43MyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxnIGlkPSJfMTQyMTM0NDAyMzMyOCI+CiAgIDxwYXRoIGZpbGw9IiNGNzkzMUEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQwMzAuMDYgMjU0MC43N2MtMjczLjI0LDEwOTYuMDEgLTEzODMuMzIsMTc2My4wMiAtMjQ3OS40NiwxNDg5LjcxIC0xMDk1LjY4LC0yNzMuMjQgLTE3NjIuNjksLTEzODMuMzkgLTE0ODkuMzMsLTI0NzkuMzEgMjczLjEyLC0xMDk2LjEzIDEzODMuMiwtMTc2My4xOSAyNDc5LC0xNDg5Ljk1IDEwOTYuMDYsMjczLjI0IDE3NjMuMDMsMTM4My41MSAxNDg5Ljc2LDI0NzkuNTdsMC4wMiAtMC4wMnoiLz4KICAgPHBhdGggZmlsbD0id2hpdGUiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI5NDcuNzcgMTc1NC4zOGM0MC43MiwtMjcyLjI2IC0xNjYuNTYsLTQxOC42MSAtNDUwLC01MTYuMjRsOTEuOTUgLTM2OC44IC0yMjQuNSAtNTUuOTQgLTg5LjUxIDM1OS4wOWMtNTkuMDIsLTE0LjcyIC0xMTkuNjMsLTI4LjU5IC0xNzkuODcsLTQyLjM0bDkwLjE2IC0zNjEuNDYgLTIyNC4zNiAtNTUuOTQgLTkyIDM2OC42OGMtNDguODQsLTExLjEyIC05Ni44MSwtMjIuMTEgLTE0My4zNSwtMzMuNjlsMC4yNiAtMS4xNiAtMzA5LjU5IC03Ny4zMSAtNTkuNzIgMjM5Ljc4YzAsMCAxNjYuNTYsMzguMTggMTYzLjA1LDQwLjUzIDkwLjkxLDIyLjY5IDEwNy4zNSw4Mi44NyAxMDQuNjIsMTMwLjU3bC0xMDQuNzQgNDIwLjE1YzYuMjYsMS41OSAxNC4zOCwzLjg5IDIzLjM0LDcuNDkgLTcuNDksLTEuODYgLTE1LjQ2LC0zLjg5IC0yMy43MywtNS44N2wtMTQ2LjgxIDU4OC41N2MtMTEuMTEsMjcuNjIgLTM5LjMxLDY5LjA3IC0xMDIuODcsNTMuMzMgMi4yNSwzLjI2IC0xNjMuMTcsLTQwLjcyIC0xNjMuMTcsLTQwLjcybC0xMTEuNDYgMjU2Ljk4IDI5Mi4xNSA3Mi44M2M1NC4zNSwxMy42MyAxMDcuNjEsMjcuODkgMTYwLjA2LDQxLjNsLTkyLjkgMzczLjAzIDIyNC4yNCA1NS45NCA5MiAtMzY5LjA3YzYxLjI2LDE2LjYzIDEyMC43MSwzMS45NyAxNzguOTEsNDYuNDNsLTkxLjY5IDM2Ny4zMyAyMjQuNTEgNTUuOTQgOTIuODkgLTM3Mi4zM2MzODIuODIsNzIuNDUgNjcwLjY3LDQzLjI0IDc5MS44MywtMzAzLjAyIDk3LjYzLC0yNzguNzggLTQuODYsLTQzOS41OCAtMjA2LjI2LC01NDQuNDQgMTQ2LjY5LC0zMy44MyAyNTcuMTgsLTEzMC4zMSAyODYuNjQsLTMyOS42MWwtMC4wNyAtMC4wNXptLTUxMi45MyA3MTkuMjZjLTY5LjM4LDI3OC43OCAtNTM4Ljc2LDEyOC4wOCAtNjkwLjk0LDkwLjI5bDEyMy4yOCAtNDk0LjJjMTUyLjE3LDM3Ljk5IDY0MC4xNywxMTMuMTcgNTY3LjY3LDQwMy45MXptNjkuNDMgLTcyMy4zYy02My4yOSwyNTMuNTggLTQ1My45NiwxMjQuNzUgLTU4MC42OSw5My4xNmwxMTEuNzcgLTQ0OC4yMWMxMjYuNzMsMzEuNTkgNTM0Ljg1LDkwLjU1IDQ2OC45NCwzNTUuMDVsLTAuMDIgMHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo='
                          }
                          width={20}
                          height={20}></img>
                      </div>
                    }></DetailRow>
                </>
              ) : (
                <>
                  <DetailRow text={'Est. Bridge Time'} value={'3 mins'}></DetailRow>

                  <DetailRow text={'Bridge Fee'} value={isDeposit ? '0.0001 BTC' : '0.00002 BTC'}></DetailRow>

                  <DetailRow
                    text={'You will receive'}
                    value={
                      <div className="flex items-center text-right">
                        <span className="">
                          {isBtcBridge ? yourReceive : bridgeStore?.bridgeAmount}{' '}
                          {isBtcBridge ? 'BTC' : runeInfo?.spacedRune}{' '}
                        </span>
                        <img
                          className="ml-1"
                          src={
                            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxOSAoNjQtQml0KSAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKdmlld0JveD0iMCAwIDQwOTEuMjcgNDA5MS43MyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxnIGlkPSJfMTQyMTM0NDAyMzMyOCI+CiAgIDxwYXRoIGZpbGw9IiNGNzkzMUEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQwMzAuMDYgMjU0MC43N2MtMjczLjI0LDEwOTYuMDEgLTEzODMuMzIsMTc2My4wMiAtMjQ3OS40NiwxNDg5LjcxIC0xMDk1LjY4LC0yNzMuMjQgLTE3NjIuNjksLTEzODMuMzkgLTE0ODkuMzMsLTI0NzkuMzEgMjczLjEyLC0xMDk2LjEzIDEzODMuMiwtMTc2My4xOSAyNDc5LC0xNDg5Ljk1IDEwOTYuMDYsMjczLjI0IDE3NjMuMDMsMTM4My41MSAxNDg5Ljc2LDI0NzkuNTdsMC4wMiAtMC4wMnoiLz4KICAgPHBhdGggZmlsbD0id2hpdGUiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI5NDcuNzcgMTc1NC4zOGM0MC43MiwtMjcyLjI2IC0xNjYuNTYsLTQxOC42MSAtNDUwLC01MTYuMjRsOTEuOTUgLTM2OC44IC0yMjQuNSAtNTUuOTQgLTg5LjUxIDM1OS4wOWMtNTkuMDIsLTE0LjcyIC0xMTkuNjMsLTI4LjU5IC0xNzkuODcsLTQyLjM0bDkwLjE2IC0zNjEuNDYgLTIyNC4zNiAtNTUuOTQgLTkyIDM2OC42OGMtNDguODQsLTExLjEyIC05Ni44MSwtMjIuMTEgLTE0My4zNSwtMzMuNjlsMC4yNiAtMS4xNiAtMzA5LjU5IC03Ny4zMSAtNTkuNzIgMjM5Ljc4YzAsMCAxNjYuNTYsMzguMTggMTYzLjA1LDQwLjUzIDkwLjkxLDIyLjY5IDEwNy4zNSw4Mi44NyAxMDQuNjIsMTMwLjU3bC0xMDQuNzQgNDIwLjE1YzYuMjYsMS41OSAxNC4zOCwzLjg5IDIzLjM0LDcuNDkgLTcuNDksLTEuODYgLTE1LjQ2LC0zLjg5IC0yMy43MywtNS44N2wtMTQ2LjgxIDU4OC41N2MtMTEuMTEsMjcuNjIgLTM5LjMxLDY5LjA3IC0xMDIuODcsNTMuMzMgMi4yNSwzLjI2IC0xNjMuMTcsLTQwLjcyIC0xNjMuMTcsLTQwLjcybC0xMTEuNDYgMjU2Ljk4IDI5Mi4xNSA3Mi44M2M1NC4zNSwxMy42MyAxMDcuNjEsMjcuODkgMTYwLjA2LDQxLjNsLTkyLjkgMzczLjAzIDIyNC4yNCA1NS45NCA5MiAtMzY5LjA3YzYxLjI2LDE2LjYzIDEyMC43MSwzMS45NyAxNzguOTEsNDYuNDNsLTkxLjY5IDM2Ny4zMyAyMjQuNTEgNTUuOTQgOTIuODkgLTM3Mi4zM2MzODIuODIsNzIuNDUgNjcwLjY3LDQzLjI0IDc5MS44MywtMzAzLjAyIDk3LjYzLC0yNzguNzggLTQuODYsLTQzOS41OCAtMjA2LjI2LC01NDQuNDQgMTQ2LjY5LC0zMy44MyAyNTcuMTgsLTEzMC4zMSAyODYuNjQsLTMyOS42MWwtMC4wNyAtMC4wNXptLTUxMi45MyA3MTkuMjZjLTY5LjM4LDI3OC43OCAtNTM4Ljc2LDEyOC4wOCAtNjkwLjk0LDkwLjI5bDEyMy4yOCAtNDk0LjJjMTUyLjE3LDM3Ljk5IDY0MC4xNywxMTMuMTcgNTY3LjY3LDQwMy45MXptNjkuNDMgLTcyMy4zYy02My4yOSwyNTMuNTggLTQ1My45NiwxMjQuNzUgLTU4MC42OSw5My4xNmwxMTEuNzcgLTQ0OC4yMWMxMjYuNzMsMzEuNTkgNTM0Ljg1LDkwLjU1IDQ2OC45NCwzNTUuMDVsLTAuMDIgMHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo='
                          }
                          width={20}
                          height={20}></img>
                      </div>
                    }></DetailRow>
                </>
              )}
            </Column>

            <Row full itemsCenter>
              <Button
                full
                onClick={() => {
                  navigate('BridgeTabScreen');
                }}
                style={{
                  fontSize: '14px'
                }}>
                Last
              </Button>

              <Button
                full
                preset="primary"
                disabled={isDisabled}
                style={{
                  color: 'black',
                  fontSize: '14px'
                }}
                onClick={() => {
                  // console.log(`base: `, base);
                  if (base?.includes('rune')) {
                    bridgeRune(base?.split('/')[1]);
                  } else {
                    bridge();
                  }
                }}>
                Confirm
              </Button>
            </Row>
          </Column>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
