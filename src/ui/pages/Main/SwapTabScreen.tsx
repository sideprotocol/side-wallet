import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// import { IGetMarketListItem } from '@/ui/services';
// import { Modal } from 'antd';
import { Column, Content, Footer, Layout, Row } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import { Icon } from '@/ui/components/Icon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import SlippageControl from '@/ui/components/SlippageControl';
import SwapSelectToken from '@/ui/components/Swap/SwapSelectToken';
import SwapDetail from '@/ui/components/Swap/detail';
import TokenCurrent from '@/ui/components/TokenCurrent';
import useGetAllPools from '@/ui/hooks/useGetAllPools';
import useGetMarketList from '@/ui/hooks/useGetMarketList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import useSwap from '@/ui/hooks/useSwap';
import useSwapSimulation from '@/ui/hooks/useSwapSimulation';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useSwapState } from '@/ui/state/swap/hook';
import { SwapActions } from '@/ui/state/swap/reducer';
import { removeStartZero } from '@/ui/utils/format';
import { Coin } from '@cosmjs/stargate';

const InitBalance = () => {
  const currentAccount = useCurrentAccount();
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const { reloadDataTrigger } = useSwapState();
  const dispatch = useAppDispatch();

  const getBalancesAll = async () => {
    if (!balanceList.length) return;
    const balancesObject = balanceList.reduce((acc, cur, index) => {
      return {
        ...acc,
        [balanceList[index].denom]: {
          raw: cur.amount,
          available: cur.formatAmount
        }
      };
    }, {});

    dispatch(SwapActions.update({ balances: balancesObject }));
  };

  useEffect(() => {
    if (!currentAccount?.address) {
      dispatch(SwapActions.update({ balances: {} }));
      return;
    }
    getBalancesAll();
  }, [currentAccount?.address, reloadDataTrigger, balanceList]);

  return <></>;
};

const NativeBalance = () => {
  const { swapLoading, swapPair, balances, swapRouteResult } = useSwapState();
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentAccount();
  const connected = !!currentAccount?.address && swapPair?.native.denom;

  // const {data: marketList} = useGetMarketList();
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const nativeBalance = balances[swapPair?.native?.denom || '']?.available || '0';
  const assetNativeIcon = balanceList.find((item) => item.denom === swapPair.native.denom);

  function insufficientBalance() {
    return BigNumber(swapPair.native.amount || '0').gt(balances?.[swapPair.native?.denom || '']?.available || 0);
  }

  const priceImpact = swapRouteResult.priceImpact;

  const priceImpactRaw = BigNumber(priceImpact).div(100);
  const isDisabled = () => {
    return (
      insufficientBalance() ||
      !swapPair.native?.amount ||
      !swapPair.remote?.amount ||
      parseFloat(swapPair.native?.amount) <= 0 ||
      parseFloat(swapPair.remote?.amount) <= 0 ||
      swapLoading ||
      BigNumber(priceImpactRaw || '0').gt(0.5)
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
      <div />

      {connected && (
        <div className={' gap-[3px] flex items-center cursor-pointer'} style={{}}>
          <Icon icon={'wallet-icon'} size={14} color={!isDisabled() ? 'white' : 'search_icon'}></Icon>
          <div
            style={{
              color: 'rgb(125, 125, 125)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
            {' '}
            {/*<WalletIcon></WalletIcon>*/}
            {BigNumber(nativeBalance)
              .toFormat(assetNativeIcon?.asset?.precision || 8, BigNumber.ROUND_CEIL)
              .replace(/\.?0+$/, '')}
            &nbsp;
            <div
              className={'text-[#F7771A] text-[14px] hover:text-[#F7931A]'}
              onClick={() => {
                dispatch(
                  SwapActions.update({
                    swapPair: {
                      native: {
                        denom: swapPair.native.denom,
                        amount: nativeBalance
                      },
                      remote: {
                        denom: swapPair.remote.denom,
                        amount: swapPair.remote.amount
                      }
                    }
                  })
                );
              }}>
              Max
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NativePrice = () => {
  // const priceMap = JSON.parse(localStorage.getItem('priceMap') || '{}');

  const { swapPair } = useSwapState();
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const validNativeInput = BigNumber(swapPair?.native?.amount || 0).gt(0) && swapPair?.native?.denom;
  const assetNativeIcon = balanceList.find((item) => item.denom === swapPair.native.denom);

  const nativePrice = (
    new BigNumber(!swapPair?.native?.amount ? 0 : swapPair?.native?.amount).multipliedBy(
      assetNativeIcon?.denomPrice || '0'
    ) || 0
  )
    .toFixed(8, BigNumber.ROUND_DOWN)
    .replace(/\.?0+$/, '');

  return (
    <>
      {validNativeInput ? (
        <div
          style={{
            fontSize: '12px',
            color: 'rgb(125, 125, 125)'
          }}>
          ${nativePrice == 'NaN' ? '0' : BigNumber(nativePrice).toFormat()}
        </div>
      ) : (
        <div
          style={{
            height: '22px'
          }}></div>
      )}
    </>
  );
};

const RemoteBalance = () => {
  const { swapPair, balances } = useSwapState();
  const currentAccount = useCurrentAccount();

  const connected = !!currentAccount?.address && swapPair?.remote.denom;
  const { data: balanceList } = useGetMarketList();

  const remoteBalance = balances[swapPair?.remote?.denom || '']?.available || '0';

  const assetRemoteIcon = balanceList.find((item) => item.tokenDenom === swapPair.remote.denom);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
      <div />
      {connected && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
          <Icon icon={'wallet-icon'} size={14} color={'search_icon'}></Icon>
          <div
            style={{
              color: 'rgb(125, 125, 125)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
            {' '}
            {/*<WalletIcon></WalletIcon>*/}
            {BigNumber(remoteBalance)
              .toFormat(assetRemoteIcon?.tokenPrecision || 8, BigNumber.ROUND_CEIL)
              .replace(/\.?0+$/, '')}
          </div>
          <div
            style={{
              color: '#16EDD6',
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '13px',
              marginLeft: '6px',
              cursor: 'pointer'
            }}
            onClick={() => {
              return;
            }}></div>
        </div>
      )}
    </div>
  );
};

const RemotePrice = () => {
  // const priceMap = JSON.parse(localStorage.getItem('priceMap') || '{}');

  const { swapPair, balances } = useSwapState();
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const validNativeInput = BigNumber(swapPair?.native?.amount || 0).gt(0) && swapPair?.native?.denom;
  const assetNativeIcon = balanceList.find((item) => item.denom === swapPair.native.denom);

  const nativePrice = (
    new BigNumber(!swapPair?.native?.amount ? 0 : swapPair?.native?.amount).multipliedBy(
      assetNativeIcon?.denomPrice || '0'
    ) || 0
  )
    .toFixed(8, BigNumber.ROUND_DOWN)
    .replace(/\.?0+$/, '');
  const remoteBalance = balances[swapPair?.remote?.denom || '']?.available || '0.00';

  return (
    <>
      {validNativeInput ? (
        <div
          style={{
            fontSize: '12px',
            color: 'rgb(125, 125, 125)'
          }}>
          ${nativePrice == 'NaN' ? '0.00' : BigNumber(remoteBalance)?.toFormat(2)}
        </div>
      ) : (
        <div
          style={{
            height: '22px'
          }}></div>
      )}
    </>
  );
};

const NativeInput = () => {
  const { swapPair } = useSwapState();
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentAccount();
  if (!currentAccount?.address) return;
  const debouncedChange = useDebouncedCallback((value) => {
    dispatch(
      SwapActions.update({
        swapPair: {
          native: {
            denom: swapPair.native.denom,
            amount: value
          },
          remote: {
            denom: swapPair.remote.denom,
            amount: swapPair.remote.amount
          }
        }
      })
    );
  }, 500);

  return (
    <CoinInput
      size={36}
      coin={swapPair?.native}
      onChange={(value) => {
        debouncedChange(value);
      }}
    />
  );
};

const RemoteInput = () => {
  const { swapPair } = useSwapState();
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentAccount();
  return (
    <CoinInput
      size={36}
      coin={swapPair?.remote}
      readOnly
      color={swapPair['remote'].denom ? 'white' : 'rgb(125, 125, 125)'}
      onChange={(value) => {
        if (!currentAccount?.address) return;
        dispatch(
          SwapActions.update({
            swapPair: {
              native: {
                denom: swapPair.native.denom,
                amount: swapPair.native.amount
              },
              remote: {
                denom: swapPair.remote.denom,
                amount: removeStartZero(value)
              }
            }
          })
        );
      }}
    />
  );
};

const ConfirmButton = () => {
  const { swap } = useSwap();

  const { swapLoading, swapPair, balances, swapRouteResult } = useSwapState();

  const priceImpact = swapRouteResult.priceImpact;

  const priceImpactRaw = BigNumber(priceImpact).div(100);

  // console.log(`balances: `, balances);

  function insufficientBalance() {
    return BigNumber(swapPair.native.amount || '0').gt(balances?.[swapPair.native?.denom || '']?.available || 0);
  }

  const isDisabled = () => {
    return (
      insufficientBalance() ||
      !swapPair.native?.amount ||
      !swapPair.remote?.amount ||
      parseFloat(swapPair.native?.amount) <= 0 ||
      parseFloat(swapPair.remote?.amount) <= 0 ||
      swapLoading ||
      BigNumber(priceImpactRaw || '0').gt(0.5)
    );
  };

  const buttonText =
    !swapPair?.native?.denom || !swapPair?.remote?.denom
      ? 'Select a token'
      : BigNumber(swapPair?.native?.amount).eq(0)
      ? 'Enter an amount'
      : insufficientBalance()
      ? 'Insufficient Amount'
      : BigNumber(priceImpactRaw).gt(0.5)
      ? 'Price Impact >50%'
      : swapLoading
      ? ''
      : 'Swap';
  return (
    <Button
      full
      text={buttonText}
      preset="primary"
      disabled={isDisabled()}
      icon={swapLoading ? 'loading' : undefined}
      onClick={async () => {
        if (!isDisabled()) {
          swap();
        }
      }}
    />
  );
};

function findIntersection(data1, data2) {
  // 创建一个集合存储第二个数组中的 denom 值
  const denomSet = new Set(data1.map((item) => item.tokenDenom));
  // 过滤第一个数组中的项目，只保留那些 denom 值在集合中的项目
  return data2.filter((item) => denomSet.has(item.denom));
}

export default function SwapTabScreen() {
  const {
    slippageIsAuto,
    slippage,
    tokenModalShow,
    balances,
    swapRouteResult,
    hoverExchange,
    swapPair,
    responseLoading,
    modalTokenType,
    searchTokenValue,
    showValidDetail
  } = useSwapState();
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentAccount();
  const { data: marketList } = useGetMarketList();
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const balanceListFilter = findIntersection(marketList, balanceList);
  useSwapSimulation();
  useGetAllPools();
  const validResult =
    swapPair?.native?.denom &&
    swapPair?.remote?.denom &&
    BigNumber(swapPair?.native?.amount || 0).gt(0) &&
    BigNumber(swapPair?.remote?.amount || 0).gt(0) &&
    swapPair.remote.denom !== swapPair.native.denom &&
    !responseLoading &&
    swapRouteResult?.pools?.length &&
    swapRouteResult?.pools?.length > 0;
  useEffect(() => {
    dispatch(SwapActions.update({ showValidDetail: !!validResult }));
  }, [validResult]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Layout
        style={{
          display: !tokenModalShow ? 'flex' : 'none!important'
        }}>
        <MainHeader title={''} />
        <Content classname={'hide-scrollbar'}>
          <InitBalance></InitBalance>
          <Column
            relative
            style={{
              gap: '6px'
            }}>
            <div className="flex justify-between mt-[16px]">
              <div className="pl-[10px]"></div>
              <div
                className="w-[108px] flex items-center justify-center rounded-[24px] border-[1px] border-[#F7771A1A] bg-[#F7771A33] hover:bg-[#F7771A1A] h-[30px] cursor-pointer"
                onClick={showModal}>
                <span className={'font-medium text-sm whitespace-nowrap mr-3 text-white'}>{slippage}%</span>
                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.28 12.6514L16.7296 11.0746C16.7534 10.8426 16.7639 10.6026 16.7639 10.3601C16.7639 10.1175 16.7534 9.88281 16.7296 9.64551L18.2774 8.06875C18.7467 7.79717 18.9076 7.19863 18.6386 6.7293L17.1673 4.17959C16.8957 3.71025 16.2972 3.54941 15.8279 3.81836L13.6868 4.36943C13.2993 4.09258 12.8853 3.85264 12.4502 3.65488L11.8596 1.52969C11.8596 0.98916 11.4193 0.548828 10.8787 0.548828H7.93089C7.39036 0.548828 6.95003 0.98916 6.95003 1.52969L6.35941 3.66016C5.92171 3.85791 5.50775 4.10049 5.12279 4.37471L2.98177 3.82363C2.51243 3.55205 1.9139 3.71553 1.64232 4.18486L0.176302 6.73457C-0.0952804 7.20391 0.0681965 7.80244 0.537532 8.07402L2.08529 9.65078C2.06156 9.88281 2.05101 10.1228 2.05101 10.3653C2.05101 10.6053 2.06156 10.8426 2.08529 11.0799L0.537532 12.6566C0.0681965 12.9282 -0.0926437 13.5268 0.176302 13.9961L1.64759 16.5458C1.91917 17.0151 2.51771 17.176 2.98704 16.907L5.12806 16.356C5.51566 16.6328 5.92962 16.8728 6.36468 17.0705L6.95531 19.201C6.95531 19.7415 7.39564 20.1818 7.93617 20.1818H10.8814C11.4219 20.1818 11.8622 19.7415 11.8622 19.201L12.4529 17.0705C12.8906 16.8728 13.3045 16.6302 13.6895 16.356L15.8279 16.907C16.2972 17.1786 16.8957 17.0151 17.1673 16.5458L18.6386 13.9961C18.9076 13.5241 18.7493 12.9229 18.28 12.6514ZM9.40745 13.7957C7.51165 13.7957 5.97181 12.2559 5.97181 10.3601C5.97181 8.46426 7.51165 6.92441 9.40745 6.92441C11.3033 6.92441 12.8431 8.46426 12.8431 10.3601C12.8378 12.2585 11.3033 13.7957 9.40745 13.7957Z"
                    fill="#ffffff99"></path>
                </svg>
              </div>
            </div>
            <Column mt={'smm'} px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'card_bgColor'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  From
                </div>

                <NativeBalance />
              </Row>

              <Row
                itemsCenter
                justifyBetween
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '20px 0px'
                }}>
                <NativeInput />

                <TokenCurrent
                  value={swapPair.native}
                  setShow={() => {
                    dispatch(SwapActions.update({ tokenModalShow: true, modalTokenType: 'native' }));
                  }}
                />
              </Row>

              <NativePrice />
            </Column>
            <Row
              relative
              style={{
                top: 0
              }}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#1D1D1F',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: '4px solid #414142',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onMouseEnter={() => {
                  dispatch(
                    SwapActions.update({
                      hoverExchange: true
                    })
                  );
                }}
                onMouseLeave={() => {
                  dispatch(
                    SwapActions.update({
                      hoverExchange: false
                    })
                  );
                }}
                onClick={() => {
                  dispatch(
                    SwapActions.update({
                      swapPair: {
                        native: {
                          denom: swapPair.remote.denom,
                          amount: '1'
                        },
                        remote: {
                          denom: swapPair.native.denom,
                          amount: ''
                        }
                      }
                    })
                  );
                }}>
                <Icon size={hoverExchange ? 22 : 11} icon={hoverExchange ? 'swap-down-hover' : 'swap-down-icon'}></Icon>
                {/*{!hoverExchange ? <ExchangeDefaultSVG color="black" /> : <ExchangeSVG />}*/}
              </div>
            </Row>

            <Column mt={'zero'} px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'card_bgColor'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  To
                </div>
                <RemoteBalance />
              </Row>

              <Row
                itemsCenter
                justifyBetween
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '20px 0px',
                  gap: '5px'
                }}>
                <RemoteInput />

                <TokenCurrent
                  value={swapPair.remote}
                  setShow={() => {
                    dispatch(
                      SwapActions.update({
                        modalTokenType: 'remote',
                        tokenModalShow: true
                      })
                    );
                  }}
                />
              </Row>

              <RemotePrice />
            </Column>

            <Row
              full
              style={{
                marginTop: '8px'
              }}>
              <ConfirmButton />
            </Row>
            {showValidDetail && (
              <div className={'mt-[10px] mb-[32px] rounded-[8px] bg-[#1E1E1F]'}>
                <div className="px-[16px] py-[14px]">
                  <SwapDetail />
                </div>
              </div>
            )}
          </Column>
        </Content>
        <Footer px="zero" py="zero">
          <NavTabBar tab="swap" />
        </Footer>
      </Layout>
      <SwapSelectToken
        open={tokenModalShow}
        onClose={() => {
          dispatch(SwapActions.update({ tokenModalShow: false }));
        }}
        onSelect={(token: Coin) => {
          if (modalTokenType === 'native') {
            if (token.denom === swapPair.remote.denom) {
              dispatch(
                SwapActions.update({
                  swapPair: {
                    native: {
                      denom: token.denom,
                      amount: '1'
                    },
                    remote: {
                      denom: swapPair.native.denom,
                      amount: ''
                    }
                  },
                  tokenModalShow: false
                })
              );
              return;
            }
            dispatch(
              SwapActions.update({
                swapPair: {
                  native: {
                    denom: token.denom,
                    amount: '1'
                  },
                  remote: {
                    denom: swapPair.remote.denom,
                    amount: ''
                  }
                },
                tokenModalShow: false
              })
            );
          } else {
            if (token.denom === swapPair.native.denom) {
              dispatch(
                SwapActions.update({
                  swapPair: {
                    native: {
                      denom: swapPair.remote.denom,
                      amount: swapPair.native.amount
                    },
                    remote: {
                      denom: token.denom,
                      amount: ''
                    }
                  },
                  tokenModalShow: false
                })
              );
              return;
            }
            dispatch(
              SwapActions.update({
                swapPair: {
                  native: {
                    denom: swapPair.native.denom,
                    amount: swapPair.native.amount
                  },
                  remote: {
                    denom: token.denom,
                    amount: ''
                  }
                },
                tokenModalShow: false
              })
            );
          }
        }}
        assetsList={balanceListFilter}
        popularList={balanceListFilter}
        onSearch={(value: string) => {
          dispatch(SwapActions.update({ searchTokenValue: value }));
        }}
        searchValue={searchTokenValue}
        curTokenDenom={swapPair[modalTokenType as 'native' | 'remote']?.denom}
      />
      <SlippageControl
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slippage={slippage}
        onBack={() => setIsModalOpen(false)}
        slippageIsAuto={slippageIsAuto}
        onInputSlippage={(targetValue: string) => {
          dispatch(SwapActions.update({ slippageIsAuto: false }));

          if (targetValue.startsWith('.')) {
            return;
          }
          if (targetValue !== '' && !targetValue.match(/^\d*(\.\d{0,2})?$/)) {
            return;
          }
          const newSlippage = targetValue.replace(/^0+/, '0'); // remove prefix zeros

          dispatch(SwapActions.update({ slippage: newSlippage }));
        }}
        onQuickSet={(value: string) => {
          dispatch(SwapActions.update({ slippageIsAuto: false, slippage: value }));
        }}
      />
    </>
  );
}
