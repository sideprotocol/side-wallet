import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { KEYRING_TYPE, SIDE_BTC_EXPLORER, UNISAT_SERVICE_ENDPOINT, sideChain } from '@/shared/constant';
import { Button, Column, Content, Footer, Header, Icon, Image, Layout, LightTooltip, Row } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridge, useBridgeState, useQueryAddressUtxo } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import { parseUnitAmount } from '@/ui/utils';
import { formatAddress } from '@/ui/utils/format';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { Box, Input, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

interface DetailRowItem {
  text: string | JSX.Element;
  tooltip?: string | JSX.Element;
  value: string | JSX.Element;
  id?: string;
}

function DetailRow({ text, value, tooltip }: DetailRowItem) {
  return (
    <div className="flex text-sm items-center justify-between">
      <span className="flex  flex-shrink-0 items-center gap-1 text-[#7D7D7D]">
        {text}

        {tooltip && (
          <LightTooltip arrow title={tooltip} placement="top">
            <span className="cursor-pointer">
              <Icon icon="circle-info" size={14} color="grey12"></Icon>
            </span>
          </LightTooltip>
        )}
      </span>
      <span className={'flex  w-full justify-end items-center gap-1'}>{value}</span>
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

  const currentKeyring = useCurrentKeyring();

  const { bridge, bridgeRune, estimateNetworkFee } = useBridge();

  const { bridgeAmount, from, loading, base, fee, feeSummary, isDeposit, params } = useBridgeState();
  const dispatch = useAppDispatch();

  const [networkFee, setNetworkFee] = useState<number>(0);

  const [tx, setTx] = useState<CacheUTXO[]>([]);

  const [getTxLoading, setGetTxLoading] = useState(false);

  const [withdrawFee, setWithdrawFee] = useState<string>('-');

  const [openEditId, setOpenEditId] = useState('');

  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, 8)).toNumber();

  const currentAccount = useCurrentAccount();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const assets = isDeposit ? btcBalanceList : sideBalanceList;
  const balanceList = assets?.filter((item) => {
    return item?.denom.includes('rune') || item?.denom.includes('sat');
  });
  const isBtcBridge = base === 'sat';
  const bridgeAsset = balanceList.find((item) => item.denom === base);
  const runeId = bridgeAsset?.denom.split('/')[1];

  const confirmations = isDeposit
    ? params?.params?.deposit_confirmation_depth
    : params?.params?.withdraw_confirmation_depth;

  const protocolFee = isDeposit
    ? params?.params?.protocol_fees?.deposit_fee
    : params?.params?.protocol_fees?.withdraw_fee;

  const yourReceive = toReadableAmount(
    BigNumber(toUnitAmount(bridgeAmount || '0', 8))
      .minus(bridgeAsset?.asset?.rune ? 0 : protocolFee || '0')
      .toFixed(),
    8
  );

  const bitcoinAssetInfo = btcBalanceList.find((item) => item.denom === bridgeAsset?.denom);
  const sideAssetInfo = sideBalanceList.find((item) => item.denom === bridgeAsset?.denom);
  const bitcoinFeeInfo = btcBalanceList.find((item) => item.denom === 'sat');
  const sideFeeInfo = sideBalanceList.find((item) => item.denom === 'sat');

  useEffect(() => {
    setNetworkFee(fee || 20);
  }, [fee]);

  useEffect(() => {
    if (!isBtcBridge) return;
    setGetTxLoading(true);
    estimateNetworkFee({ amount: unitAmount, fee })
      .then((res) => {
        if (res) {
          setTx(res.walletInputs || []);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetTxLoading(false);
      });
  }, [isDeposit, bridgeAmount, fee, isBtcBridge]);

  const getWithdrawFee = async (address: string, amount: string) => {
    const result = await services.bridge.getBridgeWithdrawFee(address, amount, sideChain.restUrl);

    setWithdrawFee(toReadableAmount(result, 8));
  };

  useEffect(() => {
    const amount =
      toUnitAmount(bridgeAmount, bridgeAsset?.asset.exponent || 8) + (!isBtcBridge ? 'runes/' + runeId : 'sat');

    getWithdrawFee(currentAccount.address, amount);
  }, [currentAccount]);

  const isDisabled =
    BigNumber(toUnitAmount(bridgeAmount || '0', 8)).lt(networkFee) || loading || Number(fee) === 0 || getTxLoading;

  const queryAddressUtxo = useQueryAddressUtxo();

  useEffect(() => {
    queryAddressUtxo(currentAccount.address, UNISAT_SERVICE_ENDPOINT);
  }, [currentAccount.address]);

  const satPrice = sideFeeInfo?.denomPrice || bitcoinFeeInfo?.denomPrice || '0';

  const depositDetailItems = (
    <>
      <DetailRow
        text={'Fee Rate'}
        value={
          <>
            {networkFee ? networkFee : fee} sats/vB
            <div
              className="cursor-pointer "
              onClick={() => {
                if (openEditId) {
                  setOpenEditId('');
                } else {
                  setOpenEditId('edit_sat');
                }
              }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <div className={`w-full rounded-lg border ${'border-[#F7771A] '} px-3 py-1 h-[42px]`}>
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
                    dispatch(BridgeActions.update({ fee: +amount }));
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

      <DetailRow
        text={'Est. Bridge Time'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.grey12}>
              ({confirmations} blocks)
            </Typography>
            {feeSummary?.find((item) => item.feeRate === fee)?.desc || '-'}
          </>
        }
        tooltip={`This bridge requires ${confirmations} confirmations to ensure the transaction’s irreversibility and security.`}></DetailRow>

      <DetailRow
        text={'Bridge Fee'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.grey12}>
              (~$
              {BigNumber(satPrice)
                .multipliedBy(toReadableAmount(protocolFee || '0', bitcoinFeeInfo?.asset.exponent || 8))
                .toFixed(2, BigNumber.ROUND_CEIL)}
              )
            </Typography>
            {`${toReadableAmount(protocolFee || '0', bitcoinFeeInfo?.asset.exponent || 8)} ${
              bitcoinFeeInfo?.asset.symbol
            }`}

            <ImageIcon
              url={bitcoinFeeInfo?.asset.logo}
              style={{ width: 20, height: 20, marginLeft: '4px' }}></ImageIcon>
          </>
        }
        tooltip={
          'For peg-in, fees will be deducted from your Bitcoin balance; for peg-out, fees will be deducted from your Side Chain balance.'
        }></DetailRow>

      <DetailRow
        text={'You will receive'}
        value={
          <>
            <Box
              display={'inline'}
              sx={{
                maxWidth: 160,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}>
              {yourReceive} {bridgeAsset?.denom === 'sat' ? sideAssetInfo?.asset?.symbol : bridgeAsset?.asset.symbol}
            </Box>
            <ImageIcon
              url={bridgeAsset?.denom === 'sat' ? sideAssetInfo?.asset?.logo : bridgeAsset?.asset.logo}
              style={{ width: 20, height: 20, borderRadius: 100 }}></ImageIcon>
          </>
        }
        tooltip={
          'Please note that the sBTC tokens you receive on the Side Chain are not native BTC from the Bitcoin network. Instead, they are representations of BTC issued to you on the Side Chain.'
        }></DetailRow>
    </>
  );

  const withdrawDetailItems = (
    <>
      <DetailRow
        text={'Est. Tansaction Fee'}
        value={
          <>
            {withdrawFee}&nbsp;sBTC
            <ImageIcon url={sideFeeInfo?.asset?.logo} style={{ width: 20, height: 20, marginLeft: '4px' }}></ImageIcon>
          </>
        }></DetailRow>
      <DetailRow text={'Est. Bridge Time'} value={'About 10 minutes'}></DetailRow>

      <DetailRow
        text={'Bridge Fee'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.grey12}>
              (~$
              {BigNumber(satPrice)
                .multipliedBy(toReadableAmount(protocolFee || '0', sideFeeInfo?.asset.exponent || 8))
                .toFixed(2, BigNumber.ROUND_CEIL)}
              )
            </Typography>
            {`${toReadableAmount(protocolFee || '0', sideFeeInfo?.asset.exponent || 8)} ${sideFeeInfo?.asset.symbol}`}

            <ImageIcon url={sideFeeInfo?.asset.logo} style={{ width: 20, height: 20, marginLeft: '4px' }}></ImageIcon>
          </>
        }
        tooltip={
          'For peg-in, fees will be deducted from your Bitcoin balance; for peg-out, fees will be deducted from your Side Chain balance.'
        }></DetailRow>

      <DetailRow
        text={'You will receive'}
        value={
          <>
            <Box
              display={'inline'}
              sx={{
                maxWidth: 160,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}>
              {yourReceive}{' '}
              {bridgeAsset?.denom === 'sat' ? bitcoinAssetInfo?.asset?.symbol : sideAssetInfo?.asset.symbol}
            </Box>
            <ImageIcon
              url={bridgeAsset?.denom === 'sat' ? bitcoinAssetInfo?.asset?.logo : bridgeAsset?.asset.logo}
              style={{ width: 20, height: 20, marginLeft: '4px' }}></ImageIcon>
          </>
        }></DetailRow>
    </>
  );

  return (
    <Layout>
      <Header
        LeftComponent={
          <>
            <Image
              onClick={() => {
                navigate('SettingsTabScreen');
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
            {isBtcBridge && (
              <Column
                relative
                rounded
                style={{
                  fontSize: '14px',
                  padding: '8px',
                  background: colors.card_bgColor,
                  border: `1px solid ${colors.main}`,
                  display: isDeposit ? 'flex' : 'none'
                }}>
                <Row relative full justifyBetween color={'grey12'}>
                  <Typography color={colors.grey12} fontSize={'14px'} className="w-1/3 text-left">
                    Tx
                  </Typography>

                  <Typography color={colors.grey12} fontSize={'14px'} className="w-1/3">
                    Index
                  </Typography>
                  <Typography color={colors.grey12} fontSize={'14px'} className="text-right">
                    Amount
                  </Typography>
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
            )}
            {isBtcBridge && (
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
                      ? ' Your sBTC tokens on the Side Chain will be burnt'
                      : 'Make sure above UTXO carries no inscripted assets'}
                  </div>
                </div>

                <div className="text-white text-xs font-normal pl-6">
                  {!isDeposit
                    ? 'In return, you will receive native BTC on the Bitcoin network. Ensure you have noted this change and take any necessary actions to secure your assets.'
                    : 'This transaction will use the above Inputs. Please double check and confirm that these Inputs do not carry other assets including Ordinals and Runes.'}
                </div>
              </Column>
            )}

            <Column relative rounded bg={'card_bgColor'} mt="lg" classname=" p-2 py-3">
              {isDeposit ? depositDetailItems : withdrawDetailItems}
            </Column>

            <Row full itemsCenter>
              <Button
                text="Last"
                full
                onClick={() => {
                  navigate('BridgeTabScreen');
                }}
                style={{
                  fontSize: '14px'
                }}></Button>

              <Button
                full
                preset="primary"
                text="Confirm"
                disabled={isDisabled}
                style={{
                  color: 'black',
                  fontSize: '14px'
                }}
                onClick={() => {
                  if (base?.includes('rune')) {
                    bridgeRune(base?.split('/')[1]);
                  } else {
                    bridge();
                  }
                }}></Button>
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
