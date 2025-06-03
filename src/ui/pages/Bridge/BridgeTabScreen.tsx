import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { Column, Content, Footer, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { useGetBridgeButtonTips } from '@/ui/hooks/bridge';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function BridgeTabScreen() {
  const navigate = useNavigate();
  const { sideChain, UNISAT_SERVICE_ENDPOINT, SIDE_STATION_URL } = useEnvironment();
  const currentAccount = useCurrentAccount();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { bridgeAmount, from, to, base, hoverExchange, isDeposit } = useBridgeState();

  const dispatch = useAppDispatch();

  const assets = isDeposit ? btcBalanceList : sideBalanceList;

  const bridgeAsset = assets.find((a) => a?.denom === `${base}`);

  const balance = bridgeAsset?.formatAmount || '';

  const { isDisabled, buttonTips } = useGetBridgeButtonTips();

  useEffect(() => {
    const from = isDeposit
      ? {
          id: 'mainnet',
          name: 'Bitcoin',
          logo: '/images/icons/btc.svg'
        }
      : {
          id: sideChain.chainID,
          name: sideChain.name,
          logo: sideChain.logo
        };

    const to = isDeposit
      ? {
          id: sideChain.chainID,
          name: sideChain.name,
          logo: sideChain.logo
        }
      : {
          id: 'mainnet',
          name: 'Bitcoin',
          logo: '/images/icons/btc.svg'
        };

    dispatch(
      BridgeActions.update({
        from,
        to
      })
    );
  }, [isDeposit]);

  useEffect(() => {
    services.unisat.getFeeSummary(UNISAT_SERVICE_ENDPOINT).then((res) => {
      const rcFee = res.list[2].feeRate;
      dispatch(BridgeActions.update({ fee: +rcFee, feeSummary: res.list }));
    });
  }, []);

  useEffect(() => {
    dispatch(BridgeActions.update({ balance: balance, bridgeAsset: bridgeAsset }));
  }, [balance, bridgeAsset]);

  const [isFromHover, setIsFromHover] = useState(false);
  const [isToHover, setIsToHover] = useState(false);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content mt="lg" classname={'fadeIn-page'}>
        <Column gap="lg">
          <Row
            full
            justifyBetween
            itemsCenter
            style={{
              flexGrow: 0
            }}>
            <Text
              color="white"
              size="lg"
              style={{
                fontWeight: 600
              }}>
              Bridge
            </Text>

            <Stack
              direction="row"
              alignItems="center"
              gap="4px"
              sx={{
                cursor: 'pointer',
                p: {
                  color: colors.grey12,
                  transition: '.4s'
                },
                div: {
                  transition: '.4s'
                },
                ':hover': {
                  p: {
                    color: colors.white
                  },
                  div: {
                    div: {
                      color: `${colors.white} !important`,
                      bgcolor: `${colors.white} !important`
                    }
                  }
                }
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  mt: '-1px'
                }}>
                History
              </Typography>
              <Icon icon="arrow-right" color="white_muted" size={16} />
            </Stack>
          </Row>

          <Column
            style={{
              gap: '0'
            }}>
            <Column
              bg="card_bgColor"
              rounded
              style={{
                padding: '16px'
              }}>
              <Row justifyBetween itemsCenter>
                <Row itemsCenter gap="sm">
                  <Text text="From" size="xs" color="white_muted" />
                  <Text text="Bitcoin" size="xs" color="white" />
                </Row>
                <Row itemsCenter gap="sm">
                  <Icon color="white_muted" icon="wallet-icon" size={12} />
                  <Text size="xs" color="white_muted" text={BigNumber(balance).toFormat()} />
                </Row>
              </Row>

              <Row justifyBetween itemsCenter gap="sm">
                <CoinInput
                  size={14}
                  coin={{
                    amount: bridgeAmount,
                    denom: bridgeAsset?.denom || ''
                  }}
                  decimalScale={bridgeAsset ? +bridgeAsset.asset.exponent : 6}
                  onChange={(value) => {
                    dispatch(BridgeActions.update({ bridgeAmount: value }));
                  }}
                />
                <Row
                  itemsCenter
                  gap="md"
                  bg="black"
                  rounded
                  style={{
                    flexShrink: 0,
                    padding: '12px 16px',
                    cursor: 'pointer'
                  }}
                  onMouseOver={() => setIsFromHover(true)}
                  onMouseLeave={() => setIsFromHover(false)}
                  onClick={() => {
                    navigate('BridgeSelectTokenScreen');
                  }}>
                  <Image
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '20px'
                    }}
                    size={24}
                    src={bridgeAsset?.asset?.logo}
                  />
                  <Text text={bridgeAsset?.asset?.symbol} size="md" color={isFromHover ? 'main' : 'white'} />
                  <Icon icon="down" size={12} color={isFromHover ? 'main' : 'white'} />
                </Row>
              </Row>
            </Column>

            <Stack
              sx={{
                position: 'relative',
                height: '16px'
              }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  height: '38px',
                  width: '38px',
                  borderRadius: '10px',
                  bgcolor: colors.black,
                  border: `4px solid ${colors.black1}`
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M8.34961 5.18974L5.11999 8.41936C4.97603 8.56328 4.78081 8.64412 4.57725 8.64412C4.37369 8.64412 4.17846 8.56328 4.0345 8.41936L0.804882 5.18974L1.89038 4.10425L4.57725 6.79112L7.26411 4.10425L8.34961 5.18974Z"
                    fill="white"
                  />
                  <path
                    d="M5.3457 0.15625L5.3457 7.87642L3.81035 7.87642L3.81035 0.15625L5.3457 0.15625Z"
                    fill="white"
                  />
                </svg>
              </Stack>
            </Stack>

            <Column
              bg="card_bgColor"
              rounded
              style={{
                padding: '16px'
              }}>
              <Row justifyBetween itemsCenter>
                <Row itemsCenter gap="sm">
                  <Text text="To" size="xs" color="white_muted" />
                  <Text text="Cosmos Hub" size="xs" color="white" />
                </Row>
                <Row itemsCenter gap="sm">
                  <Text size="xs" color="white_muted" text={'xxxx'} />
                </Row>
              </Row>

              <Row justifyBetween itemsCenter gap="sm">
                <CoinInput
                  size={14}
                  coin={{
                    amount: bridgeAmount,
                    denom: bridgeAsset?.denom || ''
                  }}
                  decimalScale={bridgeAsset ? +bridgeAsset.asset.exponent : 6}
                  onChange={(value) => {
                    dispatch(BridgeActions.update({ bridgeAmount: value }));
                  }}
                />
                <Row
                  itemsCenter
                  gap="md"
                  bg="black"
                  rounded
                  style={{
                    flexShrink: 0,
                    padding: '12px 16px',
                    cursor: 'pointer'
                  }}
                  onMouseOver={() => setIsToHover(true)}
                  onMouseLeave={() => setIsToHover(false)}
                  onClick={() => {
                    navigate('BridgeSelectTokenScreen');
                  }}>
                  <Image
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '20px'
                    }}
                    size={24}
                    src={bridgeAsset?.asset?.logo}
                  />
                  <Text text={bridgeAsset?.asset?.symbol} size="md" color={isToHover ? 'main' : 'white'} />
                  <Icon icon="down" size={12} color={isToHover ? 'main' : 'white'} />
                </Row>
              </Row>
            </Column>

            <Row mt={'xl'}>
              <Button
                onClick={() => {
                  navigate('BridgeConfirmTabScreen');
                }}
                disabled={isDisabled}
                full
                text={buttonTips || 'Next'}
                preset="primary"
              />
            </Row>

            <Row justifyCenter mt="md">
              <Text
                text="Bridge on web app"
                size="sm"
                color="white_muted"
                onClick={() => {
                  window.open(`${SIDE_STATION_URL}/bridge`);
                }}
              />
            </Row>
          </Column>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
